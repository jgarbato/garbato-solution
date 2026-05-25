import { renderProductOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/products/ogImage"
import { clinicProduct } from "./data"

export const alt = clinicProduct.seo.ogTitle ?? clinicProduct.seo.title
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderProductOgImage(clinicProduct)
}
