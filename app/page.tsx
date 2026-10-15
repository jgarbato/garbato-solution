import type { Metadata } from "next"
import { Nunito_Sans } from "next/font/google"
import LandingClaro from "@/components/landing/LandingClaro"
import "@/components/landing/landing.css"

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
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <div className={`${nunito.variable} gs-light`}>
      <LandingClaro />
    </div>
  )
}
