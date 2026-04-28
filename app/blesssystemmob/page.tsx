"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
import {
  Check, ArrowRight, Building2, FileText, Users, BarChart2,
  Zap, ChevronDown, MessageCircle, CreditCard, Globe,
  Map, DollarSign, TrendingUp, Key, Home, Shield,
} from "lucide-react"

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
  blue: "#0284C7",
  blueLight: "#0EA5E9",
  green: "#059669",
  bg: "#FFFFFF",
  bgSoft: "#F8FAFB",
  bgBlue: "#F0F9FF",
  border: "#E0F0FB",
  dark: "#0C1A2E",
  body: "#52525B",
  muted: "#A1A1AA",
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Map, title: "Gestão de lotes e quadras", desc: "Mapa interativo com situação de cada lote em tempo real — disponível, reservado, vendido ou em obras." },
  { icon: FileText, title: "Contratos digitais", desc: "Geração automática com assinatura eletrônica. Sem papel, sem deslocamento, com validade jurídica." },
  { icon: DollarSign, title: "Financeiro integrado", desc: "Parcelas, inadimplência, repasses e comissões com integração boleto e PIX via gateway bancário." },
  { icon: Users, title: "CRM comercial", desc: "Funil visual com acompanhamento de leads, follow-ups automáticos e histórico completo de cada negociação." },
  { icon: Globe, title: "Sites inteligentes", desc: "Portal próprio com listagem de imóveis e integração automática com portais como ZAP, OLX e VivaReal." },
  { icon: BarChart2, title: "Relatórios gerenciais", desc: "Dashboards com visão completa: vendas, inadimplência, estoque de lotes e performance do time comercial." },
]

