import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core"

// ── customers ────────────────────────────────────────────────────────────────

export const customers = pgTable(
  "customers",
  {
    id: serial("id").primaryKey(),
    asaasCustomerId: text("asaas_customer_id").notNull().unique(),
    nome: text("nome").notNull(),
    cpfCnpj: text("cpf_cnpj").notNull(),
    email: text("email").notNull(),
    telefone: text("telefone"),
    tipoPessoa: text("tipo_pessoa").notNull(), // "pf" | "pj"
    endereco: jsonb("endereco").$type<{
      cep?: string
      rua?: string
      numero?: string
      bairro?: string
      cidade?: string
      estado?: string
    }>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_customers_email").on(table.email),
    index("idx_customers_cpf_cnpj").on(table.cpfCnpj),
  ],
)

// ── subscriptions ────────────────────────────────────────────────────────────

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: serial("id").primaryKey(),
    asaasSubscriptionId: text("asaas_subscription_id").notNull().unique(),
    customerId: integer("customer_id")
      .references(() => customers.id, { onDelete: "cascade" })
      .notNull(),
    sistema: text("sistema").notNull(), // "clinic" | "mob"
    plano: text("plano").notNull(), // "essencial" | "avancado" | "experts" | "profissional" | "enterprise"
    periodo: text("periodo").notNull(), // "mensal" | "anual"
    billingType: text("billing_type").notNull(), // "PIX" | "BOLETO" | "CREDIT_CARD"
    valueCents: integer("value_cents").notNull(), // valor mensal em centavos
    status: text("status").notNull().default("PENDING"), // "PENDING" | "ACTIVE" | "INACTIVE" | "EXPIRED"
    accessGranted: timestamp("access_granted"), // quando o acesso foi liberado
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("idx_subscriptions_customer").on(table.customerId)],
)

// ── payments ─────────────────────────────────────────────────────────────────

export const payments = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    asaasPaymentId: text("asaas_payment_id").notNull().unique(),
    subscriptionId: integer("subscription_id")
      .references(() => subscriptions.id, { onDelete: "cascade" })
      .notNull(),
    valueCents: integer("value_cents").notNull(),
    status: text("status").notNull(), // PENDING | RECEIVED | CONFIRMED | OVERDUE | ...
    billingType: text("billing_type").notNull(),
    dueDate: timestamp("due_date").notNull(),
    paidAt: timestamp("paid_at"),
    invoiceUrl: text("invoice_url"),
    bankSlipUrl: text("bank_slip_url"),
    pixQrCodeImage: text("pix_qr_code_image"), // base64
    pixPayload: text("pix_payload"), // copia-e-cola
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_payments_subscription").on(table.subscriptionId),
    index("idx_payments_status").on(table.status),
  ],
)

export type Customer = typeof customers.$inferSelect
export type NewCustomer = typeof customers.$inferInsert
export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert
export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert
