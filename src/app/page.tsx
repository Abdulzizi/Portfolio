import { prisma } from "@/lib/db";
import { HomePage } from "@/components/HomePage";

export default async function Page() {
  const [rawSettings, capabilities] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    prisma.capability.findMany({ orderBy: { order: "asc" } }),
  ]);

  const settings = rawSettings
    ? {
        kickerItems: rawSettings.kickerItems as string[] | null,
        cycleWords: rawSettings.cycleWords,
        availabilityText: rawSettings.availabilityText,
        marqueeItems: rawSettings.marqueeItems,
        socialLinks: rawSettings.socialLinks as Record<string, string> | null,
      }
    : null;

  return <HomePage settings={settings} capabilities={capabilities} />;
}
