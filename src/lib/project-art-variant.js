export const PROJECT_TINTS = [
  "#ff5938",
  "#b8c0ff",
  "#d8ff35",
  "#ffc83d",
  "#f1ecdf",
];

/** @param {unknown} value */
export function normalizeProjectTint(value) {
  const tint = typeof value === "string" ? value.toLowerCase() : "";
  return PROJECT_TINTS.find((candidate) => candidate === tint) ?? null;
}

/** @param {unknown} value */
export function normalizeArtVariant(value) {
  if (value === "" || value === null || value === undefined) return null;
  const variant = Number(value);
  return Number.isInteger(variant) && variant >= 0 && variant < 6
    ? variant
    : null;
}

/** @param {string} slug @param {number | null | undefined} override */
export function projectArtVariant(slug, override) {
  const selected = normalizeArtVariant(override);
  if (selected !== null) return selected;
  return (
    [...slug].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 6
  );
}
