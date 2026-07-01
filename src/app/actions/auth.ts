"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSession, deleteSession } from "@/lib/auth";

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const valid = await verifyCredentials(email, password);
  if (!valid) {
    return { error: "Invalid credentials" };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
