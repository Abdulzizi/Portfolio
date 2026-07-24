"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import { isHttpUrl, isEmail } from "@/lib/format-validation";

export async function updateSettings(formData: FormData) {
  await requireAuth();
  const email = formData.get("socialEmail") as string;
  const github = formData.get("socialGithub") as string;
  const linkedin = formData.get("socialLinkedin") as string;

  if (email && !isEmail(email)) {
    return { error: "Invalid email address" };
  }
  if (github && !isHttpUrl(github)) return { error: "Invalid GitHub URL" };
  if (linkedin && !isHttpUrl(linkedin)) {
    return { error: "Invalid LinkedIn URL" };
  }

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
