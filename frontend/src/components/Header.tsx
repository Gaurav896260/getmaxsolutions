"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { PRIMARY_NAV, SECONDARY_NAV } from "@/lib/site";
import Logo from "./Logo";
import MenuDrawer from "./MenuDrawer";
import SearchOverlay from "./SearchOverlay";

const EASE = [0.16, 1, 0.3, 1] as const;
const COLLAPSE_AT = 80;

function CompactBar({
  onMenu,
  onSearch,
}: {
  onMenu: () => void;
  onSearch: () => void;
}) {
  return (
    <div className="flex items-stretch bg-brand text-white ring-1 ring-white/15 shadow-[0_10px_30px_-10px_rgba(30,11,120,0.55)]">
      <button
        type="button"
        onClick={onMenu}
        aria-haspopup="dialog"
        className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium transition-colors hover:bg-white/10 sm:px-4"
      >
        <Menu className="size-4" strokeWidth={1.75} />
        Menu
      </button>
      <span aria-hidden className="my-2.5 w-px bg-white/30" />
      <button
        type="button"
        onClick={onSearch}
        aria-haspopup="dialog"
        aria-label="Search"
        className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-medium transition-colors hover:bg-white/10 sm:px-4"
      >
        <Search className="size-4" strokeWidth={1.75} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
}

// alwaysCompact: for pages without the purple hero, where the expanded white
// link grid would be unreadable.
export default function Header({ alwaysCompact = false }: { alwaysCompact?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  // Logo hides while scrolling down and returns on scroll up (or near the top).
  const [logoVisible, setLogoVisible] = useState(true);
  const compact = alwaysCompact || scrolled;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > COLLAPSE_AT);
      if (y <= COLLAPSE_AT) setLogoVisible(true);
      else if (Math.abs(y - lastY) > 6) setLogoVisible(y < lastY);
      lastY = y;
      // Which section sits under the logo? Sections declare data-header-theme.
      const probe = 40;
      let theme = "dark";
      for (const el of document.querySelectorAll<HTMLElement>("[data-header-theme]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) theme = el.dataset.headerTheme ?? theme;
      }
      setOnDark(theme === "dark");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⌘K / Ctrl+K opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openMenu = () => setMenuOpen(true);
  const openSearch = () => setSearchOpen(true);

  const desktopLinks = [...PRIMARY_NAV, ...SECONDARY_NAV];

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="flex items-start justify-between p-3 sm:p-4">
          {/* Logo: no background; purple over light sections, white over purple ones */}
          <motion.div
            initial={false}
            animate={{ opacity: logoVisible ? 1 : 0, y: logoVisible ? 0 : -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={logoVisible ? "pointer-events-auto" : "pointer-events-none"}
          >
            <Link
              href="/"
              aria-label="Getmax Solutions — home"
              className="block px-3 py-2.5 sm:px-3.5 sm:py-3"
            >
              <Logo white={onDark} priority className="w-[78px] sm:w-[88px]" />
            </Link>
          </motion.div>

          {/* Mobile / tablet: always the compact bar */}
          <div className="pointer-events-auto lg:hidden">
            <CompactBar onMenu={openMenu} onSearch={openSearch} />
          </div>

          {/* Desktop: full link grid on the hero, collapses into Menu | Search */}
          <div className="pointer-events-auto hidden lg:block">
            <AnimatePresence mode="wait" initial={false}>
              {compact ? (
                <motion.div
                  key="compact"
                  initial={{ clipPath: "inset(0 0 0 100%)", opacity: 0.6 }}
                  animate={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
                  exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0.6 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <CompactBar onMenu={openMenu} onSearch={openSearch} />
                </motion.div>
              ) : (
                <motion.nav
                  key="expanded"
                  aria-label="Main"
                  className="flex items-start gap-12 pr-2 pt-2.5 text-white"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.035 } },
                    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                  }}
                >
                  <ul className="grid grid-flow-col grid-rows-4 gap-x-14 gap-y-3">
                    {desktopLinks.map((link) => (
                      <motion.li
                        key={link.label}
                        variants={{
                          hidden: { opacity: 0, y: -10 },
                          show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                          exit: { opacity: 0, x: 24, transition: { duration: 0.25 } },
                        }}
                      >
                        <a
                          href={link.href}
                          className="text-[13.5px] font-bold uppercase tracking-[0.16em] opacity-90 transition-opacity hover:opacity-100 hover:underline hover:underline-offset-8"
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    type="button"
                    onClick={openSearch}
                    aria-label="Search"
                    className="-mt-1.5 grid size-9 place-items-center rounded-full transition-colors hover:bg-white/10"
                    variants={{
                      hidden: { opacity: 0, scale: 0.6 },
                      show: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 0.6 },
                    }}
                  >
                    <Search className="size-5" strokeWidth={1.75} />
                  </motion.button>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <MenuDrawer open={menuOpen} onClose={closeMenu} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
