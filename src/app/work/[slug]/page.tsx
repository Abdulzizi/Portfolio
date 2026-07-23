import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { renderContent } from "@/lib/render-content";
import { jsonLdScript } from "@/lib/json-ld";
import { TopBar } from "@/components/TopBar";
import { PublicFooter } from "@/components/PublicFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug, visibility: "published" },
    select: { name: true, kind: true },
  });

  if (!project) {
    return {};
  }

  return {
    title: project.name,
    description: project.kind ?? undefined,
    openGraph: {
      title: project.name,
      description: project.kind ?? undefined,
      siteName: "A. J. Azizi",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.kind ?? undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug, visibility: "published" },
    select: {
      id: true,
      name: true,
      slug: true,
      kind: true,
      year: true,
      status: true,
      stack: true,
      liveUrl: true,
      repoUrl: true,
      tint: true,
      content: true,
    },
  });

  if (!project) notFound();

  const renderedContent = renderContent(project.content);

  return (
    <div className="public-page detail-page cs-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.kind ?? undefined,
            dateCreated: `${project.year}`,
            creator: { "@type": "Person", name: "A. J. Azizi" },
            url: `https://ajazizi.dev/work/${project.slug}`,
          }),
        }}
      />
      <TopBar />
      <main className="cs-main">
        <header className="detail-hero detail-hero-work">
          <nav className="detail-crumb">
            <Link href="/work">
              <span aria-hidden="true">&#8592;</span> Work
            </Link>
            <span>/</span>
            <span>{project.name}</span>
          </nav>

          <h1>{project.name}</h1>

          {project.kind && <p className="detail-deck">{project.kind}</p>}
        </header>

        <section className="detail-meta">
          <dl>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>

            {project.stack.length > 0 && (
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(" · ")}</dd>
              </div>
            )}

            {project.liveUrl && (
              <div>
                <dt>Live</dt>
                <dd>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit site <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}

            {project.repoUrl && (
              <div>
                <dt>Code</dt>
                <dd>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>

        <section className="detail-body">
          {renderedContent ? (
            <div
              className="cs-content bp-prose"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          ) : project.status !== "done" ? (
            <div className="cs-placeholder">
              <span className="cs-placeholder-label mono">
                — Case study in progress
              </span>
              <p className="cs-placeholder-note">
                The full write-up for this project is being drafted. Check back
                soon.
              </p>
            </div>
          ) : (
            <div className="cs-placeholder">
              <span className="cs-placeholder-label mono">— Field record</span>
              <p className="cs-placeholder-note">
                The project shipped. The decision record is still being written.
              </p>
            </div>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
