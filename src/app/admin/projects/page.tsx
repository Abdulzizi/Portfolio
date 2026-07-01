import { prisma } from "@/lib/db";
import Link from "next/link";

const statusColors: Record<string, string> = {
  planning: "var(--muted)",
  in_progress: "var(--accent)",
  done: "#1F8A5B",
  archived: "var(--line)",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { tasks: true } } },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "36px" }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "8px",
            }}
          >
            Manage
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
            Projects
          </h1>
        </div>
        <Link
          href="/admin/projects/new"
          style={{
            padding: "10px 20px",
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono), monospace",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: "var(--ink)",
            color: "var(--paper)",
            textDecoration: "none",
          }}
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div
          style={{
            padding: "40px",
            border: "1px solid var(--line)",
            textAlign: "center",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          No projects yet
        </div>
      ) : (
        <div style={{ border: "1px solid var(--line)" }}>
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects/${p.id}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                alignItems: "center",
                gap: "20px",
                padding: "16px 20px",
                borderBottom: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
                transition: "background 0.1s",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.02em" }}>
                  {p.name}
                  {p.kind && (
                    <span style={{ fontWeight: 400, fontStyle: "italic", fontSize: "13px", color: "var(--muted)", marginLeft: "10px" }}>
                      {p.kind}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: statusColors[p.status] || "var(--muted)",
                }}
              >
                {p.status.replace("_", " ")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: p.visibility === "published" ? "#1F8A5B" : "var(--muted)",
                }}
              >
                {p.visibility}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "11px",
                  color: "var(--muted)",
                }}
              >
                {p.year}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
