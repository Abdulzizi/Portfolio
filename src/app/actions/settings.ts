"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function updateSettings(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const kickerRaw = formData.get("kickerItems") as string;
  const cycleRaw = formData.get("cycleWords") as string;
  const marqueeRaw = formData.get("marqueeItems") as string;
  const availability = formData.get("availabilityText") as string;
  const email = formData.get("socialEmail") as string;
  const github = formData.get("socialGithub") as string;
  const linkedin = formData.get("socialLinkedin") as string;

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      kickerItems: kickerRaw.split("\n").map((s) => s.trim()).filter(Boolean),
      cycleWords: cycleRaw.split("\n").map((s) => s.trim()).filter(Boolean),
      marqueeItems: marqueeRaw.split("\n").map((s) => s.trim()).filter(Boolean),
      availabilityText: availability,
      socialLinks: { email, github, linkedin },
    },
    create: {
      id: "singleton",
      kickerItems: kickerRaw.split("\n").map((s) => s.trim()).filter(Boolean),
      cycleWords: cycleRaw.split("\n").map((s) => s.trim()).filter(Boolean),
      marqueeItems: marqueeRaw.split("\n").map((s) => s.trim()).filter(Boolean),
      availabilityText: availability,
      socialLinks: { email, github, linkedin },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
