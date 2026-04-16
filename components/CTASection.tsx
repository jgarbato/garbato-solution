"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, MessageCircle, Zap } from "lucide-react"

const WA_LINK =
  "https://wa.me/5543988585127?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto"

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[#08080E]" />
        {/* Grid */}
        <div className="absolute inset-0 grid-overlay opacity-60" />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[100px] bg-[#3B82F6]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full blur-[60px] bg-[#7C3AED]/08" />
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center" ref={ref}>
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 50px rgba(59,130,246,0.45)", "0 0 20px rgba(59,130,246,0.2)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center"
          >
            <Zap className="w-7 h-7 text-white" />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-5xl xl:text-6xl font-bold text-[#ECF0FF] mb-4 leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Sua empresa não precisa de{" "}
          <span className="text-gradient-blue">mais ferramentas soltas.</span>
        </motion.h2>

        {/* Complement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-[#8B9BC0] mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Precisa de um sistema que organize tudo em um único lugar — pensado
          para a operação real do seu negócio.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              document
                .querySelector("#contato")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2.5 px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold text-lg rounded-xl transition-colors shadow-[0_0_40px_rgba(59,130,246,0.4)] cursor-pointer"
          >
            Vamos conversar sobre seu projeto
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg rounded-xl transition-colors shadow-[0_0_30px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp
          </motion.a>
        </motion.div>

        {/* Sub-note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 text-[13px] text-[#4A5580]"
        >
          Resposta em até 24h · Sem compromisso · Proposta personalizada
        </motion.p>
      </div>
    </section>
  )
}
