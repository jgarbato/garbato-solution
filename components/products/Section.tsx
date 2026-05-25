import type { Ref, ReactNode } from "react"
import type { ProductTheme } from "@/lib/products/types"

const MAX_W = {
  "2xl": "max-w-2xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
} as const

type SectionProps = {
  id?: string
  ref?: Ref<HTMLElement>
  maxWidth?: keyof typeof MAX_W
  bg?: string
  children: ReactNode
}

export function Section({ id, ref, maxWidth = "6xl", bg, children }: SectionProps) {
  return (
    <section
      id={id}
      ref={ref}
      className="py-20 px-6 scroll-mt-20"
      style={bg ? { background: bg } : undefined}
    >
      <div className={`${MAX_W[maxWidth]} mx-auto`}>{children}</div>
    </section>
  )
}

type SectionHeaderProps = {
  theme: ProductTheme
  badge?: string
  badgeBg?: string
  titlePre?: string
  titleHighlight?: string
  subtitle?: string
  className?: string
}

export function SectionHeader({
  theme: t,
  badge,
  badgeBg,
  titlePre,
  titleHighlight,
  subtitle,
  className = "text-center mb-12",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {badge && (
        <span
          className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3"
          style={{ background: badgeBg ?? t.bgTinted, color: t.primary }}
        >
          {badge}
        </span>
      )}
      {(titlePre || titleHighlight) && (
        <h2
          className={subtitle ? "text-[2rem] font-bold mb-3" : "text-[2rem] font-bold"}
          style={{ color: t.dark, fontFamily: "var(--font-space-grotesk)" }}
        >
          {titlePre && <>{titlePre} </>}
          {titleHighlight && <span style={{ color: t.primary }}>{titleHighlight}</span>}
        </h2>
      )}
      {subtitle && (
        <p className="text-[14px] max-w-md mx-auto" style={{ color: t.body }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
