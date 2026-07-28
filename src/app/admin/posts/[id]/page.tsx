import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { requirePageAuth } from "@/lib/auth";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePageAuth();

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } } },
  });

  if (!post) notFound();

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "8px",
        }}
      >
        Posts / Edit
      </div>
      <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 36px" }}>
        {post.title}
      </h1>
      <PostForm post={post} />
    </div>
  );
}
