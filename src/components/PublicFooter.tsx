import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="board-footer public-footer">
      <span>AJ / 2026</span>
      <span>Built and maintained in Jakarta</span>
      <Link href="/">Back to the board</Link>
    </footer>
  );
}
