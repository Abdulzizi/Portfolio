import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const jwtSecret = process.env.JWT_SECRET;
if (process.env.NODE_ENV === "production") {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD_HASH environment variables are required",
    );
  }
}
const secret = new TextEncoder().encode(jwtSecret || "dev-secret-change-me");
export const COOKIE_NAME = "admin_session";

const ADMIN_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  "$2b$10$y4x0CG/dokTTheJpVMY4EuOTaSnm2RTQC7uOCZLUfb3oqDm2hk4dC";

export async function verifyCredentials(email: string, password: string) {
  if (email !== process.env.ADMIN_EMAIL) return false;
  return bcrypt.compare(password, ADMIN_HASH);
}

export async function signSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}
