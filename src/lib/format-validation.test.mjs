import { test } from "node:test";
import assert from "node:assert/strict";
import { isHttpUrl, isEmail } from "./format-validation.js";

test("isHttpUrl accepts http and https URLs", () => {
  assert.equal(isHttpUrl("https://github.com/example"), true);
  assert.equal(isHttpUrl("http://example.com"), true);
});

test("isHttpUrl rejects non-http schemes and garbage", () => {
  assert.equal(isHttpUrl("javascript:alert(1)"), false);
  assert.equal(isHttpUrl("not a url"), false);
  assert.equal(isHttpUrl(""), false);
});

test("isEmail accepts a plausible email address", () => {
  assert.equal(isEmail("someone@example.com"), true);
});

test("isEmail rejects strings without an @ or domain", () => {
  assert.equal(isEmail("not-an-email"), false);
  assert.equal(isEmail("missing@domain"), false);
  assert.equal(isEmail("@example.com"), false);
});
