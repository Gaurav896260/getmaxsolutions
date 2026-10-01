"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function MaskLine({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`-mb-[0.1em] block overflow-hidden pb-[0.1em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function PillLink({
  href,
  children,
  variant = "light",
  size = "sm",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "light" | "brand";
  size?: "sm" | "lg";
}) {
  const styles =
    variant === "light"
      ? "bg-white text-brand hover:bg-lilac"
      : "bg-brand text-white hover:bg-brand-deep";
  return (
    <a
      href={href}
      className={`group inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full uppercase transition-colors ${size === "lg" ? "px-5 py-2.5 text-[13px] font-bold tracking-[0.14em]" : "px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] sm:px-5"} ${styles}`}
    >
      {children}
      <ArrowUpRight
        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={2.25}
      />
    </a>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lastWordRef = useRef<HTMLSpanElement>(null);
  const [lastWordWidth, setLastWordWidth] = useState(0);

  // Buttons sit to the right of the last headline word on desktop (AHA layout);
  // the word's width depends on the viewport, so track it.
  useLayoutEffect(() => {
    const el = lastWordRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setLastWordWidth(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  // Function form keeps this off the native scroll-timeline path, which mis-maps opacity.
  const contentOpacity = useTransform(scrollYProgress, (v) => Math.max(0, 1 - v / 0.5));

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate flex min-h-[640px] h-svh w-full text-white"
    >
      
      {/* Divider line, as on the reference */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-0 hidden w-px origin-top bg-white/70 lg:block"
        style={{ height: "50%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col justify-end gap-12 px-5 pb-10 pt-28 sm:px-10 sm:pb-14 lg:block lg:max-w-none lg:p-0"
      >
        {/* Right: positioning statement — bottom aligned with the end of the divider line */}
        <motion.p
          className="max-w-[25ch] text-lg leading-[1.4] sm:text-xl lg:absolute lg:bottom-1/2 lg:left-[calc(50%+4.5vw)] lg:text-[1.55rem] lg:leading-[1.38]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        >
          One team delivering digital{" "}
          <a href="#services" className="link-underline">
            services
          </a>{" "}
          to growing businesses across a variety of{" "}
          <a href="#sectors" className="link-underline">
            sectors
          </a>
          .
        </motion.p>

        {/* Left: headline, with the buttons stacked beside the last word on desktop */}
        <div className="relative lg:absolute lg:bottom-[7vh] lg:left-[calc(2.5rem+3vw)]">
          <h1 className="font-display text-[clamp(3.2rem,14vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.015em] [font-variation-settings:'opsz'_32] lg:text-[min(8vw,10rem)]">
            <MaskLine delay={0.15}>Getmax</MaskLine>
            <MaskLine delay={0.27}>stands for</MaskLine>
            <MaskLine delay={0.39}>
              <span ref={lastWordRef} className="inline-block">
                growth
              </span>
            </MaskLine>
          </h1>
          <motion.div
            className="mt-6 flex flex-wrap gap-2.5 lg:absolute lg:bottom-[0.6rem] lg:mt-0 lg:flex-col lg:items-start lg:gap-3 lg:[left:var(--btn-left)]"
            style={{ "--btn-left": `${lastWordWidth + 36}px` } as React.CSSProperties}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          >
            <PillLink href="#contact" size="lg">
              Free audit
            </PillLink>
            <PillLink href="#services" size="lg">
              Our services
            </PillLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        style={{ opacity: contentOpacity }}
        className="absolute bottom-6 right-6 hidden sm:block"
      >
      <motion.div
        className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/25">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
      </motion.div>
    </section>
  );
}
