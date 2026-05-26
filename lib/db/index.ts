import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// Vercel + Neon expõe a connection string em DATABASE_URL (auto-provisionada
// pela integração do marketplace). Se DATABASE_POSTGRES_URL existir, usa ela
// (algumas integrações usam esse nome).
const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.DATABASE_POSTGRES_URL

if (!connectionString) {
  throw new Error(
    "DATABASE_URL ausente. Provisione Neon na Vercel (https://vercel.com/integrations/neon) ou defina manualmente.",
  )
}

const pool = new Pool({ connectionString })

export const db = drizzle(pool, { schema })
export { schema }
