"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Factory, Stethoscope, Building2, ArrowRight } from "lucide-react"

/**
 * Prova social. Vem ANTES do TrustSection de propósito: primeiro o que já foi
 * entregue, depois os princípios. Princípio sem entrega é promessa.
 *
 * Duas regras desta seção, nascidas de uma revisão que reprovou a primeira
 * versão:
 *
 * 1. O título não pode afirmar mais do que os cards sustentam. A v1 dizia
 *    "sistemas em produção" com um card marcado "em QA" — a própria seção se
 *    desmentia.
 * 2. O texto é para dono de PME, não para engenheiro. Nada de "cutover",
 *    "RLS" ou "não-conformidade": se o leitor precisa traduzir, a frase falhou.
 *
 * `status` é opcional de propósito. Só existe quando há um fato verificável
 * para pôr ali. Enquanto não houver confirmação de cliente ativo nas
 * plataformas próprias, elas não exibem status — ausência é melhor que
 * alegação.
 */

type Caso = {
  icon: typeof Factory
  tipo: "Cliente corporativo" | "Plataforma própria"
  cliente: string
  titulo: string
  desafio: string
  entrega: string[]
  status?: string
}

const CASOS: Caso[] = [
  {
    icon: Factory,
    tipo: "Cliente corporativo",
    cliente: "Indústria multinacional",
    titulo: "Portal de peças e pedidos",
    desafio:
      "Pedidos de peças espalhados entre planilha e e-mail, sem ninguém saber ao certo o que foi pedido, por quem, e em que pé estava.",
    entrega: [
      "Fila de pedidos com situação e responsável",
      "Negociação e cancelamento com registro de cada decisão",
      "Cada pessoa vê apenas o que o cargo dela permite",
      "Relatórios de problemas e exportação de dados",
    ],
    status: "Em implantação",
  },
  {
    icon: Stethoscope,
    tipo: "Plataforma própria",
    cliente: "BlessSystem Clinic",
    titulo: "Gestão completa para clínicas",
    desafio:
      "Clínica que marca no caderno, confirma no WhatsApp e fecha o mês no Excel — com o dono descobrindo o resultado semanas depois.",
    entrega: [
      "Agenda com confirmação e remarcação",
      "Prontuário eletrônico e histórico do paciente",
      "Financeiro ligado ao atendimento",
      "Relatórios clínicos e gerenciais",
    ],
  },
  {
    icon: Building2,
    tipo: "Plataforma própria",
    cliente: "ERP Imobiliário e Financeiro",
    titulo: "Da captação à rescisão, num sistema só",
    desafio:
      "Imobiliária com o imóvel numa planilha, o contrato numa pasta, o repasse no banco e nenhuma visão do conjunto.",
    entrega: [
      "Imóveis, contratos e locação num lugar só",
      "Repasses e conciliação bancária",
      "Portal do locatário",
      "Visão financeira consolidada",
    ],
  },
]

/** Cor só no ícone e nas setas. O selo é neutro de propósito: cores
 *  diferentes sugeriam categorias que não existem. */
const ACENTO = ["#3B82F6", "#10B981", "#F59E0B"]

export default function CasesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      id="casos"
      className="relative py-24 px-6"
      style={{ background: "#060810" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.10)] to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="badge-blue mb-4 inline-flex">Nosso trabalho</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#EEF1F8] mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            O que construímos,{" "}
            <span className="text-gradient-blue">e para quem</span>
          </h2>
          <p className="text-[#AFB6CC] text-lg leading-relaxed">
            De portal para indústria a plataforma para clínica e imobiliária.
            Abaixo, o problema que cada um resolveu — e em que estágio está.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASOS.map((caso, i) => {
            const cor = ACENTO[i % ACENTO.length]
            return (
              <motion.article
                key={caso.titulo}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
                className={`group relative flex flex-col rounded-2xl p-6 overflow-hidden bg-[#0E1320] ${
                  i === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                style={{
                  border: "1px solid var(--gs-border)",
                  boxShadow: "var(--gs-shadow-sm)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${cor}08 0%, transparent 65%)`,
                  }}
                />

                <div className="relative flex items-start justify-between gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${cor}12`,
                      border: `1px solid ${cor}25`,
                    }}
                  >
                    <caso.icon className="w-5 h-5" style={{ color: cor }} />
                  </div>
                  <span
                    className="text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md whitespace-nowrap text-[#AFB6CC]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--gs-border)",
                    }}
                  >
                    {caso.tipo}
                  </span>
                </div>

                <p className="relative text-[11px] uppercase tracking-wider text-[#8B94B0] mb-1.5">
                  {caso.cliente}
                </p>
                <h3
                  className="relative text-lg font-semibold text-[#EEF1F8] mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {caso.titulo}
                </h3>

                <p className="relative text-[13px] text-[#AFB6CC] leading-relaxed mb-5">
                  {caso.desafio}
                </p>

                <ul className="relative space-y-2">
                  {caso.entrega.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[13px] text-[#C7CEE2] leading-snug"
                    >
                      <ArrowRight
                        className="w-3.5 h-3.5 mt-[3px] shrink-0"
                        style={{ color: cor }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {caso.status && (
                  <div
                    className="relative mt-6 pt-4 flex items-center gap-2"
                    style={{ borderTop: "1px solid var(--gs-border)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: cor }}
                      aria-hidden="true"
                    />
                    <span className="text-[12px] text-[#AFB6CC]">
                      {caso.status}
                    </span>
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
