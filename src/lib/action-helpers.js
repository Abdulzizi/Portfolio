// Shared helpers for the admin server actions (posts / projects / tasks).

/** Split a comma-separated form field into a trimmed, non-empty string array. */
export function parseCsv(value) {
  return value
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
}

/**
 * Next.js implements `redirect()` / `notFound()` by throwing a control-flow
 * error carrying a `digest`. A server action's catch block MUST re-throw it so
 * Next can complete the navigation — swallowing it turns a redirect into a
 * silent no-op. Every action catch guards on this before returning an error.
 */
export function isRedirectError(e) {
  return !!e && typeof e === "object" && "digest" in e;
}

/**
 * Find a slug that isn't already taken, appending `-1`, `-2`, … on collision.
 *
 * @param base     desired slug (caller supplies any fallback for empty input)
 * @param findId   returns the id of an existing row with `slug`, or null
 * @param excludeId id of the row being updated — a collision with itself is OK
 */
export async function uniqueSlug(base, findId, excludeId) {
  let suffix = 0;
  while (true) {
    const candidate = suffix === 0 ? base : `${base}-${suffix}`;
    const existingId = await findId(candidate);
    if (!existingId || existingId === excludeId) return candidate;
    suffix++;
  }
}
