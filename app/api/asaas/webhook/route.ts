/**
 * Webhook do Asaas.
 *
 * Recebe eventos de pagamento e mantém o estado local sincronizado.
 * Quando um pagamento entra em RECEIVED/CONFIRMED, libera acesso na
 * subscription e dispara o welcome email — uma vez só (idempotente via
 * `subscriptions.accessGranted`).
 *
 * Docs:
 *   https://docs.asaas.com/docs/webhooks-de-cobrancas
 *
 * Configurar no painel do Asaas:
 *   URL: https://garbatosolution.com.br/api/asaas/webhook
 *   Token (header "asaas-access-token"): valor de ASAAS_WEBHOOK_TOKEN
 */

import { timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { customers, subscriptions, payments } from "@/lib/db/schema"
import type { AsaasPayment, AsaasPaymentStatus } from "@/lib/asaas"
import { sendWelcomeEmail } from "@/lib/email"
import { getPlan, getProduct } from "@/lib/products/registry"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type AsaasWebhookEvent = {
  id?: string
  event: string
  dateCreated?: string
  payment: AsaasPayment
}

// Eventos que indicam que o dinheiro entrou — liberam acesso e disparam email.
const ACCESS_GRANT_EVENTS = new Set([
  "PAYMENT_CONFIRMED", // cartão pré-aprovado / boleto baixado
  "PAYMENT_RECEIVED",  // dinheiro recebido de fato (PIX, boleto compensado)
])

// Eventos em que o dinheiro voltou ou está sendo contestado: a assinatura
// deixa de valer. O produto deve checar `subscriptions.status` para barrar.
const REVOKE_EVENTS = new Set([
  "PAYMENT_REFUNDED",
  "PAYMENT_CHARGEBACK_REQUESTED",
  "PAYMENT_CHARGEBACK_DISPUTE",
])
// PAYMENT_DELETED fica de fora de propósito: apagar uma cobrança que não foi
// paga (um boleto trocado por PIX, por exemplo) não pode derrubar a assinatura.

// Cobrança vencida sem pagamento: assinatura fica suspensa até regularizar.
const SUSPEND_EVENTS = new Set(["PAYMENT_OVERDUE"])

/** Compara o token em tempo constante, sem vazar onde a diferença começa. */
function tokenConfere(recebido: string | null, esperado: string): boolean {
  if (!recebido) return false
  const a = Buffer.from(recebido)
  const b = Buffer.from(esperado)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Mapeamento de eventos -> status local. Eventos não listados só atualizam
// `payments.status` com o `payment.status` que veio no payload.
const EVENT_TO_STATUS: Record<string, AsaasPaymentStatus | undefined> = {
  PAYMENT_CREATED: "PENDING",
  PAYMENT_AWAITING_RISK_ANALYSIS: "AWAITING_RISK_ANALYSIS",
  PAYMENT_CONFIRMED: "CONFIRMED",
  PAYMENT_RECEIVED: "RECEIVED",
  PAYMENT_OVERDUE: "OVERDUE",
  PAYMENT_REFUNDED: "REFUNDED",
  PAYMENT_DELETED: undefined, // tratado abaixo
}

export async function POST(req: Request) {
  // ── 1. Autenticação ───────────────────────────────────────────────────────
  const expected = process.env.ASAAS_WEBHOOK_TOKEN
  if (expected) {
    const got = req.headers.get("asaas-access-token")
    if (!tokenConfere(got, expected)) {
      console.warn("[asaas-webhook] token inválido", { gotPrefix: got?.slice(0, 6) })
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[asaas-webhook] ASAAS_WEBHOOK_TOKEN não definido em produção — recusando")
    return NextResponse.json({ error: "webhook not configured" }, { status: 503 })
  }

  // ── 2. Parse ──────────────────────────────────────────────────────────────
  let event: AsaasWebhookEvent
  try {
    event = (await req.json()) as AsaasWebhookEvent
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  const eventName = event.event
  const asaasPaymentId = event.payment?.id
  if (!eventName || !asaasPaymentId) {
    return NextResponse.json({ error: "payload incompleto" }, { status: 400 })
  }

  // ── 3. Localizar o payment + subscription locais ──────────────────────────
  const paymentRow = await db.query.payments.findFirst({
    where: eq(payments.asaasPaymentId, asaasPaymentId),
  })

  if (!paymentRow) {
    // Evento de um payment que não criamos (assinatura antiga, dry-run, etc.).
    // Responde 200 pro Asaas não reentregar, mas loga pra auditoria.
    console.info("[asaas-webhook] payment desconhecido — ignorando", {
      eventName,
      asaasPaymentId,
    })
    return NextResponse.json({ ok: true, ignored: "payment-not-found" })
  }

  // ── 4. Atualizar status do payment ────────────────────────────────────────
  const mappedStatus = EVENT_TO_STATUS[eventName] ?? event.payment.status
  const paidAt =
    eventName === "PAYMENT_RECEIVED" || eventName === "PAYMENT_CONFIRMED"
      ? new Date()
      : paymentRow.paidAt

  await db
    .update(payments)
    .set({
      status: mappedStatus,
      paidAt,
      updatedAt: new Date(),
    })
    .where(eq(payments.id, paymentRow.id))

  // ── 5. Estorno, contestação ou atraso: rebaixa a assinatura ───────────────
  if (REVOKE_EVENTS.has(eventName) || SUSPEND_EVENTS.has(eventName)) {
    const novoStatus = REVOKE_EVENTS.has(eventName) ? "INACTIVE" : "OVERDUE"
    await db
      .update(subscriptions)
      .set({ status: novoStatus, updatedAt: new Date() })
      .where(eq(subscriptions.id, paymentRow.subscriptionId))
    console.info("[asaas-webhook] assinatura rebaixada", {
      eventName,
      subscriptionId: paymentRow.subscriptionId,
      novoStatus,
    })
    return NextResponse.json({ ok: true, status: mappedStatus, subscription: novoStatus })
  }

  // ── 5b. Se evento não libera acesso, encerra aqui ─────────────────────────
  if (!ACCESS_GRANT_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: true, status: mappedStatus })
  }

  // ── 6. Liberar acesso (uma vez só) ────────────────────────────────────────
  const subscriptionRow = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.id, paymentRow.subscriptionId),
  })

  if (!subscriptionRow) {
    console.error("[asaas-webhook] subscription não encontrada", {
      subscriptionId: paymentRow.subscriptionId,
      asaasPaymentId,
    })
    return NextResponse.json({ ok: true, warning: "subscription-not-found" })
  }

  if (subscriptionRow.accessGranted) {
    // Já liberado antes: não reenvia o e-mail. Se a assinatura estava suspensa
    // ou inativa e o pagamento entrou, ela volta a valer.
    if (subscriptionRow.status !== "ACTIVE") {
      await db
        .update(subscriptions)
        .set({ status: "ACTIVE", updatedAt: new Date() })
        .where(eq(subscriptions.id, subscriptionRow.id))
      return NextResponse.json({ ok: true, alreadyGranted: true, reactivated: true })
    }
    return NextResponse.json({ ok: true, alreadyGranted: true })
  }

  const customerRow = await db.query.customers.findFirst({
    where: eq(customers.id, subscriptionRow.customerId),
  })
  if (!customerRow) {
    console.error("[asaas-webhook] customer não encontrado", {
      customerId: subscriptionRow.customerId,
    })
    return NextResponse.json({ ok: true, warning: "customer-not-found" })
  }

  // Marca acesso liberado ANTES de mandar o email — se o email falhar,
  // não queremos reenviar em cada reentrega de webhook.
  await db
    .update(subscriptions)
    .set({
      accessGranted: new Date(),
      status: "ACTIVE",
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.id, subscriptionRow.id))

  // ── 7. Disparar welcome email ─────────────────────────────────────────────
  try {
    const product = getProduct(subscriptionRow.sistema)
    const plan = getPlan(subscriptionRow.sistema, subscriptionRow.plano)
    const emailResult = await sendWelcomeEmail({
      to: customerRow.email,
      customerName: customerRow.nome,
      systemName: product.name,
      appUrl: product.appUrl,
      planName: plan?.name ?? subscriptionRow.plano,
    })
    if (emailResult.skipped) {
      console.warn("[asaas-webhook] welcome email pulado (RESEND_API_KEY ausente)", {
        to: customerRow.email,
      })
    }
  } catch (err) {
    // Email falhou, mas acesso já foi liberado — não rebaixa.
    console.error("[asaas-webhook] falha ao enviar welcome email", {
      to: customerRow.email,
      err,
    })
  }

  return NextResponse.json({ ok: true, accessGranted: true })
}
