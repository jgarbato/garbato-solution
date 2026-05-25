import { clinicProduct } from "@/app/blesssystemclinic/data"
import { mobProduct } from "@/app/blesssystemmob/data"
import type { Plan, Product } from "./types"

export const PRODUCTS = { clinic: clinicProduct, mob: mobProduct } as const

export type ProductSlug = keyof typeof PRODUCTS
export type Periodo = "mensal" | "anual"

export function isProductSlug(value: string): value is ProductSlug {
  return value in PRODUCTS
}

export function getProduct(slug: string): Product {
  return isProductSlug(slug) ? PRODUCTS[slug] : PRODUCTS.clinic
}

export function getPlan(slug: string, planId: string): Plan | undefined {
  return getProduct(slug).pricing.plans.find((p) => p.id === planId)
}

export function getPlanPrice(slug: string, planId: string, periodo: Periodo): number {
  const plan = getPlan(slug, planId)
  if (!plan) return 0
  return periodo === "anual" ? plan.priceAnnual : plan.price
}
