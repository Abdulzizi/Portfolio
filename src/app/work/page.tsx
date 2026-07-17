import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { PublicFooter } from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Work",
};

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    where: { visibility: "published" },
    orderBy: { year: "desc" },
  });

  return (
    <div className="public-page work-page">
      <TopBar />
      <main className="work-main">
        <header className="public-hero public-hero-work">
          <p className="public-kicker">Case files / selected and shipped</p>
          <h1>Work worth<br /><i>keeping.</i></h1>
          <p className="public-deck">A record of products, experiments, and systems—with the decisions left in.</p>
          <p className="public-count">
            {projects.length === 0
              ? "No entries"
              : `${String(projects.length).padStart(2, "0")} entries`}
          </p>
        </header>

        <section className="public-list work-list" aria-label="Projects">
          <div className="public-list-head"><span>No.</span><span>Project</span><span>Type</span><span>Year</span></div>
          <div className="public-rows">
            {projects.length === 0 ? (
              <div className="public-row public-empty">
                <span>/</span>
                <strong>
                  No projects yet, currently building.
                </strong>
                <span /><span />
              </div>
            ) : (
              projects.map((p, i) => (
                <Link key={p.id} href={`/work/${p.slug}`} className="public-row" style={{ "--row-accent": p.tint || "var(--lab-orange)" } as React.CSSProperties}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{p.name}</strong>
                  <span>{p.kind || "Project"}</span>
                  <span>{p.year}</span>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
