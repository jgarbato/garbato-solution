import { ImageResponse } from "next/og"
import type { Product } from "./types"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

export function renderProductOgImage(product: Product) {
  const t = product.theme
  const tagline = product.seo.ogDescription ?? product.seo.description
  const headline = `${product.hero.titlePre} ${product.hero.titleHighlight}`
  const url = `garbatosolution.com.br${product.path}`
  const bullets = product.hero.bullets.map((b) => b.replace(/^[^a-zA-Z0-9]+/, "").trim())

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 600, letterSpacing: -0.3 }}>
            Garbato Solution
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.4,
              opacity: 0.92,
              marginTop: 8,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            opacity: 0.9,
          }}
        >
          <div style={{ display: "flex" }}>{url}</div>
          <div style={{ display: "flex", gap: 18 }}>
            {bullets.slice(0, 3).map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
