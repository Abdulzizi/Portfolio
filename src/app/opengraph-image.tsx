import { ImageResponse } from "next/og";

export const alt = "A. J. Azizi";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#141311",
          padding: "100px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6C63FF",
            fontFamily: "monospace",
            marginBottom: 28,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 700,
            color: "#E8E4DC",
            lineHeight: 1.05,
          }}
        >
          A. J. Azizi
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#6C695D",
            marginTop: 32,
          }}
        >
          Solo Developer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
