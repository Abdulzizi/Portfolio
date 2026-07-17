"use client";

import { useActionState } from "react";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/app/actions/projects";
import { useState } from "react";
import { labelStyle, inputStyle, selectStyle } from "./admin-styles";
import { PROJECT_TINTS } from "@/lib/project-art-variant";

type Project = {
  id: string;
  name: string;
  kind: string | null;
  year: number;
  status: string;
  visibility: string;
  tint: string | null;
  artVariant: number | null;
  stack: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  privateNotes: string | null;
  isFeatured: boolean;
} | null;

export function ProjectForm({ project }: { project?: Project }) {
  const isEdit = !!project;
  const [saved, setSaved] = useState(false);

  async function handleSubmit(
    _prev: { error?: string },
    formData: FormData,
  ): Promise<{ error?: string }> {
    if (isEdit) {
      const result = await updateProject(project!.id, formData);
      if (result?.error) return result;
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return {};
    } else {
      const result = await createProject(formData);
      if (result?.error) return result;
      return {};
    }
  }

  const [state, action, pending] = useActionState(
    handleSubmit,
    {} as { error?: string },
  );

  return (
    <form
      className="admin-form"
      action={action}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "560px",
      }}
    >
      <div
        className="admin-form-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Name</label>
          <input
            name="name"
            required
            defaultValue={project?.name ?? ""}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Kind</label>
          <input
            name="kind"
            defaultValue={project?.kind ?? ""}
            placeholder="e.g. Web App, Mobile"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Year</label>
          <input
            name="year"
            type="number"
            required
            defaultValue={project?.year ?? new Date().getFullYear()}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select
            name="status"
            defaultValue={project?.status ?? "planning"}
            style={selectStyle}
          >
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Visibility</label>
          <select
            name="visibility"
            defaultValue={project?.visibility ?? "draft"}
            style={selectStyle}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Stack (comma separated)</label>
        <input
          name="stack"
          defaultValue={project?.stack?.join(", ") ?? ""}
          placeholder="Laravel, React, Postgres"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Tint color</label>
        <select
          name="tint"
          defaultValue={
            PROJECT_TINTS.includes(project?.tint ?? "")
              ? project!.tint!
              : PROJECT_TINTS[0]
          }
          style={{ ...selectStyle, maxWidth: "220px" }}
        >
          {PROJECT_TINTS.map((tint) => (
            <option key={tint} value={tint}>
              {tint}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Artwork composition</label>
        <select
          name="artVariant"
          defaultValue={project?.artVariant ?? ""}
          style={{ ...selectStyle, maxWidth: "220px" }}
        >
          <option value="">Automatic</option>
          {Array.from({ length: 6 }, (_, variant) => (
            <option key={variant} value={variant}>
              Composition {variant + 1}
            </option>
          ))}
        </select>
      </div>

      <div
        className="admin-form-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div>
          <label style={labelStyle}>Repo URL</label>
          <input
            name="repoUrl"
            type="url"
            defaultValue={project?.repoUrl ?? ""}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Live URL</label>
          <input
            name="liveUrl"
            type="url"
            defaultValue={project?.liveUrl ?? ""}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Private notes</label>
        <textarea
          name="privateNotes"
          rows={3}
          defaultValue={project?.privateNotes ?? ""}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          name="isFeatured"
          id="isFeatured"
          defaultChecked={project?.isFeatured ?? false}
          style={{
            width: "16px",
            height: "16px",
            accentColor: "var(--accent)",
          }}
        />
        <label htmlFor="isFeatured" style={{ ...labelStyle, marginBottom: 0 }}>
          Featured on homepage
        </label>
      </div>

      <div
        className="admin-form-actions"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          borderTop: "1px solid var(--line)",
          paddingTop: "24px",
        }}
      >
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
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Saved
          </span>
        )}
        {state?.error && (
          <span
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              color: "#E8542B",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {state.error}
          </span>
        )}
        {isEdit && (
          <button
            className="admin-delete-btn"
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Delete this project and all its tasks? This cannot be undone.",
                )
              ) {
                deleteProject(project!.id);
              }
            }}
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
