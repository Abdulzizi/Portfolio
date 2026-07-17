import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { requirePageAuth } from "@/lib/auth";

export default async function SettingsPage() {
  await requirePageAuth();

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  const kickerItems = (settings?.kickerItems as string[]) ?? [];
  const socials = (settings?.socialLinks as Record<string, string>) ?? {};

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
        Site configuration
      </div>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: "0 0 36px",
        }}
      >
        Settings
      </h1>
      <SettingsForm
        kickerItems={kickerItems}
        cycleWords={settings?.cycleWords ?? []}
        marqueeItems={settings?.marqueeItems ?? []}
        availabilityText={settings?.availabilityText ?? ""}
        socialEmail={socials.email ?? ""}
        socialGithub={socials.github ?? ""}
        socialLinkedin={socials.linkedin ?? ""}
      />
    </div>
  );
}
