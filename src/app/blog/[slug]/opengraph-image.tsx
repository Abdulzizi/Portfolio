import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/format-date";
import { OgFrame, ogNotFound, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "published" },
    select: { title: true, excerpt: true, publishedAt: true },
  });

  if (!post) {
    return ogNotFound("Post not found", "#ff5938");
  }

  return new ImageResponse(
    (
      <OgFrame bg="#ff5938">
        {post.publishedAt && (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 2,
              color: "#11110f",
              fontFamily: "monospace",
              marginBottom: 28,
            }}
          >
            {formatDate(post.publishedAt)}
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: "#11110f",
            lineHeight: 1.1,
          }}
        >
          {post.title}
        </div>
        {post.excerpt && (
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#f1ecdf",
              marginTop: 32,
            }}
          >
            {post.excerpt}
          </div>
        )}
      </OgFrame>
    ),
    OG_SIZE,
  );
}
