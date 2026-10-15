import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import "./start.css"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sistema sob medida para a sua operação | Garbato Solution",
  description:
    "ERP, CRM, financeiro e automação construídos para o jeito que a sua empresa já trabalha. Comece pelo Diagnóstico de Operação gratuito.",
}

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${nunito.variable} gs-light`} style={{ minHeight: "100vh" }}>
      {children}
    </div>
  )
}
