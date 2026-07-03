"use client";

import { useEffect, useState } from "react";

export function Marquee({ items }: { items: string[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  const track = items.flatMap((m, i) => [
    <span key={`m-${i}`} className={i % 3 === 2 ? "a" : ""}>
      {m}
    </span>,
    <span key={`s-${i}`} className="a">
      /
    </span>,
  ]);

  return (
    <div className="marq" data-x="marquee" aria-label={items.join(", ")}>
      <div className="track" style={reducedMotion ? { animationPlayState: "paused" } : undefined}>
        {track}
        {reducedMotion ? null : track}
      </div>
    </div>
  );
}
