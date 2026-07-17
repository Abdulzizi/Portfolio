"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="public-state public-state-error">
      <span>500 / Something slipped</span>
      <h1>That<br /><i>broke.</i></h1>
      <p>{error?.message || "The page hit a snag."}</p>
      <div className="public-state-actions">
        <button onClick={() => reset()}>Try again</button>
        <Link href="/">Go home</Link>
      </div>
      <div className="state-shape" aria-hidden="true">!</div>
    </main>
  );
}
