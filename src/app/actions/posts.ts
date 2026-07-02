"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import type { PostStatus } from "@/generated/prisma/client";

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function resolveTagIds(tagsRaw: string) {
  const names = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const tagIds: string[] = [];
  for (const name of names) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name, slug: slugify(name) },
    });
    tagIds.push(tag.id);
  }
  return tagIds;
}

export async function createPost(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const status = (formData.get("status") as PostStatus) || "draft";
  const tagsRaw = formData.get("tags") as string;

  const tagIds = await resolveTagIds(tagsRaw);

  const post = await prisma.post.create({
    data: {
      title,
      slug: slugify(title),
      excerpt: excerpt || null,
      status,
      publishedAt: status === "published" ? new Date() : null,
      tags: {
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${post.id}`);
  redirect(`/admin/posts/${post.id}`);
}

export async function updatePost(id: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const status = formData.get("status") as PostStatus;
  const tagsRaw = formData.get("tags") as string;

  const existing = await prisma.post.findUnique({ where: { id } });
  const tagIds = await resolveTagIds(tagsRaw);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      excerpt: excerpt || null,
      status,
      publishedAt:
        status === "published"
          ? existing?.publishedAt ?? new Date()
          : status === "draft"
            ? null
            : existing?.publishedAt,
      tags: {
        deleteMany: {},
        create: tagIds.map((tagId) => ({ tagId })),
      },
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
}

export async function deletePost(id: string) {
  await requireAuth();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function publishPost(id: string) {
  await requireAuth();
  await prisma.post.update({
    where: { id },
    data: { status: "published", publishedAt: new Date() },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
}

export async function unpublishPost(id: string) {
  await requireAuth();
  await prisma.post.update({
    where: { id },
    data: { status: "draft" },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
}
