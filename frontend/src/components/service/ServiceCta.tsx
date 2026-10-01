import Reveal from "../Reveal";
import { PillLink } from "../sections/Hero";
import { AUDIT } from "@/lib/site";

// Closing call to action shared by the services pages.
export default function ServiceCta() {
  return (
    <section
      data-header-theme="dark"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-brand text-white"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-0 h-full w-[60%] opacity-50"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <circle cx="110" cy="50" r="70" fill="#7a5cf3" />
      </svg>
      <div className="relative mx-auto flex min-h-[60svh] w-full max-w-[1600px] flex-col justify-center px-5 py-24 sm:px-10 lg:px-[calc(2.5rem+3vw)]">
        <Reveal>
          <p className="text-[13.5px] font-bold uppercase tracking-[0.16em] text-white/80">{AUDIT.title}</p>
          <h2
            id="cta-title"
            className="mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.015em]"
          >
            Find out what to fix first.
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-white/85 sm:text-xl">
            {AUDIT.promise} {AUDIT.delivers}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink href="/audit" size="lg">
              Get a free audit
            </PillLink>
            <PillLink href="/#contact" size="lg">
              Talk to us
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
