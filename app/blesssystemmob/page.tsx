import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { productJsonLd } from "@/lib/products/jsonLd"
import { mobProduct } from "./data"
import MobClientPage from "./client-page"

const { seo, path } = mobProduct

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.ogTitle ?? seo.title,
    description: seo.ogDescription ?? seo.description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: path,
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(mobProduct)) }}
      />
      <MobClientPage />
    </>
  )
}
