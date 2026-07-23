import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { renderContent } from "@/lib/render-content";
import { jsonLdScript } from "@/lib/json-ld";
import { TopBar } from "@/components/TopBar";
import { PublicFooter } from "@/components/PublicFooter";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "published" },
    select: { title: true, excerpt: true, publishedAt: true },
  });

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      siteName: "A. J. Azizi",
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "published" },
    include: { tags: { include: { tag: true } } },
  });

  if (!post) notFound();

  const renderedContent = renderContent(post.content);

  return (
    <div className="public-page detail-page bp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt ?? undefined,
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            author: { "@type": "Person", name: "A. J. Azizi" },
            url: `https://ajazizi.dev/blog/${post.slug}`,
          }),
        }}
      />
      <TopBar />
      <main className="bp-main">
        <header className="detail-hero detail-hero-note">
          <nav className="detail-crumb">
            <Link href="/blog">
              <span aria-hidden="true">&#8592;</span> Blog
            </Link>
            <span>/</span><span>{post.title}</span>
          </nav>

          <h1>{post.title}</h1>

          <div className="detail-byline">
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
            {post.readingTime && (
              <span>{post.readingTime} min read</span>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="detail-tags">
              {post.tags.map(({ tag }) => (
                <span key={tag.id}>{tag.name}</span>
              ))}
            </div>
          )}
        </header>

        <section className="detail-body">
          {renderedContent ? (
            <div className="bp-prose" dangerouslySetInnerHTML={{ __html: renderedContent }} />
          ) : (
            <div className="bp-placeholder">
              <span className="bp-placeholder-label mono">Article</span>
              <p className="bp-placeholder-note">Full article coming soon.</p>
            </div>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
