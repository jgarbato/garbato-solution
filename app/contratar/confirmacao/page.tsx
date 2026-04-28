"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, Mail, MessageCircle, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const PLAN_LABELS: Record<string, string> = {
  essencial: "Essencial",
  avancado: "Avançado",
  experts: "Experts",
  profissional: "Profissional",
  enterprise: "Enterprise",
}

const METODO_LABELS: Record<string, string> = {
  pix: "PIX",
  boleto: "Boleto Bancário",
  cartao: "Cartão de Crédito",
}

function ConfirmacaoContent() {
  const params = useSearchParams()
  const sistema = params.get("sistema") ?? "clinic"
  const plano = params.get("plano") ?? "essencial"
  const periodo = params.get("periodo") ?? "mensal"
  const metodo = params.get("metodo") ?? "pix"

  const sistemaLabel = sistema === "clinic" ? "BlessSystemClinic" : "BlessSystemMob"
  const sistemaColor = sistema === "clinic" ? "#7C3AED" : "#06B6D4"

  return (
    <main className="min-h-screen" style={{ background: "#08080E" }}>
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${sistemaColor}, transparent)` }}
        />

        <div className="max-w-xl mx-auto text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-6"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: `${sistemaColor}15`, border: `2px solid ${sistemaColor}40` }}
            >
              <CheckCircle2 className="w-10 h-10" style={{ color: sistemaColor }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#ECF0FF] mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Solicitação recebida!
            </h1>
            <p className="text-[#8B9BC0] text-lg mb-8">
              Sua assinatura do {sistemaLabel} — Plano {PLAN_LABELS[plano]} está sendo processada.
            </p>
          </motion.div>

          {/* Details card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-6 text-left mb-8"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--gs-border)" }}
          >
            <div className="text-[11px] font-bold text-[#4A5580] uppercase tracking-wider mb-4">
              Resumo do pedido
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Sistema", value: sistemaLabel },
                { label: "Plano", value: PLAN_LABELS[plano] },
                { label: "Período", value: periodo === "anual" ? "Anual" : "Mensal" },
                { label: "Pagamento", value: METODO_LABELS[metodo] },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-[#8B9BC0]">{item.label}</span>
                  <span className="text-[13px] font-semibold text-[#ECF0FF]">{item.value}</span>
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
              className="rounded-xl p-4 flex items-center gap-3 text-left"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--gs-border)" }}
            >
              <Mail className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-[#ECF0FF]">Confirme seu e-mail</div>
                <div className="text-[12px] text-[#8B9BC0]">Enviamos as instruções de acesso para o e-mail cadastrado.</div>
              </div>
            </div>
            <div
              className="rounded-xl p-4 flex items-center gap-3 text-left"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--gs-border)" }}
            >
              <MessageCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-[#ECF0FF]">Nossa equipe vai entrar em contato</div>
                <div className="text-[12px] text-[#8B9BC0]">Em até 24h úteis para agendar a implantação e treinamento.</div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="https://wa.me/5543988720576?text=Olá, acabei de contratar o plano e quero mais informações"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold transition-all"
              style={{ background: "#25D366", color: "white" }}
            >
              <MessageCircle className="w-4 h-4" />
              Falar com a equipe no WhatsApp
            </a>
          </motion.div>
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
