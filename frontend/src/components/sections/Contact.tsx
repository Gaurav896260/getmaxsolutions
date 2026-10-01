"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Mail, MessageCircle, Search } from "lucide-react";
import { AUDIT, LEGAL_NAV, PRIMARY_NAV, SITE, whatsappLink } from "@/lib/site";
import Logo from "../Logo";
import ContactForm from "../ContactForm";
import SocialIcons from "../SocialIcons";
import ContactItem from "../ContactItem";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AuditPoints({ tone = "light" }: { tone?: "light" | "dark" }) {
  const muted = tone === "light" ? "text-white/80" : "text-ink/75";
  const tick = tone === "light" ? "bg-white/15 text-white" : "bg-brand/10 text-brand";
  return (
    <ul className="space-y-3">
      {AUDIT.covers.map((c) => (
        <li key={c} className={`flex items-start gap-3 text-[15px] ${muted}`}>
          <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${tick}`}>
            <Check className="size-3" strokeWidth={3} />
          </span>
          {c}
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  const wa = whatsappLink("Hi Getmax, I'd like to talk about growing my business.");

  return (
    <section
      id="contact"
      data-header-theme="light"
      aria-labelledby="contact-title"
      className="flex min-h-svh items-center bg-[#e7e4f1] text-ink"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-40px_rgba(30,11,120,0.35)] lg:grid-cols-[0.8fr_1.2fr]"
        >
          {/* Left: purple "get in touch" panel */}
          <div className="relative flex flex-col overflow-hidden bg-brand p-8 text-white sm:p-12">
            <svg
              aria-hidden
              className="pointer-events-none absolute -bottom-1/4 -right-1/3 h-[90%] w-[110%] opacity-40"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <circle cx="80" cy="80" r="60" fill="#7a5cf3" />
            </svg>
            <div className="relative">
              <h3 className="text-2xl font-semibold tracking-tight">Get in touch</h3>
              <p className="mt-3 max-w-[32ch] text-[15px] leading-relaxed text-white/80">
                We&apos;d love to hear about your business. One team — strategy, websites, marketing
                and AI.
              </p>
            </div>

            <div className="relative mt-10 space-y-8">
              <ContactItem icon={Mail} title="Chat to us" body="Our team is here to help.">
                <a href={`mailto:${SITE.email}`} className="hover:underline">
                  {SITE.email}
                </a>
              </ContactItem>
              {wa && (
                <ContactItem icon={MessageCircle} title="WhatsApp" body="Quick questions, quick answers.">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Message us on WhatsApp
                  </a>
                </ContactItem>
              )}
              <ContactItem icon={Search} title={AUDIT.title} body="See where your digital is leaking leads.">
                <Link href="/audit" className="inline-flex items-center gap-1 hover:underline">
                  Request your audit <ArrowUpRight className="size-4" />
                </Link>
              </ContactItem>
            </div>

            <SocialIcons
              className="relative mt-auto pt-12"
              iconClass="text-white/80 transition-colors hover:text-white"
            />
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-12 lg:px-16 lg:py-14">
            <h2
              id="contact-title"
              className="text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-tight tracking-[-0.025em]"
            >
              Let&apos;s grow your business
            </h2>
            <p className="mb-8 mt-3 text-[17px] text-ink/65">
              You can reach us anytime via{" "}
              <a href={`mailto:${SITE.email}`} className="font-medium text-brand hover:underline">
                {SITE.email}
              </a>
            </p>
            <ContactForm id="home-contact-form" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Dotted panel with a bracket edge, flanking the footer CTA (as in the reference).
function DotBracket({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={`hidden h-44 w-36 shrink-0 bg-[radial-gradient(circle,rgba(89,50,234,0.35)_1px,transparent_1.6px)] [background-size:14px_14px] lg:block ${
        side === "left"
          ? "rounded-r-2xl border-y border-r border-white/80 [mask-image:linear-gradient(to_right,transparent,black_70%)]"
          : "rounded-l-2xl border-y border-l border-white/80 [mask-image:linear-gradient(to_left,transparent,black_70%)]"
      }`}
    />
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    ...PRIMARY_NAV,
    { label: "Free audit", href: "/audit" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer
      data-header-theme="light"
      className="relative flex min-h-svh flex-col overflow-hidden bg-[linear-gradient(180deg,#f5f3ee_0%,#efeafb_38%,#c9bcf6_72%,#9d86f2_100%)] text-ink"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left: socials, email, positioning */}
          <div>
            <Link href="/" aria-label={`${SITE.name} home`} className="inline-block">
              <Logo className="w-[120px]" />
            </Link>
            <SocialIcons className="mt-8" iconClass="text-ink transition-colors hover:text-brand" />
            <a
              href={`mailto:${SITE.email}`}
              className="mt-7 block text-2xl tracking-tight transition-colors hover:text-brand sm:text-[1.7rem]"
            >
              {SITE.email}
            </a>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ink/65">
              {SITE.tagline} Healthcare software by{" "}
              <a href={SITE.healthcareUrl} className="underline underline-offset-2 hover:text-ink">
                Getmax Healthcare
              </a>
              .
            </p>
          </div>

          {/* Center: CTA between dotted brackets */}
          <div className="flex items-center justify-center lg:gap-0">
            <DotBracket side="left" />
            <span aria-hidden className="hidden h-px w-6 bg-white/80 lg:block" />
            <Link
              href="/audit"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#14102b] py-2.5 pl-5 pr-2.5 text-white shadow-[0_20px_40px_-15px_rgba(20,16,43,0.6)] transition hover:bg-black"
            >
              <span className="text-[15px] font-semibold">Get a growth audit</span>
              <span className="rounded-md bg-white/12 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b9a8ff]">
                Free
              </span>
            </Link>
            <span aria-hidden className="hidden h-px w-6 bg-white/80 lg:block" />
            <DotBracket side="right" />
          </div>

          {/* Right: big nav links */}
          <nav aria-label="Footer" className="lg:justify-self-end">
            <ul className="flex flex-col gap-3 lg:items-end">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-2xl tracking-tight transition-colors hover:text-brand sm:text-[1.7rem]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-20 flex flex-col items-start gap-3 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <Link href={LEGAL_NAV[1].href} className="underline underline-offset-4 hover:text-ink">
            {LEGAL_NAV[1].label}
          </Link>
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <Link href={LEGAL_NAV[0].href} className="underline underline-offset-4 hover:text-ink">
            {LEGAL_NAV[0].label}
          </Link>
        </div>
      </div>

      {/* Giant wordmark bleeding off the bottom */}
      <div
        aria-hidden
        className="pointer-events-none relative -mb-[6vw] flex select-none justify-center px-4 opacity-30 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
      >
        <Logo white className="w-full max-w-[1400px]" />
      </div>
    </footer>
  );
}
