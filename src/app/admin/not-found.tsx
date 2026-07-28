import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="admin-not-found">
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "8px",
        }}
      >
        Error 404
      </div>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: "0 0 16px",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--muted)",
          margin: "0 0 32px",
        }}
      >
        The page you are looking for does not exist.
      </p>
      <Link
        href="/admin"
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          padding: "10px 20px",
          display: "inline-block",
        }}
      >
        Back to dashboard
      </Link>
    </div>
  );
}
