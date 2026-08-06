import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import DiagnosticoClient from "./client"

export const metadata: Metadata = {
  title: "Diagnóstico de Operação Gratuito",
  description:
    "Em 30 minutos mapeamos onde sua empresa perde tempo com planilha e retrabalho e você recebe um mini-plano do que automatizar primeiro. Grátis e sem compromisso.",
  keywords: [
    "diagnóstico de operação",
    "automatizar processos",
    "sair do Excel",
    "sistema sob medida",
    "Garbato Solution",
  ],
  alternates: { canonical: "/diagnostico" },
  openGraph: {
    title: "Diagnóstico de Operação Gratuito | Garbato Solution",
    description:
      "Mapeamos seus gargalos e você sai com um mini-plano do que automatizar primeiro. Grátis, 30 min, sem compromisso.",
    url: `${SITE_URL}/diagnostico`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
}

export default function Page() {
  return <DiagnosticoClient />
}
