"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Building2,
  Users2,
  LayoutGrid,
  Banknote,
  BarChart2,
  TrendingUp,
  Package,
  FileText,
  ArrowRight,
} from "lucide-react"

function ERPMockup() {
  return (
    <div className="w-full h-[180px] bg-[#0C0D18] rounded-xl border border-white/[0.08] overflow-hidden p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[9px] font-semibold text-[#ECF0FF]">ERP Imobiliário</div>
        <div className="w-2 h-2 rounded-full bg-[#10B981]" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { l: "Imóveis", v: "284", c: "#3B82F6" },
          { l: "Contratos", v: "147", c: "#10B981" },
          { l: "Receita/mês", v: "R$92k", c: "#F59E0B" },
        ].map((m) => (
          <div key={m.l} className="bg-[#161929] rounded-lg p-2 text-center">
            <div className="text-[11px] font-bold" style={{ color: m.c }}>{m.v}</div>
            <div className="text-[8px] text-[#4A5580]">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex gap-1.5">
        <div className="flex-1 bg-[#161929] rounded-lg p-2">
          <div className="text-[8px] text-[#8B9BC0] mb-1.5">Vencimentos</div>
          {["Contrato #122 — R$2.400", "Contrato #87 — R$3.100"].map((c) => (
            <div key={c} className="text-[7.5px] text-[#4A5580] py-0.5 border-b border-white/[0.04] truncate">{c}</div>
          ))}
        </div>
        <div className="w-20 bg-[#161929] rounded-lg p-2">
          <div className="text-[8px] text-[#8B9BC0] mb-1.5">Status</div>
          {[["Ocupado", "#10B981", "71%"], ["Vago", "#F59E0B", "18%"], ["Em obras", "#EC4899", "11%"]].map(([l, c, p]) => (
            <div key={l} className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: c as string }} />
              <div className="text-[7px] text-[#8B9BC0] flex-1">{l}</div>
              <div className="text-[7px] font-medium" style={{ color: c as string }}>{p}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CRMMockup() {
  const stages = [
    { name: "Leads", count: 24, color: "#3B82F6" },
    { name: "Qualificados", count: 12, color: "#7C3AED" },
    { name: "Proposta", count: 7, color: "#F59E0B" },
    { name: "Fechados", count: 4, color: "#10B981" },
  ]
  return (
    <div className="w-full h-[180px] bg-[#0C0D18] rounded-xl border border-white/[0.08] overflow-hidden p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[9px] font-semibold text-[#ECF0FF]">Funil Comercial</div>
        <div className="text-[8px] text-[#10B981]">+12% este mês</div>
      </div>
      <div className="flex gap-2 mb-3">
        {stages.map((s) => (
          <div key={s.name} className="flex-1 bg-[#161929] rounded-lg p-2 text-center">
            <div className="text-[12px] font-bold" style={{ color: s.color }}>{s.count}</div>
            <div className="text-[7px] text-[#4A5580] mt-0.5">{s.name}</div>
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {[
          { name: "Empresa Alfa Ltda", stage: "Proposta", value: "R$28k", color: "#F59E0B" },
          { name: "Beta Serviços", stage: "Qualificado", value: "R$14k", color: "#7C3AED" },
          { name: "Gama Construções", stage: "Fechado", value: "R$52k", color: "#10B981" },
        ].map((c) => (
          <div key={c.name} className="flex items-center gap-2 bg-[#161929] rounded px-2 py-1.5">
            <div className="w-5 h-5 rounded bg-white/[0.05] flex items-center justify-center flex-shrink-0">
              <Users2 className="w-2.5 h-2.5 text-[#8B9BC0]" />
            </div>
            <div className="flex-1 text-[8px] text-[#8B9BC0] truncate">{c.name}</div>
            <div className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: `${c.color}20`, color: c.color }}>{c.stage}</div>
            <div className="text-[8px] font-medium text-[#ECF0FF]">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminMockup() {
  return (
    <div className="w-full h-[180px] bg-[#0C0D18] rounded-xl border border-white/[0.08] overflow-hidden flex">
      <div className="w-12 bg-[#08080E] border-r border-white/[0.06] flex flex-col items-center py-3 gap-2.5">
        {[LayoutGrid, Users2, Package, FileText].map((Icon, i) => (
          <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center ${i === 0 ? "bg-[#3B82F6]/20 text-[#3B82F6]" : "text-[#4A5580]"}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="text-[9px] font-semibold text-[#ECF0FF]">Portal Admin</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { l: "Usuários", v: "48", c: "#3B82F6" },
            { l: "Módulos", v: "12", c: "#7C3AED" },
            { l: "Acessos hoje", v: "284", c: "#06B6D4" },
            { l: "Alertas", v: "3", c: "#F59E0B" },
          ].map((m) => (
            <div key={m.l} className="bg-[#161929] rounded-lg p-1.5 flex items-center gap-1.5">
              <div className="text-[11px] font-bold" style={{ color: m.c }}>{m.v}</div>
              <div className="text-[7.5px] text-[#4A5580]">{m.l}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-[#161929] rounded-lg p-2">
          <div className="text-[8px] text-[#8B9BC0] mb-1">Atividade recente</div>
          {["Admin acessou módulo financeiro", "3 usuários criados hoje", "Backup executado com sucesso"].map((a) => (
            <div key={a} className="text-[7px] text-[#4A5580] py-0.5 border-b border-white/[0.04] truncate">{a}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BankingMockup() {
  return (
    <div className="w-full h-[180px] bg-[#0C0D18] rounded-xl border border-white/[0.08] overflow-hidden p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[9px] font-semibold text-[#ECF0FF]">Integração Bancária</div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <div className="text-[8px] text-[#10B981]">Conectado</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {[
          { l: "Saldo atual", v: "R$ 148.294", c: "#10B981" },
          { l: "A receber", v: "R$ 87.340", c: "#3B82F6" },
        ].map((m) => (
          <div key={m.l} className="bg-[#161929] rounded-lg p-2">
            <div className="text-[8px] text-[#4A5580]">{m.l}</div>
            <div className="text-[11px] font-bold mt-0.5" style={{ color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1">
        <div className="text-[8px] text-[#8B9BC0] mb-1.5">Últimas transações</div>
        {[
          { desc: "Pagamento recebido — Cliente XY", v: "+R$8.400", c: "#10B981" },
          { desc: "Boleto pago — Fornecedor AB", v: "-R$2.100", c: "#EC4899" },
          { desc: "TED recebida — Obra #07", v: "+R$15.000", c: "#10B981" },
        ].map((t) => (
          <div key={t.desc} className="flex items-center gap-2 bg-[#161929] rounded px-2 py-1">
            <div className="flex-1 text-[7.5px] text-[#8B9BC0] truncate">{t.desc}</div>
            <div className="text-[8px] font-medium" style={{ color: t.c }}>{t.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const SOLUTIONS = [
  {
    color: "#06B6D4",
    icon: Building2,
    tag: "Imobiliário + Financeiro",
    title: "ERP Imobiliário e Financeiro",
    desc: "Gestão completa de imóveis, contratos, locatários, repasses, financeiro integrado e conciliação bancária em uma única plataforma.",
    mockup: <ERPMockup />,
  },
  {
    color: "#7C3AED",
    icon: Users2,
    tag: "Comercial",
    title: "Gestão Comercial (CRM)",
    desc: "Funil de vendas visual, acompanhamento de leads, propostas, histórico de negociações e dashboards de desempenho do time.",
    mockup: <CRMMockup />,
  },
  {
    color: "#3B82F6",
    icon: LayoutGrid,
    tag: "Administrativo",
    title: "Plataforma Administrativa",
    desc: "Portal interno com controle de usuários, módulos, permissões, logs de acesso e gestão centralizada de toda a plataforma.",
    mockup: <AdminMockup />,
  },
  {
    color: "#10B981",
    icon: Banknote,
    tag: "Bancário",
    title: "Sistema com Integração Bancária",
    desc: "Conciliação automática, emissão de boletos, controle de recebíveis e integração com Open Finance para visão financeira completa.",
    mockup: <BankingMockup />,
  },
]

export default function SolutionsShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="projetos" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-blue mb-4 inline-flex">Exemplos de solução</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sistemas que{" "}
            <span className="text-gradient-blue">resolvem na prática</span>
          </h2>
          <p className="text-[#8B9BC0] text-lg max-w-xl mx-auto">
            Cada projeto é único. Veja alguns exemplos de plataformas que
            desenvolvemos para operações reais.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-5">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl overflow-hidden card-hover"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--gs-border)",
              }}
            >
              {/* Top line accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                }}
              />

              <div className="p-6">
                {/* Tag + icon */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                  >
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: `${s.color}15`, color: s.color }}
                  >
                    {s.tag}
                  </span>
                </div>

                {/* Title + desc */}
                <h3
                  className="text-xl font-bold text-[#ECF0FF] mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-[#8B9BC0] leading-relaxed mb-5">
                  {s.desc}
                </p>

                {/* Mockup */}
                {s.mockup}

                {/* CTA */}
                <button
                  onClick={() =>
                    document
                      .querySelector("#contato")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ color: s.color }}
                >
                  Solicitar proposta para este tipo
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
