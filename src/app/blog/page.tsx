import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { PublicFooter } from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "Blog",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    include: { tags: { include: { tag: true } } },
  });

  return (
    <div className="public-page blog-page">
      <TopBar />
      <main className="blog-main">
        <header className="public-hero public-hero-notes">
          <p className="public-kicker">Notes / thinking in public</p>
          <h1>Loose thoughts,<br /><i>held together.</i></h1>
          <p className="public-deck">Things I learned while making software behave.</p>
          <p className="public-count">
            {posts.length === 0
              ? "No entries"
              : `${String(posts.length).padStart(2, "0")} entries`}
          </p>
        </header>

        <section className="public-note-list blog-list" aria-label="Notes">
          {posts.length === 0 ? (
            <div className="public-note-empty">
              <span className="blog-empty-ttl">No posts yet, still writing.</span>
            </div>
          ) : (
            <div className="public-note-items">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="public-note">
                  <div className="public-note-top">
                    <h2>{post.title}</h2>
                    {post.readingTime && (
                      <span>{post.readingTime} min read</span>
                    )}
                  </div>

                  {post.excerpt && (
                    <p>{post.excerpt}</p>
                  )}

                  <div className="public-note-meta">
                    {post.publishedAt && (
                      <span>{formatDate(post.publishedAt)}</span>
                    )}
                    {post.tags.length > 0 && (
                      <span className="public-note-tags">
                        {post.tags.map(({ tag }) => (
                          <span key={tag.id}>{tag.name}</span>
                        ))}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
