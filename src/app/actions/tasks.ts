"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import type { TaskStatus, TaskPriority } from "@/generated/prisma/client";

const VALID_TASK_STATUSES = new Set(["todo", "doing", "done"]);
const VALID_TASK_PRIORITIES = new Set(["low", "medium", "high"]);

export async function createTask(projectId: string, formData: FormData) {
  await requireAuth();

  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required" };

  const status = (formData.get("status") as TaskStatus) || "todo";
  const priority = (formData.get("priority") as TaskPriority) || "medium";
  if (!VALID_TASK_STATUSES.has(status)) return { error: "Invalid status" };
  if (!VALID_TASK_PRIORITIES.has(priority))
    return { error: "Invalid priority" };
  const dueDateInput = formData.get("dueDate") as string;
  const notes = formData.get("notes") as string;

  let dueDate: Date | null = null;
  if (dueDateInput) {
    dueDate = new Date(dueDateInput);
    if (Number.isNaN(dueDate.getTime())) return { error: "Invalid due date" };
  }

  try {
    await prisma.task.create({
      data: {
        projectId,
        title,
        status,
        priority,
        dueDate,
        notes: notes || null,
      },
    });
    revalidatePath(`/admin/projects/${projectId}`);
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: "Failed to create task." };
  }
}

export async function deleteTask(id: string, projectId: string) {
  await requireAuth();
  try {
    await prisma.task.delete({ where: { id } });
    revalidatePath(`/admin/projects/${projectId}`);
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: "Failed to delete task." };
  }
}

export async function toggleTaskStatus(id: string, projectId: string) {
  await requireAuth();
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return { error: "Task not found" };

    const next: TaskStatus =
      task.status === "done"
        ? "todo"
        : task.status === "todo"
          ? "doing"
          : "done";
    await prisma.task.update({ where: { id }, data: { status: next } });
    revalidatePath(`/admin/projects/${projectId}`);
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    return { error: "Failed to toggle task status." };
  }
}
