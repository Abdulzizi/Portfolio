import { test } from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

process.env.JWT_SECRET = "test-secret-for-auth-tests";
process.env.ADMIN_EMAIL = "admin@example.com";
process.env.ADMIN_PASSWORD_HASH = bcrypt.hashSync("correct-horse", 10);

const { verifyCredentials, verifySessionToken } = await import(
  "./session.ts"
);

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

function signToken(payload, signSecret = secret) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(signSecret);
}

test("verifyCredentials accepts the correct email and password", async () => {
  assert.equal(
    await verifyCredentials("admin@example.com", "correct-horse"),
    true,
  );
});

test("verifyCredentials rejects the wrong password", async () => {
  assert.equal(await verifyCredentials("admin@example.com", "wrong"), false);
});

test("verifyCredentials rejects the wrong email", async () => {
  assert.equal(
    await verifyCredentials("someone@else.com", "correct-horse"),
    false,
  );
});

test("verifySessionToken accepts a validly signed admin token", async () => {
  const token = await signToken({ role: "admin" });
  const session = await verifySessionToken(token);
  assert.equal(session?.role, "admin");
});

test("verifySessionToken rejects a token signed with the wrong secret", async () => {
  const wrongSecret = new TextEncoder().encode("not-the-real-secret");
  const token = await signToken({ role: "admin" }, wrongSecret);
  assert.equal(await verifySessionToken(token), null);
});

test("verifySessionToken rejects a token without the admin role", async () => {
  const token = await signToken({ role: "guest" });
  assert.equal(await verifySessionToken(token), null);
});

test("verifySessionToken rejects garbage input", async () => {
  assert.equal(await verifySessionToken("not-a-jwt"), null);
});
