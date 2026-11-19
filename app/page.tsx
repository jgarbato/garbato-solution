import type { Metadata } from "next"
import { Caveat } from "next/font/google"
import LandingNoir from "@/components/landing/LandingNoir"
import Montagem from "@/components/landing/Montagem"
import "@/components/landing/noir.css"

const caveat = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-caveat", display: "swap" })

export const metadata: Metadata = {
  title: "Sistema sob medida para a sua operação | Garbato Solution",
  description:
    "ERP, CRM, financeiro e automação construídos para o jeito que a sua empresa já trabalha. Comece pelo Diagnóstico de Operação gratuito.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <div className={`${caveat.variable} gs-noir mt-ssr`} data-montagem data-tema="marinho">
      <noscript>
        <style>{".gs-noir.mt-ssr .n-hero [data-b] { opacity: 1 !important; animation: none !important; }"}</style>
      </noscript>
      <LandingNoir />
      <Montagem />
    </div>
  )
}
