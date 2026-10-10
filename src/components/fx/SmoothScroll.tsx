"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * Buttery wheel scrolling on desktop (touch keeps native scrolling).
 * Pauses whenever something locks the page by setting `overflow: hidden`
 * on <html> (intro, menus, modals, lightbox).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: -96 },
      stopInertiaOnNavigate: true,
      virtualScroll: () => document.documentElement.style.overflow !== "hidden",
      // Let nested scrollers (gallery track, credits list, modals) scroll on their own.
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null || node.classList.contains("no-scrollbar"),
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
