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

export function HomePage() {
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

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <TopBar />

      {/* Hero */}
      <section className="hero pad" data-x="section#hero">
        <div className="kicker">
          <span>Independent Software Developer</span>
          <span>/</span>
          <span>Jakarta, GMT +7</span>
          <span>/</span>
          <span>Est. 2022</span>
        </div>
        <h1 data-x="h1">
          A solo developer
          <br />
          building <CyclingWord />
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
            Availability<b>Open for work</b>
          </div>
        </div>
      </section>

      <Marquee />
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

      <Capabilities />

      {/* Contact */}
      <section className="contact pad" id="contact" data-x="section#contact">
        <div className="lead">004 / Let&apos;s work together</div>
        <a className="big" href="mailto:jawadabdul307@gmail.com">
          Say hello<span className="ar">&rarr;</span>
        </a>
        <div className="links">
          <a href="mailto:jawadabdul307@gmail.com">
            <span className="k">Email</span>
            <span className="v">jawadabdul307@gmail.com</span>
          </a>
          <a href="https://github.com/Abdulzizi">
            <span className="k">GitHub</span>
            <span className="v">github.com/Abdulzizi</span>
          </a>
          <a href="#">
            <span className="k">LinkedIn</span>
            <span className="v">Abdul Jawad Azizi</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <span>&copy; 2026 Abdul Jawad Azizi</span>
        <span>Built with Next.js</span>
        <span>Try the Inspect switch &nearr;</span>
      </footer>
    </>
  );
}
