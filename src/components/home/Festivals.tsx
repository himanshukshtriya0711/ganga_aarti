"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarDays, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Reveal, SplitWords } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { festivals, type Festival } from "@/data/site";
import { useNow } from "@/lib/useNow";

const dayMs = 86_400_000;
const startOf = (f: Festival) => Date.parse(`${f.date}T00:00:00+05:30`);
const formatDate = (f: Festival) =>
  f.dateLabel ??
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" }).format(startOf(f));

/** Photo first (instant), then the festival's video fades in over it once it can play. */
function FeaturedMedia({ festival }: { festival: Festival }) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image src={festival.image} alt={festival.name} fill sizes="(min-width: 1024px) 58vw, 100vw" className="animate-kenburns object-cover" />
      {festival.video && (
        <video
          src={festival.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 size-full object-cover object-[50%_68%] transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        />
      )}
      {festival.video && playing && (
        <span className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10.5px] font-semibold tracking-wider text-white backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> HD
        </span>
      )}
    </motion.div>
  );
}

/** Festivals of Kashi: pick one on the right and its video plays in the panel on the left. */
export function Festivals() {
  const now = useNow(60_000);
  const [selected, setSelected] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Before hydration every festival is listed; the clock then drops the ones that have passed.
  const upcoming = now ? festivals.filter((f) => startOf(f) + dayMs > now.valueOf()) : festivals;
  if (upcoming.length === 0) return null;
  const next = upcoming[0];
  const active = upcoming.find((f) => f.name === selected) ?? next;
  const days = now ? Math.max(0, Math.ceil((startOf(active) - now.valueOf()) / dayMs)) : null;

  const choose = (f: Festival) => {
    setSelected(f.name);
    // On stacked (mobile) layouts, bring the panel into view so the video is seen.
    if (panel.current && window.innerWidth < 1024) panel.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="festivals" className="relative overflow-hidden bg-[#120c08] py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(226,88,43,0.25),transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow light>Festival calendar</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl font-medium sm:text-[44px]">
              <SplitWords text="Kashi's sacred seasons" />
            </h2>
          </div>
          <Reveal y={10}>
            <p className="max-w-sm text-sm text-white/65">Tap a festival to see it come alive. Dates sell out months ahead — reserve early.</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* featured panel */}
          <Reveal className="relative min-h-[440px] overflow-hidden rounded-[28px]">
            <div ref={panel} className="absolute inset-0">
              <AnimatePresence initial={false}>
                <FeaturedMedia key={active.name} festival={active} />
              </AnimatePresence>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120c08] via-[#120c08]/45 to-[#120c08]/5" />
            <div className="relative flex h-full min-h-[440px] flex-col justify-end p-7 sm:p-9">
              <span className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
                <CalendarDays className="size-3.5 text-gold" /> {active === next ? "Next up" : "Coming up"} · {formatDate(active)}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-deva text-2xl text-gold">{active.hindi}</p>
                  <h3 className="mt-1 font-serif text-4xl sm:text-5xl">{active.name}</h3>
                  <p className="mt-3 max-w-md text-sm text-white/80">{active.blurb}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl text-white tabular-nums">{days ?? "–"}</span>
                  <span className="text-sm text-white/65">{days === 0 ? "Today!" : days === 1 ? "day to go" : "days to go"}</span>
                </div>
                <Link
                  href="/contact?service=special#enquiry"
                  className="group inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-saffron-600"
                >
                  Book for {active.name} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* festival picker */}
          <ul className="grid content-start gap-3" aria-label="Choose a festival">
            {upcoming.slice(0, 6).map((f, i) => {
              const isActive = f.name === active.name;
              return (
                <Reveal as="li" key={f.name} delay={0.06 * i} x={20} y={0}>
                  <button
                    type="button"
                    onClick={() => choose(f)}
                    aria-pressed={isActive}
                    className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-3 pr-5 text-left transition ${
                      isActive ? "border-gold/60 bg-white/[0.1]" : "border-white/10 bg-white/[0.04] hover:border-gold/40 hover:bg-white/[0.08]"
                    }`}
                  >
                    {isActive && <motion.span layoutId="festival-active" className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-gold" />}
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={f.image} alt="" fill sizes="64px" className="object-cover transition duration-700 group-hover:scale-110" />
                      {f.video && (
                        <span className="absolute inset-0 grid place-items-center bg-black/25">
                          <span className="grid size-6 place-items-center rounded-full bg-white/90 text-ink">
                            <Play className="size-3 translate-x-[1px] fill-current" />
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-lg leading-tight">{f.name}</p>
                      <p className="truncate text-xs text-white/55">{f.blurb}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-semibold text-gold">{formatDate(f).replace(/ \d{4}$/, "")}</p>
                      <p className="font-deva text-xs text-white/45">{f.hindi}</p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <p className="mt-6 text-xs text-white/40">Dates follow the Varanasi panchang and can shift by a day — we confirm muhurat timings when you book.</p>
      </div>
    </section>
  );
}
