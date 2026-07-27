import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/format-date";

export const alt = "Blog post";
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

  const post = await prisma.post.findUnique({
    where: { slug, status: "published" },
    select: { title: true, excerpt: true, publishedAt: true },
  });

  if (!post) {
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
            backgroundColor: "#ff5938",
            padding: "100px",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              color: "#11110f",
            }}
          >
            Post not found
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
          backgroundColor: "#ff5938",
          padding: "100px",
          fontFamily: "sans-serif",
        }}
      >
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
      </div>
    ),
    {
      ...size,
    }
  );
}
