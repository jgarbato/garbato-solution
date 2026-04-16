"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  SlidersHorizontal,
  Brain,
  Monitor,
  GitBranch,
  FolderSync,
  Shuffle,
} from "lucide-react"

const DIFFS = [
  {
    icon: SlidersHorizontal,
    color: "#3B82F6",
    title: "Sob medida",
    desc: "Nenhum sistema é copiado de outro. Cada projeto começa do zero com o entendimento da operação específica do cliente.",
  },
  {
    icon: Brain,
    color: "#7C3AED",
    title: "Visão de negócio",
    desc: "Não apenas programamos — estruturamos. Antes do código, entendemos processos, gargalos e objetivos de crescimento.",
  },
  {
    icon: Monitor,
    color: "#06B6D4",
    title: "Interface profissional",
    desc: "Sistemas com UX pensado para o usuário final. Interfaces claras, intuitivas e que elevam a percepção da empresa.",
  },
  {
    icon: GitBranch,
    color: "#10B981",
    title: "Arquitetura escalável",
    desc: "A base técnica suporta crescimento. Novos módulos, usuários e integrações sem reescrever o que já funciona.",
  },
  {
    icon: FolderSync,
    color: "#F59E0B",
    title: "Centralização",
    desc: "Todos os dados e processos em um único lugar. Fim das informações espalhadas em sistemas, planilhas e e-mails.",
  },
  {
    icon: Shuffle,
    color: "#EC4899",
    title: "Flexibilidade",
    desc: "O sistema cresce conforme o negócio evolui. Começamos com o essencial e expandimos de forma planejada e sustentável.",
  },
]

export default function DifferentialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="diferenciais" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-end mb-14"
        >
          <div>
            <span className="badge-blue mb-4 inline-flex">Por que escolher</span>
            <h2
              className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Não apenas programamos.{" "}
              <span className="text-gradient-violet">
                Estruturamos soluções reais.
              </span>
            </h2>
          </div>
          <p className="text-[#8B9BC0] text-lg leading-relaxed lg:mb-2">
            A diferença entre um sistema que resolve e um que gera mais problemas
            está na forma como ele é concebido — não apenas desenvolvido.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIFFS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl p-6 card-hover"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--gs-border)",
              }}
            >
              {/* Number label */}
              <div
                className="absolute top-5 right-5 text-[11px] font-bold opacity-15 group-hover:opacity-30 transition-opacity"
                style={{ color: d.color, fontFamily: "var(--font-space-grotesk)" }}
              >
                0{i + 1}
              </div>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${d.color}15`,
                  border: `1px solid ${d.color}25`,
                }}
              >
                <d.icon className="w-5 h-5" style={{ color: d.color }} />
              </div>

              {/* Title */}
              <h3
                className="text-[16px] font-bold text-[#ECF0FF] mb-2.5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {d.title}
              </h3>

              {/* Desc */}
              <p className="text-[13.5px] text-[#8B9BC0] leading-relaxed">
                {d.desc}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{
                  background: `linear-gradient(90deg, ${d.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
