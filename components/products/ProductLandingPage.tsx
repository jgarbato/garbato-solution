"use client"

import { useState, useRef, useId } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useInView, MotionConfig } from "framer-motion"
import { Check, ArrowRight, ChevronDown, MessageCircle } from "lucide-react"
import type { Product, FAQ as FAQType, ProductTheme } from "@/lib/products/types"
import { whatsappUrl } from "@/lib/constants"
import DashboardMockup from "./DashboardMockup"
import { Section, SectionHeader } from "./Section"

type Props = { product: Product }

export default function ProductLandingPage({ product }: Props) {
  const router = useRouter()
  const featRef = useRef(null)
  const planRef = useRef(null)
  const featInView = useInView(featRef, { once: true, margin: "-50px" })
  const planInView = useInView(planRef, { once: true, margin: "-50px" })

  const { theme: t, hero, features, howItWorks, pricing, faq, cta, stats, mockup } = product
  const contratarHref = `/contratar?sistema=${product.slug}`
  const waHref = whatsappUrl(product.whatsappMessage)

  return (
    <MotionConfig reducedMotion="user">
    <main style={{ background: t.bg, color: t.dark }}>
      <ProductNavbar product={product} contratarHref={contratarHref} waHref={waHref} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${t.primary}14 0%, transparent 70%)` }}
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
                style={{ background: t.bgTinted, color: t.primary, border: `1px solid ${t.border}` }}
              >
                <hero.badge.icon className="w-3 h-3" />
                {hero.badge.label}
              </div>

              <h1
                className="text-[2.6rem] font-bold leading-[1.15] mb-4"
                style={{ color: t.dark, fontFamily: "var(--font-space-grotesk)" }}
              >
                {hero.titlePre}{" "}
                <span style={{ color: t.primary }}>{hero.titleHighlight}</span>
              </h1>

              <p className="text-[15px] leading-relaxed mb-7" style={{ color: t.body, maxWidth: 460 }}>
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                <button
                  onClick={() => router.push(contratarHref)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-bold text-white cursor-pointer transition-all hover:opacity-90"
                  style={{ background: t.primary }}
                >
                  {hero.primaryCta} <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[13.5px] font-semibold transition-all hover:opacity-80"
                  style={{ background: t.bgTinted, color: t.primary, border: `1px solid ${t.border}` }}
                >
                  <MessageCircle className="w-4 h-4" /> {hero.secondaryCta}
                </a>
              </div>

              <div className="flex items-center gap-5">
                {hero.bullets.map((b) => (
                  <span key={b} className="text-[12px] font-medium" style={{ color: t.body }}>{b}</span>
                ))}
              </div>
            </motion.div>

            {/* Right — mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <DashboardMockup mockup={mockup} theme={t} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, background: t.bgSoft }}>
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold" style={{ color: t.primary, fontFamily: "var(--font-space-grotesk)" }}>{s.value}</p>
              <p className="text-[12px] mt-0.5" style={{ color: t.body }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <Section id="funcionalidades" ref={featRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={featInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            theme={t}
            badge={features.badge}
            titlePre={features.titlePre}
            titleHighlight={features.titleHighlight}
            subtitle={features.subtitle}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={featInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-xl p-5 transition-shadow hover:shadow-md"
              style={{ background: "white", border: `1px solid ${t.border}` }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: t.bgTinted }}
              >
                <f.icon className="w-4 h-4" style={{ color: t.primary }} />
              </div>
              <h3 className="text-[13.5px] font-bold mb-1.5" style={{ color: t.dark }}>{f.title}</h3>
              <p className="text-[12.5px] leading-relaxed" style={{ color: t.body }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <Section maxWidth="5xl" bg={t.bgTinted}>
        <SectionHeader
          theme={t}
          badge={howItWorks.badge}
          badgeBg="white"
          titlePre={howItWorks.titlePre}
          titleHighlight={howItWorks.titleHighlight}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {howItWorks.steps.map((s) => (
            <div
              key={s.n}
              className="rounded-xl p-6 text-center"
              style={{ background: "white", border: `1px solid ${t.border}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: t.bgTinted }}
              >
                <s.icon className="w-5 h-5" style={{ color: t.primary }} />
              </div>
              <p className="text-[10px] font-bold mb-1" style={{ color: t.primary }}>{s.n}</p>
              <h3 className="text-[14px] font-bold mb-2" style={{ color: t.dark }}>{s.title}</h3>
              <p className="text-[12.5px] leading-relaxed" style={{ color: t.body }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <Section id="planos" maxWidth="5xl" ref={planRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={planInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            theme={t}
            badge={pricing.badge}
            titlePre={pricing.titlePre}
            titleHighlight={pricing.titleHighlight}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4">
          {pricing.plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              animate={planInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{
                background: plan.hot ? t.primary : "white",
                border: plan.hot ? "none" : `1px solid ${t.border}`,
                boxShadow: plan.hot ? `0 16px 48px rgba(${t.shadowRgba},0.22)` : "none",
              }}
            >
              {plan.hot && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full"
                  style={{ background: t.accent, color: "white" }}
                >
                  Mais popular
                </div>
              )}

              <div className="mb-4">
                <h3
                  className="text-[17px] font-bold"
                  style={{ color: plan.hot ? "white" : t.dark, fontFamily: "var(--font-space-grotesk)" }}
                >
                  {plan.name}
                </h3>
                <p className="text-[12px] mt-0.5" style={{ color: plan.hot ? "rgba(255,255,255,0.65)" : t.muted }}>
                  {plan.desc}
                </p>
              </div>

              <div className="flex items-end gap-1 mb-5">
                <span className="text-[13px] mb-1" style={{ color: plan.hot ? "rgba(255,255,255,0.65)" : t.muted }}>R$</span>
                <span
                  className="text-[2.2rem] font-bold leading-none"
                  style={{ color: plan.hot ? "white" : t.dark, fontFamily: "var(--font-space-grotesk)" }}
                >
                  {plan.price.toLocaleString("pt-BR")}
                </span>
                <span className="text-[13px] mb-1" style={{ color: plan.hot ? "rgba(255,255,255,0.65)" : t.muted }}>/mês</span>
              </div>

              <button
                onClick={() => router.push(contratarHref)}
                className="w-full py-2.5 rounded-xl text-[13px] font-bold mb-5 cursor-pointer transition-all hover:opacity-90"
                style={
                  plan.hot
                    ? { background: "white", color: t.primary }
                    : { background: t.primary, color: "white" }
                }
              >
                Assinar {plan.name}
              </button>

              <ul className="flex flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: plan.hot ? "rgba(255,255,255,0.75)" : t.accent }}
                    />
                    <span
                      className="text-[12.5px]"
                      style={{ color: plan.hot ? "rgba(255,255,255,0.8)" : t.body }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <Section id="faq" maxWidth="2xl" bg={t.bgSoft}>
        <SectionHeader
          theme={t}
          badge={faq.badge}
          titlePre="Dúvidas"
          titleHighlight="frequentes"
          className="text-center mb-10"
        />
        <div className="flex flex-col gap-2.5">
          {faq.items.map((item) => <FAQItem key={item.q} item={item} theme={t} />)}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: t.primary }}>
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-[2rem] font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {cta.title}
          </h2>
          <p className="text-[14px] text-white/70 mb-7">{cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(contratarHref)}
              className="px-6 py-3 rounded-xl text-[13.5px] font-bold cursor-pointer hover:opacity-90 transition-all"
              style={{ background: "white", color: t.primary }}
            >
              {cta.primaryCta}
            </button>
            <a
              href={waHref}
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
        style={{ background: "white", borderTop: `1px solid ${t.border}`, color: t.muted }}
      >
        © {new Date().getFullYear()} {product.name} · desenvolvido por{" "}
        <Link href="/" style={{ color: t.primary, fontWeight: 600 }}>Garbato Solution</Link>
      </footer>
    </main>
    </MotionConfig>
  )
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function ProductNavbar({
  product,
  contratarHref,
  waHref,
}: {
  product: Product
  contratarHref: string
  waHref: string
}) {
  const router = useRouter()
  const t = product.theme
  const LogoIcon = product.logoIcon

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${t.border}` }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: t.primary }}>
            <LogoIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[14px] font-bold" style={{ color: t.dark }}>
            Bless<span style={{ color: t.primary }}>System</span>
            <span style={{ color: t.accent }}>{product.logoSuffix}</span>
          </span>
        </div>

        {/* Nav */}
        <nav
          className="hidden md:flex items-center gap-5"
          style={{ "--nav-link": t.body, "--nav-link-hover": t.primary } as React.CSSProperties}
        >
          {[["#funcionalidades", "Funcionalidades"], ["#planos", "Planos"], ["#faq", "FAQ"]].map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="text-[13px] font-medium transition-colors text-[color:var(--nav-link)] hover:text-[color:var(--nav-link-hover)]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: t.primary }}
          >
            Falar com consultor
          </a>
          <button
            onClick={() => router.push(contratarHref)}
            className="text-[12px] font-bold px-4 py-2 rounded-lg text-white cursor-pointer transition-all hover:opacity-90"
            style={{ background: t.primary }}
          >
            Começar grátis
          </button>
        </div>
      </div>
    </header>
  )
}

function FAQItem({ item, theme: t }: { item: FAQType; theme: ProductTheme }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{
        border: `1px solid ${open ? t.primary + "40" : t.border}`,
        background: open ? t.bgTinted : "white",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-[13.5px] font-semibold pr-4" style={{ color: t.dark }}>{item.q}</span>
        <ChevronDown
          aria-hidden="true"
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{ color: t.primary, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p id={panelId} className="px-5 pb-4 text-[13px] leading-relaxed" style={{ color: t.body }}>{item.a}</p>
      )}
    </div>
  )
}
