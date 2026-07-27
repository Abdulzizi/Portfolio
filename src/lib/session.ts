import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

// Fail closed: no default secret or password hash, regardless of NODE_ENV.
// A committed fallback secret would let anyone forge an admin JWT on any
// deploy where these env vars aren't set (e.g. NODE_ENV !== "production").
const jwtSecret = process.env.JWT_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const adminHash = process.env.ADMIN_PASSWORD_HASH;
if (!jwtSecret || !adminEmail || !adminHash) {
  throw new Error(
    "JWT_SECRET, ADMIN_EMAIL, and ADMIN_PASSWORD_HASH environment variables are required",
  );
}
// Narrowed to string by the guard above; captured so closures below keep it.
const ADMIN_EMAIL = adminEmail;
const ADMIN_HASH = adminHash;
const secret = new TextEncoder().encode(jwtSecret);
export const COOKIE_NAME = "admin_session";

export async function verifyCredentials(email: string, password: string) {
  // Always run bcrypt.compare, even for a wrong email, so response time
  // doesn't reveal whether the email matched (user-enumeration oracle).
  const passwordOk = await bcrypt.compare(password, ADMIN_HASH);
  return passwordOk && email === ADMIN_EMAIL;
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
    // Pin the algorithm: only accept HS256, the alg we sign with.
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    if (payload.role !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}
