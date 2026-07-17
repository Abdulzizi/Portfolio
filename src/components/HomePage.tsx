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
      <TopBar />
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
        <a href={`mailto:${socials.email}`}>Email me ↗</a>
        {socials.github && <a href={socials.github} aria-label="GitHub">GH</a>}
        {socials.linkedin && <a href={socials.linkedin} aria-label="LinkedIn">IN</a>}
      </aside>

      <footer className="board-footer">
        <span>AJ / 2026</span>
        <span>Built and maintained in Jakarta</span>
        <Link href="/admin/login">Private entrance</Link>
      </footer>
    </div>
  );
}
