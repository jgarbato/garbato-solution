"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, SlidersHorizontal, GitMerge } from "lucide-react"

const PILLARS = [
  {
    icon: Lightbulb,
    color: "#F59E0B",
    gradient: "from-amber-500/10 to-amber-500/5",
    border: "border-amber-500/20",
    title: "Visão de Negócio",
    desc: "Entendemos a operação do cliente antes de escrever uma linha de código. Estruturamos fluxos, regras e usabilidade com base na realidade do seu negócio — não em templates genéricos.",
    points: ["Levantamento aprofundado", "Mapeamento de fluxos", "Foco em resultado real"],
  },
  {
    icon: SlidersHorizontal,
    color: "#3B82F6",
    gradient: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/20",
    title: "Soluções Sob Medida",
    desc: "Cada projeto é pensado de acordo com a realidade e os objetivos do negócio do cliente. Nada é copiado, adaptado ou encaixado à força — é construído do zero para funcionar.",
    points: ["Personalização total", "Interface profissional", "Adaptado ao time"],
  },
  {
    icon: GitMerge,
    color: "#06B6D4",
    gradient: "from-cyan-500/10 to-cyan-500/5",
    border: "border-cyan-500/20",
    title: "Arquitetura Escalável",
    desc: "Projetos pensados para crescer junto com a empresa. Do sistema enxuto à plataforma completa — a arquitetura suporta evolução sem reescrever tudo do zero.",
    points: ["Crescimento sem refatoração", "Módulos adicionais", "Base técnica sólida"],
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="sobre" className="relative py-24 px-6 bg-[#0C0D18]">
      {/* Subtle border top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="badge-blue mb-4 inline-flex">Quem somos</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Tecnologia com{" "}
            <span className="text-gradient-blue">visão de negócio</span>
          </h2>
          <p className="text-[#8B9BC0] text-lg leading-relaxed">
            Desenvolvemos sistemas sob medida para empresas que precisam
            organizar processos, centralizar informações e ganhar produtividade
            com tecnologia. Entendemos que software é meio, não fim — o
            resultado da operação do cliente é o nosso objetivo.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid lg:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.12,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl p-7 card-hover"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--gs-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Gradient top accent on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }}
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${p.gradient} border ${p.border}`}
              >
                <p.icon className="w-6 h-6" style={{ color: p.color }} />
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold text-[#ECF0FF] mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-[#8B9BC0] text-sm leading-relaxed mb-5">
                {p.desc}
              </p>

              {/* Points */}
              <ul className="flex flex-col gap-2">
                {p.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-[13px] text-[#8B9BC0]"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: p.color }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
