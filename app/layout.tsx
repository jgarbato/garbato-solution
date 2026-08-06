import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { SITE_URL, SITE_NAME, WHATSAPP_NUMBER } from "@/lib/constants"
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

const SITE_DESCRIPTION =
  "Desenvolvemos sistemas sob medida para empresas que precisam organizar processos, centralizar informações e ganhar produtividade com tecnologia. ERP, CRM, portais administrativos e muito mais."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Garbato Solution | Sistemas Sob Medida para Empresas",
    template: "%s | Garbato Solution",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "sistemas sob medida",
    "software house",
    "ERP personalizado",
    "CRM comercial",
    "sistema imobiliário",
    "sistema financeiro",
    "automação de processos",
    "APIs e integrações",
    "dashboards de gestão",
    "desenvolvimento de sistemas",
    "software house Londrina",
    "Garbato Solution",
    "Juan Garbato",
  ],
  authors: [{ name: "Garbato Solution", url: SITE_URL }],
  creator: "Garbato Solution",
  publisher: "Garbato Solution",
  applicationName: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Garbato Solution | Sistemas Sob Medida",
    description:
      "Transformamos processos dispersos em plataformas profissionais, modernas e escaláveis, desenhadas para a operação real do seu negócio.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garbato Solution | Sistemas Sob Medida",
    description:
      "Transformamos processos dispersos em plataformas profissionais, modernas e escaláveis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Preenchido automaticamente pela env NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // (código do Google Search Console → método "tag HTML"). Ver instruções no README.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
}

// Dados estruturados (JSON-LD) — ajudam o Google e as IAs a entenderem o negócio.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: "contato@garbatosolution.com.br",
      slogan: "Tecnologia que move o seu negócio",
      founder: { "@type": "Person", name: "Juan Garbato" },
      areaServed: { "@type": "Country", name: "Brasil" },
      sameAs: ["https://instagram.com/garbatosolution"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${WHATSAPP_NUMBER}`,
        email: "contato@garbatosolution.com.br",
        areaServed: "BR",
        availableLanguage: ["Portuguese"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Service",
      name: "Desenvolvimento de sistemas sob medida",
      provider: { "@id": `${SITE_URL}/#organization` },
      serviceType: "Software house",
      areaServed: { "@type": "Country", name: "Brasil" },
      description:
        "ERP, CRM, sistema imobiliário, sistema financeiro, automação de processos, APIs e dashboards desenvolvidos sob medida.",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased bg-[#060810] text-[#EEF1F8] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
