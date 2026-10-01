"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { PillLink } from "./Hero";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  // Hovering (or focusing) a service on the right swaps the copy on the left.
  const [hovered, setHovered] = useState<number | null>(null);
  const current = hovered === null ? null : SERVICES[hovered];

  return (
    <section
      id="services"
      data-header-theme="light"
      aria-labelledby="services-title"
      className="relative bg-sand text-ink"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-24 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-24 lg:py-36">
        {/* Left: sticky copy that follows the hovered service */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.h2
            id="services-title"
            className="max-w-[17ch] font-display text-[clamp(2.4rem,4.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.01em] text-brand-night"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            Trusted for every part of your digital engine.
          </motion.h2>

          <div className="relative mt-7 min-h-[15rem] max-w-[34rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {current ? (
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="space-y-4 text-lg leading-relaxed text-brand-night/85 sm:text-[1.2rem]"
                >
                  <p className="font-semibold text-brand-night">{current.title}</p>
                  <p>{current.summary}</p>
                  <p className="text-base text-brand-night/70 sm:text-[1.05rem]">
                    {current.points.join(" · ")}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="space-y-4 text-lg leading-relaxed text-brand-night/85 sm:text-[1.2rem]"
                >
                  <p>
                    Growing businesses juggle a web developer, an ads freelancer, an SEO agency and a
                    software vendor. Multiple vendors add pressure, raise risk and increase the chance
                    of something slipping through the cracks.
                  </p>
                  <p>
                    We handle everything, end-to-end — so strategy, website, marketing and automation
                    all work in sync.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <PillLink href="#contact" variant="brand" size="lg">
              Get a free audit
            </PillLink>
          </div>
        </div>

        {/* Right: service list */}
        <ul className="border-b border-brand-night/12" onMouseLeave={() => setHovered(null)}>
          {SERVICES.map((s, i) => (
            <motion.li
              key={s.slug}
              id={`service-${s.slug}`}
              className="border-t border-brand-night/12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <Link
                href={`/services/${s.slug}`}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                className="group flex items-center justify-between gap-6 py-8 sm:py-10 lg:py-12"
              >
                <h3 className="text-[1.6rem] leading-tight tracking-[-0.01em] text-brand-night transition-colors duration-300 group-hover:text-brand sm:text-[2rem] lg:text-[2.35rem]">
                  {s.title}
                </h3>
                <ArrowUpRight
                  className="size-6 shrink-0 text-brand-night transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand sm:size-7"
                  strokeWidth={1.75}
                />
              </Link>
              {/* Phones have no hover, so the summary sits under each title */}
              <p className="-mt-3 max-w-[52ch] pb-8 text-[15px] leading-relaxed text-brand-night/70 lg:hidden">
                {s.summary}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
