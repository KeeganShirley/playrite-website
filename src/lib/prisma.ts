import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

declare global {
  var prisma: PrismaClient | undefined;
}

// Resolved relative to the project root (not process.cwd(), which can
// differ between the Next.js CLI and the Prisma CLI) so both always point
// at the same database file.
const DEFAULT_SQLITE_PATH = path.join(__dirname, "..", "..", "prisma", "dev.db");

function createPrismaClient() {
  const url = process.env.DATABASE_URL ?? `file:${DEFAULT_SQLITE_PATH}`;
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
