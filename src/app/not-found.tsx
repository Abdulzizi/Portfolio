import Link from "next/link";

export default function NotFound() {
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
        Error 404
      </div>
      <h1
        style={{
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 0.92,
          fontSize: "clamp(80px, 20vw, 220px)",
          margin: 0,
        }}
      >
        404
      </h1>
      <p
        style={{
          marginTop: "20px",
          fontSize: "clamp(18px, 2.3vw, 24px)",
          color: "var(--muted)",
        }}
      >
        Page not found
      </p>
      <Link
        href="/"
        style={{
          marginTop: "48px",
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "12px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          padding: "12px 24px",
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
