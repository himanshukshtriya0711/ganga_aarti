import type { ReactNode } from "react";
import { Reveal, SplitWords } from "./Reveal";

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase ${
        light ? "text-gold" : "text-saffron"
      }`}
    >
      <span className={`h-px w-6 ${light ? "bg-gold" : "bg-saffron"}`} />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      {eyebrow && (
        <Reveal y={12}>
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <h2
        className={`mt-3 font-serif text-4xl leading-[1.1] font-medium sm:text-[44px] ${light ? "text-white" : "text-ink"}`}
      >
        <SplitWords text={title} />
      </h2>
      {subtitle && (
        <Reveal delay={0.15}>
          <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-white/75" : "text-muted"}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
