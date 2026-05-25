import type { Metadata } from "next"
import { clinicProduct } from "./data"
import ClinicClientPage from "./client-page"

const { seo } = clinicProduct

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.ogTitle ?? seo.title,
    description: seo.ogDescription ?? seo.description,
    url: "https://garbatosolution.com.br/blesssystemclinic",
    siteName: "Garbato Solution",
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: "/blesssystemclinic",
  },
}

export default function Page() {
  return <ClinicClientPage />
}
