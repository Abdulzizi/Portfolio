type Capability = { id: string; order: number; heading: string; description: string };

export function Capabilities({ items }: { items: Capability[] }) {
  return (
    <section className="lab-capabilities" id="practice" data-label="CAPABILITY / TOOL WALL">
      <header><p className="lab-kicker">Tool wall / broad enough to see the system</p><h2>One practice.<br />Multiple surfaces.</h2></header>
      <div className="capability-wheel">
        <div className="capability-core"><span>BUILD</span><b>✳</b><small>END TO END</small></div>
        {items.slice(0, 6).map((item, index) => (
          <article className={`capability-module capability-module-${index + 1}`} key={item.id}>
            <span>{String(index + 1).padStart(2, "0")}</span><h3>{item.heading}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
