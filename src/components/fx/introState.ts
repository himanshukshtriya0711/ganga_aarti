"use client";

import { useSyncExternalStore } from "react";

const EVENT = "ga:intro-done";

declare global {
  interface Window {
    __gaIntroDone?: boolean;
  }
}

/** Called once the intro starts revealing the page (or was skipped). */
export function markIntroDone() {
  if (window.__gaIntroDone) return;
  window.__gaIntroDone = true;
  // Releases the CSS-driven hero animations that wait on html[data-intro="playing"].
  if (document.documentElement.dataset.intro === "playing") document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(EVENT));
}

/** True when the inline head script decided to skip the intro. */
export const introSkipped = () => document.documentElement.dataset.intro === "skip";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

/** True once the page is visible — entrance animations wait for this. */
export function useIntroDone() {
  return useSyncExternalStore(
    subscribe,
    () => Boolean(window.__gaIntroDone) || introSkipped(),
    () => false,
  );
}
