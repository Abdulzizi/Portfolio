import Link from "next/link";

export default function NotFound() {
  return (
    <main className="public-state public-state-missing">
      <span>404 / Wrong turn</span>
      <h1>Nothing<br />lives <i>here.</i></h1>
      <p>This page wandered off. The rest of the work is still where I left it.</p>
      <Link href="/">Back to the board <b aria-hidden="true">↗</b></Link>
      <div className="state-shape" aria-hidden="true">?</div>
    </main>
  );
}
