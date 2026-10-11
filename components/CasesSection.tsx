"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Factory, Stethoscope, Building2, ArrowRight } from "lucide-react"

/**
 * Prova social. Vem ANTES do TrustSection de propósito: primeiro o que já foi
 * entregue, depois os princípios. Princípio sem entrega é promessa.
 *
 * Regra desta seção: nada aqui pode ser alegação sem lastro. Todo item descreve
 * trabalho que existe. Onde não há número real, não há número — preferimos a
 * descrição honesta a uma métrica inventada.
 *
 * Os clientes corporativos aparecem por descrição genérica porque a permissão
 * contratual para nomeá-los ainda não foi verificada. Quando for, troque
 * `cliente` pelo nome e o peso da seção sobe muito.
 */

type Caso = {
  icon: typeof Factory
  color: string
  tipo: "Cliente corporativo" | "Plataforma própria"
  cliente: string
  titulo: string
  desafio: string
  entrega: string[]
  status: string
}

const CASOS: Caso[] = [
  {
    icon: Factory,
    color: "#3B82F6",
    tipo: "Cliente corporativo",
    cliente: "Fabricante global de equipamentos",
    titulo: "Portal de peças e pedidos",
    desafio:
      "Requisições de peças espalhadas entre planilha e e-mail, sem rastreabilidade do que foi pedido, por quem e em que estágio — e sem separar o que cada perfil podia ver.",
    entrega: [
      "Fila de requisições com estágio e responsável",
      "Fluxo de negociação e cancelamento com trilha de decisão",
      "Controle de acesso por papel aplicado no próprio banco",
      "Relatórios de não-conformidade e telas de extração",
    ],
    status: "Em QA e cutover",
  },
  {
    icon: Stethoscope,
    color: "#10B981",
    tipo: "Plataforma própria",
    cliente: "BlessSystem Clinic",
    titulo: "Gestão completa para clínicas",
    desafio:
      "Clínica que marca no caderno, confirma no WhatsApp e fecha o mês no Excel — com o dono descobrindo o resultado semanas depois.",
    entrega: [
      "Agenda com confirmação e remarcação",
      "Prontuário eletrônico e histórico do paciente",
      "Financeiro integrado ao atendimento",
      "Relatórios clínicos e gerenciais",
    ],
    status: "Em operação",
  },
  {
    icon: Building2,
    color: "#F59E0B",
    tipo: "Plataforma própria",
    cliente: "ERP Imobiliário e Financeiro",
    titulo: "Da captação à rescisão, num sistema só",
    desafio:
      "Imobiliária com imóvel numa planilha, contrato numa pasta, repasse no banco e nenhuma visão do conjunto.",
    entrega: [
      "Gestão de imóveis, contratos e locação",
      "Repasses e conciliação bancária",
      "Portal do locatário",
      "Visão financeira consolidada",
    ],
    status: "Em operação",
  },
]

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
          <span className="badge-blue mb-4 inline-flex">O que já está rodando</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#EEF1F8] mb-5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sistemas em produção,{" "}
            <span className="text-gradient-blue">não em slide</span>
          </h2>
          <p className="text-[#AFB6CC] text-lg leading-relaxed">
            De portal corporativo a plataforma de assinatura. Abaixo, o que
            construímos, para quem, e o problema que cada um resolveu.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {CASOS.map((caso, i) => (
            <motion.article
              key={caso.titulo}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
              className="group relative flex flex-col rounded-2xl p-6 card-hover overflow-hidden bg-[#0E1320]"
              style={{
                border: "1px solid var(--gs-border)",
                boxShadow: "var(--gs-shadow-sm)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at top left, ${caso.color}08 0%, transparent 65%)`,
                }}
              />

              <div className="relative flex items-start justify-between gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${caso.color}12`,
                    border: `1px solid ${caso.color}25`,
                  }}
                >
                  <caso.icon className="w-5 h-5" style={{ color: caso.color }} />
                </div>
                <span
                  className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md whitespace-nowrap"
                  style={{
                    color: caso.color,
                    background: `${caso.color}10`,
                    border: `1px solid ${caso.color}20`,
                  }}
                >
                  {caso.tipo}
                </span>
              </div>

              <p className="relative text-[11px] uppercase tracking-wider text-[#6B7490] mb-1.5">
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

              <ul className="relative space-y-2 mb-6">
                {caso.entrega.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[13px] text-[#C7CEE2] leading-snug"
                  >
                    <ArrowRight
                      className="w-3.5 h-3.5 mt-[3px] shrink-0"
                      style={{ color: caso.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className="relative mt-auto pt-4 flex items-center gap-2"
                style={{ borderTop: "1px solid var(--gs-border)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: caso.color }}
                />
                <span className="text-[12px] text-[#AFB6CC]">{caso.status}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
