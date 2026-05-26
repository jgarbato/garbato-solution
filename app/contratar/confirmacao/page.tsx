"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, Mail, MessageCircle, ExternalLink, Clock } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { getProduct, getPlan } from "@/lib/products/registry"

const METODO_LABELS: Record<string, string> = {
  pix: "PIX",
  boleto: "Boleto Bancário",
  cartao: "Cartão de Crédito",
}

type PaymentStatusResponse = {
  paymentId: string
  status: string
  paidAt: string | null
  billingType: string
  valueCents: number
  accessGranted: string | null
  subscriptionStatus: string | null
}

const PAID_STATUSES = new Set(["RECEIVED", "CONFIRMED", "RECEIVED_IN_CASH"])
const POLL_INTERVAL_MS = 4000
const POLL_MAX_DURATION_MS = 5 * 60 * 1000 // 5 minutos

function ConfirmacaoContent() {
  const params = useSearchParams()
  const sistema = params.get("sistema") ?? "clinic"
  const plano = params.get("plano") ?? "essencial"
  const periodo = params.get("periodo") ?? "mensal"
  const metodo = params.get("metodo") ?? "pix"
  const paymentId = params.get("paymentId") ?? ""

  const product = getProduct(sistema)
  const plan = getPlan(sistema, plano)
  const planLabel = plan?.name ?? plano
  const sistemaLabel = product.name
  const sistemaColor = sistema === "mob" ? "#06B6D4" : "#7C3AED"
  const appUrl = product.appUrl

  const [status, setStatus] = useState<PaymentStatusResponse | null>(null)
  const startedAtRef = useRef<number>(Date.now())

  const confirmado = status ? PAID_STATUSES.has(status.status) || !!status.accessGranted : false

  useEffect(() => {
    if (!paymentId) return
    let timer: ReturnType<typeof setTimeout> | null = null
    let stopped = false

    const tick = async () => {
      if (stopped) return
      try {
        const res = await fetch(`/api/payments/${paymentId}`, { cache: "no-store" })
        if (res.ok) {
          const data = (await res.json()) as PaymentStatusResponse
          setStatus(data)
          if (PAID_STATUSES.has(data.status) || data.accessGranted) {
            return // confirmado, para o polling
          }
        }
      } catch (err) {
        console.warn("[confirmacao] erro no polling", err)
      }
      if (Date.now() - startedAtRef.current > POLL_MAX_DURATION_MS) return
      timer = setTimeout(tick, POLL_INTERVAL_MS)
    }

    tick()
    return () => {
      stopped = true
      if (timer) clearTimeout(timer)
    }
  }, [paymentId])

  const aguardando = !!paymentId && !confirmado

  return (
    <main className="min-h-screen" style={{ background: "#FFFFFF" }}>
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${sistemaColor}, transparent)` }}
        />

        <div className="max-w-xl mx-auto text-center relative z-10">
          {/* Status icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-6"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center bg-white"
              style={{
                border: aguardando
                  ? "2px solid rgba(245,158,11,0.45)"
                  : `2px solid ${sistemaColor}45`,
                boxShadow: aguardando
                  ? "0 12px 32px rgba(245,158,11,0.25)"
                  : `0 12px 32px ${sistemaColor}25`,
              }}
            >
              {aguardando ? (
                <Clock className="w-10 h-10 text-[#F59E0B]" />
              ) : (
                <CheckCircle2 className="w-10 h-10" style={{ color: sistemaColor }} />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#0A0B14] mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {aguardando ? "Aguardando pagamento" : "Pagamento confirmado!"}
            </h1>
            <p className="text-[#5B6478] text-lg mb-8">
              {aguardando
                ? `Estamos monitorando seu pagamento via ${METODO_LABELS[metodo]}. Esta página atualiza sozinha quando confirmar.`
                : `Sua assinatura do ${sistemaLabel} — Plano ${planLabel} está ativa.`}
            </p>
          </motion.div>

          {/* Polling indicator */}
          {aguardando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-6 text-[12px] text-[#8D95A8]"
            >
              <div className="w-3 h-3 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
              Verificando status do pagamento...
            </motion.div>
          )}

          {/* Details card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6 text-left mb-8 bg-white"
            style={{
              border: "1px solid var(--gs-border)",
              boxShadow: "var(--gs-shadow-sm)",
            }}
          >
            <div className="text-[11px] font-bold text-[#8D95A8] uppercase tracking-wider mb-4">
              Resumo do pedido
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Sistema", value: sistemaLabel },
                { label: "Plano", value: planLabel },
                { label: "Período", value: periodo === "anual" ? "Anual" : "Mensal" },
                { label: "Pagamento", value: METODO_LABELS[metodo] },
                ...(status
                  ? [
                      {
                        label: "Status",
                        value: confirmado ? "Confirmado" : "Aguardando",
                      },
                    ]
                  : []),
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-[#5B6478]">{item.label}</span>
                  <span
                    className="text-[13px] font-semibold"
                    style={{
                      color: item.label === "Status" && confirmado ? "#059669" : "#0A0B14",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Next steps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-3 mb-8"
          >
            <div
              className="rounded-xl p-4 flex items-center gap-3 text-left bg-white"
              style={{
                border: "1px solid var(--gs-border)",
                boxShadow: "var(--gs-shadow-sm)",
              }}
            >
              <Mail className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-[#0A0B14]">
                  {confirmado ? "Confira seu e-mail" : "Você receberá instruções por e-mail"}
                </div>
                <div className="text-[12px] text-[#5B6478]">
                  {confirmado
                    ? "Enviamos as instruções de acesso para o e-mail cadastrado."
                    : "Assim que o pagamento for confirmado, o acesso vai direto para o seu e-mail."}
                </div>
              </div>
            </div>
            <div
              className="rounded-xl p-4 flex items-center gap-3 text-left bg-white"
              style={{
                border: "1px solid var(--gs-border)",
                boxShadow: "var(--gs-shadow-sm)",
              }}
            >
              <MessageCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-[#0A0B14]">Nossa equipe vai entrar em contato</div>
                <div className="text-[12px] text-[#5B6478]">Em até 24h úteis para agendar a implantação e treinamento.</div>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold transition-all hover:opacity-90"
              style={{
                background: confirmado ? sistemaColor : "#F2F4F8",
                color: confirmado ? "white" : "#5B6478",
                border: confirmado ? "none" : "1px solid var(--gs-border)",
                boxShadow: confirmado ? `0 8px 24px ${sistemaColor}40` : "none",
                pointerEvents: confirmado ? "auto" : "none",
                opacity: confirmado ? 1 : 0.55,
              }}
            >
              Acessar {sistemaLabel}
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/5543988720576?text=Olá, acabei de contratar o plano e quero mais informações"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold transition-all hover:opacity-90"
              style={{
                background: "#F2F4F8",
                color: "#0A0B14",
                border: "1px solid var(--gs-border)",
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[12px] text-[#8D95A8] mt-4"
          >
            {confirmado
              ? "Pode acessar o sistema agora ou usar o link que enviamos por e-mail."
              : "Acesso liberado após a confirmação do pagamento. Em caso de dúvidas, fale com nossa equipe."}
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ConfirmacaoPage() {
  return (
    <Suspense>
      <ConfirmacaoContent />
    </Suspense>
  )
}
