/**
 * GET /api/payments/[id]
 *
 * Lê o status atual de um payment local pelo `asaas_payment_id`.
 * Usado pelo polling da página /contratar/confirmacao enquanto o cliente
 * aguarda a confirmação do PIX/boleto.
 *
 * Não bate no Asaas — confia no estado local atualizado pelo webhook.
 * Se quiser refresh forçado (debug/conciliação), poderia chamar
 * asaas.payments.get(id) aqui, mas isso é custo + latência por polling.
 */

import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { payments, subscriptions } from "@/lib/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params
  if (!id) {
    return NextResponse.json({ error: "id obrigatório" }, { status: 400 })
  }

  const paymentRow = await db.query.payments.findFirst({
    where: eq(payments.asaasPaymentId, id),
  })

  if (!paymentRow) {
    return NextResponse.json({ error: "payment não encontrado" }, { status: 404 })
  }

  const subscriptionRow = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.id, paymentRow.subscriptionId),
  })

  return NextResponse.json({
    paymentId: paymentRow.asaasPaymentId,
    status: paymentRow.status,
    paidAt: paymentRow.paidAt,
    billingType: paymentRow.billingType,
    valueCents: paymentRow.valueCents,
    accessGranted: subscriptionRow?.accessGranted ?? null,
    subscriptionStatus: subscriptionRow?.status ?? null,
  })
}
