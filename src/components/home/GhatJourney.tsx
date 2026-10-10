"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ghats, type Ghat } from "@/data/site";

/**
 * "84 Ghats" — the section pins while vertical scroll drifts a row of ghats
 * sideways, like watching them pass from a boat. A little boat tracks progress.
 */
export function GhatJourney() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDistance(Math.max(0, el.scrollWidth - window.innerWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(progress, (v) => -v * distance);
  const boatLeft = useTransform(progress, (v) => `calc(${v * 100}% - ${v * 44}px)`);

  return (
    <section ref={section} className="relative bg-cream" style={{ height: `${ghats.length * 65 + 60}vh` }} aria-label="A boat ride past the ghats of Kashi">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between gap-6 px-5 sm:px-8">
          <div>
            <Eyebrow>The 84 Ghats</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-[44px]">Drift with us along the Ganga</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted md:block">Keep scrolling — from Assi in the south to Panchganga in the north, the way our boats glide at dawn.</p>
        </div>

        <motion.div ref={track} style={{ x }} className="flex w-max gap-5 px-5 will-change-transform sm:gap-7 sm:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {ghats.map((g, i) => (
            <GhatCard key={g.name} ghat={g} index={i} progress={progress} />
          ))}
        </motion.div>

        {/* river progress with a drifting boat */}
        <div className="mx-auto mt-10 w-full max-w-7xl px-5 sm:px-8">
          <div className="relative h-10">
            <svg className="absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2" preserveAspectRatio="none" viewBox="0 0 400 16" aria-hidden>
              <path d="M0 8 Q 25 2 50 8 T 100 8 T 150 8 T 200 8 T 250 8 T 300 8 T 350 8 T 400 8" fill="none" stroke="#4d8e9e" strokeOpacity=".45" strokeWidth="2" />
            </svg>
            {ghats.map((g, i) => (
              <span
                key={g.name}
                className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/50"
                style={{ left: `${(i / (ghats.length - 1)) * 100}%` }}
                title={g.name}
              />
            ))}
            <motion.div style={{ left: boatLeft }} className="absolute top-1/2 w-11 -translate-y-[70%]">
              <svg viewBox="0 0 44 24" className="w-full animate-bob" aria-hidden>
                <path d="M2 14h40q-4 8-12 9H14Q6 22 2 14Z" fill="#c9471c" />
                <path d="M22 3v11" stroke="#1b2e38" strokeWidth="1.6" />
                <path d="M22 3l9 8h-9Z" fill="#f2a541" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GhatCard({ ghat, index, progress }: { ghat: Ghat; index: number; progress: MotionValue<number> }) {
  // Each photo drifts slightly against the track for depth.
  const imgX = useTransform(progress, [0, 1], ["6%", "-6%"]);
  return (
    <article className="group relative h-[58svh] max-h-[520px] min-h-[340px] w-[78vw] shrink-0 overflow-hidden rounded-[28px] shadow-card sm:w-[420px]">
      <motion.div style={{ x: imgX }} className="absolute -inset-x-[8%] inset-y-0">
        <Image
          src={ghat.image}
          alt={ghat.name}
          fill
          sizes="(min-width: 640px) 460px, 85vw"
          className="object-cover transition duration-[1.2s] group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#120c08]/90 via-[#120c08]/25 to-[#120c08]/35" />
      <span className="absolute top-5 left-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-serif text-sm text-white backdrop-blur">
        {String(index + 1).padStart(2, "0")} / {String(ghats.length).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="font-deva text-lg text-gold">{ghat.hindi}</p>
        <h3 className="mt-0.5 font-serif text-3xl">{ghat.name}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{ghat.story}</p>
      </div>
    </article>
  );
}
