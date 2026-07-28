import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const isLocalDev = process.env.DATABASE_URL?.startsWith("prisma+postgres");
  const pool = new pg.Pool({
    connectionString: isLocalDev
      ? "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
      : process.env.DATABASE_URL,
    // node-postgres validates the TLS cert chain strictly and Supabase's
    // pooler cert doesn't chain to a root Node trusts by default (unlike
    // the Prisma CLI's own engine, which is more lenient) — the connection
    // is still encrypted, just not certificate-validated. Only needed for
    // real (non-local-dev) connections.
    ssl: isLocalDev ? undefined : { rejectUnauthorized: false },
    max: 10,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaPg(pool as any);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
