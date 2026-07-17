import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateHTML } from "@tiptap/core";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import sanitizeHtml from "sanitize-html";

function renderContent(content: unknown): string | null {
  if (!content || typeof content !== "object") return null;
  const json = content as JSONContent;
  if (!json.content || json.content.length === 0) return null;

  try {
    const html = generateHTML(json, [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TiptapLink,
      TiptapImage,
    ]);
    if (!html.trim().length) return null;
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title"],
        a: ["href", "target", "rel"],
      },
      allowedSchemes: ["http", "https", "mailto"],
    });
  } catch {
    return null;
  }
}

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
    select: { title: true, excerpt: true },
  });

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
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
    <div className="bp-page">
      <main className="bp-main">
        <header className="bp-header pad">
          <nav className="bp-nav">
            <Link href="/blog" className="bp-back mono">
              <span aria-hidden="true">&#8592;</span> Blog
            </Link>
            <span className="bp-nav-sep mono">/</span>
            <span className="bp-nav-current mono">{post.title}</span>
          </nav>

          <h1 className="bp-title">{post.title}</h1>

          <div className="bp-meta">
            {post.publishedAt && (
              <span className="bp-meta-item mono">{formatDate(post.publishedAt)}</span>
            )}
            {post.readingTime && (
              <span className="bp-meta-item mono">{post.readingTime} min read</span>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="bp-tags">
              {post.tags.map(({ tag }) => (
                <span key={tag.id} className="bp-tag mono">{tag.name}</span>
              ))}
            </div>
          )}
        </header>

        <section className="bp-body pad">
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

      <footer className="site-footer bp-footer pad">
        <Link href="/blog" className="mono" style={{ color: "var(--muted)" }}>
          &#8592; All posts
        </Link>
        <Link href="/" className="mono" style={{ color: "var(--muted)" }}>
          Home
        </Link>
      </footer>
    </div>
  );
}
