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
      <style>
        {`
          @keyframes loadingPulse {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--ink)",
          animation: "loadingPulse 1.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}
