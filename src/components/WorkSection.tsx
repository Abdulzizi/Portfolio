import Link from "next/link";

type Project = { id: string; slug: string; name: string; kind: string | null; year: number; tint: string | null; stack: string[]; status: string };

export function WorkSection({ projects }: { projects: Project[] }) {
  return (
    <section className="project-wall" id="work" data-label="WORK / SELECTED SYSTEMS">
      <header className="project-wall-head">
        <p className="lab-kicker">Selected systems / {String(projects.length).padStart(2, "0")}</p>
        <h2>Work with<br /><i>weight.</i></h2>
        <p>Real constraints. Clear decisions. Systems built to remain understandable after launch.</p>
        {projects.length > 0 && <Link href="/work">All case files ↗</Link>}
      </header>
      <div className="project-mosaic">
        {projects.length ? projects.map((project, index) => (
          <Link
            href={`/work/${project.slug}`}
            className={`project-tile project-tile-${(index % 4) + 1}`}
            key={project.id}
            style={{ "--tile-color": project.tint ?? ["#ff5a36", "#b6ff37", "#7e8cff", "#ffc83d"][index % 4] } as React.CSSProperties}
          >
            <div className={`project-art project-art-${index % 4}`} aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span><i /><i /><i /><b />
            </div>
            <div className="project-tile-copy">
              <span>{project.kind ?? "Digital system"} · {project.year}</span>
              <h3>{project.name}</h3>
              <div>{project.stack.slice(0, 3).join(" / ") || "Case study"}</div>
              <b>View system ↗</b>
            </div>
          </Link>
        )) : (
          <div className="project-placeholder">
            <div className="project-art project-art-0"><span>01</span><i /><i /><i /><b /></div>
            <div><small>ACTIVE BUILD</small><h3>The first public case file is being assembled.</h3></div>
          </div>
        )}
      </div>
    </section>
  );
}
