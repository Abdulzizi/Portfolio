export default function Loading() {
  const skeletonItem = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingTop: 24,
        paddingBottom: 24,
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          width: "45%",
          maxWidth: 320,
          height: 20,
          background: "var(--line)",
          opacity: 0.4,
          animation: "loadingSkeletonPulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: "80%",
          height: 12,
          background: "var(--line)",
          opacity: 0.3,
          animation: "loadingSkeletonPulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: "30%",
          height: 12,
          background: "var(--line)",
          opacity: 0.3,
          marginTop: 4,
          animation: "loadingSkeletonPulse 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );

  return (
    <div className="blog-page">
      <style>
        {`
          @keyframes loadingSkeletonPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
      <main className="blog-main">
        <header className="blog-header pad">
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
              width: "50%",
              maxWidth: 320,
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

        <section className="blog-list pad">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {skeletonItem}
            {skeletonItem}
            {skeletonItem}
          </div>
        </section>
      </main>
    </div>
  );
}
