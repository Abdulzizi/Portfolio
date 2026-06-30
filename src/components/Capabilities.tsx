type Capability = {
  id: string;
  order: number;
  heading: string;
  description: string;
};

export function Capabilities({ items }: { items: Capability[] }) {
  return (
    <section className="caps pad" id="caps" data-x="section#caps">
      <div className="sec-head">
        <span className="t">003 / What I do</span>
        <span className="c">Six things, one practice</span>
      </div>
      <div className="grid">
        {items.map((cap) => (
          <div key={cap.id} className="cap">
            <span className="n">{String(cap.order).padStart(2, "0")}</span>
            <div>
              <div className="h">{cap.heading}</div>
              <div className="d">{cap.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
