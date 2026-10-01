"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export type Crumb = { label: string; href?: string };

// AHA-style page hero: purple gradient with sweeping curves, eyebrow, serif title, intro.
export default function ServiceHero({
  eyebrow,
  eyebrowHref,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  eyebrowHref?: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
}) {
  return (
    <section
      data-header-theme="dark"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-[radial-gradient(120%_120%_at_0%_100%,#7a5cf3_0%,#5932ea_38%,#3a17c4_70%,#1e0b78_100%)] text-white"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.circle
          cx={-35}
          cy={-10}
          fill="#6a45f0"
          opacity={0.55}
          initial={{ r: 60 }}
          animate={{ r: 95 }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <motion.circle
          cx={145}
          cy={110}
          fill="#1e0b78"
          opacity={0.45}
          initial={{ r: 40 }}
          animate={{ r: 70 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.1 }}
        />
      </svg>

      <div className="mx-auto w-full max-w-[1600px] px-5 pb-20 pt-36 sm:px-10 lg:px-[calc(2.5rem+3vw)]">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/65">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/90">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden>/</span>}
              </li>
            ))}
          </ol>
        </nav>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="text-[13.5px] font-bold uppercase tracking-[0.16em]"
        >
          {eyebrowHref ? (
            <Link href={eyebrowHref} className="hover:underline hover:underline-offset-8">
              {eyebrow}
            </Link>
          ) : (
            eyebrow
          )}
        </motion.p>

        <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(2.8rem,7.2vw,6.75rem)] font-bold leading-[1.02] tracking-[-0.015em] [font-variation-settings:'opsz'_32]">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            >
              {title}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          className="mt-8 max-w-[40ch] text-xl leading-[1.45] text-white/90 sm:text-2xl lg:text-[1.75rem]"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}
