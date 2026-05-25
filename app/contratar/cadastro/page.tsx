"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, User, Mail, Phone, MapPin, FileText } from "lucide-react"
import Navbar from "@/components/Navbar"
import { getProduct, getPlan, type Periodo } from "@/lib/products/registry"

function formatCpfCnpj(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "")
  return digits
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

function formatCep(value: string) {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9)
}

function CadastroContent() {
  const router = useRouter()
  const params = useSearchParams()

  const sistema = params.get("sistema") ?? "clinic"
  const plano = params.get("plano") ?? "essencial"
  const periodo: Periodo = params.get("periodo") === "anual" ? "anual" : "mensal"

  const product = getProduct(sistema)
  const plan = getPlan(sistema, plano)
  const price = plan ? (periodo === "anual" ? plan.priceAnnual : plan.price) : 0
  const planLabel = plan?.name ?? plano
  const sistemaLabel = product.name
  const sistemaColor = sistema === "mob" ? "#06B6D4" : "#7C3AED"

  const [tipoPessoa, setTipoPessoa] = useState<"pf" | "pj">("pj")
  const [form, setForm] = useState({
    nome: "",
    cpfCnpj: "",
    email: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  })
  const [loadingCep, setLoadingCep] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: "" }))
  }

  const buscarCep = async (cep: string) => {
    const digits = cep.replace(/\D/g, "")
    if (digits.length !== 8) return
    setLoadingCep(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setForm((f) => ({
          ...f,
          rua: data.logradouro ?? "",
          bairro: data.bairro ?? "",
          cidade: data.localidade ?? "",
          estado: data.uf ?? "",
        }))
      }
    } finally {
      setLoadingCep(false)
    }
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nome.trim()) e.nome = "Nome obrigatório"
    if (!form.cpfCnpj.trim()) e.cpfCnpj = "CPF/CNPJ obrigatório"
    if (!form.email.includes("@")) e.email = "E-mail inválido"
    if (form.telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone inválido"
    if (form.cep.replace(/\D/g, "").length !== 8) e.cep = "CEP inválido"
    if (!form.rua.trim()) e.rua = "Rua obrigatória"
    if (!form.numero.trim()) e.numero = "Número obrigatório"
    if (!form.cidade.trim()) e.cidade = "Cidade obrigatória"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleContinuar = () => {
    if (!validate()) return
    sessionStorage.setItem("gs_cadastro", JSON.stringify({ ...form, tipoPessoa }))
    router.push(`/contratar/pagamento?sistema=${sistema}&plano=${plano}&periodo=${periodo}`)
  }

  return (
    <main className="min-h-screen" style={{ background: "#08080E" }}>
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />

        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-[13px] text-[#8B9BC0] hover:text-[#ECF0FF] transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar aos planos
          </button>

          {/* Plan summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-4 flex items-center justify-between mb-8"
            style={{ background: `${sistemaColor}08`, border: `1px solid ${sistemaColor}30` }}
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: sistemaColor }}>
                {sistemaLabel}
              </div>
              <div className="text-[15px] font-semibold text-[#ECF0FF]">
                Plano {planLabel} —{" "}
                <span style={{ color: sistemaColor }}>
                  R$ {price.toLocaleString("pt-BR")}/mês
                </span>
              </div>
              <div className="text-[11px] text-[#4A5580] mt-0.5">
                {periodo === "anual" ? "Cobrança anual" : "Cobrança mensal recorrente"}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--gs-border)" }}
          >
            <h2
              className="text-2xl font-bold text-[#ECF0FF] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Seus dados
            </h2>

            {/* Tipo pessoa */}
            <div className="flex gap-2 mb-6">
              {(["pj", "pf"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTipoPessoa(t)}
                  className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer"
                  style={{
                    background: tipoPessoa === t ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
                    color: tipoPessoa === t ? "#3B82F6" : "#8B9BC0",
                    border: tipoPessoa === t ? "1px solid rgba(59,130,246,0.3)" : "1px solid var(--gs-border)",
                  }}
                >
                  {t === "pj" ? "Pessoa Jurídica" : "Pessoa Física"}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {/* Nome */}
              <Field
                icon={<User className="w-4 h-4" />}
                label={tipoPessoa === "pj" ? "Razão Social" : "Nome completo"}
                value={form.nome}
                error={errors.nome}
                onChange={(v) => set("nome", v)}
                placeholder={tipoPessoa === "pj" ? "Empresa Ltda" : "João Silva"}
              />

              {/* CPF/CNPJ */}
              <Field
                icon={<FileText className="w-4 h-4" />}
                label={tipoPessoa === "pj" ? "CNPJ" : "CPF"}
                value={form.cpfCnpj}
                error={errors.cpfCnpj}
                onChange={(v) => set("cpfCnpj", formatCpfCnpj(v))}
                placeholder={tipoPessoa === "pj" ? "00.000.000/0001-00" : "000.000.000-00"}
                maxLength={tipoPessoa === "pj" ? 18 : 14}
              />

              {/* Email */}
              <Field
                icon={<Mail className="w-4 h-4" />}
                label="E-mail"
                value={form.email}
                error={errors.email}
                onChange={(v) => set("email", v)}
                placeholder="contato@empresa.com.br"
                type="email"
              />

              {/* Telefone */}
              <Field
                icon={<Phone className="w-4 h-4" />}
                label="WhatsApp / Telefone"
                value={form.telefone}
                error={errors.telefone}
                onChange={(v) => set("telefone", formatPhone(v))}
                placeholder="(43) 99999-9999"
              />

              {/* CEP */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <Field
                    icon={<MapPin className="w-4 h-4" />}
                    label="CEP"
                    value={form.cep}
                    error={errors.cep}
                    onChange={(v) => {
                      const formatted = formatCep(v)
                      set("cep", formatted)
                      if (formatted.replace(/\D/g, "").length === 8) buscarCep(formatted)
                    }}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                </div>
                {loadingCep && (
                  <div className="flex items-end pb-3">
                    <div className="w-4 h-4 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Rua + Número */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Field
                    label="Rua / Logradouro"
                    value={form.rua}
                    error={errors.rua}
                    onChange={(v) => set("rua", v)}
                    placeholder="Rua das Flores"
                  />
                </div>
                <Field
                  label="Número"
                  value={form.numero}
                  error={errors.numero}
                  onChange={(v) => set("numero", v)}
                  placeholder="123"
                />
              </div>

              {/* Bairro + Cidade + Estado */}
              <div className="grid grid-cols-3 gap-3">
                <Field
                  label="Bairro"
                  value={form.bairro}
                  onChange={(v) => set("bairro", v)}
                  placeholder="Centro"
                />
                <Field
                  label="Cidade"
                  value={form.cidade}
                  error={errors.cidade}
                  onChange={(v) => set("cidade", v)}
                  placeholder="São Paulo"
                />
                <Field
                  label="UF"
                  value={form.estado}
                  onChange={(v) => set("estado", v.toUpperCase().slice(0, 2))}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>
            </div>

            <button
              onClick={handleContinuar}
              className="mt-8 w-full py-3.5 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              style={{ background: sistemaColor, color: "white" }}
            >
              Continuar para pagamento
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function Field({
  icon,
  label,
  value,
  error,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  error?: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  maxLength?: number
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[#8B9BC0] mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5580]">{icon}</div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full rounded-xl py-3 text-[14px] text-[#ECF0FF] placeholder-[#4A5580] outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid var(--gs-border)",
            paddingLeft: icon ? "40px" : "14px",
            paddingRight: "14px",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "rgba(239,68,68,0.5)" : "var(--gs-border)"
          }}
        />
      </div>
      {error && <p className="text-[11px] text-red-400 mt-1">{error}</p>}
    </div>
  )
}

export default function CadastroPage() {
  return (
    <Suspense>
      <CadastroContent />
    </Suspense>
  )
}
