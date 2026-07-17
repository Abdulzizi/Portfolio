import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const alt = "Project";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug, visibility: "published" },
    select: { name: true, kind: true, year: true, stack: true },
  });

  if (!project) {
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
              fontSize: 80,
              fontWeight: 700,
              color: "#E8E4DC",
            }}
          >
            Project not found
          </div>
        </div>
      ),
      { ...size }
    );
  }

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
          {project.year}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#E8E4DC",
            lineHeight: 1.05,
          }}
        >
          {project.name}
        </div>
        {project.kind && (
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#6C695D",
              marginTop: 28,
            }}
          >
            {project.kind}
          </div>
        )}
        {project.stack.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 48,
              gap: 16,
            }}
          >
            {project.stack.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  fontFamily: "monospace",
                  fontSize: 22,
                  color: "#E8E4DC",
                  border: "1px solid #6C695D",
                  padding: "8px 16px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
