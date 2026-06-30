"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const glassRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, cx: -100, cy: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf: number;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const loop = () => {
      pos.current.cx += (pos.current.x - pos.current.cx) * 0.06;
      pos.current.cy += (pos.current.y - pos.current.cy) * 0.06;
      if (glassRef.current) {
        const size = hovering ? 64 : 48;
        glassRef.current.style.width = `${size}px`;
        glassRef.current.style.height = `${size}px`;
        glassRef.current.style.transform = `translate(${pos.current.cx - size / 2}px, ${pos.current.cy - size / 2}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select, .row")) {
        setHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select, .row")) {
        setHovering(false);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [hovering, visible]);

  return (
    <div
      ref={glassRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 48,
        height: 48,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 60%, transparent 70%)",
        border: "1.5px solid rgba(255,255,255,0.18)",
        boxShadow: `
          inset 0 0 20px rgba(255,255,255,0.06),
          inset 0 -2px 6px rgba(0,0,0,0.08),
          0 0 12px rgba(255,255,255,0.04)
        `,
        backdropFilter: "blur(1px) saturate(1.2) brightness(1.08)",
        WebkitBackdropFilter: "blur(1px) saturate(1.2) brightness(1.08)",
        transition: "opacity 0.4s, width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: "35%",
          height: "20%",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}
