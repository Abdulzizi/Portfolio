import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = "https://ajazizi.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      where: { visibility: "published" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.post.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  return [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/work`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${BASE_URL}/work/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
