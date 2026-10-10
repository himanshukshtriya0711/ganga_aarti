"use client";

import { useId } from "react";

/** Clay diya with a flickering flame. The flame flickers with CSS so it works without JS. */
export function Diya({ className = "w-16", lit = true }: { className?: string; lit?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden overflow="visible">
      <defs>
        <radialGradient id={`diya-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity=".9" />
          <stop offset="45%" stopColor="#f2a541" stopOpacity=".35" />
          <stop offset="100%" stopColor="#e2582b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`diya-clay-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9682f" />
          <stop offset="100%" stopColor="#8f3414" />
        </linearGradient>
        <linearGradient id={`diya-flame-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#e2582b" />
          <stop offset="45%" stopColor="#ffb547" />
          <stop offset="100%" stopColor="#fff4cf" />
        </linearGradient>
      </defs>
      {lit && <circle cx="60" cy="34" r="34" fill={`url(#diya-glow-${id})`} />}
      {lit && (
        <g style={{ transformOrigin: "60px 52px" }} className="animate-flicker">
          <path d="M60 18c-7 11-9 19-6 27 2 5 10 5 12 0 3-8 1-16-6-27Z" fill={`url(#diya-flame-${id})`} />
          <path d="M60 32c-3 5-3 9-1.5 12 1 1.5 2 1.5 3 0 1.5-3 1.5-7-1.5-12Z" fill="#fff" opacity=".85" />
        </g>
      )}
      <path d="M58.5 46h3v7h-3z" fill="#3b2316" />
      <path d="M14 52c8 22 26 32 46 32s38-10 46-32c-6 3-14 4-20 4H34c-6 0-14-1-20-4Z" fill={`url(#diya-clay-${id})`} />
      <path d="M14 52c6 3 14 4 20 4h52c6 0 14-1 20-4-3-3-12-4-20-4H34c-8 0-17 1-20 4Z" fill="#f2a541" opacity=".55" />
      <path d="M26 66c10 7 21 10 34 10s24-3 34-10" stroke="#f9c98a" strokeOpacity=".5" strokeWidth="2" fill="none" strokeDasharray="1 5" strokeLinecap="round" />
    </svg>
  );
}
