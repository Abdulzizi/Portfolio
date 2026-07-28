import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";
import { OgFrame, ogNotFound, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

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
    return ogNotFound("Project not found", "#d8ff35");
  }

  return new ImageResponse(
    (
      <OgFrame bg="#b8c0ff">
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
          {project.year}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#11110f",
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
              color: "#ff5938",
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
                  color: "#11110f",
                  border: "2px solid #11110f",
                  padding: "8px 16px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        )}
      </OgFrame>
    ),
    OG_SIZE,
  );
}
