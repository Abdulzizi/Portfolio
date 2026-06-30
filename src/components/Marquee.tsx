const ITEMS = [
  "Fullstack",
  "Mobile",
  "APIs",
  "Infrastructure",
  "Data",
  "AI & Data Science",
  "Available now",
];

export function Marquee() {
  const track = ITEMS.flatMap((m, i) => [
    <span key={`m-${i}`} className={i % 3 === 2 ? "a" : ""}>
      {m}
    </span>,
    <span key={`s-${i}`} className="a">
      /
    </span>,
  ]);

  return (
    <div className="marq" data-x="marquee">
      <div className="track">
        {track}
        {track}
      </div>
    </div>
  );
}
