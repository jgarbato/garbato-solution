/**
 * Cliente HTTP simples para a API do Asaas.
 *
 * Se `ASAAS_API_KEY` (produção) estiver definida, usa o ambiente de produção.
 * Caso contrário, cai para `ASAAS_API_KEY_SANDBOX` (homologação).
 *
 * Docs: https://docs.asaas.com/reference/
 */

const PROD_BASE_URL = "https://api.asaas.com/v3"
const SANDBOX_BASE_URL = "https://api-sandbox.asaas.com/v3"

/**
 * Detecta o ambiente real pelo prefixo da chave Asaas:
 *   - `$aact_hmlg_` → sandbox/homologação
 *   - qualquer outra coisa → produção
 *
 * Isso evita o erro "invalid_environment" quando a chave foi
 * acidentalmente colocada na env var "errada" (ex.: chave sandbox em
 * `ASAAS_API_KEY` de prod) — o nome da var não importa, só o prefixo.
 */
function detectEnv(key: string): "sandbox" | "production" {
  return key.includes("hmlg") ? "sandbox" : "production"
}

function resolveCredentials() {
  const key = process.env.ASAAS_API_KEY ?? process.env.ASAAS_API_KEY_SANDBOX
  if (!key) {
    throw new Error(
      "Asaas: faltam credenciais. Defina ASAAS_API_KEY ou ASAAS_API_KEY_SANDBOX.",
    )
  }
  const env = detectEnv(key)
  return {
    key,
    env,
    baseUrl: env === "production" ? PROD_BASE_URL : SANDBOX_BASE_URL,
  }
}

async function asaasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const { key, baseUrl } = resolveCredentials()
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: key,
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Asaas ${res.status} ${path}: ${body}`)
  }
  return res.json() as Promise<T>
}

// ── Types (subset usado pela aplicação) ──────────────────────────────────────

export type AsaasBillingType = "PIX" | "BOLETO" | "CREDIT_CARD"

export type AsaasAddress = {
  postalCode?: string
  address?: string
  addressNumber?: string
  complement?: string
  province?: string // bairro
}

export type AsaasCustomer = {
  id: string
  name: string
  cpfCnpj: string
  email: string
  mobilePhone?: string
  postalCode?: string
  address?: string
  addressNumber?: string
  province?: string
  city?: string
  state?: string
}

export type AsaasSubscriptionCycle =
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "SEMIANNUALLY"
  | "YEARLY"

export type AsaasSubscription = {
  id: string
  customer: string
  billingType: AsaasBillingType
  value: number
  nextDueDate: string
  cycle: AsaasSubscriptionCycle
  description?: string
  status: "ACTIVE" | "INACTIVE" | "EXPIRED"
}

export type AsaasPaymentStatus =
  | "PENDING"
  | "RECEIVED"
  | "CONFIRMED"
  | "OVERDUE"
  | "REFUNDED"
  | "RECEIVED_IN_CASH"
  | "REFUND_REQUESTED"
  | "REFUND_IN_PROGRESS"
  | "CHARGEBACK_REQUESTED"
  | "CHARGEBACK_DISPUTE"
  | "AWAITING_CHARGEBACK_REVERSAL"
  | "DUNNING_REQUESTED"
  | "DUNNING_RECEIVED"
  | "AWAITING_RISK_ANALYSIS"

export type AsaasPayment = {
  id: string
  customer: string
  subscription?: string
  value: number
  netValue?: number
  billingType: AsaasBillingType
  status: AsaasPaymentStatus
  dueDate: string
  paymentDate?: string
  invoiceUrl?: string
  bankSlipUrl?: string
  transactionReceiptUrl?: string
  invoiceNumber?: string
  externalReference?: string
  description?: string
}

export type AsaasPixQrCode = {
  encodedImage: string // base64 PNG
  payload: string // copia-e-cola
  expirationDate?: string
}

// ── API ──────────────────────────────────────────────────────────────────────

export const asaas = {
  customers: {
    create(payload: {
      name: string
      cpfCnpj: string
      email: string
      mobilePhone?: string
      postalCode?: string
      address?: string
      addressNumber?: string
      province?: string
      city?: string
      state?: string
      externalReference?: string
      /** Quando true, o Asaas NÃO dispara emails/SMS automáticos pro cliente. */
      notificationDisabled?: boolean
    }) {
      return asaasFetch<AsaasCustomer>("/customers", {
        method: "POST",
        body: JSON.stringify(payload),
      })
    },
  },
  subscriptions: {
    create(payload: {
      customer: string
      billingType: AsaasBillingType
      value: number
      nextDueDate: string // YYYY-MM-DD
      cycle: AsaasSubscriptionCycle
      description?: string
      externalReference?: string
    }) {
      return asaasFetch<AsaasSubscription>("/subscriptions", {
        method: "POST",
        body: JSON.stringify(payload),
      })
    },
    listPayments(subscriptionId: string) {
      return asaasFetch<{ data: AsaasPayment[]; hasMore: boolean }>(
        `/subscriptions/${subscriptionId}/payments`,
      )
    },
  },
  payments: {
    get(id: string) {
      return asaasFetch<AsaasPayment>(`/payments/${id}`)
    },
    pixQrCode(id: string) {
      return asaasFetch<AsaasPixQrCode>(`/payments/${id}/pixQrCode`)
    },
    bankSlipIdentificationField(id: string) {
      return asaasFetch<{ identificationField: string; barCode: string }>(
        `/payments/${id}/identificationField`,
      )
    },
  },
}

export function getAsaasEnv(): "production" | "sandbox" {
  return resolveCredentials().env
}
