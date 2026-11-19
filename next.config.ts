import type { NextConfig } from "next";

// O portfólio de demos (projeto garbato-labs, basePath /labs) aparece em garbatosolution.com.br/labs.
const LABS_ORIGIN = "https://garbato-labs.vercel.app";

// Cabeçalhos de segurança para todas as páginas. A CSP fica restrita ao que
// não quebra scripts inline (JSON-LD) nem as demos do /labs.
const CABECALHOS_DE_SEGURANCA = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: CABECALHOS_DE_SEGURANCA }];
  },
  async rewrites() {
    // beforeFiles: o pedido RSC da raiz (/labs com header RSC) senão é tratado pelo próprio app e dá 404.
    return {
      beforeFiles: [
        { source: "/labs", destination: `${LABS_ORIGIN}/labs` },
        { source: "/labs/:path*", destination: `${LABS_ORIGIN}/labs/:path*` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
