import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
};

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    where: { visibility: "published" },
    orderBy: { year: "desc" },
  });

  return (
    <div className="work-page">
      <main className="work-main">
        <header className="work-header pad">
          <nav className="work-nav">
            <Link href="/" className="work-nav-back mono">
              <span aria-hidden="true">&#8592;</span> Home
            </Link>
            <span className="work-nav-sep mono">/</span>
            <span className="work-nav-current mono">Work</span>
          </nav>

          <h1 className="work-title">
            All projects
          </h1>

          <p className="work-count mono">
            {projects.length === 0
              ? "No entries"
              : `${String(projects.length).padStart(2, "0")} entries`}
          </p>
        </header>

        <section className="work-list pad">
          <div className="rows">
            {projects.length === 0 ? (
              <div className="row" style={{ cursor: "default" }}>
                <span className="no mono">/</span>
                <span className="ttl work-empty-ttl">
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
        </section>
      </main>

      <footer className="site-footer pad">
        <span>&copy; 2026 Abdul Jawad Azizi</span>
        <Link href="/" className="footer-home-link">Back to home</Link>
      </footer>
    </div>
  );
}
