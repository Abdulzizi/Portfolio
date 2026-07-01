import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [projectCount, postCount, draftPosts, draftProjects] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.post.count({ where: { status: "draft" } }),
    prisma.project.count({ where: { visibility: "draft" } }),
  ]);

  const stats = [
    { label: "Projects", value: projectCount },
    { label: "Draft projects", value: draftProjects },
    { label: "Posts", value: postCount },
    { label: "Draft posts", value: draftPosts },
  ];

  return (
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
        Overview
      </div>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: "0 0 36px",
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1px",
          background: "var(--line)",
          border: "1px solid var(--line)",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              padding: "24px 20px",
              background: "var(--paper)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "8px",
              }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.03em" }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
