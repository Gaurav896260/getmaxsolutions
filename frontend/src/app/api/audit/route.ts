// Receives Free Growth Audit requests and emails them to the team via Resend.
//
// Env (server-only):
//   RESEND_API_KEY   — from resend.com (domain getmaxsolutions.com verified there)
//   LEAD_TO_EMAIL    — inbox(es) that receive leads, comma-separated
//   LEAD_FROM_EMAIL  — verified sender, e.g. "Getmax Leads <info@getmaxsolutions.com>"
//
// Without RESEND_API_KEY the lead is logged to the server console in development
// and rejected in production, so a misconfigured deploy never silently drops leads.

import { SERVICES, SITE } from "@/lib/site";

type Lead = {
  kind: "audit" | "contact";
  services: string[];
  name: string;
  email: string;
  website: string;
  phone: string;
  message: string;
  source: Record<string, string>;
};

const MAX = { name: 120, email: 200, website: 300, phone: 40, message: 2000, source: 200 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCE_KEYS = ["page", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "referrer"];

// Best-effort per-instance throttle; serverless instances don't share it.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function normaliseUrl(raw: string) {
  if (!raw) return "";
  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withProto);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

function parse(body: Record<string, unknown>): { lead?: Lead; error?: string } {
  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email).toLowerCase();
  const websiteRaw = str(body.website, MAX.website);
  const phone = str(body.phone, MAX.phone);
  const message = str(body.message, MAX.message);

  if (name.length < 2) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };
  const website = normaliseUrl(websiteRaw);
  if (website === null) return { error: "Please enter a valid website, e.g. yourbusiness.com" };
  if (phone && !/^[+\d][\d\s()-]{6,}$/.test(phone)) return { error: "Please enter a valid phone number." };

  // Only accept service names we actually offer.
  const known = new Set<string>([...SERVICES.map((s) => s.title), "Other"]);
  const services = Array.isArray(body.services)
    ? body.services.filter((v): v is string => typeof v === "string" && known.has(v)).slice(0, 12)
    : [];
  const kind = body.kind === "contact" ? "contact" : "audit";

  const rawSource = (body.source ?? {}) as Record<string, unknown>;
  const source: Record<string, string> = {};
  for (const k of SOURCE_KEYS) {
    const v = str(rawSource[k], MAX.source);
    if (v) source[k] = v;
  }
  return { lead: { kind, services, name, email, website, phone, message, source } };
}

function renderEmail(lead: Lead) {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Website", lead.website || "—"],
    ["Phone / WhatsApp", lead.phone || "—"],
    ["Services", lead.services.join(", ") || "—"],
    ["Message", lead.message || "—"],
    ...Object.entries(lead.source).map(([k, v]) => [k, v] as [string, string]),
  ];
  const html = `<h2 style="font-family:sans-serif">${lead.kind === "contact" ? "New enquiry" : "New Free Growth Audit request"}</h2>
<table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { html, text };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "company_url" field.
  if (str(body.company_url, 200)) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const { lead, error } = parse(body);
  if (!lead) return Response.json({ ok: false, error }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.LEAD_TO_EMAIL ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.LEAD_FROM_EMAIL ?? `${SITE.name} <onboarding@resend.dev>`;

  if (!apiKey || to.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[audit] Lead received (email not configured): ${JSON.stringify(lead)}`);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[audit] RESEND_API_KEY / LEAD_TO_EMAIL not set — lead NOT delivered:", lead.email);
    return Response.json(
      { ok: false, error: `Our form is temporarily unavailable. Please email ${SITE.email}.` },
      { status: 503 },
    );
  }

  const { html, text } = renderEmail(lead);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `${lead.kind === "contact" ? "Enquiry" : "Growth Audit request"} — ${lead.name}${lead.website ? ` (${new URL(lead.website).hostname})` : ""}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[audit] Resend error", res.status, await res.text().catch(() => ""));
    return Response.json(
      { ok: false, error: `Something went wrong sending your request. Please email ${SITE.email}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
