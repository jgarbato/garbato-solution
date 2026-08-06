"use client"

import { motion } from "framer-motion"
import {
  MessageCircle,
  ArrowRight,
  Search,
  ClipboardList,
  Rocket,
  Check,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { whatsappUrl } from "@/lib/constants"

const WA = whatsappUrl(
  "Olá! Quero o Diagnóstico de Operação gratuito da Garbato Solution."
)

const STEPS = [
  {
    icon: Search,
    n: "01",
    title: "Você conta sua operação",
    desc: "Numa conversa rápida (WhatsApp ou call de 30 min) você mostra como sua empresa trabalha hoje.",
  },
  {
    icon: ClipboardList,
    n: "02",
    title: "A gente mapeia os gargalos",
    desc: "Identificamos onde há retrabalho, planilha demais e processos que travam o crescimento.",
  },
  {
    icon: Rocket,
    n: "03",
    title: "Você recebe um mini-plano",
    desc: "O que dá pra automatizar primeiro, por prioridade e impacto. Seu, de graça — decida no seu tempo.",
  },
]

const RECEBE = [
  "Mapa dos processos que mais consomem tempo da sua equipe",
  "Onde a planilha está te custando dinheiro (retrabalho e erro)",
  "O que dá pra automatizar primeiro — prioridade x impacto",
  "Uma estimativa realista de por onde começar",
  "Zero compromisso — só falamos de projeto se fizer sentido pra você",
]

const PRA_QUEM = [
  "Roda no Excel e no WhatsApp e quer profissionalizar a operação",
  "Tem processos espalhados em vários sistemas que não conversam",
  "Quer um sistema sob medida mas não sabe por onde começar",
]

export default function DiagnosticoClient() {
  return (
    <main className="min-h-screen" style={{ background: "#060810" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full opacity-20 blur-[120px] pointer-events-none bg-[#3B82F6]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge-blue mb-5 inline-flex"
          >
            Diagnóstico de Operação · Gratuito
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-bold text-[#EEF1F8] mb-5 leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Descubra o que dá pra automatizar{" "}
            <span className="text-gradient-blue">primeiro.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-lg sm:text-xl text-[#AFB6CC] mb-9 max-w-2xl mx-auto leading-relaxed"
          >
            Em 30 minutos a gente mapeia onde sua empresa perde tempo com
            planilha e retrabalho — e você sai com um mini-plano do que resolver
            primeiro. Sem compromisso.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg rounded-xl transition-colors shadow-[0_8px_28px_rgba(37,211,102,0.35)]"
            >
              <MessageCircle className="w-5 h-5" />
              Quero meu diagnóstico gratuito
            </a>
            <p className="text-[13px] text-[#71789A]">
              Resposta em até 24h · Sem custo · Sem compromisso
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#EEF1F8] text-center mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-7 bg-[#0E1320]"
                style={{ border: "1px solid var(--gs-border)" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#3B82F6]/12 border border-[#3B82F6]/25">
                    <s.icon className="w-5 h-5 text-[#5B9BFF]" />
                  </div>
                  <span
                    className="text-3xl font-bold text-[#1E2740]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {s.n}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold text-[#EEF1F8] mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.title}
                </h3>
                <p className="text-[14px] text-[#AFB6CC] leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE + PRA QUEM É */}
      <section className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-8 bg-[#0E1320]"
            style={{ border: "1px solid var(--gs-border)" }}
          >
            <h3
              className="text-xl font-bold text-[#EEF1F8] mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              O que você recebe
            </h3>
            <ul className="flex flex-col gap-3.5">
              {RECEBE.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-[#10B981]" />
                  <span className="text-[14px] text-[#AFB6CC] leading-snug">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-8"
            style={{
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(59,130,246,0.20)",
            }}
          >
            <h3
              className="text-xl font-bold text-[#EEF1F8] mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Pra quem é
            </h3>
            <ul className="flex flex-col gap-3.5">
              {PRA_QUEM.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-[#5B9BFF]" />
                  <span className="text-[14px] text-[#AFB6CC] leading-snug">
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[110px] bg-[#3B82F6]/[0.14] pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#EEF1F8] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sua operação organizada começa com{" "}
            <span className="text-gradient-blue">uma conversa.</span>
          </h2>
          <p className="text-[#AFB6CC] text-lg mb-8">
            Leva 30 minutos e não custa nada. O próximo passo é seu.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg rounded-xl transition-colors shadow-[0_8px_28px_rgba(37,211,102,0.35)]"
          >
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp agora
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
