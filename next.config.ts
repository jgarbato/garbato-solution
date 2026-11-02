import type { NextConfig } from "next";

// O portfólio de demos (projeto garbato-labs, basePath /labs) aparece em garbatosolution.com.br/labs.
const LABS_ORIGIN = "https://garbato-labs.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/labs", destination: `${LABS_ORIGIN}/labs` },
      { source: "/labs/:path*", destination: `${LABS_ORIGIN}/labs/:path*` },
    ];
  },
};

export default nextConfig;
