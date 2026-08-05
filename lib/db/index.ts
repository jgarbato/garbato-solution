import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

type Database = NodePgDatabase<typeof schema>

// Vercel + Neon expõe a connection string em DATABASE_URL (auto-provisionada
// pela integração do marketplace). Se DATABASE_POSTGRES_URL existir, usa ela
// (algumas integrações usam esse nome).
function resolveConnectionString(): string {
  const connectionString =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_POSTGRES_URL

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL ausente. Provisione Neon na Vercel (https://vercel.com/integrations/neon) ou defina manualmente.",
    )
  }

  return connectionString
}

let instance: Database | null = null

/**
 * Conexão preguiçosa: o Pool só é criado no primeiro acesso real ao banco,
 * em runtime. O build apenas importa os módulos das rotas para coletar
 * metadados, então deixa de exigir DATABASE_URL — o que permite builds de
 * preview/CI sem segredos. Em runtime, se a variável faltar, o erro continua
 * sendo lançado normalmente.
 */
function getDb(): Database {
  if (!instance) {
    instance = drizzle(new Pool({ connectionString: resolveConnectionString() }), {
      schema,
    })
  }
  return instance
}

export const db = new Proxy({} as Database, {
  get(_target, property) {
    const client = getDb() as unknown as Record<string | symbol, unknown>
    const value = client[property]
    return typeof value === "function" ? value.bind(client) : value
  },
  has(_target, property) {
    return property in (getDb() as unknown as object)
  },
})

export { schema }
