"use client";

import { motion } from "framer-motion";
import { PILLARS } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
// Short eyebrow per pillar, in PILLARS order (AHA "More about" card style).
const EYEBROWS = ["Team", "Software", "AI-native", "Accountability"];

export default function Why() {
  return (
    <section
      id="why"
      data-header-theme="light"
      aria-labelledby="why-title"
      className="flex min-h-svh items-center border-t border-ink/10 bg-sand text-brand-night"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-10">
        <motion.h2
          id="why-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center text-[clamp(2.2rem,4vw,3.5rem)] tracking-[-0.02em]"
        >
          Why Getmax:
        </motion.h2>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {PILLARS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              className="group flex min-h-[22rem] flex-col bg-white p-8 transition-colors duration-500 hover:bg-brand hover:text-white lg:min-h-[30rem] lg:p-10"
            >
              <p className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-brand transition-colors group-hover:text-white/80">
                {EYEBROWS[i]}
              </p>
              <h3 className="mt-8 font-display text-[clamp(2rem,2.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="mt-auto pt-10 text-[15px] leading-relaxed text-brand-night/70 transition-colors group-hover:text-white/85">
                {p.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
