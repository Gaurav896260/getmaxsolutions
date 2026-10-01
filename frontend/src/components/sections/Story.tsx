"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATEMENTS: string[][] = [
  [
    "A web developer. An ads freelancer. An SEO agency. A software vendor.",
    "Four vendors, one job — and still losing leads.",
  ],
  [
    "When the goalposts shift, you need someone to move with you.",
    "Not a change request. A flexible response.",
  ],
  [
    "One team that plans it, builds it and runs it.",
    "Deep in healthcare. Built for every industry.",
  ],
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STATEMENTS.length - 1, Math.floor(p * STATEMENTS.length)));
  });

  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="about"
      ref={ref}
      aria-label="Why Getmax"
      className="relative h-[340vh]"
    >
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden text-white">

        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 px-5 sm:px-10 lg:grid-cols-2">
          {/* Scroll picks the statement; only that one is ever rendered, so the
              previous one has fully left before the next arrives. */}
          <div className="relative min-h-[14rem] sm:min-h-[16rem] lg:col-start-2 lg:ml-[10%]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="absolute inset-x-0 top-1/2 flex max-w-[28ch] -translate-y-1/2 flex-col gap-3 text-[1.3rem] leading-[1.3] tracking-tight sm:text-[1.6rem] lg:text-[1.85rem]"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.12 } },
                  exit: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {STATEMENTS[active].map((line) => (
                  <motion.p
                    key={line}
                    variants={{
                      hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.8, ease: EASE },
                      },
                      exit: {
                        opacity: 0,
                        y: -30,
                        filter: "blur(6px)",
                        transition: { duration: 0.35, ease: "easeIn" },
                      },
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress counter */}
        <div className="absolute bottom-8 left-5 z-10 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:left-10">
          <span className="tabular-nums">0{active + 1}</span>
          <span className="relative h-px w-24 bg-white/25 sm:w-40">
            <motion.span
              className="absolute inset-0 origin-left bg-white"
              style={{ scaleX: bar }}
            />
          </span>
          <span className="tabular-nums text-white/50">0{STATEMENTS.length}</span>
        </div>
      </div>
    </section>
  );
}
