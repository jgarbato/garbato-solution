"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, MessageCircle, Zap } from "lucide-react"

const WA_LINK =
  "https://wa.me/5543988585127?text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto"

const NAV_LINKS = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Processo", href: "#processo" },
  { label: "Projetos", href: "#projetos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : ""
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(8,8,14,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(59,130,246,0.4)]">
              <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="text-[15px] font-semibold tracking-tight text-[#ECF0FF]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Garbato<span className="text-[#3B82F6]"> Solution</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-[13.5px] font-medium text-[#8B9BC0] hover:text-[#ECF0FF] transition-colors rounded-lg hover:bg-white/[0.05] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => handleNav("#contato")}
              className="px-4 py-2 text-[13px] font-medium text-[#8B9BC0] border border-white/[0.1] hover:border-white/[0.2] hover:text-[#ECF0FF] rounded-lg transition-all cursor-pointer hover:bg-white/[0.04]"
            >
              Solicitar Projeto
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-all shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_28px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.1] text-[#8B9BC0] hover:text-[#ECF0FF] hover:bg-white/[0.05] transition-all"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b border-white/[0.07]"
            style={{
              backgroundColor: "rgba(8,8,14,0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left px-4 py-3 text-[14px] font-medium text-[#8B9BC0] hover:text-[#ECF0FF] hover:bg-white/[0.04] rounded-lg transition-all cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <div className="border-t border-white/[0.07] mt-2 pt-3 flex flex-col gap-2">
                <button
                  onClick={() => handleNav("#contato")}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-[13.5px] font-medium text-[#ECF0FF] border border-white/[0.12] rounded-lg hover:bg-white/[0.05] transition-all cursor-pointer"
                >
                  Solicitar Projeto
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-[13.5px] font-semibold bg-[#25D366] text-white rounded-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
