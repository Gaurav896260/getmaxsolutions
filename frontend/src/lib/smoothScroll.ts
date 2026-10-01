import type Lenis from "lenis";

// Shared handle to the page's Lenis instance so modals can pause smooth scroll
// and in-page jumps can use the same eased motion.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -24 });
  else el.scrollIntoView({ behavior: "smooth" });
}
