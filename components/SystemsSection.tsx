"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Database,
  Users2,
  Building2,
  Banknote,
  LayoutGrid,
  ArrowRight,
} from "lucide-react"

const SYSTEMS = [
  {
    icon: Database,
    color: "#3B82F6",
    tag: "ERP",
    title: "ERP Sob Medida",
    forWho: "Empresas que precisam integrar compras, estoque, vendas, financeiro e produção em uma plataforma unificada.",
    value: "Fim das planilhas e sistemas desconexos. Visão 360° da operação com dados confiáveis em tempo real.",
    features: ["Módulos integrados", "Regras de negócio personalizadas", "Relatórios gerenciais", "Multi-usuário"],
  },
  {
    icon: Users2,
    color: "#7C3AED",
    tag: "CRM",
    title: "CRM Comercial",
    forWho: "Times de vendas que precisam organizar funil, oportunidades, follow-ups e histórico de clientes.",
    value: "Mais conversão, menos perda de oportunidade. Cada lead e cliente acompanhado do primeiro contato ao pós-venda.",
    features: ["Funil visual", "Histórico completo", "Tarefas e follow-ups", "Dashboards comerciais"],
  },
  {
    icon: Building2,
    color: "#06B6D4",
    tag: "Imobiliário",
    title: "Sistema Imobiliário",
    forWho: "Imobiliárias e gestoras de patrimônio que precisam controlar imóveis, contratos, locação e financeiro.",
    value: "Da captação à rescisão — todos os processos em um sistema integrado com controle financeiro e documental.",
    features: ["Gestão de imóveis", "Contratos e locação", "Repasses automáticos", "Portal do locatário"],
  },
  {
    icon: Banknote,
    color: "#10B981",
    tag: "Financeiro",
    title: "Sistema Financeiro",
    forWho: "Empresas que precisam controlar fluxo de caixa, DRE, contas a pagar/receber e integração bancária.",
    value: "Clareza financeira total. Conciliação automática, previsões de caixa e relatórios que subsidiam decisões estratégicas.",
    features: ["Contas a pagar/receber", "Conciliação bancária", "DRE e fluxo de caixa", "Integração Open Finance"],
  },
  {
    icon: LayoutGrid,
    color: "#F97316",
    tag: "Admin",
    title: "Portal Administrativo",
    forWho: "Empresas que precisam gerenciar usuários, permissões, configurações e dados centralizados internamente.",
    value: "Controle total da plataforma. Acesso por perfil, auditoria completa de ações e painel de configuração centralizado.",
    features: ["Gestão de usuários", "Controle de acesso", "Logs e auditoria", "Configurações centralizadas"],
  },
]

export default function SystemsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="sistemas" className="relative py-24 px-6 bg-[#0C0D18]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-blue mb-4 inline-flex">Tipos de sistemas</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Plataformas completas para{" "}
            <span className="text-gradient-blue">cada realidade</span>
          </h2>
          <p className="text-[#8B9BC0] text-lg max-w-xl mx-auto">
            Cada sistema é projetado para o segmento e a operação específica do
            cliente — personalização, não configuração.
          </p>
        </motion.div>

        {/* Systems grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {SYSTEMS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.09,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl p-7 card-hover flex flex-col"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--gs-border)",
              }}
            >
              {/* Top: icon + tag */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${s.color}18`,
                    border: `1px solid ${s.color}30`,
                  }}
                >
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${s.color}15`,
                    color: s.color,
                    border: `1px solid ${s.color}25`,
                  }}
                >
                  {s.tag}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold text-[#ECF0FF] mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {s.title}
              </h3>

              {/* For who */}
              <div className="mb-3">
                <div className="text-[11px] font-semibold text-[#4A5580] uppercase tracking-wider mb-1.5">
                  Para quem
                </div>
                <p className="text-[13.5px] text-[#8B9BC0] leading-relaxed">
                  {s.forWho}
                </p>
              </div>

              {/* Value */}
              <div className="mb-5">
                <div className="text-[11px] font-semibold text-[#4A5580] uppercase tracking-wider mb-1.5">
                  Valor entregue
                </div>
                <p className="text-[13.5px] text-[#8B9BC0] leading-relaxed">
                  {s.value}
                </p>
              </div>

              {/* Features */}
              <div className="mt-auto pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] text-[#8B9BC0] border border-white/[0.06]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover CTA */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() =>
                    document
                      .querySelector("#contato")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-1.5 text-[12.5px] font-semibold cursor-pointer"
                  style={{ color: s.color }}
                >
                  Solicitar proposta
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
