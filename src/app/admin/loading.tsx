export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--paper)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 12,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        Loading...
      </span>
    </div>
  );
}
