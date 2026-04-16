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
  "https://wa.me/5543988585127?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto"

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
    <div className="w-full max-w-[580px] rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)] bg-[#0C0D18]">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#10121F]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-1 rounded bg-white/[0.05] border border-white/[0.07] text-[10px] text-[#4A5580] font-mono">
            app.garbatosolution.com.br/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard layout */}
      <div className="flex h-[340px]">
        {/* Sidebar */}
        <div className="w-14 flex-shrink-0 bg-[#08080E] border-r border-white/[0.05] flex flex-col items-center py-4 gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center">
            <Circle className="w-3 h-3 text-white fill-white" />
          </div>
          {[BarChart3, Users, FileText, Layers, Cpu].map((Icon, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                i === 0
                  ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                  : "text-[#4A5580] hover:text-[#8B9BC0]"
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
            <div>
              <div className="text-[11px] font-semibold text-[#ECF0FF]">
                Dashboard Operacional
              </div>
              <div className="text-[9px] text-[#4A5580]">
                Visão geral — Abril 2025
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bell className="w-3.5 h-3.5 text-[#8B9BC0]" />
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
                className="bg-[#161929] rounded-lg p-2 border border-white/[0.05]"
              >
                <div className="text-[8px] text-[#4A5580] mb-1">{m.label}</div>
                <div className="text-[11px] font-bold text-[#ECF0FF]">
                  {m.value}
                </div>
                <div
                  className={`text-[8px] font-medium ${
                    m.up ? "text-[#10B981]" : "text-[#F59E0B]"
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
            <div className="flex-1 bg-[#161929] rounded-xl border border-white/[0.05] p-3 flex flex-col">
              <div className="text-[9px] text-[#8B9BC0] font-medium mb-2">
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
                            ? "rgba(59,130,246,0.4)"
                            : "rgba(59,130,246,0.18)",
                      }}
                    />
                  )
                )}
              </div>
              <div className="flex justify-between mt-1">
                {["Jan", "Abr", "Jul", "Out", "Dez"].map((m) => (
                  <div key={m} className="text-[7px] text-[#4A5580]">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent list */}
            <div className="w-28 bg-[#161929] rounded-xl border border-white/[0.05] p-2.5">
              <div className="text-[8px] text-[#8B9BC0] font-medium mb-2">
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
                  className="flex items-center gap-1.5 py-1 border-b border-white/[0.04] last:border-0"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      item.status === "ok"
                        ? "bg-[#10B981]"
                        : "bg-[#F59E0B]"
                    }`}
                  />
                  <div className="text-[7.5px] text-[#8B9BC0] truncate">
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
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Grid */}
        <div className="absolute inset-0 grid-overlay opacity-100" />

        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-[#3B82F6]/[0.07] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-[#7C3AED]/[0.06] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[80px] bg-[#06B6D4]/[0.05] pointer-events-none" />

        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 70%)",
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
              className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-[#ECF0FF]"
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
              className="text-[#8B9BC0] text-lg leading-relaxed max-w-[500px]"
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
                className="flex items-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-xl transition-all shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_36px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 cursor-pointer"
              >
                Solicitar Projeto
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-white/[0.1] hover:border-white/[0.2] text-[#ECF0FF] font-medium rounded-xl transition-all hover:bg-white/[0.04] hover:-translate-y-0.5"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[12px] text-[#8B9BC0]"
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-[#7C3AED]/10 rounded-3xl blur-2xl scale-110" />

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
                    className="glass-card rounded-xl px-3 py-2.5 flex items-center gap-2.5 min-w-[130px]"
                    style={{ border: "1px solid var(--gs-border-accent)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${card.color}20` }}
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
                      <div className="text-[10px] text-[#8B9BC0] leading-tight">
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#08080E] to-transparent" />
    </section>
  )
}
