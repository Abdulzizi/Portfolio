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
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--paper)",
        color: "var(--ink)",
        padding: "28px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "12px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "24px",
        }}
      >
        Something went wrong
      </div>
      <h1
        style={{
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 0.92,
          fontSize: "clamp(56px, 13vw, 140px)",
          margin: 0,
        }}
      >
        Error
      </h1>
      {error?.message && (
        <p
          style={{
            marginTop: "24px",
            maxWidth: "560px",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "13px",
            lineHeight: 1.6,
            color: "var(--muted)",
            wordBreak: "break-word",
          }}
        >
          {error.message}
        </p>
      )}
      <div
        style={{
          marginTop: "48px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => reset()}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--paper)",
            background: "var(--ink)",
            border: "1px solid var(--ink)",
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink)",
            border: "1px solid var(--line)",
            padding: "12px 24px",
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
