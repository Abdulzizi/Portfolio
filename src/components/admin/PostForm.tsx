"use client";

import { useActionState } from "react";
import { createPost, updatePost, deletePost } from "@/app/actions/posts";
import { useState } from "react";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: "11px",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: "6px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "14px",
  border: "1px solid var(--line)",
  background: "transparent",
  color: "var(--ink)",
  fontFamily: "inherit",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236C695D' d='M3 4.5L6 8l3-3.5H3z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "32px",
};

type Post = {
  id: string;
  title: string;
  excerpt: string | null;
  status: string;
  tags: { tag: { name: string } }[];
} | null;

export function PostForm({ post }: { post?: Post }) {
  const isEdit = !!post;
  const [saved, setSaved] = useState(false);

  async function handleSubmit(_prev: unknown, formData: FormData) {
    if (isEdit) {
      await updatePost(post!.id, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      await createPost(formData);
    }
    return {};
  }

  const [, action, pending] = useActionState(handleSubmit, {});

  const tagsDefault = post?.tags?.map((t) => t.tag.name).join(", ") ?? "";

  return (
    <form
      action={action}
      style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "560px" }}
    >
      <div>
        <label style={labelStyle}>Title</label>
        <input name="title" required defaultValue={post?.title ?? ""} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Excerpt</label>
        <textarea name="excerpt" rows={3} defaultValue={post?.excerpt ?? ""} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div>
        <label style={labelStyle}>Status</label>
        <select name="status" defaultValue={post?.status ?? "draft"} style={selectStyle}>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Tags (comma separated)</label>
        <input name="tags" defaultValue={tagsDefault} placeholder="Design, Engineering" style={inputStyle} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: "12px 28px",
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: "var(--ink)",
            color: "var(--paper)",
            border: "none",
            cursor: pending ? "wait" : "pointer",
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? "Saving..." : isEdit ? "Save" : "Create post"}
        </button>
        {saved && (
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Saved
          </span>
        )}
        {isEdit && (
          <button
            type="button"
            onClick={() => deletePost(post!.id)}
            style={{
              marginLeft: "auto",
              padding: "12px 20px",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "transparent",
              color: "#E8542B",
              border: "1px solid #E8542B",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
