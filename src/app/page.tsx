import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "A. J. Azizi | Solo Developer",
};

export default async function Page() {
  const [rawSettings, capabilities, projects, posts] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    prisma.capability.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({
      where: { visibility: "published" },
      orderBy: [{ isFeatured: "desc" }, { year: "desc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        kind: true,
        year: true,
        tint: true,
        artVariant: true,
        stack: true,
        status: true,
      },
    }),
    prisma.post.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        readingTime: true,
        publishedAt: true,
      },
    }),
  ]);

  const settings = rawSettings
    ? {
        socialLinks: rawSettings.socialLinks as Record<string, string> | null,
      }
    : null;

  return (
    <HomePage
      settings={settings}
      capabilities={capabilities}
      projects={projects}
      posts={posts}
    />
  );
}
