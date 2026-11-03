import type { NextConfig } from "next";

// O portfólio de demos (projeto garbato-labs, basePath /labs) aparece em garbatosolution.com.br/labs.
const LABS_ORIGIN = "https://garbato-labs.vercel.app";

const nextConfig: NextConfig = {
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
