"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "Que tipo de sistema vocês desenvolvem?",
    a: "Desenvolvemos sistemas web sob medida: ERPs, CRMs, portais administrativos, sistemas financeiros, imobiliários, dashboards gerenciais, APIs e integrações. Cada projeto é único — construído a partir do zero com base na operação específica do cliente.",
  },
  {
    q: "O projeto é realmente sob medida?",
    a: "Sim. Nenhum sistema é copiado de outro projeto ou baseado em templates. Começamos pelo levantamento da operação, estruturamos os fluxos e desenvolvemos cada funcionalidade conforme a necessidade real do negócio do cliente.",
  },
  {
    q: "Vocês atendem empresas de diferentes segmentos?",
    a: "Sim. Atendemos empresas de diversos segmentos: imobiliário, financeiro, varejo, serviços, saúde, construção civil, entre outros. A abordagem sob medida nos permite adaptar o sistema a qualquer realidade de negócio.",
  },
  {
    q: "É possível integrar com banco, WhatsApp ou outros sistemas?",
    a: "Sim. Desenvolvemos integrações com Open Finance/Open Banking, APIs de WhatsApp Business, gateways de pagamento, plataformas de e-commerce, ERPs de terceiros, sistemas fiscais e outros serviços externos que o negócio utiliza.",
  },
  {
    q: "O sistema pode crescer no futuro?",
    a: "Absolutamente. Toda a arquitetura é pensada para escalar. Começamos com os módulos essenciais e evoluímos o sistema de forma planejada — adicionando funcionalidades, usuários e integrações sem precisar reescrever a base.",
  },
  {
    q: "Como funciona o processo de desenvolvimento?",
    a: "Seguimos 6 etapas: Levantamento (entendimento da operação), Estruturação (arquitetura e regras), Protótipo (interfaces validadas), Desenvolvimento (em sprints com entregas incrementais), Implantação (treinamento e go-live) e Evolução (crescimento contínuo).",
  },
  {
    q: "Vocês fazem apenas o sistema ou também ajudam na estruturação?",
    a: "Fazemos os dois. Nossa principal diferença é o entendimento do negócio antes de programar. Ajudamos a estruturar fluxos, definir processos, mapear regras e organizar a operação — o sistema é o resultado dessa estruturação.",
  },
  {
    q: "Como solicitar um orçamento?",
    a: "Entre em contato pelo formulário ou diretamente pelo WhatsApp. Vamos entender sua necessidade, fazer um levantamento inicial e apresentar uma proposta com escopo, prazo e investimento — sem compromisso.",
  },
]

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
      className="rounded-xl overflow-hidden"
      style={{
        background: open ? "rgba(59,130,246,0.04)" : "rgba(255,255,255,0.025)",
        border: open ? "1px solid rgba(59,130,246,0.2)" : "1px solid var(--gs-border)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span
          className="text-[15px] font-semibold text-[#ECF0FF] leading-snug"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: open ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)",
            border: open ? "1px solid rgba(59,130,246,0.25)" : "1px solid var(--gs-border)",
          }}
        >
          <ChevronDown
            className="w-3.5 h-3.5 transition-colors"
            style={{ color: open ? "#3B82F6" : "#8B9BC0" }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="h-[1px] bg-white/[0.06] mb-4" />
              <p className="text-[14px] text-[#8B9BC0] leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="faq" className="relative py-24 px-6 bg-[#0C0D18]">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge-blue mb-4 inline-flex">Dúvidas frequentes</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Perguntas{" "}
            <span className="text-gradient-blue">frequentes</span>
          </h2>
          <p className="text-[#8B9BC0] text-lg max-w-lg mx-auto">
            Tudo que você precisa saber antes de dar o próximo passo.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className={`flex flex-col gap-3 ${inView ? "" : "opacity-0"}`}>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
