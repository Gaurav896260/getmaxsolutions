"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { PRIMARY_NAV, SECONDARY_NAV, SITE } from "@/lib/site";
import { useDialog } from "./useDialog";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  useDialog(open, onClose, panelRef);

  const list = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <AnimatePresence onExitComplete={() => setExpanded(null)}>
      {open && (
        <>
          <motion.div
            key="menu-overlay"
            className="fixed inset-0 z-[60] bg-[#0d0533]/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            key="menu-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col bg-lilac text-ink sm:w-[440px] lg:w-[500px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-4 top-4 z-10 grid size-14 place-items-center rounded-full bg-lilac text-ink shadow-[0_8px_30px_rgba(26,12,94,0.18)] transition-transform hover:rotate-90 sm:right-auto sm:left-0 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:size-16"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            >
              <X className="size-5 sm:size-6" strokeWidth={1.75} />
            </motion.button>

            <nav
              aria-label="Primary"
            data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-8 pb-12 pt-20 sm:px-14 sm:pt-24"
            >
              <motion.p
                className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                Menu
              </motion.p>

              <motion.ul variants={list} initial="hidden" animate="show">
                {PRIMARY_NAV.map((link) => {
                  const isOpen = expanded === link.label;
                  return (
                    <motion.li key={link.label} variants={item}>
                      <div className="flex items-center justify-between">
                        <a
                          href={link.href}
                          onClick={onClose}
                          className="py-2 text-[1.6rem] leading-tight tracking-tight transition-colors hover:text-brand sm:text-[1.9rem]"
                        >
                          {link.label}
                        </a>
                        {link.children && (
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={`${isOpen ? "Collapse" : "Expand"} ${link.label}`}
                            onClick={() => setExpanded(isOpen ? null : link.label)}
                            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-ink/5"
                          >
                            <Plus
                              className={`size-6 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                              strokeWidth={1.5}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && link.children && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="flex flex-col gap-1 overflow-hidden pl-1"
                          >
                              {link.children.map((child) => (
                                <li key={child.label} className="first:pt-1 last:pb-4">
                                  <a
                                    href={child.href}
                                    onClick={onClose}
                                    className="inline-block py-1 text-base text-ink/75 transition-colors hover:text-brand"
                                  >
                                    {child.label}
                                  </a>
                                </li>
                              ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}

                <motion.li variants={item} aria-hidden className="my-6 h-px bg-ink/15" />

                {SECONDARY_NAV.map((link) => (
                  <motion.li key={link.label} variants={item}>
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="inline-block py-2 text-[1.6rem] leading-tight tracking-tight transition-colors hover:text-brand sm:text-[1.9rem]"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}

                <motion.li variants={item} aria-hidden className="my-6 h-px bg-ink/15" />

                <motion.li
                  variants={item}
                  className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm"
                >
                  <a href={`mailto:${SITE.email}`} className="hover:text-brand">
                    {SITE.email}
                  </a>
                  <a href="#contact" onClick={onClose} className="hover:text-brand">
                    Start a project
                  </a>
                </motion.li>
              </motion.ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
