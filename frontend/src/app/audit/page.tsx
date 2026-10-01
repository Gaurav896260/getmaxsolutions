import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageCircle, Search } from "lucide-react";
import AuditForm from "@/components/AuditForm";
import Logo from "@/components/Logo";
import { AuditPoints } from "@/components/sections/Contact";
import ContactItem from "@/components/ContactItem";
import { PillLink } from "@/components/sections/Hero";
import Reveal from "@/components/Reveal";
import SocialIcons from "@/components/SocialIcons";
import { AUDIT, LEGAL_NAV, SHARE_IMAGE, SITE, whatsappLink } from "@/lib/site";

// Dedicated landing page for paid traffic: no site navigation, one action.

export const metadata: Metadata = {
  title: "Free Growth Audit",
  description: `${AUDIT.promise} Get a free audit of your website, search visibility, ads and lead follow-up from ${SITE.name}.`,
  alternates: { canonical: "/audit" },
  openGraph: {
    title: `${AUDIT.title} — ${SITE.name}`,
    description: AUDIT.promise,
    url: "/audit",
    images: SHARE_IMAGE.openGraph,
  },
  twitter: { card: "summary_large_image", images: SHARE_IMAGE.twitter },
};

const STEPS = [
  { title: "Tell us about your business", body: "Name, email and your website. Takes 30 seconds." },
  {
    title: "We review it like a buyer would",
    body: "Your website, search and AI-search presence, ads, tracking and how fast leads get a reply.",
  },
  { title: "Get your fix list", body: AUDIT.delivers },
];

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes. There's no cost and no obligation to work with us afterwards.",
  },
  {
    q: "Who is it for?",
    a: "Owners and managers of growing businesses — clinics and hospitals, education, real estate, e-commerce, financial services, hospitality and B2B companies.",
  },
  {
    q: "What do you need from me?",
    a: "Just your website and a way to reach you. If you run ads, we may ask for read-only access later — only if you want a deeper look.",
  },
];

export default function AuditPage() {
  const wa = whatsappLink("Hi Getmax, I'd like a Free Growth Audit.");

  return (
    <>
      {/* Minimal header: logo only (plus WhatsApp if configured) — ad traffic shouldn't wander off */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3 sm:p-4">
        <Link href="/" aria-label={`${SITE.name} home`} className="block px-3 py-2.5 sm:px-3.5 sm:py-3">
          <Logo priority className="w-[78px] sm:w-[88px]" />
        </Link>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white transition hover:brightness-95"
          >
            WhatsApp us
          </a>
        )}
      </header>

      <main id="top">
        {/* Split card, same design as the homepage contact section */}
        <section className="flex min-h-svh items-center bg-[#e7e4f1] text-ink">
          <div className="mx-auto w-full max-w-[1240px] px-4 pb-16 pt-24 sm:px-8 sm:pt-28">
            <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-40px_rgba(30,11,120,0.35)] lg:grid-cols-[0.85fr_1.15fr]">
              {/* Right on desktop, first on phones: the form */}
              <div className="p-7 sm:p-12 lg:order-2 lg:px-16 lg:py-14">
                <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand">{AUDIT.title}</p>
                <h1 className="mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.025em]">
                  You&apos;re not losing customers to better businesses.
                </h1>
                <p className="mb-8 mt-3 text-[17px] leading-relaxed text-ink/65">
                  You&apos;re losing them to better digital. {AUDIT.promise} Takes 30 seconds, no obligation.
                </p>
                <AuditForm id="audit-page-form" bare />
              </div>

              {/* Purple panel: what the audit covers + other ways to reach us */}
              <div className="relative flex flex-col overflow-hidden bg-brand p-7 text-white sm:p-12 lg:order-1">
                <svg
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1/4 -right-1/3 h-[90%] w-[110%] opacity-40"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <circle cx="80" cy="80" r="60" fill="#7a5cf3" />
                </svg>
                <div className="relative">
                  <h2 className="text-2xl font-semibold tracking-tight">What we&apos;ll review</h2>
                  <p className="mb-7 mt-3 max-w-[34ch] text-[15px] leading-relaxed text-white/80">
                    We look at your business the way a buyer finds it — then tell you what to fix first.
                  </p>
                  <AuditPoints />
                </div>

                <div className="relative mt-10 space-y-8">
                  <ContactItem icon={Search} title="What you get" body={AUDIT.delivers}>
                    <span className="font-normal text-white/75">Free, with no obligation.</span>
                  </ContactItem>
                  <ContactItem icon={Mail} title="Prefer email?" body="Write to us directly.">
                    <a href={`mailto:${SITE.email}?subject=Free%20Growth%20Audit`} className="hover:underline">
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
                </div>

                <SocialIcons
                  className="relative mt-auto pt-12"
                  iconClass="text-white/80 transition-colors hover:text-white"
                />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="how-title" className="flex min-h-[70svh] items-center bg-sand text-brand-night">
          <div className="mx-auto w-full max-w-[1240px] px-5 py-24 sm:px-8">
            <Reveal>
              <h2
                id="how-title"
                className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.01em]"
              >
                How it works
              </h2>
            </Reveal>
            <ol className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08} className="border-t border-brand-night/15 pb-8 pt-7">
                  <span className="text-sm font-semibold tabular-nums tracking-[0.18em] text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.4rem] leading-snug tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-2.5 text-[17px] leading-relaxed text-brand-night/70">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="flex min-h-[70svh] items-center bg-[#e7e4f1] text-brand-night">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <h2
                id="faq-title"
                className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.01em]"
              >
                Questions
              </h2>
            </Reveal>
            <div className="divide-y divide-brand-night/12 border-y border-brand-night/12">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl leading-snug sm:text-[1.35rem] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-3xl font-light text-brand transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-brand-night/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand text-white">
          <svg
            aria-hidden
            className="pointer-events-none absolute -right-[10%] top-0 h-full w-[60%] opacity-50"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle cx="110" cy="50" r="70" fill="#7a5cf3" />
          </svg>
          <div className="relative mx-auto flex max-w-[1240px] flex-col items-start gap-8 px-5 py-20 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="max-w-[18ch] font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.06] tracking-[-0.015em]">
              Find out what to fix first. It&apos;s free.
            </p>
            <PillLink href="#top" size="lg">
              Get my free audit
            </PillLink>
          </div>
        </section>
      </main>

      <footer className="bg-brand-night text-sm text-white/60">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <ul className="flex gap-6">
            {LEGAL_NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
