"use client";

import { useEffect, useCallback } from "react";
import { useState } from "react";
import { TopBar } from "./TopBar";
import { CyclingWord } from "./CyclingWord";
import { Marquee } from "./Marquee";
import { WorkSection } from "./WorkSection";
import { Capabilities } from "./Capabilities";
import { CustomCursor } from "./CustomCursor";
import { SmoothScroll } from "./SmoothScroll";

type SiteSettings = {
  kickerItems: string[] | null;
  cycleWords: string[];
  availabilityText: string | null;
  marqueeItems: string[];
  socialLinks: Record<string, string> | null;
} | null;

type Capability = {
  id: string;
  order: number;
  heading: string;
  description: string;
};

type Props = {
  settings: SiteSettings;
  capabilities: Capability[];
};

export function HomePage({ settings, capabilities }: Props) {
  const [inspect, setInspect] = useState(false);

  const toggleInspect = useCallback(() => setInspect((v) => !v), []);

  useEffect(() => {
    if (inspect) {
      document.body.classList.add("inspect");
    } else {
      document.body.classList.remove("inspect");
    }
  }, [inspect]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "i" && !/input|textarea/i.test((e.target as HTMLElement)?.tagName)) {
        setInspect((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const kicker = (settings?.kickerItems as string[]) ?? [
    "Independent Software Developer", "/", "Jakarta, GMT +7", "/", "Est. 2022",
  ];
  const cycleWords = settings?.cycleWords ?? ["calm", "durable", "honest", "quiet", "careful"];
  const marqueeItems = settings?.marqueeItems ?? ["Fullstack", "Mobile", "APIs", "Infrastructure", "Data", "AI & Data Science", "Available now"];
  const availability = settings?.availabilityText ?? "Open for work";
  const socials = (settings?.socialLinks as Record<string, string>) ?? {
    email: "jawadabdul307@gmail.com",
    github: "https://github.com/Abdulzizi",
    linkedin: "#",
  };

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <TopBar availability={availability} />

      {/* Hero */}
      <section className="hero pad" data-x="section#hero">
        <div className="kicker">
          {kicker.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
        <h1 data-x="h1">
          A solo developer
          <br />
          building <CyclingWord words={cycleWords} />
          <br />
          software.
        </h1>
        <p className="sub">
          I build web and mobile products for small teams, and explore data on the side.
          Mostly <b>the quiet parts</b> that have to keep running when no one is watching.
        </p>
        <div className="meta">
          <div>
            Focus<b>Web · Mobile · Data Science</b>
          </div>
          <div>
            Status<b>Building, learning</b>
          </div>
          <div>
            Working since<b>2022, four years</b>
          </div>
          <div>
            Availability<b>{availability}</b>
          </div>
        </div>
      </section>

      <Marquee items={marqueeItems} />
      <WorkSection />

      {/* About */}
      <section className="about pad" id="about" data-x="section#about">
        <div className="sec-head">
          <span className="t">002 / About</span>
          <span className="c">One person, one room</span>
        </div>
        <p className="big">
          I build the kind of software that is <em>invisible</em> to the people who depend
          on it.
        </p>
        <div className="cols">
          <p>
            Four years building for the web and mobile, with a growing interest in data
            science. I prefer Postgres and a clean codebase to anything complicated, and I
            would rather write a clear page than a clever one.
          </p>
          <p>
            The studio is one developer. No standups, no roadmap deck, no growth team. The
            work is careful, and the replies are slow but honest.
          </p>
          <p>
            I am still early, no shipped products yet, but I am building every day and
            looking for the right problems to solve.
          </p>
          <p>
            Away from the keyboard I read long fiction, draw in ink, and walk the ridges
            above the city. I believe in slow software and fewer meetings.
          </p>
        </div>
      </section>

      <Capabilities items={capabilities} />

      {/* Contact */}
      <section className="contact pad" id="contact" data-x="section#contact">
        <div className="lead">004 / Let&apos;s work together</div>
        <a className="big" href={`mailto:${socials.email}`}>
          Say hello<span className="ar">&rarr;</span>
        </a>
        <div className="links">
          <a href={`mailto:${socials.email}`}>
            <span className="k">Email</span>
            <span className="v">{socials.email}</span>
          </a>
          <a href={socials.github}>
            <span className="k">GitHub</span>
            <span className="v">{socials.github?.replace("https://", "")}</span>
          </a>
          <a href={socials.linkedin}>
            <span className="k">LinkedIn</span>
            <span className="v">Abdul Jawad Azizi</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <span>&copy; 2026 Abdul Jawad Azizi</span>
        <span>Built with Next.js</span>
      </footer>
    </>
  );
}