const PLANS = [
  {
    id: "essencial",
    name: "Essencial",
    price: 249,
    desc: "Para iniciar sua jornada",
    features: ["Até 3 usuários", "1 módulo principal", "Financeiro básico", "Central do Cliente", "Infraestrutura em nuvem", "4h de treinamento", "Suporte WhatsApp comercial"],
  },
  {
    id: "profissional",
    name: "Profissional",
    price: 399,
    desc: "Para empresas em crescimento",
    hot: true,
    features: ["Tudo do Essencial", "Até 10 usuários", "2 módulos + CRM", "Financeiro completo", "Sites inteligentes", "Integração boleto/PIX", "Integração com portais", "6h de treinamento"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 549,
    desc: "Solução completa",
    features: ["Tudo do Profissional", "Usuários ilimitados", "Todos os módulos", "Todas as integrações", "Customizações avançadas", "Suporte prioritário", "10h de treinamento"],
  },
]

const FAQS = [
  { q: "Funciona para loteadoras e imobiliárias?", a: "Sim. O sistema possui módulos específicos para cada operação — loteamento, locação, venda e gestão de contratos." },
  { q: "Posso integrar com portais imobiliários?", a: "Sim. Os planos Profissional e Enterprise incluem integração com ZAP Imóveis, OLX e VivaReal." },
  { q: "Como funciona a assinatura eletrônica?", a: "Os contratos são gerados e enviados por e-mail para assinatura digital com validade jurídica, sem presença física." },
  { q: "Tem período de teste gratuito?", a: "Sim, 14 dias no plano Profissional sem precisar de cartão de crédito." },
  { q: "Como é feita a implantação?", a: "Nossa equipe realiza configuração e treinamento do time conforme o plano contratado — 4h, 6h ou 10h — de forma online." },
]

// ─── Dashboard mockup ─────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 24px 64px rgba(2,132,199,0.13)", border: `1px solid ${C.border}` }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ background: C.bgBlue, borderBottom: `1px solid ${C.border}` }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span
          className="flex-1 mx-3 rounded text-[10px] text-center py-0.5 px-2"
          style={{ background: "white", color: C.muted }}
        >
          app.blesssystemmob.com.br
        </span>
      </div>

      {/* App layout */}
      <div className="flex" style={{ background: "#F8FAFB", height: 320 }}>
        {/* Sidebar */}
        <div
          className="w-12 flex flex-col items-center py-3 gap-2.5 flex-shrink-0"
          style={{ background: C.blue }}
        >
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5 text-white" />
          </div>
          {[Home, Users, FileText, BarChart2].map((Icon, i) => (
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
              <p className="text-[12px] font-bold" style={{ color: C.dark }}>Painel — Residencial Bela Vista</p>
              <p className="text-[10px]" style={{ color: C.muted }}>Fase 2 · 284 lotes</p>
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#DCFCE7", color: "#16A34A" }}
            >
              Ao vivo
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { l: "Lotes", v: "284", c: C.blue },
              { l: "Vendidos", v: "187", c: C.green },
              { l: "Receita", v: "R$2.1M", c: "#F59E0B" },
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

          {/* Lots list */}
          <div className="flex flex-col gap-1.5">
            {[
              { ref: "LT-0047", cliente: "Roberto Alves", tipo: "Venda", valor: "R$85.000", cor: C.green, status: "Assinado" },
              { ref: "LT-0048", cliente: "Carla Souza", tipo: "Reserva", valor: "R$92.000", cor: "#F59E0B", status: "Pendente" },
              { ref: "LT-0049", cliente: "Marcos Lima", tipo: "Venda", valor: "R$78.000", cor: C.green, status: "Assinado" },
              { ref: "LT-0050", cliente: "Juliana Reis", tipo: "Locação", valor: "R$1.800/m", cor: C.blue, status: "Ativo" },
            ].map((l) => (
              <div
                key={l.ref}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                style={{ background: "white", border: `1px solid ${C.border}` }}
              >
                <span className="text-[9px] font-bold w-12 flex-shrink-0" style={{ color: C.blue }}>{l.ref}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold truncate" style={{ color: C.dark }}>{l.cliente}</p>
                  <p className="text-[8px]" style={{ color: C.muted }}>{l.tipo}</p>
                </div>
                <span className="text-[9px] font-semibold flex-shrink-0" style={{ color: C.dark }}>{l.valor}</span>
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{ background: `${l.cor}18`, color: l.cor }}
                >
                  {l.status}
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
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.blue }}>
            <Building2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[14px] font-bold" style={{ color: C.dark }}>
            Bless<span style={{ color: C.blue }}>System</span>
            <span style={{ color: C.green }}>Mob</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-5">
          {[["#funcionalidades", "Funcionalidades"], ["#planos", "Planos"], ["#faq", "FAQ"]].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="text-[13px] font-medium transition-colors"
              style={{ color: C.body }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.body)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/5543988720576?text=Quero saber mais sobre o BlessSystemMob"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-[12px] font-semibold px-3 py-1.5 rounded-lg"
            style={{ color: C.blue }}
          >
            Falar com consultor
          </a>
          <button
            onClick={() => router.push("/contratar?sistema=mob")}
            className="text-[12px] font-bold px-4 py-2 rounded-lg text-white cursor-pointer transition-all hover:opacity-90"
            style={{ background: C.blue }}
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
        border: `1px solid ${open ? C.blue + "50" : C.border}`,
        background: open ? C.bgBlue : "white",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-[13.5px] font-semibold pr-4" style={{ color: C.dark }}>{q}</span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{ color: C.blue, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p className="px-5 pb-4 text-[13px] leading-relaxed" style={{ color: C.body }}>{a}</p>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlessSystemMobPage() {
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
          style={{ background: `radial-gradient(ellipse, ${C.blue}12 0%, transparent 70%)` }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold mb-5"
                style={{ background: C.bgBlue, color: C.blue, border: `1px solid ${C.border}` }}
              >
                <Building2 className="w-3 h-3" />
                Para imobiliárias e loteadoras
              </div>

              <h1
                className="text-[2.6rem] font-bold leading-[1.15] mb-4"
                style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
              >
                Tecnologia de ponta para sua{" "}
                <span style={{ color: C.blue }}>imobiliária crescer</span>
              </h1>

              <p className="text-[15px] leading-relaxed mb-7" style={{ color: C.body, maxWidth: 460 }}>
                ERP completo com gestão de lotes, contratos digitais, CRM integrado
                e sites inteligentes. Mais de 250 imobiliárias já confiam no BlessSystemMob.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  onClick={() => router.push("/contratar?sistema=mob")}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-bold text-white cursor-pointer transition-all hover:opacity-90"
                  style={{ background: C.blue }}
                >
                  Começar 14 dias grátis <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/5543988720576?text=Quero saber mais sobre o BlessSystemMob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-semibold transition-all hover:opacity-80"
                  style={{ background: C.bgBlue, color: C.blue, border: `1px solid ${C.border}` }}
                >
                  <MessageCircle className="w-4 h-4" /> Falar com consultor
                </a>
              </div>

              <div className="flex items-center gap-5">
                {["✓ 14 dias grátis", "✓ Sem cartão", "✓ Suporte incluído"].map((t) => (
                  <span key={t} className="text-[12px] font-medium" style={{ color: C.body }}>{t}</span>
                ))}
              </div>
            </motion.div>

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
            { v: "250+", l: "Imobiliárias ativas" },
            { v: "R$2B+", l: "Em vendas gerenciadas" },
            { v: "98%", l: "Satisfação" },
            { v: "48h", l: "Implantação" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-2xl font-bold" style={{ color: C.blue, fontFamily: "var(--font-space-grotesk)" }}>{s.v}</p>
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
              style={{ background: C.bgBlue, color: C.blue }}
            >
              Funcionalidades
            </span>
            <h2
              className="text-[2rem] font-bold mb-3"
              style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
            >
              Da captação ao pós-venda,{" "}
              <span style={{ color: C.blue }}>tudo integrado</span>
            </h2>
            <p className="text-[14px] max-w-md mx-auto" style={{ color: C.body }}>
              Elimine planilhas e sistemas desconectados de uma vez por todas.
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
                  style={{ background: C.bgBlue }}
                >
                  <f.icon className="w-4 h-4" style={{ color: C.blue }} />
                </div>
                <h3 className="text-[13.5px] font-bold mb-1.5" style={{ color: C.dark }}>{f.title}</h3>
                <p className="text-[12.5px] leading-relaxed" style={{ color: C.body }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: C.bgBlue }}>
        <div className="max-w-5xl mx-auto text-center">
          <span
            className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3"
            style={{ background: "white", color: C.blue }}
          >
            Como funciona
          </span>
          <h2
            className="text-[2rem] font-bold mb-12"
            style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
          >
            Implantação em{" "}
            <span style={{ color: C.blue }}>3 etapas simples</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "01", icon: Key, title: "Escolha seu plano", desc: "Selecione conforme o tamanho da operação e inicie o trial gratuito de 14 dias." },
              { n: "02", icon: Users, title: "Implantação guiada", desc: "Nosso time configura e treina sua equipe com foco na sua operação específica." },
              { n: "03", icon: TrendingUp, title: "Operação funcionando", desc: "Lotes, contratos e financeiro rodando. Foque em vender mais." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-xl p-6"
                style={{ background: "white", border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: C.bgBlue }}
                >
                  <s.icon className="w-5 h-5" style={{ color: C.blue }} />
                </div>
                <p className="text-[10px] font-bold mb-1" style={{ color: C.blue }}>{s.n}</p>
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
              style={{ background: C.bgBlue, color: C.blue }}
            >
              Planos e preços
            </span>
            <h2
              className="text-[2rem] font-bold mb-2"
              style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
            >
              Sem fidelidade.{" "}
              <span style={{ color: C.blue }}>Cancele quando quiser.</span>
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
                  background: plan.hot ? C.blue : "white",
                  border: plan.hot ? "none" : `1px solid ${C.border}`,
                  boxShadow: plan.hot ? "0 16px 48px rgba(2,132,199,0.22)" : "none",
                }}
              >
                {plan.hot && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full"
                    style={{ background: C.green, color: "white" }}
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
                  onClick={() => router.push(`/contratar/cadastro?sistema=mob&plano=${plan.id}&periodo=mensal`)}
                  className="w-full py-2.5 rounded-xl text-[13px] font-bold mb-5 cursor-pointer transition-all hover:opacity-90"
                  style={
                    plan.hot
                      ? { background: "white", color: C.blue }
                      : { background: C.blue, color: "white" }
                  }
                >
                  Assinar {plan.name}
                </button>

                <ul className="flex flex-col gap-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: plan.hot ? "rgba(255,255,255,0.75)" : C.green }}
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
              style={{ background: C.bgBlue, color: C.blue }}
            >
              FAQ
            </span>
            <h2
              className="text-[2rem] font-bold"
              style={{ color: C.dark, fontFamily: "var(--font-space-grotesk)" }}
            >
              Dúvidas <span style={{ color: C.blue }}>frequentes</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2.5">
            {FAQS.map((item) => <FAQItem key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: C.blue }}>
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-[2rem] font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sua imobiliária merece tecnologia de ponta
          </h2>
          <p className="text-[14px] text-white/70 mb-7">
            14 dias grátis. Implantação guiada. Suporte especializado.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/contratar?sistema=mob")}
              className="px-6 py-3 rounded-xl text-[13.5px] font-bold cursor-pointer hover:opacity-90 transition-all"
              style={{ background: "white", color: C.blue }}
            >
              Começar gratuitamente
            </button>
            <a
              href="https://wa.me/5543988720576?text=Quero saber mais sobre o BlessSystemMob"
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
        © {new Date().getFullYear()} BlessSystemMob · desenvolvido por{" "}
        <a href="/" style={{ color: C.blue, fontWeight: 600 }}>Garbato Solution</a>
      </footer>
    </main>
  )
}
