"use client"

import ProductLandingPage from "@/components/products/ProductLandingPage"
import { clinicProduct } from "./data"

export default function ClinicClientPage() {
  return <ProductLandingPage product={clinicProduct} />
}
