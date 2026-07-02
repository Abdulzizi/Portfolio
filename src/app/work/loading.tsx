export default function Loading() {
  const skeletonRow = (
    <div
      style={{
        height: 56,
        background: "var(--line)",
        opacity: 0.5,
        animation: "loadingSkeletonPulse 1.5s ease-in-out infinite",
      }}
    />
  );

  return (
    <div className="work-page">
      <style>
        {`
          @keyframes loadingSkeletonPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
      <main className="work-main">
        <header className="work-header pad">
          <div
            style={{
              width: 120,
              height: 14,
              background: "var(--line)",
              opacity: 0.4,
              marginBottom: 24,
              animation: "loadingSkeletonPulse 1.5s ease-in-out infinite",
            }}
          />

          <div
            style={{
              width: "60%",
              maxWidth: 420,
              height: 40,
              background: "var(--line)",
              opacity: 0.4,
              marginBottom: 16,
              animation: "loadingSkeletonPulse 1.5s ease-in-out infinite",
            }}
          />

          <div
            style={{
              width: 80,
              height: 12,
              background: "var(--line)",
              opacity: 0.4,
              animation: "loadingSkeletonPulse 1.5s ease-in-out infinite",
            }}
          />
        </header>

        <section className="work-list pad">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {skeletonRow}
            {skeletonRow}
            {skeletonRow}
            {skeletonRow}
          </div>
        </section>
      </main>
    </div>
  );
}
