"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
import {
  Check, ArrowRight, Calendar, FileText, Users, BarChart2,
  Zap, ChevronDown, MessageCircle, CreditCard, Bell,
  Shield, Stethoscope, Star, Clock, TrendingUp, Package,
} from "lucide-react"

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  violet: "#7C3AED",
  violetLight: "#9333EA",
  pink: "#EC4899",
  bg: "#FFFFFF",
  bgSoft: "#FAFAFA",
  bgPurple: "#F5F3FF",
  border: "#E9E4FD",
  dark: "#18181B",
  body: "#52525B",
  muted: "#A1A1AA",
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Calendar, title: "Agenda inteligente", desc: "Confirmações automáticas via WhatsApp e redução de até 60% nas faltas." },
  { icon: FileText, title: "Fichas digitais", desc: "Prontuários personalizáveis para odontologia e estética, com histórico completo." },
  { icon: Users, title: "Gestão de pacientes", desc: "Cadastro, histórico de atendimentos, aniversários e comunicação integrada." },
  { icon: CreditCard, title: "Financeiro completo", desc: "Recebimentos, comissões, repasses e fluxo de caixa em tempo real." },
  { icon: Package, title: "Controle de estoque", desc: "Materiais, alertas de reposição e rastreabilidade por procedimento." },
  { icon: Bell, title: "Notificações Meta", desc: "Lembretes e cobranças automáticas via API oficial do WhatsApp." },
]

const PLANS = [
  {
    id: "essencial",
    name: "Essencial",
    price: 349,
    desc: "Para clínicas que estão começando",
    features: ["Até 3 usuários", "Agenda inteligente", "Fichas personalizadas", "Agendamento online", "5 GB de armazenamento", "Notificações via Meta API"],
  },
  {
    id: "avancado",
    name: "Avançado",
    price: 499,
    desc: "Para clínicas em crescimento",
    hot: true,
    features: ["Até 10 usuários", "Tudo do Essencial", "Assinatura eletrônica", "Gestão financeira completa", "Controle de estoque", "Comissões automatizadas", "10 GB de armazenamento", "Painel de chamada"],
  },
  {
    id: "experts",
    name: "Experts",
    price: 899,
    desc: "Para clínicas que querem escalar",
    features: ["Usuários ilimitados", "Tudo do Avançado", "CRM integrado", "Emissão de NF", "Central no WhatsApp", "25 GB de armazenamento", "Suporte prioritário"],
  },
]

const FAQS = [
  { q: "Preciso instalar algum programa?", a: "Não. O sistema é 100% na nuvem — acesse do computador, tablet ou celular com qualquer navegador." },
  { q: "Funciona para odontologia e estética?", a: "Sim. Há módulos e fichas específicos para cada especialidade, personalizáveis para a realidade da sua clínica." },
  { q: "Posso testar antes de pagar?", a: "Sim, são 14 dias gratuitos com acesso completo ao plano Avançado. Sem cartão de crédito." },
  { q: "Como é o processo de implantação?", a: "Nossa equipe configura tudo e treina o seu time remotamente em até 48h após a assinatura." },
  { q: "Meus dados ficam seguros?", a: "Sim. Criptografia de ponta a ponta, backup diário automático e total conformidade com a LGPD." },
]

