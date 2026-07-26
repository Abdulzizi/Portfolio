import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsv, isRedirectError, uniqueSlug } from "./action-helpers.js";

test("parseCsv trims, drops empties, and handles blank input", () => {
  assert.deepEqual(parseCsv("a, b ,,c"), ["a", "b", "c"]);
  assert.deepEqual(parseCsv(""), []);
  assert.deepEqual(parseCsv(null), []);
});

test("isRedirectError only matches objects carrying a digest", () => {
  assert.equal(isRedirectError({ digest: "NEXT_REDIRECT;..." }), true);
  assert.equal(isRedirectError(new Error("boom")), false);
  assert.equal(isRedirectError(null), false);
  assert.equal(isRedirectError("nope"), false);
});

test("uniqueSlug returns the base when the slug is free", async () => {
  const slug = await uniqueSlug("hello", async () => null);
  assert.equal(slug, "hello");
});

test("uniqueSlug appends a suffix until it finds a free slug", async () => {
  const taken = new Set(["hello", "hello-1"]);
  const slug = await uniqueSlug("hello", async (s) =>
    taken.has(s) ? "someId" : null,
  );
  assert.equal(slug, "hello-2");
});

test("uniqueSlug treats a collision with excludeId as free", async () => {
  const slug = await uniqueSlug(
    "hello",
    async (s) => (s === "hello" ? "self" : null),
    "self",
  );
  assert.equal(slug, "hello");
});
