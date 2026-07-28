"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import type { PostStatus } from "@/generated/prisma/client";
import { hasImageWithoutAlt } from "@/lib/content-validation";
import { slugify } from "@/lib/slug";
import {
  parseCsv,
  isRedirectError,
  uniqueSlug,
} from "@/lib/action-helpers";

const VALID_POST_STATUSES = new Set(["draft", "scheduled", "published"]);

// Parse the TipTap JSON content field. Returns undefined for anything that
// isn't a non-empty JSON object with a `type` (empty editor, malformed input),
// so the caller can leave the column untouched rather than store junk.
function parseContent(contentRaw: FormDataEntryValue | null) {
  if (!contentRaw || typeof contentRaw !== "string" || !contentRaw.trim())
    return undefined;
  try {
    const parsed = JSON.parse(contentRaw);
    if (typeof parsed !== "object" || parsed === null || !("type" in parsed))
      return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function postSlug(title: string, excludeId?: string) {
  return uniqueSlug(
    slugify(title) || `post-${Date.now()}`,
    async (slug: string) =>
      (await prisma.post.findUnique({ where: { slug }, select: { id: true } }))
        ?.id ?? null,
    excludeId,
  );
}

async function resolveTagIds(tagsRaw: string) {
  const names = parseCsv(tagsRaw);

  const tagIds: string[] = [];
  for (const name of names) {
    const tagSlug = slugify(name);
    if (!tagSlug) continue;
    try {
      const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name, slug: tagSlug },
      });
      tagIds.push(tag.id);
    } catch {
      // upsert matched no existing `name`, so its create ran and hit a
      // unique violation — which can only be the `slug` (a different name
      // that slugifies to the same value). Reuse that tag instead of
      // silently dropping this one. Looking up by `name` here would miss.
      const existing = await prisma.tag.findUnique({ where: { slug: tagSlug } });
      if (existing) tagIds.push(existing.id);
    }
  }
  // De-dupe: two input names can resolve to the same tag (e.g. "React,React"
  // or slug collisions like "Next.js,next-js"), and PostTag's composite PK
  // @@id([postId, tagId]) rejects a repeated tag on the same post — which
  // would fail the entire save.
  return [...new Set(tagIds)];
}

function revalidateAll(slug?: string) {
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
}

export async function createPost(formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required" };

  const excerpt = formData.get("excerpt") as string;
  const status = (formData.get("status") as PostStatus) || "draft";
  if (!VALID_POST_STATUSES.has(status)) return { error: "Invalid status" };
  const tagsRaw = formData.get("tags") as string;
  const content = parseContent(formData.get("content"));
  if (hasImageWithoutAlt(content))
    return { error: "Every image needs alternative text" };

  const slug = await postSlug(title);
  const tagIds = await resolveTagIds(tagsRaw);

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        status,
        content: content ?? undefined,
        publishedAt: status === "published" ? new Date() : null,
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
    });

    revalidateAll(post.slug);
    revalidatePath(`/admin/posts/${post.id}`);
    redirect(`/admin/posts/${post.id}`);
  } catch (e: unknown) {
    if (isRedirectError(e)) throw e;
    return { error: "Failed to create post. Please try again." };
  }
}

export async function updatePost(id: string, formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required" };

  const excerpt = formData.get("excerpt") as string;
  const status = (formData.get("status") as PostStatus) || "draft";
  if (!VALID_POST_STATUSES.has(status)) return { error: "Invalid status" };
  const tagsRaw = formData.get("tags") as string;
  const content = parseContent(formData.get("content"));
  if (hasImageWithoutAlt(content))
    return { error: "Every image needs alternative text" };

  const existing = await prisma.post.findUnique({ where: { id } });
  const slug = await postSlug(title, id);
  const tagIds = await resolveTagIds(tagsRaw);

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        status,
        content: content ?? undefined,
        publishedAt:
          status === "published"
            ? (existing?.publishedAt ?? new Date())
            : status === "draft"
              ? null
              : existing?.publishedAt,
        tags: {
          deleteMany: {},
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
    });

    revalidateAll(slug);
    if (existing && existing.slug !== slug) revalidateAll(existing.slug);
    revalidatePath(`/admin/posts/${id}`);
  } catch (e: unknown) {
    if (isRedirectError(e)) throw e;
    return { error: "Failed to update post. Please try again." };
  }
}

export async function deletePost(id: string) {
  await requireAuth();
  try {
    const deleted = await prisma.post.delete({ where: { id } });
    revalidateAll(deleted.slug);
    redirect("/admin/posts");
  } catch (e: unknown) {
    if (isRedirectError(e)) throw e;
    return { error: "Failed to delete post." };
  }
}
