import Link from "next/link";
import { projectArtVariant } from "@/lib/project-art-variant";

type Project = {
  id: string;
  slug: string;
  name: string;
  kind: string | null;
  year: number;
  tint: string | null;
  artVariant: number | null;
  stack: string[];
  status: string;
};
type Capability = { id: string; heading: string; description: string };
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  readingTime: number | null;
  publishedAt: Date | null;
};

export function WorkSection({
  projects,
  capabilities,
  posts,
  view,
}: {
  projects: Project[];
  capabilities: Capability[];
  posts: Post[];
  view: "feed" | "index";
}) {
  return (
    <section className={`board-content board-view-${view}`} id="board">
      <div className="board-feed" aria-hidden={view !== "feed"}>
        <article className="feed-card feed-personal">
          <span>Personal note / 001</span>
          <p>
            Jakarta is loud. I prefer my software clear, direct, and calm under
            pressure.
          </p>
          <b>AJ</b>
        </article>

        {projects.slice(0, 5).map((project, index) => (
          <Link
            href={`/work/${project.slug}`}
            className={`feed-card feed-project feed-project-${(index % 5) + 1}`}
            key={project.id}
            style={
              {
                "--card-accent":
                  project.tint ??
                  ["#ff5938", "#b8c0ff", "#d8ff35", "#ffc83d", "#f1ecdf"][
                    index % 5
                  ],
              } as React.CSSProperties
            }
          >
            <div
              className={`feed-project-art feed-art-${projectArtVariant(project.slug, project.artVariant)}`}
              aria-hidden="true"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
              <i />
              <i />
              <b>{project.name.slice(0, 2).toUpperCase()}</b>
            </div>
            <div className="feed-project-copy">
              <small>
                {project.kind ?? "Digital system"} · {project.year}
              </small>
              <h2>{project.name}</h2>
              <span>
                {project.stack.slice(0, 3).join(" / ") || "Open case file"}
              </span>
              <b>View ↗</b>
            </div>
          </Link>
        ))}

        {projects.length > 5 && (
          <Link href="/work" className="feed-card feed-more">
            <span>Archive / {String(projects.length).padStart(3, "0")}</span>
            <strong>See every project.</strong>
            <b>Open index ↗</b>
          </Link>
        )}

        <article className="feed-card feed-practice">
          <span>How I work / not a tech stack</span>
          <div>
            {capabilities.slice(0, 5).map((item, index) => (
              <p key={item.id}>
                <b>0{index + 1}</b>
                {item.heading}
              </p>
            ))}
          </div>
          <small>Useful beats impressive.</small>
        </article>

        {posts.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            className={`feed-card feed-note feed-note-${index + 1}`}
            key={post.id}
          >
            <span>Notebook / N—{String(index + 1).padStart(2, "0")}</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt ?? "A note from somewhere inside the build."}</p>
            <small>
              {post.readingTime ? `${post.readingTime} min` : "Read"} ↗
            </small>
          </Link>
        ))}

        <article className="feed-card feed-easter">
          <span>Site policy</span>
          <b>No dark mode.</b>
          <p>The button has excuses.</p>
        </article>

        {!projects.length && (
          <article className="feed-card feed-empty">
            <span>Work / 000</span>
            <h2>The first public case file is still on the desk.</h2>
          </article>
        )}
      </div>

      <div className="board-index" aria-hidden={view !== "index"}>
        <header>
          <span>Type</span>
          <span>Title</span>
          <span>Detail</span>
          <span>Year</span>
        </header>
        {projects.map((project, index) => (
          <Link href={`/work/${project.slug}`} key={project.id}>
            <span>P—{String(index + 1).padStart(2, "0")}</span>
            <b>{project.name}</b>
            <span>{project.kind ?? project.stack.slice(0, 2).join(" / ")}</span>
            <span>{project.year} ↗</span>
          </Link>
        ))}
        {posts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <span>N—{String(index + 1).padStart(2, "0")}</span>
            <b>{post.title}</b>
            <span>
              {post.readingTime ? `${post.readingTime} min read` : "Field note"}
            </span>
            <span>{post.publishedAt?.getFullYear() ?? "—"} ↗</span>
          </Link>
        ))}
        <div className="board-index-practice">
          <span>Practice</span>
          <div>
            {capabilities.map((item) => (
              <span key={item.id}>{item.heading}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
