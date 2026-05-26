"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  QrCode,
  FileText,
  CreditCard,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import { getProduct, getPlan, type Periodo } from "@/lib/products/registry"

type MetodoPagamento = "pix" | "boleto" | "cartao"

type CobrancaResposta = {
  paymentId: string
  subscriptionId: string
  status: string
  billingType: "PIX" | "BOLETO" | "CREDIT_CARD"
  valueCents: number
  valueReais: number
  dueDate: string
  invoiceUrl: string | null
  bankSlipUrl: string | null
  pixQrCodeImage: string | null // base64 (sem prefixo data:)
  pixPayload: string | null
}

function PagamentoContent() {
  const router = useRouter()
  const params = useSearchParams()

  const sistema = params.get("sistema") ?? "clinic"
  const plano = params.get("plano") ?? "essencial"
  const periodo: Periodo = params.get("periodo") === "anual" ? "anual" : "mensal"

  const product = getProduct(sistema)
  const plan = getPlan(sistema, plano)
  const price = plan ? (periodo === "anual" ? plan.priceAnnual : plan.price) : 0
  const planLabel = plan?.name ?? plano
  const sistemaLabel = product.name
  const sistemaColor = sistema === "mob" ? "#06B6D4" : "#7C3AED"

  const [metodo, setMetodo] = useState<MetodoPagamento>("pix")
  const [cadastro, setCadastro] = useState<Record<string, string> | null>(null)
  const [processando, setProcessando] = useState(false)
  const [cobranca, setCobranca] = useState<CobrancaResposta | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [pixCopiado, setPixCopiado] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem("gs_cadastro")
    if (!raw) {
      router.push("/contratar")
      return
    }
    setCadastro(JSON.parse(raw))
  }, [router])

  const handleGerar = async () => {
    if (!cadastro) return
    setProcessando(true)
    setErro(null)
    try {
      const res = await fetch("/api/contratar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sistema, plano, periodo, metodo, cadastro }),
      })
      const data = await res.json()
      if (!res.ok) {
        const baseMsg = data.error ?? "Falha ao gerar cobrança"
        const detail = data.detail ? ` — ${data.detail}` : ""
        setErro(`${baseMsg}${detail}`)
        setProcessando(false)
        return
      }
      const resp = data as CobrancaResposta
      setCobranca(resp)
      sessionStorage.setItem(
        "gs_pedido",
        JSON.stringify({
          paymentId: resp.paymentId,
          subscriptionId: resp.subscriptionId,
          sistema,
          plano,
          periodo,
          metodo,
        }),
      )
      // Cartão: abre o checkout hospedado do Asaas em nova aba.
      if (resp.billingType === "CREDIT_CARD" && resp.invoiceUrl) {
        window.open(resp.invoiceUrl, "_blank", "noopener,noreferrer")
      }
    } catch (err) {
      console.error("[pagamento] erro", err)
      setErro("Erro de rede. Tente novamente.")
    } finally {
      setProcessando(false)
    }
  }

  const handleCopiarPix = async () => {
    if (!cobranca?.pixPayload) return
    await navigator.clipboard.writeText(cobranca.pixPayload)
    setPixCopiado(true)
    setTimeout(() => setPixCopiado(false), 2200)
  }

  const irParaConfirmacao = () => {
    router.push(
      `/contratar/confirmacao?sistema=${sistema}&plano=${plano}&periodo=${periodo}&metodo=${metodo}&paymentId=${cobranca?.paymentId ?? ""}`,
    )
  }

  if (!cadastro) return null

  return (
    <main className="min-h-screen" style={{ background: "#FFFFFF" }}>
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[13px] text-[#5B6478] hover:text-[#0A0B14] transition-colors mb-8 cursor-pointer"
            disabled={processando}
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao cadastro
          </button>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5 mb-6"
            style={{
              background: `${sistemaColor}06`,
              border: `1px solid ${sistemaColor}35`,
              boxShadow: "var(--gs-shadow-sm)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-[11px] font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: sistemaColor }}
                >
                  {sistemaLabel} — Plano {planLabel}
                </div>
                <div className="text-[13px] text-[#5B6478]">
                  {cadastro.nome} · {cadastro.email}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-2xl font-bold text-[#0A0B14]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  R$ {price.toLocaleString("pt-BR")}
                </div>
                <div className="text-[11px] text-[#8D95A8]">
                  {periodo === "anual" ? `R$ ${(price * 12).toLocaleString("pt-BR")}/ano` : "por mês"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-8 bg-white"
            style={{
              border: "1px solid var(--gs-border)",
              boxShadow: "var(--gs-shadow-md)",
            }}
          >
            {!cobranca ? (
              <>
                <h2
                  className="text-2xl font-bold text-[#0A0B14] mb-6"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Forma de pagamento
                </h2>

                {/* Method tabs */}
                <div className="grid grid-cols-3 gap-2 mb-8">
                  {(
                    [
                      { id: "pix", label: "PIX", icon: QrCode, desc: "Aprovação imediata" },
                      { id: "boleto", label: "Boleto", icon: FileText, desc: "Vence em 3 dias" },
                      { id: "cartao", label: "Cartão", icon: CreditCard, desc: "Crédito ou débito" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMetodo(m.id)}
                      disabled={processando}
                      className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl transition-all cursor-pointer disabled:opacity-60"
                      style={{
                        background: metodo === m.id ? `${sistemaColor}10` : "#F7F8FA",
                        border:
                          metodo === m.id
                            ? `1px solid ${sistemaColor}45`
                            : "1px solid var(--gs-border)",
                        color: metodo === m.id ? sistemaColor : "#5B6478",
                      }}
                    >
                      <m.icon className="w-5 h-5" />
                      <span className="text-[13px] font-semibold">{m.label}</span>
                      <span className="text-[10px] opacity-70">{m.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Info por método */}
                {metodo === "pix" && (
                  <p className="text-[12px] text-[#5B6478] text-center max-w-xs mx-auto">
                    Clique em &ldquo;Gerar QR Code PIX&rdquo; para criar a cobrança. O acesso é liberado
                    automaticamente após a confirmação do pagamento.
                  </p>
                )}
                {metodo === "boleto" && (
                  <p className="text-[13px] text-[#5B6478] text-center max-w-xs mx-auto">
                    O boleto será gerado e exibido. Você também recebe por e-mail. Prazo de compensação:
                    até 3 dias úteis.
                  </p>
                )}
                {metodo === "cartao" && (
                  <p className="text-[13px] text-[#5B6478] text-center max-w-xs mx-auto">
                    Você será redirecionado para o ambiente seguro do Asaas para inserir os dados do cartão.
                  </p>
                )}

                {erro && (
                  <div
                    className="mt-4 rounded-xl p-3 flex items-center gap-2"
                    style={{
                      background: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.30)",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-[13px] text-red-600">{erro}</span>
                  </div>
                )}

                <button
                  onClick={handleGerar}
                  disabled={processando}
                  className="mt-8 w-full py-3.5 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 hover:opacity-90"
                  style={{
                    background: sistemaColor,
                    color: "white",
                    boxShadow: `0 8px 24px ${sistemaColor}40`,
                  }}
                >
                  {processando ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Gerando cobrança...
                    </>
                  ) : (
                    <>
                      {metodo === "pix"
                        ? "Gerar QR Code PIX"
                        : metodo === "boleto"
                        ? "Gerar Boleto"
                        : "Pagar com Cartão"}
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#8D95A8] text-center mt-3">
                  🔒 Pagamento processado com segurança via Asaas
                </p>
              </>
            ) : (
              <CobrancaGerada
                cobranca={cobranca}
                sistemaColor={sistemaColor}
                pixCopiado={pixCopiado}
                onCopiarPix={handleCopiarPix}
                onIrParaConfirmacao={irParaConfirmacao}
              />
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function CobrancaGerada({
  cobranca,
  sistemaColor,
  pixCopiado,
  onCopiarPix,
  onIrParaConfirmacao,
}: {
  cobranca: CobrancaResposta
  sistemaColor: string
  pixCopiado: boolean
  onCopiarPix: () => void
  onIrParaConfirmacao: () => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h2
          className="text-2xl font-bold text-[#0A0B14] mb-1"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {cobranca.billingType === "PIX"
            ? "PIX gerado"
            : cobranca.billingType === "BOLETO"
            ? "Boleto gerado"
            : "Cartão"}
        </h2>
        <p className="text-[13px] text-[#5B6478]">
          Vencimento em{" "}
          {new Date(cobranca.dueDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}
        </p>
      </div>

      {/* PIX */}
      {cobranca.billingType === "PIX" && cobranca.pixQrCodeImage && (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${cobranca.pixQrCodeImage}`}
            alt="QR Code PIX"
            className="w-56 h-56 rounded-xl"
            style={{ border: "1px solid var(--gs-border)" }}
          />
          {cobranca.pixPayload && (
            <button
              onClick={onCopiarPix}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-[12.5px] font-mono transition-all hover:bg-[#F2F4F8] cursor-pointer"
              style={{
                background: "#F7F8FA",
                border: "1px solid var(--gs-border)",
                color: "#0A0B14",
              }}
            >
              <span className="truncate text-left">{cobranca.pixPayload}</span>
              <span
                className="flex items-center gap-1 text-[12px] font-semibold flex-shrink-0"
                style={{ color: sistemaColor }}
              >
                {pixCopiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {pixCopiado ? "Copiado!" : "Copiar"}
              </span>
            </button>
          )}
          <p className="text-[12px] text-[#5B6478] text-center max-w-xs">
            Abra o app do seu banco, escolha PIX, escaneie o QR Code ou cole o código copia-e-cola.
          </p>
        </div>
      )}

      {/* Boleto */}
      {cobranca.billingType === "BOLETO" && cobranca.bankSlipUrl && (
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-full rounded-xl p-5 flex flex-col items-center gap-3"
            style={{ background: "#F7F8FA", border: "1px solid var(--gs-border)" }}
          >
            <FileText className="w-12 h-12 text-[#8D95A8]" />
            <p className="text-[13px] text-[#5B6478] text-center">
              Boleto gerado. Clique abaixo para abrir o PDF e pagar.
            </p>
          </div>
          <a
            href={cobranca.bankSlipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold transition-all hover:opacity-90"
            style={{
              background: sistemaColor,
              color: "white",
              boxShadow: `0 8px 24px ${sistemaColor}40`,
            }}
          >
            Abrir boleto <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Cartão */}
      {cobranca.billingType === "CREDIT_CARD" && (
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-full rounded-xl p-5 flex flex-col items-center gap-3"
            style={{ background: "#F7F8FA", border: "1px solid var(--gs-border)" }}
          >
            <CreditCard className="w-12 h-12 text-[#8D95A8]" />
            <p className="text-[13px] text-[#5B6478] text-center">
              Uma nova aba foi aberta com o ambiente seguro do Asaas para inserir os dados do cartão.
              Se não abriu, clique no botão abaixo.
            </p>
          </div>
          {cobranca.invoiceUrl && (
            <a
              href={cobranca.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold transition-all hover:opacity-90"
              style={{
                background: sistemaColor,
                color: "white",
                boxShadow: `0 8px 24px ${sistemaColor}40`,
              }}
            >
              Pagar com cartão <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      <button
        onClick={onIrParaConfirmacao}
        className="mt-2 w-full py-3 rounded-xl text-[14px] font-semibold transition-all cursor-pointer hover:bg-[#F2F4F8]"
        style={{
          background: "#F7F8FA",
          color: "#0A0B14",
          border: "1px solid var(--gs-border)",
        }}
      >
        Já paguei / Ver status
      </button>
    </div>
  )
}

export default function PagamentoPage() {
  return (
    <Suspense>
      <PagamentoContent />
    </Suspense>
  )
}
