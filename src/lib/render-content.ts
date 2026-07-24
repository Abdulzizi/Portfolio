import { generateHTML } from "@tiptap/core";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import sanitizeHtml from "sanitize-html";

export function renderContent(content: unknown): string | null {
  if (!content || typeof content !== "object") return null;
  const json = content as JSONContent;
  if (!json.content?.length) return null;

  try {
    const html = generateHTML(json, [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TiptapLink,
      TiptapImage,
    ]);
    if (!html.trim()) return null;
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
        "h3",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title"],
        a: ["href", "target", "rel"],
      },
      allowedSchemes: ["http", "https", "mailto"],
      transformTags: {
        img: (_tagName, attribs) => ({
          tagName: "img",
          attribs: {
            ...attribs,
            alt: attribs.alt?.trim() ?? "",
            loading: "lazy",
            decoding: "async",
          },
        }),
      },
    });
  } catch {
    return null;
  }
}
