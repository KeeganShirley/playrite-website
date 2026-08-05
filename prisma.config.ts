import fs from "fs";
import { defineConfig } from "prisma/config";

// The Prisma CLI (unlike Next.js) doesn't load .env.local automatically.
// Locally that file holds the real secrets pulled via `vercel env pull`;
// on Vercel's own build these vars are already in process.env directly,
// so there's no file to load there.
if (fs.existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

// Non-pooled connection: required for schema push/migrate operations,
// which need a direct session rather than a PgBouncer-style pooled one.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL_UNPOOLED ?? "",
  },
});
