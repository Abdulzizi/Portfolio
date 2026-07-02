import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import Link from "next/link";

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
    <div className="blog-page">
      <main className="blog-main">
        <header className="blog-header pad">
          <nav className="blog-nav">
            <Link href="/" className="blog-nav-back mono">
              <span aria-hidden="true">&#8592;</span> Home
            </Link>
            <span className="blog-nav-sep mono">/</span>
            <span className="blog-nav-current mono">Blog</span>
          </nav>

          <h1 className="blog-title">
            Writing
          </h1>

          <p className="blog-count mono">
            {posts.length === 0
              ? "No entries"
              : `${String(posts.length).padStart(2, "0")} entries`}
          </p>
        </header>

        <section className="blog-list pad">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <span className="blog-empty-ttl">No posts yet, still writing.</span>
            </div>
          ) : (
            <div className="blog-items">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-item">
                  <div className="blog-item-top">
                    <h2 className="blog-item-title">{post.title}</h2>
                    {post.readingTime && (
                      <span className="blog-item-time mono">{post.readingTime} min read</span>
                    )}
                  </div>

                  {post.excerpt && (
                    <p className="blog-item-excerpt">{post.excerpt}</p>
                  )}

                  <div className="blog-item-meta">
                    {post.publishedAt && (
                      <span className="blog-item-date mono">{formatDate(post.publishedAt)}</span>
                    )}
                    {post.tags.length > 0 && (
                      <span className="blog-item-tags">
                        {post.tags.map(({ tag }) => (
                          <span key={tag.id} className="blog-tag mono">{tag.name}</span>
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

      <footer className="site-footer pad">
        <span>&copy; 2026 Abdul Jawad Azizi</span>
        <Link href="/" className="footer-home-link">Back to home</Link>
      </footer>
    </div>
  );
}
