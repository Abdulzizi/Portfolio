"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import type { ProjectStatus, Visibility } from "@/generated/prisma/client";

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

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base || `item-${Date.now()}`;
  let suffix = 0;
  while (true) {
    const candidate = suffix === 0 ? slug : `${slug}-${suffix}`;
    const existing = await prisma.project.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix++;
  }
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
  const tint = formData.get("tint") as string;
  const stackRaw = formData.get("stack") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const privateNotes = formData.get("privateNotes") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const slug = await uniqueSlug(slugify(name));

  try {
    const project = await prisma.project.create({
      data: {
        name,
        slug,
        kind: kind || null,
        year,
        status,
        visibility,
        tint: tint || null,
        stack: stackRaw ? stackRaw.split(",").map((s) => s.trim()).filter(Boolean) : [],
        repoUrl: repoUrl || null,
        liveUrl: liveUrl || null,
        privateNotes: privateNotes || null,
        isFeatured,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/work");
    redirect(`/admin/projects/${project.id}`);
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) throw e;
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
  const tint = formData.get("tint") as string;
  const stackRaw = formData.get("stack") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const privateNotes = formData.get("privateNotes") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const slug = await uniqueSlug(slugify(name), id);

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
        tint: tint || null,
        stack: stackRaw ? stackRaw.split(",").map((s) => s.trim()).filter(Boolean) : [],
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
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: "Failed to update project. Please try again." };
  }
}

export async function deleteProject(id: string) {
  await requireAuth();
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/work");
    redirect("/admin/projects");
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: "Failed to delete project." };
  }
}
