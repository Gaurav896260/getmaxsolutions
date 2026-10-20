// Cloudflare worker for getmaxsolutions.com.
// The site is a static Next export (out/), served by Cloudflare directly.
// This script only runs for /api/* (wrangler.jsonc "run_worker_first").
import { handleLead, type LeadEnv } from "./lead";

type Env = LeadEnv & { ASSETS: { fetch: (req: Request) => Promise<Response> } };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/audit") {
      if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
      return handleLead(request, env);
    }
    if (pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
