"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Project = { id: string; slug: string; name: string; kind: string | null; year: number; stack: string[] };
type Position = { x: number; y: number; z: number };

const defaults: Position[] = [
  { x: 18, y: 20, z: 3 },
  { x: 45, y: 165, z: 2 },
  { x: 205, y: 62, z: 1 },
];

export function ProjectLab({ projects }: { projects: Project[] }) {
  const specimens = projects.slice(0, 3);
  const [positions, setPositions] = useState(() => defaults);
  const drag = useRef<{ index: number; x: number; y: number; startX: number; startY: number } | null>(null);

  function startDrag(index: number, event: React.PointerEvent<HTMLDivElement>) {
    const position = positions[index];
    drag.current = { index, x: event.clientX, y: event.clientY, startX: position.x, startY: position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setPositions((current) => current.map((item, i) => ({ ...item, z: i === index ? 9 : item.z })));
  }

  function moveDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const { index, x, y, startX, startY } = drag.current;
    setPositions((current) => current.map((item, i) => i === index
      ? { ...item, x: startX + event.clientX - x, y: startY + event.clientY - y }
      : item));
  }

  return (
    <div className="lab-stage" aria-label="Draggable project specimens">
      <div className="lab-stage-grid" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="lab-stage-label"><span>LIVE LAB / 01</span><span>Drag the specimens</span></div>
      {(specimens.length ? specimens : [{ id: "prototype", slug: "", name: "New system in progress", kind: "Research prototype", year: 2026, stack: ["Product", "Engineering"] }]).map((project, index) => {
        const position = positions[index] ?? defaults[index];
        return (
          <article
            className={`lab-window lab-window-${index + 1}`}
            key={project.id}
            style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, zIndex: position.z }}
          >
            <div className="lab-window-bar" onPointerDown={(event) => startDrag(index, event)} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }}>
              <span>0{index + 1} / {project.year}</span><i /><i /><i />
            </div>
            <div className={`lab-visual lab-visual-${index % 3}`} aria-hidden="true">
              <div className="lab-visual-core"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <b /><b /><b /><b />
            </div>
            <div className="lab-window-copy">
              <span>{project.kind ?? "Independent software"}</span>
              <h2>{project.name}</h2>
              <div>{project.stack.slice(0, 3).map((item) => <small key={item}>{item}</small>)}</div>
              {project.slug && <Link href={`/work/${project.slug}`}>Inspect build ↗</Link>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
