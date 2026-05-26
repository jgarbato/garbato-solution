"use client"

import { useRef } from "react"
import Link from "next/link"
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
  Stethoscope,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react"

const MOCKUP_OUTER =
  "w-full h-[180px] bg-[#F7F8FA] rounded-xl border border-[rgba(15,22,36,0.06)] overflow-hidden"
const MOCKUP_CARD =
  "bg-white rounded-lg border border-[rgba(15,22,36,0.06)] shadow-[0_1px_2px_rgba(15,22,36,0.03)]"

function ERPMockup() {
  return (
    <div className={`${MOCKUP_OUTER} p-3 flex flex-col gap-2`}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-[9px] font-semibold text-[#0A0B14]">ERP Imobiliário</div>
        <div className="w-2 h-2 rounded-full bg-[#10B981]" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { l: "Imóveis", v: "284", c: "#3B82F6" },
          { l: "Contratos", v: "147", c: "#10B981" },
          { l: "Receita/mês", v: "R$92k", c: "#F59E0B" },
        ].map((m) => (
          <div key={m.l} className={`${MOCKUP_CARD} p-2 text-center`}>
            <div className="text-[11px] font-bold" style={{ color: m.c }}>{m.v}</div>
            <div className="text-[8px] text-[#8D95A8]">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex gap-1.5">
        <div className={`${MOCKUP_CARD} flex-1 p-2`}>
          <div className="text-[8px] text-[#5B6478] font-semibold mb-1.5">Vencimentos</div>
          {["Contrato #122 — R$2.400", "Contrato #87 — R$3.100"].map((c) => (
            <div key={c} className="text-[7.5px] text-[#5B6478] py-0.5 border-b border-[rgba(15,22,36,0.05)] truncate">{c}</div>
          ))}
        </div>
        <div className={`${MOCKUP_CARD} w-20 p-2`}>
          <div className="text-[8px] text-[#5B6478] font-semibold mb-1.5">Status</div>
          {[["Ocupado", "#10B981", "71%"], ["Vago", "#F59E0B", "18%"], ["Em obras", "#EC4899", "11%"]].map(([l, c, p]) => (
            <div key={l} className="flex items-center gap-1 mb-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: c as string }} />
              <div className="text-[7px] text-[#5B6478] flex-1">{l}</div>
              <div className="text-[7px] font-medium" style={{ color: c as string }}>{p}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClinicMockup() {
  const appointments = [
    { time: "08:30", patient: "Maria Silva", type: "Consulta", status: "Confirmado", color: "#10B981" },
    { time: "09:15", patient: "João Pereira", type: "Retorno", status: "Aguardando", color: "#F59E0B" },
    { time: "10:00", patient: "Ana Souza", type: "Exame", status: "Confirmado", color: "#10B981" },
    { time: "11:30", patient: "Carlos Lima", type: "Cirurgia", status: "Em andamento", color: "#3B82F6" },
  ]
  return (
    <div className={`${MOCKUP_OUTER} p-3 flex flex-col gap-2`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-[#3B82F6]" />
          <div className="text-[9px] font-semibold text-[#0A0B14]">Agenda do dia</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <div className="text-[8px] text-[#059669] font-medium">4 agendamentos</div>
        </div>
      </div>
      <div className="flex-1 space-y-1 overflow-hidden">
        {appointments.map((a) => (
          <div key={a.time} className={`${MOCKUP_CARD} flex items-center gap-2 px-2 py-1.5`}>
            <div className="text-[8px] font-medium text-[#8D95A8] w-8 flex-shrink-0">{a.time}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-semibold text-[#0A0B14] truncate">{a.patient}</div>
              <div className="text-[7px] text-[#8D95A8]">{a.type}</div>
            </div>
            <div
              className="text-[7px] px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium"
              style={{ background: `${a.color}15`, color: a.color }}
            >
              {a.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminMockup() {
  return (
    <div className={`${MOCKUP_OUTER} flex`}>
      {/* Sidebar em brand color pra contraste */}
      <div className="w-12 bg-gradient-to-b from-[#3B82F6] to-[#7C3AED] flex flex-col items-center py-3 gap-2.5">
        {[LayoutGrid, Users2, Package, FileText].map((Icon, i) => (
          <div
            key={i}
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              i === 0 ? "bg-white/20 text-white" : "text-white/60"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="text-[9px] font-semibold text-[#0A0B14]">Portal Admin</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { l: "Usuários", v: "48", c: "#3B82F6" },
            { l: "Módulos", v: "12", c: "#7C3AED" },
            { l: "Acessos hoje", v: "284", c: "#06B6D4" },
            { l: "Alertas", v: "3", c: "#F59E0B" },
          ].map((m) => (
            <div key={m.l} className={`${MOCKUP_CARD} p-1.5 flex items-center gap-1.5`}>
              <div className="text-[11px] font-bold" style={{ color: m.c }}>{m.v}</div>
              <div className="text-[7.5px] text-[#5B6478]">{m.l}</div>
            </div>
          ))}
        </div>
        <div className={`${MOCKUP_CARD} flex-1 p-2`}>
          <div className="text-[8px] text-[#5B6478] font-semibold mb-1">Atividade recente</div>
          {["Admin acessou módulo financeiro", "3 usuários criados hoje", "Backup executado com sucesso"].map((a) => (
            <div key={a} className="text-[7px] text-[#5B6478] py-0.5 border-b border-[rgba(15,22,36,0.05)] truncate">{a}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BankingMockup() {
  return (
    <div className={`${MOCKUP_OUTER} p-3`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[9px] font-semibold text-[#0A0B14]">Integração Bancária</div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <div className="text-[8px] text-[#059669] font-medium">Conectado</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {[
          { l: "Saldo atual", v: "R$ 148.294", c: "#10B981" },
          { l: "A receber", v: "R$ 87.340", c: "#3B82F6" },
        ].map((m) => (
          <div key={m.l} className={`${MOCKUP_CARD} p-2`}>
            <div className="text-[8px] text-[#8D95A8]">{m.l}</div>
            <div className="text-[11px] font-bold mt-0.5" style={{ color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1">
        <div className="text-[8px] text-[#5B6478] font-semibold mb-1.5">Últimas transações</div>
        {[
          { desc: "Pagamento recebido — Cliente XY", v: "+R$8.400", c: "#10B981" },
          { desc: "Boleto pago — Fornecedor AB", v: "-R$2.100", c: "#EC4899" },
          { desc: "TED recebida — Obra #07", v: "+R$15.000", c: "#10B981" },
        ].map((t) => (
          <div key={t.desc} className={`${MOCKUP_CARD} flex items-center gap-2 px-2 py-1`}>
            <div className="flex-1 text-[7.5px] text-[#5B6478] truncate">{t.desc}</div>
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
    href: "/blesssystemmob",
  },
  {
    color: "#3B82F6",
    icon: Stethoscope,
    tag: "Clínicas e Saúde",
    title: "BlessSystem Clinic",
    desc: "Agenda inteligente, prontuário eletrônico, controle financeiro, gestão de pacientes e relatórios clínicos — tudo em uma plataforma.",
    mockup: <ClinicMockup />,
    href: "/blesssystemclinic",
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
    <section
      id="projetos"
      className="relative py-24 px-6"
      style={{ background: "#F7F8FA" }}
    >
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
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#0A0B14] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sistemas que{" "}
            <span className="text-gradient-blue">resolvem na prática</span>
          </h2>
          <p className="text-[#5B6478] text-lg max-w-xl mx-auto">
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
              className="group relative rounded-2xl overflow-hidden card-hover bg-white"
              style={{
                border: "1px solid var(--gs-border)",
                boxShadow: "var(--gs-shadow-sm)",
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
                    style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}
                  >
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <span
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: `${s.color}10`, color: s.color }}
                  >
                    {s.tag}
                  </span>
                </div>

                {/* Title + desc */}
                <h3
                  className="text-xl font-bold text-[#0A0B14] mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-[#5B6478] leading-relaxed mb-5">
                  {s.desc}
                </p>

                {/* Mockup */}
                {s.mockup}

                {/* CTA */}
                {"href" in s ? (
                  <Link
                    href={(s as { href: string }).href}
                    className="mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ color: s.color }}
                  >
                    Conhecer o sistema
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
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
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
