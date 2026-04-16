"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  FileSpreadsheet,
  RefreshCcw,
  Puzzle,
  EyeOff,
  GitBranch,
  Hand,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

const PROBLEMS = [
  {
    icon: FileSpreadsheet,
    title: "Planilhas soltas por toda parte",
    desc: "Dados críticos espalhados em arquivos Excel, sem versionamento, sem controle de acesso e sem confiabilidade.",
  },
  {
    icon: RefreshCcw,
    title: "Retrabalho constante",
    desc: "A mesma informação digitada múltiplas vezes em sistemas diferentes. Tempo desperdiçado, erros acumulados.",
  },
  {
    icon: Puzzle,
    title: "Sistemas que não se conversam",
    desc: "ERP de um fornecedor, CRM de outro, financeiro em um terceiro — e nenhum deles integrado ao real fluxo da empresa.",
  },
  {
    icon: EyeOff,
    title: "Falta de visibilidade gerencial",
    desc: "Para gerar um relatório, você depende de várias pessoas compilando dados manualmente — e ainda assim o resultado é impreciso.",
  },
  {
    icon: GitBranch,
    title: "Processos sem padrão",
    desc: "Cada colaborador faz do seu jeito. Sem fluxo definido, sem auditoria, sem rastreabilidade das decisões.",
  },
  {
    icon: Hand,
    title: "Operação travada no manual",
    desc: "Aprovações por WhatsApp, e-mails como sistema de gestão, regras de negócio existindo apenas na cabeça das pessoas.",
  },
]

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="problema" className="relative py-24 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-blue mb-4 inline-flex">
            Reconhece essa realidade?
          </span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sua operação não pode depender{" "}
            <span className="text-gradient-blue">
              de gambiarras
            </span>
          </h2>
          <p className="text-[#8B9BC0] text-lg max-w-xl mx-auto">
            A maioria das empresas cresce mais rápido que seus processos. O
            resultado é uma operação frágil, dependente de pessoas e impossível
            de escalar.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: "easeOut" }}
              className="group glass-card card-hover rounded-2xl p-6"
              style={{ border: "1px solid var(--gs-border)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/15 transition-colors">
                <p.icon className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#ECF0FF] mb-2">
                {p.title}
              </h3>
              <p className="text-[13px] text-[#8B9BC0] leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Solution reveal */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0F1628 0%, #131A35 100%)",
            border: "1px solid rgba(59,130,246,0.2)",
            boxShadow: "0 0 60px rgba(59,130,246,0.07)",
          }}
        >
          {/* Glow accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />

          <div className="px-8 py-10 md:px-12 md:py-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1">
                <div className="badge-blue mb-4 inline-flex">A solução</div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-[#ECF0FF] mb-4"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Centralizamos a operação em um{" "}
                  <span className="text-gradient-blue">sistema único</span>,
                  pensado para o seu negócio
                </h3>
                <p className="text-[#8B9BC0] text-base leading-relaxed max-w-xl">
                  Em vez de adaptar a empresa a um software genérico, desenvolvemos
                  a plataforma conforme a realidade, os processos e os objetivos
                  de cada cliente — do fluxo operacional à experiência do usuário.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-w-[220px]">
                {[
                  "Um único sistema",
                  "Processos estruturados",
                  "Visibilidade total",
                  "Escalável desde o início",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                    <span className="text-[14px] text-[#ECF0FF] font-medium">
                      {item}
                    </span>
                  </div>
                ))}
                <button
                  onClick={() =>
                    document
                      .querySelector("#contato")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-[#3B82F6] hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  Ver como funciona
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
