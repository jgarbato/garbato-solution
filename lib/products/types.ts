import type { LucideIcon } from "lucide-react"

export type ProductTheme = {
  primary: string
  primaryLight: string
  accent: string
  bg: string
  bgSoft: string
  bgTinted: string
  border: string
  dark: string
  body: string
  muted: string
  shadowRgba: string
}

export type Plan = {
  id: string
  name: string
  desc: string
  price: number
  hot?: boolean
  features: string[]
}

export type Feature = {
  icon: LucideIcon
  title: string
  desc: string
}

export type FAQ = {
  q: string
  a: string
}

export type Stat = {
  value: string
  label: string
}

export type HowItWorksStep = {
  n: string
  icon: LucideIcon
  title: string
  desc: string
}

export type MockupListItem = {
  leftBadge: string
  leftBadgeWidth?: "narrow" | "wide"
  showAvatar?: boolean
  title: string
  subtitle: string
  rightExtra?: string
  statusLabel: string
  statusColor: string
}

export type MockupStat = {
  value: string
  label: string
  color: string
}

export type Mockup = {
  domain: string
  logoIcon: LucideIcon
  sidebarIcons: LucideIcon[]
  header: {
    title: string
    subtitle: string
    badge: { label: string; bg: string; color: string }
  }
  stats: MockupStat[]
  items: MockupListItem[]
}

export type ProductSEO = {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  keywords?: string[]
}

export type Product = {
  slug: string
  name: string
  logoIcon: LucideIcon
  logoSuffix: string
  seo: ProductSEO
  hero: {
    badge: { icon: LucideIcon; label: string }
    titlePre: string
    titleHighlight: string
    description: string
    primaryCta: string
    secondaryCta: string
    bullets: string[]
  }
  whatsappMessage: string
  stats: Stat[]
  features: {
    badge: string
    titlePre: string
    titleHighlight: string
    subtitle: string
    items: Feature[]
  }
  howItWorks: {
    badge: string
    titlePre: string
    titleHighlight: string
    steps: HowItWorksStep[]
  }
  pricing: {
    badge: string
    titlePre: string
    titleHighlight: string
    plans: Plan[]
  }
  faq: {
    badge: string
    items: FAQ[]
  }
  cta: {
    title: string
    subtitle: string
    primaryCta: string
  }
  theme: ProductTheme
  mockup: Mockup
}
