import Link from "next/link";

type Project = {
  id: string;
  slug: string;
  name: string;
  kind: string | null;
  year: number;
  tint: string | null;
};

export function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section className="work pad" id="work" data-x="section#work">
      <div className="sec-head">
        <span className="t">001 / Selected Work</span>
        <span className="c">{projects.length > 0 ? `${projects.length} project${projects.length === 1 ? "" : "s"}` : "Coming soon"}</span>
      </div>
      <div className="rows">
        {projects.length === 0 ? (
          <div className="row" style={{ cursor: "default" }}>
            <span className="no mono">/</span>
            <span className="ttl" style={{ color: "var(--muted)", fontWeight: 400, fontSize: "clamp(18px, 2.5vw, 28px)" }}>
              No projects yet, currently building.
            </span>
            <span className="yr" />
          </div>
        ) : (
          projects.map((p, i) => (
            <Link key={p.id} href={`/work/${p.slug}`} className="row">
              <span className="no mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="ttl">
                {p.name}
                {p.kind && <span className="k">{p.kind}</span>}
              </span>
              <span className="yr">{p.year}</span>
            </Link>
          ))
        )}
      </div>
      {projects.length > 0 && (
        <div style={{ textAlign: "right", marginTop: "16px" }}>
          <Link
            href="/work"
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--muted)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            View all work
          </Link>
        </div>
      )}
    </section>
  );
}
