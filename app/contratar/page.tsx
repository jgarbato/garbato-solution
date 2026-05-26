"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, ArrowRight, Stethoscope, Building2 } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { PRODUCTS, type Periodo, type ProductSlug } from "@/lib/products/registry"

const SISTEMAS = [
  {
    id: "clinic" as const,
    label: PRODUCTS.clinic.name,
    sub: "Clínicas odontológicas e estética",
    icon: Stethoscope,
    color: "#7C3AED",
  },
  {
    id: "mob" as const,
    label: PRODUCTS.mob.name,
    sub: "Imóveis, loteamento e contratos",
    icon: Building2,
    color: "#06B6D4",
  },
]

export default function ContratarPage() {
  const router = useRouter()
  const [sistema, setSistema] = useState<ProductSlug>("clinic")
  const [periodo, setPeriodo] = useState<Periodo>("mensal")

  const product = PRODUCTS[sistema]
  const plans = product.pricing.plans
  const sistemaInfo = SISTEMAS.find((s) => s.id === sistema)!

  const handleAssinar = (planoId: string) => {
    router.push(`/contratar/cadastro?sistema=${sistema}&plano=${planoId}&periodo=${periodo}`)
  }

  return (
    <main className="min-h-screen" style={{ background: "#FFFFFF" }}>
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-15 blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${sistemaInfo.color}, transparent)` }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative z-10"
          >
            <span className="badge-blue mb-4 inline-flex">Planos e preços</span>
            <h1
              className="text-4xl sm:text-5xl font-bold text-[#0A0B14] mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Escolha o plano ideal{" "}
              <span className="text-gradient-blue">para o seu negócio</span>
            </h1>
            <p className="text-[#5B6478] text-lg max-w-xl mx-auto">
              Soluções completas para clínicas e gestão imobiliária. Sem contrato de fidelidade no plano mensal.
            </p>
          </motion.div>

          {/* System selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8 relative z-10"
          >
            <div
              className="flex rounded-xl p-1 gap-1 bg-white"
              style={{
                border: "1px solid var(--gs-border)",
                boxShadow: "var(--gs-shadow-sm)",
              }}
            >
              {SISTEMAS.map((s) => {
                const active = sistema === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setSistema(s.id)}
                    className="px-6 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2.5"
                    style={{
                      background: active ? `${s.color}12` : "transparent",
                      color: active ? s.color : "#5B6478",
                      border: active ? `1px solid ${s.color}35` : "1px solid transparent",
                    }}
                  >
                    <s.icon className="w-4 h-4" />
                    <span className="flex flex-col items-start">
                      <span className="text-[13px] font-bold leading-tight">{s.label}</span>
                      <span className="text-[10px] font-normal opacity-70 leading-tight">{s.sub}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center gap-3 mb-12 relative z-10"
          >
            <span className={`text-sm font-medium ${periodo === "mensal" ? "text-[#0A0B14]" : "text-[#8D95A8]"}`}>
              Mensal
            </span>
            <button
              onClick={() => setPeriodo((p) => (p === "mensal" ? "anual" : "mensal"))}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ background: periodo === "anual" ? "#3B82F6" : "rgba(15,22,36,0.15)" }}
            >
              <div
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 shadow-[0_1px_3px_rgba(15,22,36,0.20)]"
                style={{ left: periodo === "anual" ? "28px" : "4px" }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${periodo === "anual" ? "text-[#0A0B14]" : "text-[#8D95A8]"}`}>
                Anual
              </span>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(16,185,129,0.10)", color: "#059669", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                20% OFF
              </span>
            </div>
          </motion.div>

          {/* Plan cards */}
          <div className="grid lg:grid-cols-3 gap-5 relative z-10">
            {plans.map((plan, i) => {
              const price = periodo === "anual" ? plan.priceAnnual : plan.price
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.55 }}
                  className="relative rounded-2xl p-7 flex flex-col"
                  style={{
                    background: plan.hot ? `${sistemaInfo.color}06` : "#FFFFFF",
                    border: plan.hot
                      ? `1.5px solid ${sistemaInfo.color}50`
                      : "1px solid var(--gs-border)",
                    boxShadow: plan.hot
                      ? `0 16px 40px ${sistemaInfo.color}20, var(--gs-shadow-md)`
                      : "var(--gs-shadow-sm)",
                  }}
                >
                  {plan.hot && (
                    <>
                      <div
                        className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl"
                        style={{ background: `linear-gradient(90deg, transparent, ${sistemaInfo.color}, transparent)` }}
                      />
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span
                          className="text-[11px] font-bold px-3 py-1 rounded-full text-white whitespace-nowrap"
                          style={{ background: sistemaInfo.color }}
                        >
                          Mais popular
                        </span>
                      </div>
                    </>
                  )}

                  <div className="mb-5">
                    <h3
                      className="text-xl font-bold text-[#0A0B14] mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-[13px] text-[#5B6478]">{plan.desc}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-[13px] text-[#5B6478] mb-1">R$</span>
                      <span
                        className="text-4xl font-bold text-[#0A0B14]"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {price.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-[13px] text-[#5B6478] mb-1">/mês</span>
                    </div>
                    {periodo === "anual" ? (
                      <p className="text-[12px] text-[#059669] mt-1">
                        Cobrado R$ {(plan.priceAnnual * 12).toLocaleString("pt-BR")}/ano
                      </p>
                    ) : (
                      <p className="text-[12px] text-[#8D95A8] mt-1">Pagamento mensal recorrente</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleAssinar(plan.id)}
                    className="w-full py-3 rounded-xl text-[14px] font-semibold transition-all mb-6 flex items-center justify-center gap-2 cursor-pointer hover:opacity-90"
                    style={
                      plan.hot
                        ? {
                            background: sistemaInfo.color,
                            color: "white",
                            boxShadow: `0 8px 24px ${sistemaInfo.color}40`,
                          }
                        : {
                            background: "#F2F4F8",
                            color: "#0A0B14",
                            border: "1px solid var(--gs-border)",
                          }
                    }
                  >
                    Assinar {plan.name}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#10B981]" />
                        <span className="text-[13px] text-[#5B6478] leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 relative z-10"
          >
            <p className="text-[14px] text-[#5B6478] mb-3">
              Ainda com dúvidas? Nossa equipe está pronta para te ajudar.
            </p>
            <a
              href="https://wa.me/5543988720576?text=Olá, quero saber mais sobre os planos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#3B82F6] hover:text-[#1D4ED8] transition-colors"
            >
              Falar no WhatsApp <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
