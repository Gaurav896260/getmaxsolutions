"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";

const SOURCE_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export type LeadStatus = "idle" | "sending" | "sent" | "error";

// Posts a lead to /api/audit, tagged with the page, UTM params and external referrer.
export function useLeadSubmit(kind: "audit" | "contact") {
  const [status, setStatus] = useState<LeadStatus>("idle");
  const [error, setError] = useState("");
  const source = useRef<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s: Record<string, string> = { page: window.location.pathname };
    for (const k of SOURCE_KEYS) {
      const v = params.get(k);
      if (v) s[k] = v;
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      s.referrer = document.referrer;
    }
    source.current = s;
  }, []);

  async function submit(payload: Record<string, unknown>) {
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, kind, source: source.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : `Couldn't send right now. Please email ${SITE.email}.`,
      );
      setStatus("error");
    }
  }

  return { status, error, submit };
}
