import { NextResponse } from "next/server"
import { and, count, eq, gt } from "drizzle-orm"
import { db } from "@/lib/db"
import { customers, subscriptions, payments } from "@/lib/db/schema"
import { asaas, getAsaasEnv, type AsaasBillingType } from "@/lib/asaas"
import { getPlan, getProduct, isProductSlug, type Periodo } from "@/lib/products/registry"
import { validarCadastro } from "@/lib/validacao"
import { dentroDoLimite, ipDoCliente } from "@/lib/limite"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Limites contra abuso. A rota é pública e cada chamada cria cliente e
// assinatura no Asaas, então precisa de teto por origem, por cliente e geral.
const MAX_POR_IP = 5 // tentativas por IP a cada 10 minutos (por instância)
const JANELA_IP_MS = 10 * 60 * 1000
const MAX_PENDENTES_POR_CLIENTE = 3 // assinaturas não pagas do mesmo documento em 24 h
const MAX_GERAL_POR_HORA = 40 // assinaturas criadas no site inteiro por hora
const MAX_CORPO_BYTES = 10_000

const MUITAS_TENTATIVAS = "Muitas tentativas. Aguarde alguns minutos e tente de novo."

const METODO_TO_BILLING_TYPE: Record<string, AsaasBillingType> = {
  pix: "PIX",
  boleto: "BOLETO",
  cartao: "CREDIT_CARD",
}

type ContratarBody = {
  sistema: string
  plano: string
  periodo: Periodo
  metodo: keyof typeof METODO_TO_BILLING_TYPE
  cadastro: {
    nome: string
    cpfCnpj: string
    email: string
    telefone: string
    tipoPessoa?: "pf" | "pj"
    cep?: string
    rua?: string
    numero?: string
    bairro?: string
    cidade?: string
    estado?: string
  }
}

function onlyDigits(value: string | undefined) {
  return (value ?? "").replace(/\D/g, "")
}

function nextDueDateISO(daysAhead: number) {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + daysAhead)
  return d.toISOString().slice(0, 10) // YYYY-MM-DD
}

