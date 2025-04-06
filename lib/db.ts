import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  const host = process.env.DATABASE_HOST;
  const user = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const name = process.env.DATABASE_NAME;

  if (host && user && password && name) {
    process.env.DATABASE_URL = `postgresql://${user}:${password}@${host}/${name}?schema=public`;
    console.log(
      "DATABASE_URL constructed from individual environment variables"
    );
  } else {
    console.warn(
      "Missing database environment variables. Database connections may fail."
    );
  }
}

// Create a global prisma instance to prevent too many connections in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
