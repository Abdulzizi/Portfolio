"use client";

import { useState } from "react";
import Link from "next/link";
import { TopBar } from "./TopBar";
import { WorkSection } from "./WorkSection";

type SiteSettings = { socialLinks: Record<string, string> | null } | null;
type Capability = { id: string; order: number; heading: string; description: string };
type Project = { id: string; slug: string; name: string; kind: string | null; year: number; tint: string | null; stack: string[]; status: string };
type Post = { id: string; slug: string; title: string; excerpt: string | null; readingTime: number | null; publishedAt: Date | null };

export function HomePage({ settings, capabilities, projects, posts }: { settings: SiteSettings; capabilities: Capability[]; projects: Project[]; posts: Post[] }) {
  const [view, setView] = useState<"feed" | "index">("feed");
  const socials = settings?.socialLinks ?? {
    email: "jawadabdul307@gmail.com",
    github: "https://github.com/Abdulzizi",
    linkedin: "https://www.linkedin.com/in/abduljawadazizi07/",
  };

  return (
    <div className="aj-board">
      <TopBar home />
      <main>
        <header className="board-masthead">
          <div className="board-intro">
            <p>Abdul Jawad Azizi / Product engineer / Jakarta</p>
            <h1>I make software<br />make <i>sense.</i></h1>
          </div>
          <div className="board-intro-note">
            <span>About this place</span>
            <p>A changing collection of things I built, things I learned, and details I cared enough to keep.</p>
          </div>
          <div className="board-controls" role="group" aria-label="Portfolio view">
            <button className={view === "feed" ? "active" : ""} onClick={() => setView("feed")} aria-pressed={view === "feed"}>Feed</button>
            <button className={view === "index" ? "active" : ""} onClick={() => setView("index")} aria-pressed={view === "index"}>Index</button>
          </div>
        </header>

        <WorkSection projects={projects} capabilities={capabilities} posts={posts} view={view} />
      </main>

      <aside className="board-contact-tab" id="contact">
        <a href={`mailto:${socials.email}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></svg>
          <span>Email</span>
        </a>
        {socials.github && (
          <a href={socials.github} aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>
          </a>
        )}
        {socials.linkedin && (
          <a href={socials.linkedin} aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8.5V19M5 5v.01M9.5 19v-6c0-2 1.2-3.5 3.2-3.5s3.3 1.3 3.3 3.8V19M9.5 10v9M3 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" /></svg>
          </a>
        )}
      </aside>

      <footer className="board-footer">
        <span>AJ / 2026</span>
        <span>Built and maintained in Jakarta</span>
        <Link href="/admin/login">Private entrance</Link>
      </footer>
    </div>
  );
}
