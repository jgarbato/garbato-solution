"use client"

import { Zap, Link2, Camera, GitBranch, MessageSquare, Mail, Globe } from "lucide-react"

const NAV_LINKS = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Processo", href: "#processo" },
  { label: "Projetos", href: "#projetos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
]

const SOCIAL = [
  { icon: Link2, label: "LinkedIn", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: GitBranch, label: "GitHub", href: "#" },
  { icon: MessageSquare, label: "Twitter/X", href: "#" },
]

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "var(--gs-border)", background: "#0C0D18" }}
    >
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center shadow-[0_0_16px_rgba(59,130,246,0.3)]">
                <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span
                className="text-[15px] font-semibold text-[#ECF0FF]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Garbato<span className="text-[#3B82F6]"> Solution</span>
              </span>
            </div>

            <p className="text-[#8B9BC0] text-[14px] leading-relaxed max-w-xs mb-6">
              Desenvolvemos sistemas sob medida para empresas que precisam
              organizar processos, centralizar informações e ganhar
              produtividade com tecnologia.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:contato@garbatosolution.com.br"
                className="flex items-center gap-2 text-[13px] text-[#8B9BC0] hover:text-[#ECF0FF] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#3B82F6]" />
                contato@garbatosolution.com.br
              </a>
              <div className="flex items-center gap-2 text-[13px] text-[#8B9BC0]">
                <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
                garbatosolution.com.br
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-[11px] font-bold text-[#4A5580] uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Navegação
            </div>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13.5px] text-[#8B9BC0] hover:text-[#ECF0FF] transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + team */}
          <div>
            <div
              className="text-[11px] font-bold text-[#4A5580] uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Redes sociais
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--gs-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"
                    e.currentTarget.style.background = "rgba(59,130,246,0.08)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--gs-border)"
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  }}
                >
                  <s.icon className="w-4 h-4 text-[#8B9BC0]" />
                </a>
              ))}
            </div>

            {/* Team member */}
            <div
              className="rounded-xl p-3 flex items-center gap-3"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--gs-border)",
              }}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
                JG
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#ECF0FF]">
                  Juan Garbato
                </div>
                <div className="text-[11px] text-[#4A5580]">CEO · Fundador</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--gs-border)" }}
        >
          <p className="text-[12px] text-[#4A5580]">
            © {new Date().getFullYear()} Garbato Solution. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[12px] text-[#4A5580] hover:text-[#8B9BC0] transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-[12px] text-[#4A5580] hover:text-[#8B9BC0] transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
