export function Marquee({ items }: { items: string[] }) {
  const track = items.flatMap((m, i) => [
    <span key={`m-${i}`} className={i % 3 === 2 ? "a" : ""}>
      {m}
    </span>,
    <span key={`s-${i}`} className="a">
      /
    </span>,
  ]);

  return (
    <div className="marq" data-x="marquee" aria-label={items.join(", ")}>
      <div className="track">
        {track}
        {track}
      </div>
    </div>
  );
}
