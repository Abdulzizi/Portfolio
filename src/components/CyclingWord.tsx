"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["calm", "durable", "honest", "quiet", "careful"];

export function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  if (reducedMotion) {
    return <span className="cycle">{WORDS[0]}</span>;
  }

  return (
    <span className="cycle" style={{ display: "inline-block", minWidth: "3ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{ display: "inline-block" }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
