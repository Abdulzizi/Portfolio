"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";

export async function updateSettings(formData: FormData) {
  await requireAuth();
  const email = formData.get("socialEmail") as string;
  const github = formData.get("socialGithub") as string;
  const linkedin = formData.get("socialLinkedin") as string;

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      socialLinks: { email, github, linkedin },
    },
    create: {
      id: "singleton",
      socialLinks: { email, github, linkedin },
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
