import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug, visibility: "published" },
  });

  if (!project) notFound();

  return (
    <div className="cs-page">
      <main className="cs-main">
        <header className="cs-header pad">
          <nav className="cs-nav">
            <Link href="/work" className="cs-back mono">
              <span aria-hidden="true">&#8592;</span> Work
            </Link>
            <span className="cs-nav-sep mono">/</span>
            <span className="cs-nav-current mono">{project.name}</span>
          </nav>

          <h1 className="cs-title">{project.name}</h1>

          {project.kind && (
            <p className="cs-kind">{project.kind}</p>
          )}
        </header>

        <section className="cs-meta-bar pad">
          <dl className="cs-meta-grid">
            <div className="cs-meta-item">
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>

            {project.stack.length > 0 && (
              <div className="cs-meta-item cs-meta-stack">
                <dt>Stack</dt>
                <dd>{project.stack.join(" · ")}</dd>
              </div>
            )}

            {project.liveUrl && (
              <div className="cs-meta-item">
                <dt>Live</dt>
                <dd>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cs-link">
                    Visit site
                  </a>
                </dd>
              </div>
            )}

            {project.repoUrl && (
              <div className="cs-meta-item">
                <dt>Code</dt>
                <dd>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="cs-link">
                    Repository
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>

        <section className="cs-body pad">
          {project.status !== "done" ? (
            <div className="cs-placeholder">
              <span className="cs-placeholder-label mono">— Case study in progress</span>
              <p className="cs-placeholder-note">
                The full write-up for this project is being drafted. Check back soon.
              </p>
            </div>
          ) : (
            <div className="cs-content">
              <p style={{ color: "var(--muted)", fontStyle: "italic" }}>
                Content coming.
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer cs-footer pad">
        <Link href="/work" className="mono" style={{ color: "var(--muted)" }}>
          &#8592; All work
        </Link>
        <Link href="/" className="mono" style={{ color: "var(--muted)" }}>
          Home
        </Link>
      </footer>
    </div>
  );
}
