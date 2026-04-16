"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ShieldCheck, Star, Cpu, Users, Lock, Zap } from "lucide-react"

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    color: "#10B981",
    title: "Sistemas pensados para a operação real",
    desc: "Não desenvolvemos features por features. Cada funcionalidade tem um propósito claro dentro do fluxo operacional do cliente.",
  },
  {
    icon: Cpu,
    color: "#3B82F6",
    title: "Arquitetura preparada para crescer",
    desc: "A base técnica suporta evolução sem precisar recomeçar. Código limpo, modular e documentado para facilitar a continuidade.",
  },
  {
    icon: Users,
    color: "#7C3AED",
    title: "Interface pensada para o usuário final",
    desc: "Sistemas que as pessoas querem usar. UX clara, hierarquia visual forte e fluxos intuitivos que reduzem a curva de aprendizado.",
  },
  {
    icon: Star,
    color: "#F59E0B",
    title: "Foco em organização e produtividade",
    desc: "O objetivo é liberar sua equipe do operacional desnecessário para focar no estratégico. Tecnologia a serviço do resultado.",
  },
  {
    icon: Lock,
    color: "#06B6D4",
    title: "Soluções estruturadas sob medida",
    desc: "Cada projeto começa com um levantamento aprofundado. Nenhum sistema é templado — é desenhado para a realidade de cada empresa.",
  },
  {
    icon: Zap,
    color: "#EC4899",
    title: "Comprometimento com o resultado",
    desc: "Não entregamos código. Entregamos operação funcionando. O sucesso do sistema é medido pelo impacto real no negócio.",
  },
]

export default function TrustSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="confianca" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-blue mb-4 inline-flex">Por que confiar</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Compromisso com{" "}
            <span className="text-gradient-blue">cada entrega</span>
          </h2>
          <p className="text-[#8B9BC0] text-lg max-w-xl mx-auto">
            A credibilidade se constrói na consistência — em cada decisão de
            projeto, em cada linha de código, em cada interação com o cliente.
          </p>
        </motion.div>

        {/* Trust grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl p-6 card-hover overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--gs-border)",
              }}
            >
              {/* BG gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at top left, ${item.color}08 0%, transparent 65%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}25`,
                }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>

              {/* Content */}
              <h3
                className="relative text-[15px] font-semibold text-[#ECF0FF] mb-2.5 leading-snug"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {item.title}
              </h3>
              <p className="relative text-[13px] text-[#8B9BC0] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
