"use client";

import { useState } from "react";

export function BoardView({
  intro,
  children,
}: {
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  const [view, setView] = useState<"feed" | "index">("feed");

  return (
    <>
      <header className="board-masthead">
        {intro}
        <div
          className="board-controls"
          role="group"
          aria-label="Portfolio view"
        >
          <button
            className={view === "feed" ? "active" : ""}
            onClick={() => setView("feed")}
            aria-pressed={view === "feed"}
          >
            Feed
          </button>
          <button
            className={view === "index" ? "active" : ""}
            onClick={() => setView("index")}
            aria-pressed={view === "index"}
          >
            Index
          </button>
        </div>
      </header>

      <section className={`board-content board-view-${view}`} id="board">
        {children}
      </section>
    </>
  );
}
