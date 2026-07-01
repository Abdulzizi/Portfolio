"use client";

import { useActionState } from "react";
import { createProject, updateProject, deleteProject } from "@/app/actions/projects";
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

type Project = {
  id: string;
  name: string;
  kind: string | null;
  year: number;
  status: string;
  visibility: string;
  tint: string | null;
  stack: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  privateNotes: string | null;
  isFeatured: boolean;
} | null;

export function ProjectForm({ project }: { project?: Project }) {
  const isEdit = !!project;
  const [saved, setSaved] = useState(false);

  async function handleSubmit(_prev: unknown, formData: FormData) {
    if (isEdit) {
      await updateProject(project!.id, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      await createProject(formData);
    }
    return {};
  }

  const [, action, pending] = useActionState(handleSubmit, {});

  return (
    <form
      action={action}
      style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "560px" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Name</label>
          <input name="name" required defaultValue={project?.name ?? ""} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Kind</label>
          <input name="kind" defaultValue={project?.kind ?? ""} placeholder="e.g. Web App, Mobile" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Year</label>
          <input name="year" type="number" required defaultValue={project?.year ?? new Date().getFullYear()} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select name="status" defaultValue={project?.status ?? "planning"} style={selectStyle}>
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Visibility</label>
          <select name="visibility" defaultValue={project?.visibility ?? "draft"} style={selectStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Stack (comma separated)</label>
        <input name="stack" defaultValue={project?.stack?.join(", ") ?? ""} placeholder="Laravel, React, Postgres" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>Tint color</label>
        <input name="tint" defaultValue={project?.tint ?? "#2B2BF0"} placeholder="#2B2BF0" style={{ ...inputStyle, maxWidth: "140px" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Repo URL</label>
          <input name="repoUrl" type="url" defaultValue={project?.repoUrl ?? ""} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Live URL</label>
          <input name="liveUrl" type="url" defaultValue={project?.liveUrl ?? ""} style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Private notes</label>
        <textarea name="privateNotes" rows={3} defaultValue={project?.privateNotes ?? ""} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          name="isFeatured"
          id="isFeatured"
          defaultChecked={project?.isFeatured ?? false}
          style={{ width: "16px", height: "16px", accentColor: "var(--accent)" }}
        />
        <label htmlFor="isFeatured" style={{ ...labelStyle, marginBottom: 0 }}>Featured on homepage</label>
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
          {pending ? "Saving..." : isEdit ? "Save" : "Create project"}
        </button>
        {saved && (
          <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Saved
          </span>
        )}
        {isEdit && (
          <button
            type="button"
            onClick={() => deleteProject(project!.id)}
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
