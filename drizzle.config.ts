import { loadEnvFile } from "node:process"
import type { Config } from "drizzle-kit"

// Carrega .env.local pra drizzle-kit (ele não lê automaticamente).
try {
  loadEnvFile(".env.local")
} catch {
  // .env.local não existe — env vars devem vir do shell.
}

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.DATABASE_POSTGRES_URL

if (!connectionString) {
  throw new Error(
    "drizzle-kit: DATABASE_URL ausente. Rode `vercel env pull .env.local --environment=development` depois de provisionar Neon.",
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
