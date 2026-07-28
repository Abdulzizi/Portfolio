"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSession, deleteSession } from "@/lib/auth";

const attempts = new Map<string, { count: number; resetAt: number }>();
// ponytail: per-process limit; move to Redis only when auth runs on multiple instances.
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_ATTEMPTS) return false;
  record.count++;
  return true;
}

export async function login(
  _prev: { error?: string } | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  if (!checkRateLimit(email.toLowerCase())) {
    return { error: "Too many attempts. Please try again later." };
  }

  const valid = await verifyCredentials(email, password);
  if (!valid) {
    return { error: "Invalid credentials" };
  }

  await createSession();
  attempts.delete(email.toLowerCase());
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
