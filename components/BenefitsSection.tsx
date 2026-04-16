"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  TrendingDown,
  TrendingUp,
  LineChart,
  FolderSync,
  ArrowUpRight,
} from "lucide-react"

const BENEFITS = [
  {
    icon: TrendingDown,
    color: "#10B981",
    metric: "−70%",
    label: "Menos retrabalho",
    desc: "Com processos automatizados e dados centralizados, sua equipe para de digitar a mesma informação em múltiplos lugares.",
  },
  {
    icon: TrendingUp,
    color: "#3B82F6",
    metric: "+40%",
    label: "Mais produtividade",
    desc: "Fluxos claros, aprovações digitais e menos tempo gasto em burocracia manual significam mais tempo para o que importa.",
  },
  {
    icon: LineChart,
    color: "#7C3AED",
    metric: "360°",
    label: "Visão gerencial",
    desc: "Dashboards em tempo real com os KPIs que realmente importam para sua operação — sem depender de relatórios manuais.",
  },
  {
    icon: FolderSync,
    color: "#06B6D4",
    metric: "1 hub",
    label: "Centralização",
    desc: "Todos os dados, processos e usuários em um único sistema integrado. Fim dos silos de informação e da dispersão operacional.",
  },
  {
    icon: ArrowUpRight,
    color: "#F59E0B",
    metric: "∞",
    label: "Escalabilidade",
    desc: "O sistema cresce com o negócio. Novos módulos, usuários e integrações são adicionados sem reescrever o que já funciona.",
  },
]

export default function BenefitsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="beneficios" className="relative py-24 px-6 bg-[#0C0D18]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-end mb-14"
        >
          <div>
            <span className="badge-blue mb-4 inline-flex">Benefícios concretos</span>
            <h2
              className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              O que muda com um sistema{" "}
              <span className="text-gradient-blue">bem feito</span>
            </h2>
          </div>
          <p className="text-[#8B9BC0] text-lg leading-relaxed">
            Sistemas sob medida não são apenas mais bonitos — eles entregam
            resultados mensuráveis para a operação, a equipe e os números do negócio.
          </p>
        </motion.div>

        {/* Benefits — first 3 large, last 2 medium */}
        <div className="flex flex-col gap-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {BENEFITS.slice(0, 3).map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.09,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                className="group relative rounded-2xl p-7 card-hover"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid var(--gs-border)",
                }}
              >
                {/* Metric */}
                <div
                  className="text-5xl font-black mb-4 tracking-tight leading-none"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: b.color,
                    textShadow: `0 0 30px ${b.color}40`,
                  }}
                >
                  {b.metric}
                </div>

                {/* Icon + label */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${b.color}15`, border: `1px solid ${b.color}25` }}
                  >
                    <b.icon className="w-4 h-4" style={{ color: b.color }} />
                  </div>
                  <span className="text-[15px] font-semibold text-[#ECF0FF]">
                    {b.label}
                  </span>
                </div>

                <p className="text-[13.5px] text-[#8B9BC0] leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {BENEFITS.slice(3).map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.09,
                  duration: 0.55,
                  ease: "easeOut",
                }}
                className="group relative rounded-2xl p-7 card-hover flex gap-6 items-start"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid var(--gs-border)",
                }}
              >
                {/* Metric */}
                <div
                  className="text-4xl font-black tracking-tight leading-none flex-shrink-0 pt-1"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: b.color,
                    textShadow: `0 0 24px ${b.color}40`,
                  }}
                >
                  {b.metric}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${b.color}15`, border: `1px solid ${b.color}25` }}
                    >
                      <b.icon className="w-3.5 h-3.5" style={{ color: b.color }} />
                    </div>
                    <span className="text-[15px] font-semibold text-[#ECF0FF]">
                      {b.label}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-[#8B9BC0] leading-relaxed">
                    {b.desc}
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
