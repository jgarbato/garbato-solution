import { SITE_NAME, SITE_URL } from "@/lib/constants"
import type { Product } from "./types"

export function productJsonLd(product: Product) {
  const url = `${SITE_URL}${product.path}`
  const prices = product.pricing.plans.map((p) => p.price)
  const offers = product.pricing.plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.desc,
    price: plan.price.toFixed(2),
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: `${url}#planos`,
    category: "subscription",
  }))

  return {
    "@context": "https://schema.org",
    "@type": ["Product", "SoftwareApplication"],
    name: product.name,
    description: product.seo.description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      lowPrice: Math.min(...prices).toFixed(2),
      highPrice: Math.max(...prices).toFixed(2),
      offerCount: offers.length,
      offers,
    },
  }
}
