"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import type { TaskStatus, TaskPriority } from "@/generated/prisma/client";

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

export async function createTask(projectId: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const status = (formData.get("status") as TaskStatus) || "todo";
  const priority = (formData.get("priority") as TaskPriority) || "medium";
  const dueDate = formData.get("dueDate") as string;
  const notes = formData.get("notes") as string;

  await prisma.task.create({
    data: {
      projectId,
      title,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      notes: notes || null,
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function updateTask(id: string, projectId: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const status = formData.get("status") as TaskStatus;
  const priority = formData.get("priority") as TaskPriority;
  const dueDate = formData.get("dueDate") as string;
  const notes = formData.get("notes") as string;

  await prisma.task.update({
    where: { id },
    data: {
      title,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      notes: notes || null,
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
}

export async function deleteTask(id: string, projectId: string) {
  await requireAuth();
  await prisma.task.delete({ where: { id } });
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function toggleTaskStatus(id: string, projectId: string) {
  await requireAuth();
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return;

  const next: TaskStatus = task.status === "done" ? "todo" : task.status === "todo" ? "doing" : "done";
  await prisma.task.update({ where: { id }, data: { status: next } });
  revalidatePath(`/admin/projects/${projectId}`);
}
