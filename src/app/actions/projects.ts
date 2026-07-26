"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import type { ProjectStatus, Visibility } from "@/generated/prisma/client";
import {
  normalizeArtVariant,
  normalizeProjectTint,
} from "@/lib/project-art-variant";
import { slugify } from "@/lib/slug";
import {
  parseCsv,
  isRedirectError,
  uniqueSlug,
} from "@/lib/action-helpers";

const VALID_PROJECT_STATUSES = new Set([
  "planning",
  "in_progress",
  "done",
  "archived",
]);
const VALID_VISIBILITIES = new Set(["draft", "published"]);

function projectSlug(name: string, excludeId?: string) {
  return uniqueSlug(
    slugify(name) || `item-${Date.now()}`,
    async (slug: string) =>
      (await prisma.project.findUnique({ where: { slug }, select: { id: true } }))
        ?.id ?? null,
    excludeId,
  );
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const name = (formData.get("name") as string)?.trim();
  if (!name) return { error: "Name is required" };

  const kind = formData.get("kind") as string;
  const yearRaw = parseInt(formData.get("year") as string, 10);
  const year = isNaN(yearRaw) ? new Date().getFullYear() : yearRaw;
  const status = (formData.get("status") as ProjectStatus) || "planning";
  const visibility = (formData.get("visibility") as Visibility) || "draft";
  if (!VALID_PROJECT_STATUSES.has(status)) return { error: "Invalid status" };
  if (!VALID_VISIBILITIES.has(visibility))
    return { error: "Invalid visibility" };
  const tintRaw = formData.get("tint");
  const tint = normalizeProjectTint(tintRaw);
  if (!tint) return { error: "Invalid tint color" };
  const artVariantRaw = formData.get("artVariant");
  const artVariant = normalizeArtVariant(artVariantRaw);
  if (artVariantRaw && artVariant === null)
    return { error: "Invalid artwork composition" };
  const stackRaw = formData.get("stack") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const privateNotes = formData.get("privateNotes") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const slug = await projectSlug(name);

  try {
    const project = await prisma.project.create({
      data: {
        name,
        slug,
        kind: kind || null,
        year,
        status,
        visibility,
        tint,
        artVariant,
        stack: parseCsv(stackRaw),
        repoUrl: repoUrl || null,
        liveUrl: liveUrl || null,
        privateNotes: privateNotes || null,
        isFeatured,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${project.slug}`);
    redirect(`/admin/projects/${project.id}`);
  } catch (e: unknown) {
    if (isRedirectError(e)) throw e;
    return { error: "Failed to create project. Please try again." };
  }
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const name = (formData.get("name") as string)?.trim();
  if (!name) return { error: "Name is required" };

  const kind = formData.get("kind") as string;
  const yearRaw = parseInt(formData.get("year") as string, 10);
  const year = isNaN(yearRaw) ? new Date().getFullYear() : yearRaw;
  const status = formData.get("status") as ProjectStatus;
  const visibility = formData.get("visibility") as Visibility;
  if (!VALID_PROJECT_STATUSES.has(status)) return { error: "Invalid status" };
  if (!VALID_VISIBILITIES.has(visibility))
    return { error: "Invalid visibility" };
  const tintRaw = formData.get("tint");
  const tint = normalizeProjectTint(tintRaw);
  if (!tint) return { error: "Invalid tint color" };
  const artVariantRaw = formData.get("artVariant");
  const artVariant = normalizeArtVariant(artVariantRaw);
  if (artVariantRaw && artVariant === null)
    return { error: "Invalid artwork composition" };
  const stackRaw = formData.get("stack") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const privateNotes = formData.get("privateNotes") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const existing = await prisma.project.findUnique({
    where: { id },
    select: { slug: true },
  });
  const slug = await projectSlug(name, id);

  try {
    await prisma.project.update({
      where: { id },
      data: {
        name,
        slug,
        kind: kind || null,
        year,
        status,
        visibility,
        tint,
        artVariant,
        stack: parseCsv(stackRaw),
        repoUrl: repoUrl || null,
        liveUrl: liveUrl || null,
        privateNotes: privateNotes || null,
        isFeatured,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${slug}`);
    if (existing && existing.slug !== slug) {
      revalidatePath(`/work/${existing.slug}`);
    }
  } catch (e: unknown) {
    if (isRedirectError(e)) throw e;
    return { error: "Failed to update project. Please try again." };
  }
}

export async function deleteProject(id: string) {
  await requireAuth();
  try {
    const deleted = await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${deleted.slug}`);
    redirect("/admin/projects");
  } catch (e: unknown) {
    if (isRedirectError(e)) throw e;
    return { error: "Failed to delete project." };
  }
}
