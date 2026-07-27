import { ImageResponse } from "next/og";
import { OgFrame, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "A. J. Azizi";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame bg="#d8ff35">
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#11110f",
            fontFamily: "monospace",
            marginBottom: 28,
          }}
        >
          AJ / Product engineer / Jakarta
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 700,
            color: "#11110f",
            lineHeight: 1.05,
          }}
        >
          A. J. Azizi
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#ff5938",
            marginTop: 32,
          }}
        >
          I make software make sense.
        </div>
      </OgFrame>
    ),
    OG_SIZE,
  );
}
