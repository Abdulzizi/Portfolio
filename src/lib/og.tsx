import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

// Shared bits for the opengraph-image routes (Next reads `size`/`contentType`
// as exports from each file, so those re-export these constants).
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Full-bleed OG card: flex column, left-aligned, solid background. */
export function OgFrame({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: bg,
        padding: "100px",
        fontFamily: "sans-serif",
      }}
    >
      {children}
    </div>
  );
}

/** "<thing> not found" fallback card. */
export function ogNotFound(text: string, bg: string) {
  return new ImageResponse(
    (
      <OgFrame bg={bg}>
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            color: "#11110f",
          }}
        >
          {text}
        </div>
      </OgFrame>
    ),
    OG_SIZE,
  );
}
