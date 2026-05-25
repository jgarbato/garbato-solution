import type { Metadata } from "next"
import { mobProduct } from "./data"
import MobClientPage from "./client-page"

const { seo } = mobProduct

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.ogTitle ?? seo.title,
    description: seo.ogDescription ?? seo.description,
    url: "https://garbatosolution.com.br/blesssystemmob",
    siteName: "Garbato Solution",
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "/blesssystemmob",
  },
}

export default function Page() {
  return <MobClientPage />
}