export async function POST(req: Request) {
  // ── Barreiras antes de qualquer trabalho ───────────────────────────────────

  if (!dentroDoLimite(`contratar:${ipDoCliente(req)}`, MAX_POR_IP, JANELA_IP_MS)) {
    return NextResponse.json({ error: MUITAS_TENTATIVAS }, { status: 429 })
  }

  let bruto: string
  try {
    bruto = await req.text()
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }
  if (bruto.length > MAX_CORPO_BYTES) {
    return NextResponse.json({ error: "requisição grande demais" }, { status: 413 })
  }

  let body: ContratarBody
  try {
    body = JSON.parse(bruto)
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
  }

  // ── Validação ──────────────────────────────────────────────────────────────

  if (!isProductSlug(body.sistema)) {
    return NextResponse.json({ error: "sistema inválido" }, { status: 400 })
  }
  const plan = getPlan(body.sistema, body.plano)
  if (!plan) {
    return NextResponse.json({ error: "plano inválido" }, { status: 400 })
  }
  const billingType = METODO_TO_BILLING_TYPE[body.metodo]
  if (!billingType) {
    return NextResponse.json({ error: "método de pagamento inválido" }, { status: 400 })
  }
  const periodo: Periodo = body.periodo === "anual" ? "anual" : "mensal"
  const validacao = validarCadastro(body.cadastro)
  if (!validacao.ok) {
    return NextResponse.json({ error: validacao.erro }, { status: 400 })
  }
  // Daqui em diante só se usam os dados já conferidos e normalizados.
  const c = validacao.dados

  // Teto geral: protege a conta do Asaas mesmo que o abuso venha de muitos IPs.
  const umaHoraAtras = new Date(Date.now() - 60 * 60 * 1000)
  const [geral] = await db
    .select({ total: count() })
    .from(subscriptions)
    .where(gt(subscriptions.createdAt, umaHoraAtras))
  if ((geral?.total ?? 0) >= MAX_GERAL_POR_HORA) {
    console.warn("[contratar] teto geral por hora atingido", { total: geral?.total })
    return NextResponse.json({ error: MUITAS_TENTATIVAS }, { status: 429 })
  }

  const product = getProduct(body.sistema)
  const valueReais = periodo === "anual" ? plan.priceAnnual : plan.price
  const valueCents = valueReais * 100
  // Boleto vence em 3 dias, PIX/cartão em 1 dia (curto, pra evitar abandono).
  const dueIn = billingType === "BOLETO" ? 3 : 1
  const dueDate = nextDueDateISO(dueIn)

  // ── 1. Customer no Asaas (reusa se já existir o cpfCnpj) ───────────────────

  const cpfCnpjDigits = c.cpfCnpj

  let asaasCustomerId: string
  let customerRowId: number

  const existing = await db.query.customers.findFirst({
    where: eq(customers.cpfCnpj, cpfCnpjDigits),
  })

  if (existing) {
    // Documento já cadastrado: só quem informa o mesmo e-mail do cadastro pode
    // abrir nova assinatura nele. Sem isso, qualquer pessoa que soubesse o CPF
    // de um cliente geraria cobranças no nome dele.
    if (existing.email.trim().toLowerCase() !== c.email) {
      console.warn("[contratar] documento já cadastrado com outro e-mail", {
        customerId: existing.id,
      })
      return NextResponse.json(
        {
          error:
            "Este documento já tem cadastro com outro e-mail. Use o e-mail do cadastro ou fale com a gente.",
        },
        { status: 409 },
      )
    }

    const umDiaAtras = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const [pendentes] = await db
      .select({ total: count() })
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.customerId, existing.id),
          eq(subscriptions.status, "PENDING"),
          gt(subscriptions.createdAt, umDiaAtras),
        ),
      )
    if ((pendentes?.total ?? 0) >= MAX_PENDENTES_POR_CLIENTE) {
      return NextResponse.json(
        {
          error:
            "Já existem cobranças em aberto para este documento. Pague uma delas ou fale com a gente.",
        },
        { status: 429 },
      )
    }

    asaasCustomerId = existing.asaasCustomerId
    customerRowId = existing.id
  } else {
    try {
      const created = await asaas.customers.create({
        name: c.nome,
        cpfCnpj: cpfCnpjDigits,
        email: c.email,
        mobilePhone: onlyDigits(c.telefone) || undefined,
        postalCode: onlyDigits(c.cep) || undefined,
        address: c.rua || undefined,
        addressNumber: c.numero || undefined,
        province: c.bairro || undefined,
        city: c.cidade || undefined,
        state: c.estado || undefined,
        // Desativa email/SMS automáticos do Asaas. Quem manda comunicação
        // pro cliente somos nós (welcome email via Resend depois do pagamento).
        notificationDisabled: true,
      })
      asaasCustomerId = created.id

      const [row] = await db
        .insert(customers)
        .values({
          asaasCustomerId,
          nome: c.nome,
          cpfCnpj: cpfCnpjDigits,
          email: c.email,
          telefone: onlyDigits(c.telefone) || null,
          tipoPessoa: c.tipoPessoa,
          endereco: {
            cep: c.cep,
            rua: c.rua,
            numero: c.numero,
            bairro: c.bairro,
            cidade: c.cidade,
            estado: c.estado,
          },
        })
        .returning({ id: customers.id })
      customerRowId = row.id
    } catch (err) {
      console.error("[contratar] erro criando customer", err)
      return NextResponse.json(
        {
          error: "falha ao criar cliente no gateway de pagamento",
          ...(getAsaasEnv() === "sandbox" && {
            detail: err instanceof Error ? err.message : String(err),
          }),
        },
        { status: 502 },
      )
    }
  }

  // ── 2. Subscription no Asaas (recorrência mensal) ──────────────────────────

  let asaasSubscriptionId: string
  let subscriptionRowId: number
  try {
    const sub = await asaas.subscriptions.create({
      customer: asaasCustomerId,
      billingType,
      value: valueReais,
      nextDueDate: dueDate,
      cycle: periodo === "anual" ? "YEARLY" : "MONTHLY",
      description: `${product.name} — Plano ${plan.name} (${periodo})`,
      externalReference: `gs:${body.sistema}:${plan.id}:${periodo}`,
    })
    asaasSubscriptionId = sub.id

    const [row] = await db
      .insert(subscriptions)
      .values({
        asaasSubscriptionId,
        customerId: customerRowId,
        sistema: body.sistema,
        plano: plan.id,
        periodo,
        billingType,
        valueCents,
        status: "PENDING",
      })
      .returning({ id: subscriptions.id })
    subscriptionRowId = row.id
  } catch (err) {
    console.error("[contratar] erro criando subscription", err)
    return NextResponse.json(
      {
        error: "falha ao criar assinatura no gateway de pagamento",
        ...(getAsaasEnv() === "sandbox" && {
          detail: err instanceof Error ? err.message : String(err),
        }),
      },
      { status: 502 },
    )
  }

  // ── 3. Pegar o primeiro payment criado pela subscription ───────────────────

  let firstPayment: Awaited<ReturnType<typeof asaas.payments.get>>
  try {
    const list = await asaas.subscriptions.listPayments(asaasSubscriptionId)
    if (!list.data.length) {
      throw new Error("subscription criada sem payment inicial")
    }
    firstPayment = list.data[0]
  } catch (err) {
    console.error("[contratar] erro buscando payment", err)
    return NextResponse.json(
      { error: "falha ao buscar cobrança no gateway de pagamento" },
      { status: 502 },
    )
  }

  // ── 4. Buscar dados específicos do método (PIX QR ou boleto link) ──────────

  let pixQrCodeImage: string | null = null
  let pixPayload: string | null = null
  let bankSlipUrl: string | null = firstPayment.bankSlipUrl ?? null

  try {
    if (billingType === "PIX") {
      const qr = await asaas.payments.pixQrCode(firstPayment.id)
      pixQrCodeImage = qr.encodedImage
      pixPayload = qr.payload
    }
  } catch (err) {
    console.error("[contratar] erro buscando PIX QR code", err)
    // Não bloqueia — devolvemos o invoiceUrl pra usuário pagar pela página do Asaas.
  }

  // ── 5. Salvar payment no DB ────────────────────────────────────────────────

  await db.insert(payments).values({
    asaasPaymentId: firstPayment.id,
    subscriptionId: subscriptionRowId,
    valueCents: Math.round(firstPayment.value * 100),
    status: firstPayment.status,
    billingType: firstPayment.billingType,
    dueDate: new Date(firstPayment.dueDate),
    invoiceUrl: firstPayment.invoiceUrl ?? null,
    bankSlipUrl,
    pixQrCodeImage,
    pixPayload,
  })

  // ── 6. Resposta ────────────────────────────────────────────────────────────

  return NextResponse.json({
    paymentId: firstPayment.id,
    subscriptionId: asaasSubscriptionId,
    status: firstPayment.status,
    billingType,
    valueCents,
    valueReais,
    dueDate: firstPayment.dueDate,
    invoiceUrl: firstPayment.invoiceUrl ?? null,
    bankSlipUrl,
    pixQrCodeImage,
    pixPayload,
  })
}
