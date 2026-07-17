"use client";

import Link from "next/link";
import { TopBar } from "./TopBar";
import { WorkSection } from "./WorkSection";
import { Capabilities } from "./Capabilities";
import { ProjectLab } from "./ProjectLab";

type SiteSettings = { socialLinks: Record<string, string> | null } | null;
type Capability = { id: string; order: number; heading: string; description: string };
type Project = { id: string; slug: string; name: string; kind: string | null; year: number; tint: string | null; stack: string[]; status: string };
type Post = { id: string; slug: string; title: string; excerpt: string | null; readingTime: number | null; publishedAt: Date | null };

export function HomePage({ settings, capabilities, projects, posts }: { settings: SiteSettings; capabilities: Capability[]; projects: Project[]; posts: Post[] }) {
  const socials = settings?.socialLinks ?? { email: "jawadabdul307@gmail.com", github: "https://github.com/Abdulzizi", linkedin: "https://www.linkedin.com/in/abduljawadazizi07/" };

  return (
    <div className="product-lab">
      <TopBar />
      <main>
        <section className="lab-hero" data-label="HERO / PRODUCT LAB">
          <div className="lab-hero-type">
            <p><span>AJ/26</span> Product engineer · Jakarta</p>
            <h1><span>I BUILD</span><span>SOFTWARE</span><span>THAT <em>HOLDS.</em></span></h1>
            <div className="lab-hero-bottom">
              <p>Design, code, and the stubborn parts in between.</p>
              <a href="#work">Selected systems ↓</a>
            </div>
          </div>
          <ProjectLab projects={projects} />
          <div className="lab-ticker" aria-hidden="true">
            <div>PRODUCT ENGINEERING ✳ WEB SYSTEMS ✳ MOBILE EXPERIENCES ✳ DATA PRODUCTS ✳ CLEAR DECISIONS ✳ PRODUCT ENGINEERING ✳ WEB SYSTEMS ✳</div>
          </div>
        </section>

        <WorkSection projects={projects} />

        <section className="lab-manifesto" data-label="METHOD / NO THEATRE">
          <div className="lab-manifesto-mark" aria-hidden="true">✳</div>
          <p className="lab-kicker">How the work gets done</p>
          <h2>Less theatre.<br />More useful<br /><i>software.</i></h2>
          <div className="lab-manifesto-side">
            <p>I clarify the constraint, remove the ornamental complexity, and build the smallest system that can carry the real load.</p>
            <ol><li><b>01</b> Frame the actual problem</li><li><b>02</b> Make the hard parts visible</li><li><b>03</b> Ship evidence, not promises</li></ol>
          </div>
        </section>

        <Capabilities items={capabilities} />

        <section className="lab-notes" id="journal" data-label="NOTES / WORKING MEMORY">
          <header><p className="lab-kicker">Working memory / {String(posts.length).padStart(2, "0")}</p><h2>Notes from<br />inside the build.</h2><Link href="/blog">Full notebook ↗</Link></header>
          <div className="lab-note-collage">
            {posts.length ? posts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} className={`lab-note-card lab-note-card-${index + 1}`} key={post.id}>
                <span>N—{String(index + 1).padStart(2, "0")}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt ?? "A note from the workbench."}</p>
                <small>{post.readingTime ? `${post.readingTime} MIN` : "FIELD NOTE"} ↗</small>
              </Link>
            )) : <div className="lab-note-empty"><span>NO SIGNAL YET</span><b>First field note is being written.</b></div>}
            <div className="lab-note-object" aria-hidden="true"><i /><i /><i /><b>AJ</b></div>
          </div>
        </section>

        <section className="lab-contact" id="contact" data-label="CONTACT / OPEN CHANNEL">
          <div className="lab-contact-signal" aria-hidden="true"><i /><i /><i /></div>
          <p className="lab-kicker">Say hello, skip the pitch deck</p>
          <h2>Bring me the<br /><em>difficult</em> thing.</h2>
          <a className="lab-contact-mail" href={`mailto:${socials.email}`}>Start a conversation ↗</a>
          <div className="lab-contact-links">
            {socials.github && <a href={socials.github}>GitHub ↗</a>}
            {socials.linkedin && <a href={socials.linkedin}>LinkedIn ↗</a>}
            <span>Jakarta · GMT+7</span>
          </div>
        </section>
      </main>
      <footer className="lab-footer"><span>© 2026 Abdul Jawad Azizi</span><span>Built by hand, operated with care.</span><a href="#top">Top ↑</a></footer>
    </div>
  );
}
