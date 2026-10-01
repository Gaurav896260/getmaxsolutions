"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { AUDIT, whatsappLink } from "@/lib/site";
import { useLeadSubmit } from "./useLeadSubmit";

const EASE = [0.16, 1, 0.3, 1] as const;
export function Field({
  label,
  optional,
  ...input
}: { label: string; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-[13px] font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-ink/45">Optional</span>}
      </span>
      <input
        {...input}
        className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-4 focus:ring-brand/15"
      />
    </label>
  );
}

// `bare` drops the card chrome and intro so the form can sit inside a larger layout
// (the split card on /audit).
export default function AuditForm({ id = "audit-form", bare = false }: { id?: string; bare?: boolean }) {
  const { status, error, submit } = useLeadSubmit("audit");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void submit(Object.fromEntries(new FormData(e.currentTarget)));
  }

  const wa = whatsappLink("Hi Getmax, I'd like a Free Growth Audit.");

  return (
    <div className={bare ? "text-ink" : "rounded-3xl bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(20,8,90,0.45)] sm:p-8"}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-6 text-center"
            role="status"
          >
            <CheckCircle2 className="mx-auto size-12 text-brand" strokeWidth={1.5} />
            <h3 className="mt-4 text-xl font-semibold tracking-tight">Request received</h3>
            <p className="mx-auto mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink/70">
              Thanks — we&apos;ll review your business and get back to you by email.
            </p>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Message us on WhatsApp
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            id={id}
            onSubmit={onSubmit}
            className="space-y-4"
            exit={{ opacity: 0, y: -12 }}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            {!bare && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                  {AUDIT.title}
                </p>
                <p className="mt-1.5 text-[15px] text-ink/70">Takes 30 seconds. No obligation.</p>
              </div>
            )}

            <Field label="Name" name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Your name" />
            <Field label="Work email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@company.com" />
            <Field label="Website" name="website" inputMode="url" autoComplete="url" maxLength={300} placeholder="yourbusiness.com" optional />
            <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+91 98765 43210" optional />

            {/* Honeypot — hidden from people, tempting for bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company URL
                <input name="company_url" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === "error" && (
              <p id={`${id}-error`} role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={`group flex w-full items-center justify-center gap-2 bg-brand px-6 py-3.5 font-semibold text-white ${bare ? "rounded-xl text-[15px]" : "rounded-full text-sm"} transition hover:bg-brand-deep disabled:opacity-70`}
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Get my free audit
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <p className="text-center text-xs leading-relaxed text-ink/50">
              By submitting you agree to our{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
                Privacy Policy
              </a>
              . We&apos;ll only use your details to respond to this request.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
