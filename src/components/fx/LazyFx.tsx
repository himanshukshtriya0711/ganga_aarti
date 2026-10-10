"use client";

import dynamic from "next/dynamic";

// Purely decorative, client-only effects: split into their own chunks and loaded after
// the page is interactive, so they never delay the first paint or hydration.
const EmberField = dynamic(() => import("./EmberField").then((m) => m.EmberField), { ssr: false });
const SmoothScroll = dynamic(() => import("./SmoothScroll").then((m) => m.SmoothScroll), { ssr: false });

export function LazyFx() {
  return (
    <>
      <EmberField />
      <SmoothScroll />
    </>
  );
}
