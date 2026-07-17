export default function Loading() {
  return (
    <main className="public-loading" aria-label="Loading">
      <div className="loading-note" role="status">
        <span>AJ / Please hold</span>
        <p>Getting the page<br /><em>off the desk.</em></p>
        <div className="loading-rule" aria-hidden="true"><i /></div>
        <small>This should only take a second.</small>
      </div>
    </main>
  );
}
