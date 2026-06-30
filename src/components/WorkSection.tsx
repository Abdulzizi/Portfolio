export function WorkSection() {
  return (
    <section className="work pad" id="work" data-x="section#work">
      <div className="sec-head">
        <span className="t">001 / Selected Work</span>
        <span className="c">Coming soon</span>
      </div>
      <div className="rows">
        <div className="row" style={{ cursor: "default" }}>
          <span className="no mono">/</span>
          <span className="ttl" style={{ color: "var(--muted)", fontWeight: 400, fontSize: "clamp(18px, 2.5vw, 28px)" }}>
            No projects yet, currently building.
          </span>
          <span className="yr" />
        </div>
      </div>
    </section>
  );
}
