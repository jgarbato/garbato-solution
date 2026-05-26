import type { Config } from "drizzle-kit"

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.DATABASE_POSTGRES_URL

if (!connectionString) {
  throw new Error(
    "drizzle-kit: DATABASE_URL ausente. Rode `vercel env pull .env.local` depois de provisionar Neon.",
  )
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config
