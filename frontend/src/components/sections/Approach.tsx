"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { APPROACH, SECTORS, SITE } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Approach() {
  return (
    <section
      id="approach"
      data-header-theme="dark"
      aria-labelledby="approach-title"
      className="relative flex min-h-svh items-center overflow-hidden bg-brand-night text-white"
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-0 h-full w-[70%] opacity-50"
        viewBox="0 0 600 1000"
        preserveAspectRatio="none"
      >
        <path d="M600 0 C 300 220, 200 560, 420 1000 L 600 1000 Z" fill="#2a0fa0" />
      </svg>

      <div className="relative mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.h2
            id="approach-title"
            className="max-w-[16ch] text-[clamp(1.9rem,3.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            An approach built for momentum.
          </motion.h2>
          <motion.p
            className="max-w-[46ch] self-end text-base leading-relaxed text-white/80 lg:ml-[10%]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            No long silences and no surprise invoices. Short cycles, visible progress, and decisions
            written down so everyone knows what happens next.
          </motion.p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {APPROACH.map((a, i) => (
            <motion.li
              key={a.step}
              className="group relative bg-brand-night p-7 transition-colors duration-500 hover:bg-brand-deep sm:p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
            >
              <span className="text-4xl font-semibold tracking-tight text-white/25 transition-colors duration-500 group-hover:text-white sm:text-5xl">
                {a.step}
              </span>
              <h3 className="mt-8 text-lg font-medium tracking-tight">{a.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{a.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Sectors() {
  return (
    <section
      id="sectors"
      data-header-theme="light"
      aria-labelledby="sectors-title"
      className="flex min-h-svh items-center overflow-hidden bg-sand text-ink"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.h2
            id="sectors-title"
            className="max-w-[16ch] text-[clamp(1.9rem,3.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            Deep in healthcare. Built for every industry.
          </motion.h2>
          <motion.ul
            className="flex flex-wrap content-end gap-3 lg:ml-[10%]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {SECTORS.map((s) => (
              <motion.li
                key={s}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="rounded-full border border-ink/20 px-4 py-2 text-sm transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                {s}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.a
          href={SITE.healthcareUrl}
          className="group mt-14 flex flex-col gap-4 rounded-2xl bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(26,12,94,0.35)] sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Healthcare spotlight
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">Getmax Healthcare</p>
            <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-ink/70">
              Our healthcare vertical and software — EHR, practice management and billing — alongside
              the growth work that brings patients in.
            </p>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            Visit Getmax Healthcare
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
