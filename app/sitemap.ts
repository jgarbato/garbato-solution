import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"
import { clinicProduct } from "./blesssystemclinic/data"
import { mobProduct } from "./blesssystemmob/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const products = [clinicProduct, mobProduct]

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...products.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/contratar`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]
}
