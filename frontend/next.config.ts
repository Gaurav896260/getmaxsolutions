import type { NextConfig } from "next";

// Static export: every page is pre-built HTML in out/, served by Cloudflare
// (see wrangler.jsonc). The lead form's API lives in worker/, not app/api.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
