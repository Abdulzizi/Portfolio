"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DARK_EXCUSES = [
  "Nope. These colors took long enough.",
  "Dark mode is in the backlog. Deep in the backlog.",
  "I tried it. Everything looked like a crypto dashboard.",
  "One theme means fewer bugs. You’re welcome.",
  "The palette has unionized. It refuses night shifts.",
  "Dark mode requested. Request respectfully ignored.",
  "I can build it. I simply choose peace.",
  "The sun is free. Let’s use it.",
  "This website is already dark on the inside.",
  "Fine. Turn your brightness down and pretend.",
];

export function TopBar() {
  const [message, setMessage] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const joke = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (message === null) return;
    const dismiss = (event: PointerEvent) => {
      if (!joke.current?.contains(event.target as Node)) setMessage(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMessage(null);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [message]);

  function rejectDarkMode() {
    setMessage((current) => {
      let next = Math.floor(Math.random() * DARK_EXCUSES.length);
      if (next === current) next = (next + 1) % DARK_EXCUSES.length;
      return next;
    });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 3600);
  }

  return (
    <header className="field-nav" id="top">
      <Link href="/" className="field-mark" aria-label="A. J. Azizi, home">A/J</Link>
      <nav aria-label="Primary navigation">
        <a href="#board">Board</a><Link href="/work">Work</Link><Link href="/blog">Notes</Link><a href="#contact">Contact</a>
      </nav>
      <div className="field-nav-tools">
        <div className="dark-joke-wrap" ref={joke}>
          <button onClick={rejectDarkMode} aria-expanded={message !== null} aria-controls="dark-joke">Dark</button>
          {message !== null && (
            <div className="dark-joke" id="dark-joke" role="status" aria-live="polite">
              {DARK_EXCUSES[message]}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
