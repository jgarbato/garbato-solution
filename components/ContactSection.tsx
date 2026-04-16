"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Send,
  MessageCircle,
  CheckCircle2,
  User,
  Building2,
  Mail,
  Phone,
  FileText,
} from "lucide-react"

const WA_LINK =
  "https://wa.me/5543988585127?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto"

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

const INITIAL: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
}

function InputField({
  icon: Icon,
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  icon: React.ElementType
  label: string
  id: keyof FormData
  type?: string
  placeholder: string
  value: string
  onChange: (id: keyof FormData, val: string) => void
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12.5px] font-medium text-[#8B9BC0] mb-1.5"
      >
        {label}
        {required && <span className="text-[#3B82F6] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5580] pointer-events-none"
        />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          required={required}
          className="w-full pl-10 pr-4 py-3 rounded-xl text-[14px] text-[#ECF0FF] placeholder-[#4A5580] outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--gs-border)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"
            e.currentTarget.style.background = "rgba(59,130,246,0.04)"
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--gs-border)"
            e.currentTarget.style.background = "rgba(255,255,255,0.04)"
            e.currentTarget.style.boxShadow = "none"
          }}
        />
      </div>
    </div>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [form, setForm] = useState<FormData>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (id: keyof FormData, val: string) => {
    setForm((prev) => ({ ...prev, [id]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1600))
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contato" className="relative py-24 px-6">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start"
        >
          {/* Left — copy */}
          <div>
            <span className="badge-blue mb-4 inline-flex">Contato</span>
            <h2
              className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#ECF0FF] mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Vamos construir seu{" "}
              <span className="text-gradient-blue">próximo sistema</span>
            </h2>
            <p className="text-[#8B9BC0] text-lg leading-relaxed mb-8">
              Conte-nos sobre sua empresa e o que você precisa automatizar ou
              centralizar. Nossa equipe fará um levantamento inicial e retornará
              com uma proposta personalizada.
            </p>

            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: MessageCircle,
                  color: "#25D366",
                  label: "WhatsApp",
                  value: "Resposta rápida",
                  action: () => window.open(WA_LINK, "_blank"),
                },
                {
                  icon: Mail,
                  color: "#3B82F6",
                  label: "E-mail",
                  value: "contato@garbatosolution.com.br",
                  action: undefined,
                },
                {
                  icon: Building2,
                  color: "#7C3AED",
                  label: "Site",
                  value: "garbatosolution.com.br",
                  action: undefined,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                    item.action ? "cursor-pointer hover:-translate-y-0.5" : "cursor-default"
                  }`}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid var(--gs-border)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}25` }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#4A5580] font-medium">{item.label}</div>
                    <div className="text-[13.5px] text-[#ECF0FF] font-medium">{item.value}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="relative rounded-2xl p-7 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid var(--gs-border)",
            }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/25 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#ECF0FF]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Mensagem enviada!
                  </h3>
                  <p className="text-[#8B9BC0] text-[14px] max-w-xs">
                    Recebemos sua solicitação. Entraremos em contato em até 24h
                    para dar continuidade à conversa.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-[13px] text-[#3B82F6] hover:text-[#60A5FA] transition-colors cursor-pointer"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <h3
                      className="text-xl font-bold text-[#ECF0FF] mb-1"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Envie sua solicitação
                    </h3>
                    <p className="text-[13px] text-[#8B9BC0]">
                      Sem compromisso. Retornamos em até 24h.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      icon={User}
                      label="Seu nome"
                      id="name"
                      placeholder="João Silva"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      icon={Building2}
                      label="Empresa"
                      id="company"
                      placeholder="Empresa Ltda"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      icon={Mail}
                      label="E-mail"
                      id="email"
                      type="email"
                      placeholder="joao@empresa.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <InputField
                      icon={Phone}
                      label="Telefone"
                      id="phone"
                      type="tel"
                      placeholder="(43) 99999-9999"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[12.5px] font-medium text-[#8B9BC0] mb-1.5">
                      Mensagem <span className="text-[#3B82F6]">*</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#4A5580] pointer-events-none" />
                      <textarea
                        rows={4}
                        placeholder="Descreva brevemente o que sua empresa precisa..."
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-[14px] text-[#ECF0FF] placeholder-[#4A5580] outline-none resize-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid var(--gs-border)",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"
                          e.currentTarget.style.background = "rgba(59,130,246,0.04)"
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "var(--gs-border)"
                          e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                          e.currentTarget.style.boxShadow = "none"
                        }}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.25)] cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar projeto
                        </>
                      )}
                    </button>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-xl transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
