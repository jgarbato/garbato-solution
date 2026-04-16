import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Garbato Solution | Sistemas Sob Medida para Empresas",
  description:
    "Desenvolvemos sistemas sob medida para empresas que precisam organizar processos, centralizar informações e ganhar produtividade com tecnologia. ERP, CRM, portais administrativos e muito mais.",
  keywords: [
    "sistemas sob medida",
    "software house",
    "ERP personalizado",
    "CRM comercial",
    "desenvolvimento de sistemas",
    "Garbato Solution",
    "Juan Garbato",
  ],
  authors: [{ name: "Garbato Solution", url: "https://garbatosolution.com.br" }],
  openGraph: {
    title: "Garbato Solution | Sistemas Sob Medida",
    description:
      "Transformamos processos dispersos em plataformas profissionais, modernas e escaláveis, desenhadas para a operação real do seu negócio.",
    url: "https://garbatosolution.com.br",
    siteName: "Garbato Solution",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${dmSans.variable} dark`}
    >
      <body className="min-h-screen antialiased bg-[#08080E] text-[#ECF0FF] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
