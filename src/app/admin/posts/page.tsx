import { prisma } from "@/lib/db";
import Link from "next/link";
import { requirePageAuth } from "@/lib/auth";

const statusColors: Record<string, string> = {
  draft: "var(--muted)",
  scheduled: "var(--accent)",
  published: "#1F8A5B",
};

export default async function PostsPage() {
  await requirePageAuth();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { tags: true } } },
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
            Posts
          </h1>
        </div>
        <Link
          href="/admin/posts/new"
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
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
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
          No posts yet
        </div>
      ) : (
        <div style={{ border: "1px solid var(--line)" }}>
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/admin/posts/${p.id}`}
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
                  {p.title}
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
                {p.status}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "11px",
                  color: "var(--muted)",
                }}
              >
                {p._count.tags} {p._count.tags === 1 ? "tag" : "tags"}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "11px",
                  color: "var(--muted)",
                }}
              >
                {new Date(p.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
