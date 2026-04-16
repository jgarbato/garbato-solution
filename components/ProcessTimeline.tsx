"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Search,
  LayoutPanelLeft,
  Palette,
  Code2,
  Rocket,
  RefreshCcw,
} from "lucide-react"

const STEPS = [
  {
    icon: Search,
    color: "#3B82F6",
    number: "01",
    title: "Levantamento",
    desc: "Mergulhamos na operação da empresa. Entrevistas, mapeamento de processos e identificação de gargalos antes de qualquer linha de código.",
  },
  {
    icon: LayoutPanelLeft,
    color: "#7C3AED",
    number: "02",
    title: "Estruturação",
    desc: "Definimos a arquitetura do sistema, os módulos necessários, as regras de negócio e o fluxo de uso de cada perfil de usuário.",
  },
  {
    icon: Palette,
    color: "#06B6D4",
    number: "03",
    title: "Protótipo",
    desc: "Criamos o protótipo navegável com as interfaces do sistema. Validamos com o cliente antes de iniciar o desenvolvimento.",
  },
  {
    icon: Code2,
    color: "#10B981",
    number: "04",
    title: "Desenvolvimento",
    desc: "Desenvolvimento em sprints com entregas incrementais. O cliente acompanha o progresso e valida cada funcionalidade.",
  },
  {
    icon: Rocket,
    color: "#F59E0B",
    number: "05",
    title: "Implantação",
    desc: "Treinamento da equipe, migração de dados e lançamento supervisionado para garantir uma transição sem impacto na operação.",
  },
  {
    icon: RefreshCcw,
    color: "#EC4899",
    number: "06",
    title: "Evolução",
    desc: "O sistema cresce com o negócio. Novos módulos, integrações e melhorias são planejadas e implementadas de forma contínua.",
  },
]

export default function ProcessTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="processo" className="relative py-24 px-6 bg-[#0C0D18]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-blue mb-4 inline-flex">Como trabalhamos</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Do levantamento à{" "}
            <span className="text-gradient-blue">evolução contínua</span>
          </h2>
          <p className="text-[#8B9BC0] text-lg max-w-xl mx-auto">
            Um processo estruturado que garante clareza, previsibilidade e
            resultado em cada etapa do projeto.
          </p>
        </motion.div>

        {/* Timeline — desktop: horizontal grid, mobile: vertical */}
        <div className="relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] h-[1px]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
              className="h-full origin-left"
              style={{
                background: "linear-gradient(90deg, #3B82F6, #7C3AED, #06B6D4, #10B981, #F59E0B, #EC4899)",
              }}
            />
          </div>

          <div className="grid lg:grid-cols-6 gap-6 lg:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                className="flex flex-col lg:items-center"
              >
                {/* Icon circle */}
                <div className="relative flex-shrink-0 mb-5 lg:mb-6">
                  {/* Outer glow ring */}
                  <div
                    className="absolute inset-[-4px] rounded-full opacity-30"
                    style={{
                      background: `radial-gradient(circle, ${step.color}40, transparent 70%)`,
                    }}
                  />
                  <div
                    className="w-[44px] h-[44px] rounded-full flex items-center justify-center border-2 relative z-10"
                    style={{
                      background: `${step.color}15`,
                      borderColor: step.color,
                      boxShadow: `0 0 16px ${step.color}30`,
                    }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:text-center">
                  <div
                    className="text-[10px] font-bold mb-1 tracking-widest"
                    style={{ color: step.color, fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="text-[15px] font-bold text-[#ECF0FF] mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[12.5px] text-[#8B9BC0] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
