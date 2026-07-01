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

export async function createProject(formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const kind = formData.get("kind") as string;
  const year = parseInt(formData.get("year") as string, 10);
  const status = (formData.get("status") as ProjectStatus) || "planning";
  const visibility = (formData.get("visibility") as Visibility) || "draft";
  const tint = formData.get("tint") as string;
  const stackRaw = formData.get("stack") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const privateNotes = formData.get("privateNotes") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  const project = await prisma.project.create({
    data: {
      name,
      slug: slugify(name),
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
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const kind = formData.get("kind") as string;
  const year = parseInt(formData.get("year") as string, 10);
  const status = formData.get("status") as ProjectStatus;
  const visibility = formData.get("visibility") as Visibility;
  const tint = formData.get("tint") as string;
  const stackRaw = formData.get("stack") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const privateNotes = formData.get("privateNotes") as string;
  const isFeatured = formData.get("isFeatured") === "on";

  await prisma.project.update({
    where: { id },
    data: {
      name,
      slug: slugify(name),
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
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/work");
  redirect("/admin/projects");
}
