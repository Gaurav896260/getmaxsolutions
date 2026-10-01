"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { Field } from "./AuditForm";
import { useLeadSubmit } from "./useLeadSubmit";

const EASE = [0.16, 1, 0.3, 1] as const;
const OPTIONS = [...SERVICES.map((s) => s.title), "Other"];

export default function ContactForm({ id = "contact-form" }: { id?: string }) {
  const { status, error, submit } = useLeadSubmit("contact");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, unknown>;
    // Checkboxes share a name, so collect every ticked value.
    data.services = fd.getAll("services");
    void submit(data);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex min-h-[28rem] flex-col items-center justify-center text-center"
          role="status"
        >
          <CheckCircle2 className="size-14 text-brand" strokeWidth={1.5} />
          <h3 className="mt-5 text-2xl font-semibold tracking-tight">Message received</h3>
          <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink/70">
            Thanks for reaching out — we&apos;ll get back to you by email.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          id={id}
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -12 }}
          className="space-y-5"
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <Field label="Name" name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Your name" />
          <Field label="Email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@company.com" />
          <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+91 98765 43210" optional />

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink">How can we help?</span>
            <textarea
              name="message"
              rows={4}
              maxLength={2000}
              placeholder="Tell us a little about your business and goals…"
              className="w-full resize-y rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-4 focus:ring-brand/15"
            />
          </label>

          <fieldset>
            <legend className="mb-2.5 text-[13px] font-medium text-ink">Services</legend>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {OPTIONS.map((opt) => (
                <label key={opt} className="flex cursor-pointer items-center gap-2.5 text-[15px] text-ink/85">
                  <input
                    type="checkbox"
                    name="services"
                    value={opt}
                    className="size-[18px] shrink-0 cursor-pointer rounded-[5px] border border-ink/25 accent-brand"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </fieldset>

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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-brand-deep disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending…
              </>
            ) : (
              "Get started"
            )}
          </button>
          <p className="text-center text-xs text-ink/50">
            By submitting you agree to our{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
              Privacy Policy
            </a>
            .
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
