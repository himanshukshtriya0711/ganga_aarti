"use client";

import { useSyncExternalStore } from "react";

type Store = { subscribe: (cb: () => void) => () => void; snapshot: () => number };
const stores = new Map<number, Store>();

// One shared clock store per tick interval; the server snapshot is 0 (time unknown).
function clock(intervalMs: number): Store {
  let store = stores.get(intervalMs);
  if (!store) {
    store = {
      subscribe: (cb) => {
        const id = setInterval(cb, intervalMs);
        return () => clearInterval(id);
      },
      snapshot: () => Math.floor(Date.now() / intervalMs) * intervalMs,
    };
    stores.set(intervalMs, store);
  }
  return store;
}

/**
 * Current time on the client, re-rendering once per `intervalMs` (default: every second);
 * null during prerender and hydration. Use a coarse interval for day-level countdowns.
 */
export function useNow(intervalMs = 1000) {
  const { subscribe, snapshot } = clock(intervalMs);
  const t = useSyncExternalStore(subscribe, snapshot, () => 0);
  return t ? new Date(t) : null;
}
