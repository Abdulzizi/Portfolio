import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "./slug.js";

test("slugify lowercases and hyphenates", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("slugify strips leading and trailing separators", () => {
  assert.equal(slugify("  --Weird Title!! --"), "weird-title");
});

test("slugify collapses consecutive non-alphanumerics", () => {
  assert.equal(slugify("A/B & C"), "a-b-c");
});
