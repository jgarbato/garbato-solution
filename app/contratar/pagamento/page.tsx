"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, QrCode, FileText, CreditCard, Copy, Check } from "lucide-react"
import Navbar from "@/components/Navbar"

const PLAN_LABELS: Record<string, string> = {
  essencial: "Essencial",
  avancado: "Avançado",
  experts: "Experts",
  profissional: "Profissional",
  enterprise: "Enterprise",
}

const PLAN_PRICES: Record<string, Record<string, number>> = {
  clinic: { essencial: 70, avancado: 110, experts: 170 },
  mob: { essencial: 249, profissional: 399, enterprise: 549 },
}

const PLAN_PRICES_ANUAL: Record<string, Record<string, number>> = {
  clinic: { essencial: 56, avancado: 88, experts: 136 },
  mob: { essencial: 199, profissional: 319, enterprise: 439 },
}

type MetodoPagamento = "pix" | "boleto" | "cartao"

function PagamentoContent() {
  const router = useRouter()
  const params = useSearchParams()

  const sistema = params.get("sistema") ?? "clinic"
  const plano = params.get("plano") ?? "essencial"
  const periodo = params.get("periodo") ?? "mensal"

  const priceMap = periodo === "anual" ? PLAN_PRICES_ANUAL : PLAN_PRICES
  const price = priceMap[sistema]?.[plano] ?? 0
  const sistemaLabel = sistema === "clinic" ? "BlessSystemClinic" : "BlessSystemMob"
  const sistemaColor = sistema === "clinic" ? "#7C3AED" : "#06B6D4"

  const [metodo, setMetodo] = useState<MetodoPagamento>("pix")
  const [cadastro, setCadastro] = useState<Record<string, string> | null>(null)
  const [copiado, setCopiado] = useState(false)
  const [processando, setProcessando] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem("gs_cadastro")
    if (!raw) { router.push("/contratar"); return }
    setCadastro(JSON.parse(raw))
  }, [router])

  const pixCode = "00020126580014BR.GOV.BCB.PIX0136placeholder-pix-key-aqui5204000053039865802BR5925GARBATO SOLUTION LTDA6009SAO PAULO62070503***6304XXXX"

  const handleCopiar = () => {
    navigator.clipboard.writeText(pixCode)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const handlePagar = () => {
    setProcessando(true)
    setTimeout(() => {
      sessionStorage.setItem("gs_pedido", JSON.stringify({ sistema, plano, periodo, price, metodo, cadastro }))
      router.push(`/contratar/confirmacao?sistema=${sistema}&plano=${plano}&periodo=${periodo}&metodo=${metodo}`)
    }, 1800)
  }

  if (!cadastro) return null

  return (
    <main className="min-h-screen" style={{ background: "#08080E" }}>
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[13px] text-[#8B9BC0] hover:text-[#ECF0FF] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao cadastro
          </button>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5 mb-6"
            style={{ background: `${sistemaColor}08`, border: `1px solid ${sistemaColor}30` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: sistemaColor }}>
                  {sistemaLabel} — Plano {PLAN_LABELS[plano]}
                </div>
                <div className="text-[13px] text-[#8B9BC0]">
                  {cadastro.nome} · {cadastro.email}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#ECF0FF]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  R$ {price.toLocaleString("pt-BR")}
                </div>
                <div className="text-[11px] text-[#4A5580]">
                  {periodo === "anual" ? `R$ ${(price * 12).toLocaleString("pt-BR")}/ano` : "por mês"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment method selector */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--gs-border)" }}
          >
            <h2
              className="text-2xl font-bold text-[#ECF0FF] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Forma de pagamento
            </h2>

            {/* Method tabs */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {([
                { id: "pix", label: "PIX", icon: QrCode, desc: "Aprovação imediata" },
                { id: "boleto", label: "Boleto", icon: FileText, desc: "Vence em 3 dias" },
                { id: "cartao", label: "Cartão", icon: CreditCard, desc: "Crédito ou débito" },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMetodo(m.id)}
                  className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl transition-all cursor-pointer"
                  style={{
                    background: metodo === m.id ? `${sistemaColor}12` : "rgba(255,255,255,0.04)",
                    border: metodo === m.id ? `1px solid ${sistemaColor}40` : "1px solid var(--gs-border)",
                    color: metodo === m.id ? sistemaColor : "#8B9BC0",
                  }}
                >
                  <m.icon className="w-5 h-5" />
                  <span className="text-[13px] font-semibold">{m.label}</span>
                  <span className="text-[10px] opacity-70">{m.desc}</span>
                </button>
              ))}
            </div>

            {/* PIX */}
            {metodo === "pix" && (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-48 h-48 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--gs-border)" }}
                >
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-[#4A5580] mx-auto mb-2" />
                    <p className="text-[10px] text-[#4A5580]">QR Code gerado após confirmação</p>
                  </div>
                </div>
                <p className="text-[12px] text-[#8B9BC0] text-center max-w-xs">
                  Clique em "Gerar cobrança" para criar o QR Code PIX. O acesso é liberado automaticamente após o pagamento.
                </p>
              </div>
            )}

            {/* Boleto */}
            {metodo === "boleto" && (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-full rounded-xl p-5 flex flex-col items-center gap-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--gs-border)" }}
                >
                  <FileText className="w-12 h-12 text-[#4A5580]" />
                  <p className="text-[13px] text-[#8B9BC0] text-center">
                    O boleto bancário será gerado e enviado para o seu e-mail. Prazo de compensação: até 3 dias úteis.
                  </p>
                </div>
              </div>
            )}

            {/* Cartão */}
            {metodo === "cartao" && (
              <div className="flex flex-col gap-4">
                <div
                  className="w-full rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--gs-border)" }}
                >
                  <p className="text-[13px] text-[#8B9BC0] text-center">
                    Você será redirecionado para o ambiente seguro de pagamento. Aceitamos Visa, Mastercard e Elo.
                  </p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <button
              onClick={handlePagar}
              disabled={processando}
              className="mt-8 w-full py-3.5 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70"
              style={{ background: sistemaColor, color: "white" }}
            >
              {processando ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  {metodo === "pix" ? "Gerar QR Code PIX" : metodo === "boleto" ? "Gerar Boleto" : "Pagar com Cartão"}
                </>
              )}
            </button>

            <p className="text-[11px] text-[#4A5580] text-center mt-3">
              🔒 Pagamento processado com segurança via Asaas
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default function PagamentoPage() {
  return (
    <Suspense>
      <PagamentoContent />
    </Suspense>
  )
}
