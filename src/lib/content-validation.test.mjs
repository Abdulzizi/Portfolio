import assert from "node:assert/strict";
import test from "node:test";
import { hasImageWithoutAlt } from "./content-validation.js";

test("images require meaningful alternative text", () => {
  assert.equal(
    hasImageWithoutAlt({
      type: "doc",
      content: [{ type: "image", attrs: { src: "/x.png" } }],
    }),
    true,
  );
  assert.equal(
    hasImageWithoutAlt({
      type: "doc",
      content: [{ type: "image", attrs: { src: "/x.png", alt: "Diagram" } }],
    }),
    false,
  );
});
