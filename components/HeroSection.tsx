"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  MessageCircle,
  TrendingUp,
  CheckCircle2,
  Layers,
  Cpu,
  BarChart3,
  Users,
  FileText,
  Bell,
  Circle,
} from "lucide-react"

const WA_LINK =
  "https://wa.me/5543988720576?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto"

const BADGES = [
  "Sistemas sob medida",
  "Arquitetura escalável",
  "Integrações inteligentes",
  "Foco em operação real",
]

const FLOAT_CARDS = [
  {
    icon: TrendingUp,
    color: "#10B981",
    label: "+47",
    sub: "processos automatizados",
  },
  {
    icon: Layers,
    color: "#3B82F6",
    label: "100%",
    sub: "sob medida",
  },
  {
    icon: CheckCircle2,
    color: "#06B6D4",
    label: "98%",
    sub: "satisfação dos clientes",
  },
]

function DashboardMockup() {
  return (
    <div className="w-full max-w-[580px] rounded-2xl overflow-hidden bg-white shadow-[0_24px_60px_rgba(15,22,36,0.12),0_4px_12px_rgba(15,22,36,0.04)] border border-[rgba(15,22,36,0.08)]">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(15,22,36,0.06)] bg-[#F7F8FA]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-1 rounded bg-white border border-[rgba(15,22,36,0.08)] text-[10px] text-[#5B6478] font-mono">
            app.garbatosolution.com.br/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard layout */}
      <div className="flex h-[340px]">
        {/* Sidebar (mantém em cor brand pra dar contraste e identidade visual) */}
        <div className="w-14 flex-shrink-0 bg-gradient-to-b from-[#3B82F6] to-[#7C3AED] flex flex-col items-center py-4 gap-3">
          <div className="w-7 h-7 rounded-lg bg-white/25 flex items-center justify-center">
            <Circle className="w-3 h-3 text-white fill-white" />
          </div>
          {[BarChart3, Users, FileText, Layers, Cpu].map((Icon, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                i === 0
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-hidden flex flex-col bg-[#FAFBFC]">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(15,22,36,0.06)] bg-white">
            <div>
              <div className="text-[11px] font-semibold text-[#0A0B14]">
                Dashboard Operacional
              </div>
              <div className="text-[9px] text-[#8D95A8]">
                Visão geral — Abril 2025
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-3.5 h-3.5 text-[#5B6478]" />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              </div>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7C3AED]" />
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-4 gap-2 px-3 py-2.5">
            {[
              { label: "Receita", value: "R$ 284k", change: "+12%", up: true },
              { label: "Contratos", value: "142", change: "+8", up: true },
              { label: "Pendências", value: "23", change: "-5", up: false },
              { label: "Eficiência", value: "94%", change: "+3%", up: true },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-lg p-2 border border-[rgba(15,22,36,0.06)] shadow-[0_1px_2px_rgba(15,22,36,0.03)]"
              >
                <div className="text-[8px] text-[#8D95A8] mb-1">{m.label}</div>
                <div className="text-[11px] font-bold text-[#0A0B14]">
                  {m.value}
                </div>
                <div
                  className={`text-[8px] font-medium ${
                    m.up ? "text-[#059669]" : "text-[#D97706]"
                  }`}
                >
                  {m.change}
                </div>
              </div>
            ))}
          </div>

          {/* Chart + list */}
          <div className="flex gap-2 px-3 pb-3 flex-1 min-h-0">
            {/* Chart area */}
            <div className="flex-1 bg-white rounded-xl border border-[rgba(15,22,36,0.06)] p-3 flex flex-col shadow-[0_1px_2px_rgba(15,22,36,0.03)]">
              <div className="text-[9px] text-[#5B6478] font-semibold mb-2">
                Crescimento Mensal
              </div>
              <div className="flex-1 flex items-end gap-1">
                {[35, 55, 42, 68, 52, 80, 65, 90, 72, 95, 83, 100].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 11
                            ? "linear-gradient(to top, #3B82F6, #06B6D4)"
                            : i >= 9
                            ? "rgba(59,130,246,0.55)"
                            : "rgba(59,130,246,0.28)",
                      }}
                    />
                  )
                )}
              </div>
              <div className="flex justify-between mt-1">
                {["Jan", "Abr", "Jul", "Out", "Dez"].map((m) => (
                  <div key={m} className="text-[7px] text-[#8D95A8]">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent list */}
            <div className="w-28 bg-white rounded-xl border border-[rgba(15,22,36,0.06)] p-2.5 shadow-[0_1px_2px_rgba(15,22,36,0.03)]">
              <div className="text-[8px] text-[#5B6478] font-semibold mb-2">
                Recentes
              </div>
              {[
                { name: "Contrato #284", status: "ok" },
                { name: "Proposta #92", status: "pending" },
                { name: "NF-e emitida", status: "ok" },
                { name: "Lead qualif.", status: "ok" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 py-1 border-b border-[rgba(15,22,36,0.05)] last:border-0"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      item.status === "ok"
                        ? "bg-[#10B981]"
                        : "bg-[#F59E0B]"
                    }`}
                  />
                  <div className="text-[7.5px] text-[#5B6478] truncate">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Grid */}
        <div className="absolute inset-0 grid-overlay opacity-100" />

        {/* Glow blobs (sutis sobre branco) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-[#3B82F6]/[0.10] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-[#7C3AED]/[0.08] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[80px] bg-[#06B6D4]/[0.08] pointer-events-none" />

        {/* Radial vignette top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* LEFT — copy */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.6, ease: "easeOut" }}
            >
              <span className="badge-blue">
                <Cpu className="w-3 h-3" />
                Software House Premium
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6, ease: "easeOut" }}
              className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-[#0A0B14]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Sistemas sob medida para empresas que querem crescer com{" "}
              <span className="text-gradient-blue">organização, controle</span>{" "}
              e tecnologia.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.6, ease: "easeOut" }}
              className="text-[#5B6478] text-lg leading-relaxed max-w-[500px]"
            >
              Transformamos processos dispersos em plataformas profissionais,
              modernas e escaláveis, desenhadas para a operação real do seu
              negócio.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => {
                  document
                    .querySelector("#contato")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-xl transition-all shadow-[0_8px_24px_rgba(59,130,246,0.35)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 cursor-pointer"
              >
                Solicitar Projeto
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-[rgba(15,22,36,0.14)] hover:border-[rgba(15,22,36,0.22)] text-[#0A0B14] font-medium rounded-xl transition-all hover:bg-[rgba(15,22,36,0.03)] hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Falar pelo WhatsApp
              </a>
            </motion.div>

            {/* Badges row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[rgba(15,22,36,0.08)] text-[12px] text-[#5B6478] shadow-[var(--gs-shadow-sm)]"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#3B82F6]" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Floating glow behind mockup */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/15 via-transparent to-[#7C3AED]/15 rounded-3xl blur-2xl scale-110" />

            {/* Dashboard */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <DashboardMockup />
            </motion.div>

            {/* Floating metric cards */}
            {FLOAT_CARDS.map((card, i) => {
              const positions = [
                "top-4 -left-12",
                "top-1/2 -right-10 -translate-y-1/2",
                "bottom-8 -left-10",
              ]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                  className={`absolute ${positions[i]} z-20`}
                >
                  <motion.div
                    animate={{ y: [0, i % 2 === 0 ? -6 : -4, 0] }}
                    transition={{
                      duration: 3.5 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                    className="rounded-xl px-3 py-2.5 flex items-center gap-2.5 min-w-[130px] bg-white"
                    style={{
                      border: "1px solid var(--gs-border)",
                      boxShadow: "var(--gs-shadow-md)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${card.color}15` }}
                    >
                      <card.icon
                        className="w-4 h-4"
                        style={{ color: card.color }}
                      />
                    </div>
                    <div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: card.color }}
                      >
                        {card.label}
                      </div>
                      <div className="text-[10px] text-[#5B6478] leading-tight">
                        {card.sub}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade — transição suave pra próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#F7F8FA] to-transparent" />
    </section>
  )
}
