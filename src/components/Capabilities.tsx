const CAPS = [
  ["01", "Fullstack engineering", "Laravel, Node, Go, and Postgres. Typed where it counts."],
  ["02", "Mobile development", "React Native and Expo. Offline first, sync second."],
  ["03", "API architecture", "Versioned contracts, queues, tracing, and tests."],
  ["04", "Infrastructure", "Terraform and small footprints you can read at 3am."],
  ["05", "Data science", "Python, Pandas, and notebooks that answer one question."],
  ["06", "AI integration", "LLMs, embeddings, and structured extraction done right."],
];

export function Capabilities() {
  return (
    <section className="caps pad" id="caps" data-x="section#caps">
      <div className="sec-head">
        <span className="t">003 / What I do</span>
        <span className="c">Six things, one practice</span>
      </div>
      <div className="grid">
        {CAPS.map(([n, h, d]) => (
          <div key={n} className="cap">
            <span className="n">{n}</span>
            <div>
              <div className="h">{h}</div>
              <div className="d">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
