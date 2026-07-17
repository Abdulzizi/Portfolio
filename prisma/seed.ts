import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const pool = new pg.Pool({
  connectionString: "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable",
  max: 10,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      kickerItems: [
        "Independent Software Developer",
        "/",
        "Jakarta, GMT +7",
        "/",
        "Est. 2022",
      ],
      cycleWords: ["calm", "durable", "honest", "quiet", "careful"],
      availabilityText: "Open for work",
      marqueeItems: [
        "Fullstack",
        "Mobile",
        "APIs",
        "Infrastructure",
        "Data",
        "AI & Data Science",
        "Available now",
      ],
      socialLinks: {
        email: "jawadabdul307@gmail.com",
        github: "https://github.com/Abdulzizi",
        linkedin: "https://www.linkedin.com/in/abduljawadazizi07/",
      },
    },
  });

  const caps = [
    { order: 1, heading: "Fullstack engineering", description: "Laravel, Node, Go, and Postgres. Typed where it counts." },
    { order: 2, heading: "Mobile development", description: "React Native and Expo. Offline first, sync second." },
    { order: 3, heading: "API architecture", description: "Versioned contracts, queues, tracing, and tests." },
    { order: 4, heading: "Infrastructure", description: "Terraform and small footprints you can read at 3am." },
    { order: 5, heading: "Data science", description: "Python, Pandas, and notebooks that answer one question." },
    { order: 6, heading: "AI integration", description: "LLMs, embeddings, and structured extraction done right." },
  ];

  for (const cap of caps) {
    await prisma.capability.upsert({
      where: { id: `cap-${cap.order}` },
      update: cap,
      create: { id: `cap-${cap.order}`, ...cap },
    });
  }

  console.log("Seeded site_settings and capabilities");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
