"use client";

import { AnimatePresence, motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Diya } from "@/components/ui/Diya";
import { site } from "@/data/site";
import { formatIstTime, isTomorrowIst, nextAarti, splitDuration } from "@/lib/aarti-times";
import { useNow } from "@/lib/useNow";

const pad = (n: number) => String(n).padStart(2, "0");

const styles = {
  card: {
    box: "border border-white bg-white/80 p-3.5 pr-5 shadow-soft backdrop-blur",
    icon: "size-12 bg-saffron-50",
    diya: "w-9",
    label: "text-saffron",
    title: "text-ink",
    sub: "text-muted",
    digits: "text-xl text-ink",
    colon: "text-saffron",
  },
  glass: {
    box: "border border-white/20 bg-white/10 p-3.5 pr-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl",
    icon: "size-12 bg-white/15",
    diya: "w-9",
    label: "text-gold",
    title: "text-white",
    sub: "text-white/65",
    digits: "text-xl text-white",
    colon: "text-gold",
  },
  panel: {
    box: "bg-navy p-6 text-white",
    icon: "size-16 bg-white/10",
    diya: "w-12",
    label: "text-gold",
    title: "text-white",
    sub: "text-white/60",
    digits: "text-3xl text-white",
    colon: "text-gold",
  },
};

/** Live countdown to the next Aarti in Kashi, estimated from today's sunrise/sunset. */
export function AartiCountdown({ variant = "card" }: { variant?: keyof typeof styles }) {
  const now = useNow();

  const info = now ? nextAarti(now) : null;
  const left = info && now ? splitDuration((info.live ? info.slot.end : info.slot.start).valueOf() - now.valueOf()) : null;
  const day = info && now ? (isTomorrowIst(info.slot.start, now) ? "Tomorrow" : "Today") : "";

  const st = styles[variant];

  return (
    <div
      className={`relative flex flex-wrap items-center gap-x-4 gap-y-2 overflow-hidden rounded-2xl ${st.box}`}
      aria-live="polite"
    >
      <div className={`grid shrink-0 place-items-center rounded-xl ${st.icon}`}>
        <Diya className={st.diya} />
      </div>
      <div className="min-w-[12rem] flex-1">
        <p className={`flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] uppercase ${st.label}`}>
          {info?.live ? (
            <>
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              Live now on the ghats
            </>
          ) : (
            <>Next Aarti · {day || "…"}</>
          )}
        </p>
        <p className={`mt-0.5 truncate text-sm font-semibold ${st.title}`}>
          {info ? `${info.slot.name} · ${formatIstTime(info.slot.start)}` : "Calculating today’s timings…"}
        </p>
        <p className={`truncate text-xs ${st.sub}`}>
          {info ? `${info.slot.place} · ${info.live ? "ends in" : "begins in"}` : "Based on sunset in Kashi"}
        </p>
      </div>
      <div className={`ml-auto flex items-baseline gap-0.5 font-serif tabular-nums ${st.digits}`}>
        {(left ? [left.h, left.m, left.s] : [0, 0, 0]).map((v, i) => (
          <span key={i} className="flex items-baseline">
            {i > 0 && <span className={`px-0.5 ${st.colon}`}>:</span>}
            <span className="relative inline-block overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={v}
                  className="inline-block"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {left ? pad(v) : "--"}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        ))}
      </div>
      {info?.live && (
        <a
          href={site.liveStreamUrl}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition hover:bg-red-600"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-white" />
          Watch the Aarti live
          <ExternalLink className="size-3.5" />
        </a>
      )}
      {variant === "panel" && (
        <p className="absolute right-6 bottom-2 text-[10px] text-white/40">Approx. · varies with sunset</p>
      )}
    </div>
  );
}
