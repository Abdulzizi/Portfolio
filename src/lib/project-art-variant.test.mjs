import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeArtVariant,
  normalizeProjectTint,
  projectArtVariant,
} from "./project-art-variant.js";

test("project artwork is stable and stays within six variants", () => {
  assert.equal(
    projectArtVariant("quiet-software"),
    projectArtVariant("quiet-software"),
  );
  assert.ok(projectArtVariant("field-notes") < 6);
  assert.equal(projectArtVariant("field-notes", 4), 4);
  assert.equal(normalizeArtVariant("9"), null);
  assert.equal(normalizeProjectTint("#FF5938"), "#ff5938");
  assert.equal(normalizeProjectTint("red"), null);
});
