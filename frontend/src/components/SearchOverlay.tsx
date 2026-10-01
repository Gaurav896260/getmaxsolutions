"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { PRIMARY_NAV, SECONDARY_NAV, SECTORS, SERVICES } from "@/lib/site";
import { useDialog } from "./useDialog";
import { scrollToHash } from "@/lib/smoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

type Entry = { label: string; hint: string; href: string; keywords: string };

const INDEX: Entry[] = [
  ...SERVICES.map((s) => ({
    label: s.title,
    hint: "Service",
    href: `/services/${s.slug}`,
    keywords: `${s.summary} ${s.points.join(" ")}`,
  })),
  ...SECTORS.map((s) => ({ label: s, hint: "Sector", href: "/#sectors", keywords: "" })),
  ...[...PRIMARY_NAV, ...SECONDARY_NAV].map((l) => ({
    label: l.label,
    hint: "Page",
    href: l.href,
    keywords: "",
  })),
];

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  useDialog(open, onClose, panelRef, inputRef);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INDEX.filter((e) => e.hint === "Service");
    return INDEX.filter((e) =>
      `${e.label} ${e.hint} ${e.keywords}`.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  const go = (href: string) => {
    onClose();
    const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : "";
    if (hash && window.location.pathname === "/") {
      // Let the overlay release scroll lock before jumping.
      window.setTimeout(() => {
        scrollToHash(hash);
        history.replaceState(null, "", hash);
      }, 350);
    } else {
      window.location.href = href;
    }
  };

  return (
    <AnimatePresence onExitComplete={() => setQuery("")}>
      {open && (
        <>
          <motion.div
            key="search-overlay"
            className="fixed inset-0 z-[60] bg-[#0d0533]/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            key="search-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            data-lenis-prevent
            className="fixed inset-x-0 top-0 z-[70] max-h-dvh overflow-y-auto bg-brand-night text-white"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="mx-auto max-w-[960px] px-5 pb-10 pt-20 sm:px-10 sm:pb-14 sm:pt-20">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20 sm:right-8 sm:top-8"
              >
                <X className="size-6" strokeWidth={1.75} />
              </button>

              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (results[0]) go(results[0].href);
                }}
                className="flex items-center gap-4 border-b border-white/30 pb-4 focus-within:border-white"
              >
                <Search className="size-6 shrink-0 opacity-70 sm:size-7" strokeWidth={1.5} />
                <label htmlFor="site-search" className="sr-only">
                  Search
                </label>
                <input
                  id="site-search"
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  autoComplete="off"
                  className="w-full bg-transparent text-2xl tracking-tight placeholder:text-white/40 focus:outline-none sm:text-[2.25rem]"
                />
              </form>

              <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular"}
              </p>
              <ul className="divide-y divide-white/10">
                {results.map((r, i) => (
                  <motion.li
                    key={`${r.hint}-${r.label}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.03, duration: 0.5, ease: EASE }}
                  >
                    <button
                      type="button"
                      onClick={() => go(r.href)}
                      className="group flex w-full items-center justify-between gap-4 py-3.5 text-left"
                    >
                      <span className="text-lg sm:text-xl">{r.label}</span>
                      <span className="flex items-center gap-3 text-sm text-white/60">
                        {r.hint}
                        <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </button>
                  </motion.li>
                ))}
                {query && results.length === 0 && (
                  <li className="py-4 text-white/70">
                    Nothing matched “{query}”. Try “cloud”, “AI” or “healthcare”.
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
