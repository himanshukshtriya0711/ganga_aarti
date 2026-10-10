"use client";

import { useSyncExternalStore } from "react";

/** Live result of a CSS media query; `serverValue` is used for prerender and hydration. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (cb) => {
      const mql = matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => serverValue,
  );
}
