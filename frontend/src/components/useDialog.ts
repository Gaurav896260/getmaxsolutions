"use client";

import { useEffect, type RefObject } from "react";
import { getLenis } from "@/lib/smoothScroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Shared modal behaviour: Esc to close, page scroll lock, focus trap, focus restore.
export function useDialog(
  open: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    getLenis()?.stop();

    const focusTimer = window.setTimeout(() => {
      const target =
        initialFocusRef?.current ??
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus({ preventScroll: true });
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      getLenis()?.start();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, panelRef, initialFocusRef]);
}
