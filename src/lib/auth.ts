import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  COOKIE_NAME,
  verifyCredentials,
  signSessionToken,
  verifySessionToken,
} from "./session";

export { COOKIE_NAME, verifyCredentials, verifySessionToken };

export async function createSession() {
  const token = await signSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    // Always Secure. http://localhost is a secure context, so this doesn't
    // break local dev, but it prevents the session cookie from being sent
    // over plain HTTP on a misconfigured (non-production NODE_ENV) deploy.
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function requirePageAuth() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function requireAuth() {
  if (!(await getSession())) throw new Error("Unauthorized");
}
