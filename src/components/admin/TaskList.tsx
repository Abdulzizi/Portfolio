"use client";

import { useActionState } from "react";
import { createTask, deleteTask, toggleTaskStatus } from "@/app/actions/tasks";

const statusLabel: Record<string, string> = { todo: "To do", doing: "Doing", done: "Done" };
const priorityColor: Record<string, string> = { low: "var(--muted)", medium: "var(--accent)", high: "#E8542B" };

type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: Date | null;
  notes: string | null;
};

const inputStyle: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: "13px",
  border: "1px solid var(--line)",
  background: "transparent",
  color: "var(--ink)",
  fontFamily: "inherit",
  outline: "none",
  flex: 1,
};

export function TaskList({ tasks, projectId }: { tasks: Task[]; projectId: string }) {
  async function handleCreate(_prev: unknown, formData: FormData) {
    await createTask(projectId, formData);
    return {};
  }

  const [, action, pending] = useActionState(handleCreate, {});

  return (
    <div style={{ marginTop: "48px" }}>
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "16px",
        }}
      >
        Tasks ({tasks.length})
      </div>

      <form action={action} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input name="title" required placeholder="New task..." style={inputStyle} />
        <select name="priority" defaultValue="medium" style={{ ...inputStyle, flex: "none", width: "100px" }}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: "8px 16px",
            fontSize: "11px",
            fontFamily: "var(--font-geist-mono), monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: "var(--ink)",
            color: "var(--paper)",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <div style={{ padding: "20px", border: "1px solid var(--line)", textAlign: "center", fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", color: "var(--muted)" }}>
          No tasks yet
        </div>
      ) : (
        <div style={{ border: "1px solid var(--line)" }}>
          {tasks.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderBottom: "1px solid var(--line)",
                textDecoration: t.status === "done" ? "line-through" : "none",
                opacity: t.status === "done" ? 0.5 : 1,
              }}
            >
              <button
                onClick={() => toggleTaskStatus(t.id, projectId)}
                style={{
                  width: "18px",
                  height: "18px",
                  border: "1.5px solid var(--line)",
                  background: t.status === "done" ? "var(--accent)" : "transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1, fontSize: "14px" }}>{t.title}</span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: statusLabel[t.status] ? "var(--muted)" : "var(--muted)",
                }}
              >
                {statusLabel[t.status]}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: priorityColor[t.priority],
                }}
              >
                {t.priority}
              </span>
              <button
                onClick={() => {
                  if (window.confirm("Delete this task?")) {
                    deleteTask(t.id, projectId);
                  }
                }}
                style={{
                  padding: "4px 8px",
                  fontSize: "10px",
                  fontFamily: "var(--font-geist-mono), monospace",
                  background: "transparent",
                  color: "var(--muted)",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
