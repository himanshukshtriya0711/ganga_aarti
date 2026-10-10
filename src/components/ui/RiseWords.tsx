import type { CSSProperties } from "react";

/** Headline words rising out of a mask — pure CSS (see .rise-word) so they paint before hydration. */
export function RiseWords({ text, start = 0, className }: { text: string; start?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="rise-word" style={{ "--d": `${start + i * 0.08}s` } as CSSProperties}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
