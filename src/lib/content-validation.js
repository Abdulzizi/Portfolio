/** @param {unknown} node */
export function hasImageWithoutAlt(node) {
  if (!node || typeof node !== "object") return false;
  if ("type" in node && node.type === "image") {
    if (!("attrs" in node) || !node.attrs || typeof node.attrs !== "object")
      return true;
    return (
      !("alt" in node.attrs) ||
      typeof node.attrs.alt !== "string" ||
      !node.attrs.alt.trim()
    );
  }
  if (!("content" in node) || !Array.isArray(node.content)) return false;
  return node.content.some(hasImageWithoutAlt);
}