// ─── Dashboard mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 24px 64px rgba(124,58,237,0.14)", border: `1px solid ${C.border}` }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ background: C.bgPurple, borderBottom: `1px solid ${C.border}` }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span
          className="flex-1 mx-3 rounded text-[10px] text-center py-0.5 px-2"
          style={{ background: "white", color: C.muted }}
        >
          app.blesssystemclinic.com.br
        </span>
      </div>

      {/* App layout */}
      <div className="flex" style={{ background: "#FAFAFA", height: 320 }}>
        {/* Sidebar */}
        <div
          className="w-12 flex flex-col items-center py-3 gap-2.5 flex-shrink-0"
          style={{ background: C.violet }}
        >
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Stethoscope className="w-3.5 h-3.5 text-white" />
          </div>
          {[Calendar, Users, FileText, BarChart2].map((Icon, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: i === 0 ? "rgba(255,255,255,0.18)" : "transparent" }}
            >
              <Icon className="w-3.5 h-3.5 text-white/70" />
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[12px] font-bold" style={{ color: C.dark }}>Agenda — Hoje</p>
              <p className="text-[10px]" style={{ color: C.muted }}>Segunda, 28 de abril</p>
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#DCFCE7", color: "#16A34A" }}
            >
              12 consultas
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { l: "Pacientes", v: "284", c: C.violet },
              { l: "Faturamento", v: "R$18k", c: "#10B981" },
              { l: "Confirmados", v: "94%", c: C.pink },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-lg p-2"
                style={{ background: "white", border: `1px solid ${C.border}` }}
              >
                <p className="text-[13px] font-bold leading-none" style={{ color: s.c }}>{s.v}</p>
                <p className="text-[9px] mt-0.5" style={{ color: C.muted }}>{s.l}</p>
              </div>
            ))}
          </div>

          {/* Appointments */}
          <div className="flex flex-col gap-1.5">
            {[
              { hora: "08:30", nome: "Ana Paula Silva", proc: "Limpeza", cor: "#10B981", status: "Confirmado" },
              { hora: "09:00", nome: "Carlos Mendes", proc: "Clareamento", cor: "#F59E0B", status: "Aguardando" },
              { hora: "09:30", nome: "Maria Souza", proc: "Consulta", cor: "#10B981", status: "Confirmado" },
              { hora: "10:00", nome: "Pedro Lima", proc: "Aplicação", cor: "#6366F1", status: "Em atend." },
            ].map((a) => (
              <div
                key={a.nome}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                style={{ background: "white", border: `1px solid ${C.border}` }}
              >
                <span className="text-[9px] font-semibold w-9 flex-shrink-0" style={{ color: C.violet }}>{a.hora}</span>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                  style={{ background: C.violet }}
                >
                  {a.nome[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold truncate" style={{ color: C.dark }}>{a.nome}</p>
                  <p className="text-[8px]" style={{ color: C.muted }}>{a.proc}</p>
                </div>
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{ background: `${a.cor}18`, color: a.cor }}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const router = useRouter()
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.violet }}>
            <Stethoscope className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[14px] font-bold" style={{ color: C.dark }}>
            Bless<span style={{ color: C.violet }}>System</span>
            <span style={{ color: C.pink }}>Clinic</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {[["#funcionalidades", "Funcionalidades"], ["#planos", "Planos"], ["#faq", "FAQ"]].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="text-[13px] font-medium transition-colors"
              style={{ color: C.body }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.violet)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.body)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/5543988720576?text=Quero saber mais sobre o BlessSystemClinic"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: C.violet }}
          >
            Falar com consultor
          </a>
          <button
            onClick={() => router.push("/contratar?sistema=clinic")}
            className="text-[12px] font-bold px-4 py-2 rounded-lg text-white cursor-pointer transition-all hover:opacity-90"
            style={{ background: C.violet }}
          >
            Começar grátis
          </button>
        </div>
      </div>
    </header>
  )
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{
        border: `1px solid ${open ? C.violet + "40" : C.border}`,
        background: open ? C.bgPurple : "white",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-[13.5px] font-semibold pr-4" style={{ color: C.dark }}>{q}</span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{ color: C.violet, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p className="px-5 pb-4 text-[13px] leading-relaxed" style={{ color: C.body }}>{a}</p>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlessSystemClinicPage() {
  const router = useRouter()
  const featRef = useRef(null)
  const planRef = useRef(null)
  const featInView = useInView(featRef, { once: true, margin: "-50px" })
  const planInView = useInView(planRef, { once: true, margin: "-50px" })

  return (
    <main style={{ background: C.bg, color: C.dark }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${C.violet}14 0%, transparent 70%)` }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-5"
                style={{ background: C.bgPurple, color: C.violet, border: `1px solid ${C.border}` }}
              >
                <Zap className="w-3 h-3" />
                Clínicas odontológicas e de estética
              </div>

              <h1
                className="text-[2.6rem] font-bold leading-[1.15] mb-4"
                style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
              >
                O sistema que sua clínica{" "}
                <span style={{ color: C.violet }}>merecia desde o início</span>
              </h1>

              <p className="text-[15px] leading-relaxed mb-7" style={{ color: C.body, maxWidth: 460 }}>
                Agenda inteligente, fichas digitais, financeiro integrado e notificações automáticas —
                tudo em uma plataforma simples e completa.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  onClick={() => router.push("/contratar?sistema=clinic")}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-bold text-white cursor-pointer transition-all hover:opacity-90"
                  style={{ background: C.violet }}
                >
                  Começar 14 dias grátis <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/5543988720576?text=Quero saber mais sobre o BlessSystemClinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-semibold transition-all hover:opacity-80"
                  style={{ background: C.bgPurple, color: C.violet, border: `1px solid ${C.border}` }}
                >
                  <MessageCircle className="w-4 h-4" /> Falar com consultor
                </a>
              </div>

              <div className="flex items-center gap-5">
                {[["✓ 14 dias grátis"], ["✓ Sem cartão"], ["✓ Suporte incluído"]].map(([t]) => (
                  <span key={t} className="text-[12px] font-medium" style={{ color: C.body }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Right — mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <DashboardMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.bgSoft }}>
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "500+", l: "Clínicas ativas" },
            { v: "98%", l: "Satisfação" },
            { v: "−60%", l: "Redução de faltas" },
            { v: "48h", l: "Implantação" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-bold" style={{ color: C.violet, fontFamily: "var(--font-space-grotesk)" }}>{s.v}</p>
              <p className="text-[12px] mt-0.5" style={{ color: C.body }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section id="funcionalidades" className="py-20 px-6" ref={featRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span
              className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3"
              style={{ background: C.bgPurple, color: C.violet }}
            >
              Funcionalidades
            </span>
            <h2
              className="text-[2rem] font-bold mb-3"
              style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
            >
              Tudo que sua clínica precisa,{" "}
              <span style={{ color: C.violet }}>em um só lugar</span>
            </h2>
            <p className="text-[14px] max-w-md mx-auto" style={{ color: C.body }}>
              Do agendamento à nota fiscal — sem planilhas, sem sistemas desconectados.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="rounded-xl p-5 transition-shadow hover:shadow-md"
                style={{ background: "white", border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: C.bgPurple }}
                >
                  <f.icon className="w-4.5 h-4.5" style={{ color: C.violet }} />
                </div>
                <h3 className="text-[13.5px] font-bold mb-1.5" style={{ color: C.dark }}>{f.title}</h3>
                <p className="text-[12.5px] leading-relaxed" style={{ color: C.body }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: C.bgPurple }}>
        <div className="max-w-5xl mx-auto text-center">
          <span
            className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3"
            style={{ background: "white", color: C.violet }}
          >
            Como funciona
          </span>
          <h2
            className="text-[2rem] font-bold mb-12"
            style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
          >
            Comece em <span style={{ color: C.violet }}>3 passos simples</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", icon: Zap, title: "Escolha seu plano", desc: "Selecione o plano ideal e inicie o trial gratuito de 14 dias." },
              { n: "02", icon: Users, title: "Implantação guiada", desc: "Nossa equipe configura e treina seu time em até 48 horas." },
              { n: "03", icon: TrendingUp, title: "Clínica funcionando", desc: "Agenda, fichas e financeiro rodando. Você foca no atendimento." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-xl p-6 text-center"
                style={{ background: "white", border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: C.bgPurple }}
                >
                  <s.icon className="w-5 h-5" style={{ color: C.violet }} />
                </div>
                <p className="text-[10px] font-bold mb-1" style={{ color: C.violet }}>{s.n}</p>
                <h3 className="text-[14px] font-bold mb-2" style={{ color: C.dark }}>{s.title}</h3>
                <p className="text-[12.5px] leading-relaxed" style={{ color: C.body }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="planos" className="py-20 px-6" ref={planRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={planInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span
              className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3"
              style={{ background: C.bgPurple, color: C.violet }}
            >
              Planos e preços
            </span>
            <h2
              className="text-[2rem] font-bold mb-2"
              style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
            >
              Sem taxa de adesão.{" "}
              <span style={{ color: C.violet }}>Cancele quando quiser.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={planInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative rounded-2xl p-6 flex flex-col"
                style={{
                  background: plan.hot ? C.violet : "white",
                  border: plan.hot ? "none" : `1px solid ${C.border}`,
                  boxShadow: plan.hot ? "0 16px 48px rgba(124,58,237,0.22)" : "none",
                }}
              >
                {plan.hot && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full"
                    style={{ background: C.pink, color: "white" }}
                  >
                    Mais popular
                  </div>
                )}

                <div className="mb-4">
                  <h3
                    className="text-[17px] font-bold"
                    style={{ color: plan.hot ? "white" : C.dark, fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-[12px] mt-0.5" style={{ color: plan.hot ? "rgba(255,255,255,0.65)" : C.muted }}>
                    {plan.desc}
                  </p>
                </div>

                <div className="flex items-end gap-1 mb-5">
                  <span className="text-[13px] mb-1" style={{ color: plan.hot ? "rgba(255,255,255,0.65)" : C.muted }}>R$</span>
                  <span
                    className="text-[2.2rem] font-bold leading-none"
                    style={{ color: plan.hot ? "white" : C.dark, fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {plan.price.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-[13px] mb-1" style={{ color: plan.hot ? "rgba(255,255,255,0.65)" : C.muted }}>/mês</span>
                </div>

                <button
                  onClick={() => router.push(`/contratar/cadastro?sistema=clinic&plano=${plan.id}&periodo=mensal`)}
                  className="w-full py-2.5 rounded-xl text-[13px] font-bold mb-5 cursor-pointer transition-all hover:opacity-90"
                  style={
                    plan.hot
                      ? { background: "white", color: C.violet }
                      : { background: C.violet, color: "white" }
                  }
                >
                  Assinar {plan.name}
                </button>

                <ul className="flex flex-col gap-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: plan.hot ? "rgba(255,255,255,0.75)" : "#10B981" }}
                      />
                      <span
                        className="text-[12.5px]"
                        style={{ color: plan.hot ? "rgba(255,255,255,0.8)" : C.body }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6" style={{ background: C.bgSoft }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3"
              style={{ background: C.bgPurple, color: C.violet }}
            >
              FAQ
            </span>
            <h2
              className="text-[2rem] font-bold"
              style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
            >
              Dúvidas <span style={{ color: C.violet }}>frequentes</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {FAQS.map((item) => <FAQItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: C.violet }}>
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-[2rem] font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pronto para transformar sua clínica?
          </h2>
          <p className="text-[14px] text-white/70 mb-7">
            14 dias grátis. Sem cartão. Suporte na implantação.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/contratar?sistema=clinic")}
              className="px-6 py-3 rounded-xl text-[13.5px] font-bold cursor-pointer hover:opacity-90 transition-all"
              style={{ background: "white", color: C.violet }}
            >
              Começar gratuitamente
            </button>
            <a
              href="https://wa.me/5543988720576?text=Quero saber mais sobre o BlessSystemClinic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[13.5px] font-semibold"
              style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="py-6 px-6 text-center text-[12px]"
        style={{ background: "white", borderTop: `1px solid ${C.border}`, color: C.muted }}
      >
        © {new Date().getFullYear()} BlessSystemClinic · desenvolvido por{" "}
        <a href="/" style={{ color: C.violet, fontWeight: 600 }}>Garbato Solution</a>
      </footer>
    </main>
  )
}
