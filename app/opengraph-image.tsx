import { ImageResponse } from "next/og"
import { SITE_URL } from "@/lib/constants"

// OG image da home — aparece ao compartilhar garbatosolution.com.br no
// WhatsApp, Instagram, LinkedIn etc. Segue o visual dark premium do site.
export const alt = "Garbato Solution — Tecnologia que move o seu negócio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  const url = SITE_URL.replace(/^https?:\/\//, "")
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
          background: "#060810",
          color: "#EEF1F8",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* brilho de fundo */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(45,212,191,0.28) 45%, rgba(6,8,16,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 560,
            background:
              "radial-gradient(circle, rgba(45,212,191,0.30) 0%, rgba(6,8,16,0) 68%)",
            display: "flex",
          }}
        />

        {/* topo: marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 15,
              background: "linear-gradient(135deg, #38bdf8 0%, #2dd4bf 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#06121a",
            }}
          >
            G
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -0.4 }}>
            Garbato Solution
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 10,
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: 18,
              color: "#9FB4C7",
            }}
          >
            Software House
          </div>
        </div>

        {/* meio: headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 74, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ display: "flex" }}>Tecnologia que move&nbsp;</span>
            <span style={{ display: "flex", color: "#2dd4bf" }}>o seu negócio.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.4,
              color: "#AEBACb",
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            Sistemas sob medida que centralizam a sua operação — ERP, CRM,
            financeiro, automação e dashboards.
          </div>
        </div>

        {/* rodapé: url + serviços */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8FA2B4",
          }}
        >
          <div style={{ display: "flex", fontWeight: 600, color: "#EEF1F8" }}>{url}</div>
          <div style={{ display: "flex", gap: 14 }}>
            {["ERP", "CRM", "Automação"].map((s) => (
              <span
                key={s}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  background: "rgba(45,212,191,0.12)",
                  border: "1px solid rgba(45,212,191,0.35)",
                  color: "#8ee9d8",
                  fontSize: 20,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
