"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Settings2,
  Zap,
  DollarSign,
  Users,
  BarChart3,
  Plug,
  LayoutDashboard,
  Database,
} from "lucide-react"

const SERVICES = [
  {
    icon: Settings2,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
    title: "Gestão Operacional",
    desc: "Centralize fluxos, tarefas, aprovações e registros em uma plataforma única que espelha a operação real da empresa.",
  },
  {
    icon: Zap,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
    title: "Automação",
    desc: "Elimine tarefas manuais e repetitivas com workflows automáticos, gatilhos e regras de negócio configuráveis.",
  },
  {
    icon: DollarSign,
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.2)",
    title: "Financeiro",
    desc: "Controle de contas a pagar/receber, fluxo de caixa, emissão de documentos fiscais e conciliação bancária.",
  },
  {
    icon: Users,
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.1)",
    border: "rgba(124,58,237,0.2)",
    title: "CRM Comercial",
    desc: "Gestão do funil de vendas, acompanhamento de oportunidades, atividades e histórico completo de cada cliente.",
  },
  {
    icon: BarChart3,
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.1)",
    border: "rgba(6,182,212,0.2)",
    title: "Dashboards",
    desc: "Painéis gerenciais com indicadores em tempo real — KPIs, gráficos e relatórios para tomada de decisão baseada em dados.",
  },
  {
    icon: Plug,
    color: "#EC4899",
    bg: "rgba(236,72,153,0.1)",
    border: "rgba(236,72,153,0.2)",
    title: "APIs e Integrações",
    desc: "Conecte seu sistema a WhatsApp, bancos, ERPs, plataformas de e-commerce, gateways de pagamento e outros serviços.",
  },
  {
    icon: LayoutDashboard,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.2)",
    title: "Portais Administrativos",
    desc: "Interfaces internas para gestão de usuários, configurações, permissões e monitoramento completo da operação.",
  },
  {
    icon: Database,
    color: "#F97316",
    bg: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.2)",
    title: "ERP Sob Medida",
    desc: "Plataforma integrada com módulos de compras, estoque, vendas, financeiro, produção e relatórios — desenhada para o seu segmento.",
  },
]

export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="solucoes" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-blue mb-4 inline-flex">O que desenvolvemos</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sistemas para cada área{" "}
            <span className="text-gradient-blue">do seu negócio</span>
          </h2>
          <p className="text-[#8B9BC0] text-lg max-w-xl mx-auto">
            Da operação ao estratégico — desenvolvemos módulos integrados que
            trabalham juntos ou individualmente, conforme a necessidade.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.06,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl p-6 card-hover cursor-default"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--gs-border)",
              }}
            >
              {/* Hover accent */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top left, ${s.bg} 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: s.bg, border: `1px solid ${s.border}` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>

              {/* Content */}
              <h3
                className="relative text-[15px] font-semibold text-[#ECF0FF] mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {s.title}
              </h3>
              <p className="relative text-[13px] text-[#8B9BC0] leading-relaxed">
                {s.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: s.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
