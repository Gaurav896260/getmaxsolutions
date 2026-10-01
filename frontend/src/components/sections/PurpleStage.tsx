"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// One pinned background shared by the hero and the scroll story, so there is no
// seam between them. Big circles in a stretched viewBox read as sweeping curves;
// their centre and radius morph through four looks as you scroll (hero, then one
// per story statement). Story stops assume the hero is 100svh and Story 340vh.
const STOPS = [0, 0.38, 0.65, 0.92];
const LIGHT = { cx: [-70, 150, 50, -30], cy: [70, -10, -140, -40], r: [115, 110, 170, 130] };
const DEEP = { cx: [150, 130, 50, -20], cy: [75, 150, 230, 170], r: [70, 70, 140, 110] };

export default function PurpleStage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Springing the progress makes the curves glide in slightly behind the scroll.
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.6 });

  const lightCx = useTransform(p, STOPS, LIGHT.cx);
  const lightCy = useTransform(p, STOPS, LIGHT.cy);
  const lightR = useTransform(p, STOPS, LIGHT.r);
  const deepCx = useTransform(p, STOPS, DEEP.cx);
  const deepCy = useTransform(p, STOPS, DEEP.cy);
  const deepR = useTransform(p, STOPS, DEEP.r);

  return (
    <div ref={ref} data-header-theme="dark" className="relative bg-brand-deep">
      <div
        aria-hidden
        className="sticky top-0 -mb-[100svh] h-svh overflow-hidden bg-[radial-gradient(120%_120%_at_0%_100%,#7a5cf3_0%,#5932ea_38%,#3a17c4_70%,#1e0b78_100%)]"
      >
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.circle cx={lightCx} cy={lightCy} r={lightR} fill="#6a45f0" opacity={0.7} />
          <motion.circle cx={deepCx} cy={deepCy} r={deepR} fill="#1e0b78" opacity={0.5} />
        </svg>
      </div>
      {children}
    </div>
  );
}
