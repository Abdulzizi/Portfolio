"use client";

import { useActionState } from "react";
import { createPost, updatePost, deletePost } from "@/app/actions/posts";
import { useState } from "react";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import type { JSONContent } from "@tiptap/react";
import { labelStyle, inputStyle, selectStyle } from "./admin-styles";
import { FormStatus } from "./FormStatus";

type Post = {
  id: string;
  title: string;
  excerpt: string | null;
  status: string;
  content?: unknown;
  tags: { tag: { name: string } }[];
} | null;

export function PostForm({ post }: { post?: Post }) {
  const isEdit = !!post;
  const [saved, setSaved] = useState(false);

  async function handleSubmit(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
    if (isEdit) {
      const result = await updatePost(post!.id, formData);
      if (result?.error) return result;
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return {};
    } else {
      const result = await createPost(formData);
      if (result?.error) return result;
      return {};
    }
  }

  const [state, action, pending] = useActionState(handleSubmit, {} as { error?: string });

  const tagsDefault = post?.tags?.map((t) => t.tag.name).join(", ") ?? "";

  return (
    <form
      className="admin-form"
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
        <label style={labelStyle}>Content</label>
        <TipTapEditor content={(post?.content as JSONContent | null) ?? null} name="content" />
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

      <div className="admin-form-actions" style={{ display: "flex", alignItems: "center", gap: "16px", borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
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
        <FormStatus saved={saved} error={state?.error} />
        {isEdit && (
          <button
            className="admin-delete-btn"
            type="button"
            onClick={() => {
              if (window.confirm("Delete this post? This cannot be undone.")) {
                deletePost(post!.id);
              }
            }}
            style={{
              marginLeft: "auto",
              padding: "12px 20px",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
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
