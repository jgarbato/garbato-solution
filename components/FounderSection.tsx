"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BookOpen } from "lucide-react"

/**
 * O rosto e a trajetória. Dono de PME compra de gente, não de marca — e o
 * maior ativo de credibilidade da casa (dezessete anos de ERP em empresa
 * grande) não estava escrito em lugar nenhum do site.
 *
 * O trabalho de consultoria feito como contratado mora AQUI, como trajetória
 * do fundador — não em "casos", que é da empresa. Misturar os dois é impreciso
 * e pode ser exposição contratual.
 *
 * A foto: coloque o arquivo em `public/juan-garbato.jpg` e troque o bloco de
 * iniciais pela <img>. Enquanto não houver foto, as iniciais seguram o layout
 * sem parecer defeito.
 */

const CREDENCIAIS = [
  { valor: "17 anos", label: "entregando ERP em empresa grande" },
  { valor: "Oracle EBS", label: "implantação e customização" },
  { valor: "3 livros", label: "sobre IA para pequenos negócios" },
]

export default function FounderSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="fundador"
      className="relative py-24 px-6"
      style={{ background: "#0A0E1A" }}
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">
          {/* Foto / identidade */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto lg:mx-0"
          >
            <div
              className="w-[240px] h-[280px] rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(145deg, #121829 0%, #0E1320 100%)",
                border: "1px solid var(--gs-border)",
                boxShadow: "var(--gs-shadow-sm)",
              }}
            >
              {/* Troque por <img src="/juan-garbato.jpg" alt="Juan Garbato" className="w-full h-full object-cover" /> */}
              <span
                className="text-5xl font-bold text-gradient-blue"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                JG
              </span>
            </div>
            <p
              className="mt-5 text-lg font-semibold text-[#EEF1F8]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Juan Garbato
            </p>
            <p className="text-sm text-[#AFB6CC]">Fundador · Garbato Solution</p>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <span className="badge-blue mb-4 inline-flex">Quem está por trás</span>
            <h2
              className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#EEF1F8] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Dezessete anos de ERP em empresa grande.{" "}
              <span className="text-gradient-blue">Agora na sua.</span>
            </h2>

            <div className="space-y-4 text-[#AFB6CC] text-base leading-relaxed max-w-2xl">
              <p>
                Passei quase duas décadas implantando ERP em corporação — boa
                parte em Oracle E-Business Suite, o tipo de sistema que leva
                meses para entrar e tem orçamento que PME nenhuma alcança.
                Sigo nesse mundo: hoje também faço auditoria técnica de
                customização de Contas a Pagar para uma construtora de grande
                porte.
              </p>
              <p>
                O que mais me chamou atenção ao começar a atender empresa
                pequena não foi o tamanho do orçamento. Foi que{" "}
                <strong className="text-[#EEF1F8] font-semibold">
                  as perguntas são exatamente as mesmas
                </strong>{" "}
                — o que dá lucro aqui dentro, por que tudo trava quando o dono
                não está, o que fazer com as mensagens não respondidas. A
                diferença é que na PME ninguém tem a quem perguntar.
              </p>
              <p>
                A Garbato Solution existe para levar o rigor daquele mundo — e
                não o preço dele — para quem nunca teve acesso. É por isso que
                todo projeto começa por entender a operação, e não por escolher
                a tecnologia.
              </p>
            </div>

            {/* Credenciais */}
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {CREDENCIAIS.map((c, i) => (
                <motion.div
                  key={c.valor}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5 }}
                  className="rounded-xl p-4 bg-[#0E1320]"
                  style={{ border: "1px solid var(--gs-border)" }}
                >
                  <p
                    className="text-xl font-bold text-[#EEF1F8] mb-1"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {c.valor}
                  </p>
                  <p className="text-[12px] text-[#AFB6CC] leading-snug">
                    {c.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Livros */}
            <motion.a
              href="https://www.amazon.com.br/dp/B0HJ5MZRZR"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 mt-6 text-sm text-[#AFB6CC] hover:text-[#EEF1F8] transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                Escrevi três livros sobre IA para pequenos negócios —{" "}
                <span className="text-gradient-blue font-medium">
                  ler na Amazon
                </span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
