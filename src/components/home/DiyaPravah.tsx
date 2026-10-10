"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { TempleSketch } from "@/components/illustrations";
import { Diya } from "@/components/ui/Diya";
import { Reveal, SplitWords } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Wish = { id: number; text: string; lane: number };

const ambient = [
  { left: "8%", bottom: "18%", size: "w-7", dur: 14, delay: 0 },
  { left: "30%", bottom: "30%", size: "w-5", dur: 18, delay: 3 },
  { left: "62%", bottom: "24%", size: "w-6", dur: 16, delay: 6 },
  { left: "80%", bottom: "30%", size: "w-4", dur: 20, delay: 2 },
  { left: "46%", bottom: "33%", size: "w-3.5", dur: 22, delay: 8 },
];

/** "Diya Pravah" — write a wish and watch your diya float away on the river. */
export function DiyaPravah() {
  const [text, setText] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [announce, setAnnounce] = useState("");
  const nextId = useRef(0);
  const reduce = useReducedMotion();
  const inputId = useId();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const wish = text.trim();
    if (!wish) return;
    const id = nextId.current++;
    setWishes((w) => [...w.slice(-6), { id, text: wish, lane: id % 3 }]);
    setAnnounce(`Your diya with the wish “${wish}” is floating on the Ganga.`);
    setText("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b1820] via-[#10222b] to-[#120c08] py-20 text-white sm:py-24">
      {/* moon and its reflection */}
      <div className="pointer-events-none absolute top-16 right-[12%] size-24 rounded-full bg-[radial-gradient(circle,#fff7e0,#f5d9a0_60%,transparent_72%)] opacity-80 blur-[1px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow light>Diya Pravah</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl font-medium sm:text-[44px]">
            <SplitWords text="Float a wish on the Ganga" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-4 text-[15px] text-white/70">
              Every evening, thousands of diyas drift down the river carrying prayers. Write yours — and watch it float away.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label htmlFor={inputId} className="sr-only">
              Your wish or prayer
            </label>
            <input
              id={inputId}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={60}
              placeholder="A wish, a prayer, a name…"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white outline-none backdrop-blur placeholder:text-white/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(226,88,43,0.9)] transition hover:-translate-y-0.5 hover:bg-saffron-600 disabled:opacity-50"
              disabled={!text.trim()}
            >
              <Sparkles className="size-4" /> Float my diya
            </button>
          </form>
        </Reveal>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </div>

      {/* the river */}
      <div className="relative mx-auto mt-12 h-[360px] max-w-[1600px] sm:h-[420px]" aria-hidden>
        <TempleSketch className="absolute top-[62%] left-1/2 w-[min(440px,80%)] -translate-x-1/2 -translate-y-[92%] opacity-60" color="#6f8590" />
        <div className="absolute inset-x-0 top-[62%] bottom-0 bg-gradient-to-b from-[#173341]/80 to-transparent" />
        {/* shimmering water lines */}
        {Array.from({ length: 7 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute h-px rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            style={{ top: `${65 + i * 4.6}%`, left: `${10 + ((i * 13) % 50)}%`, width: `${18 + ((i * 7) % 20)}%` }}
            animate={{ x: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ambient diyas already on the water */}
        {ambient.map((a, i) => (
          <motion.div
            key={i}
            className={`absolute ${a.size}`}
            style={{ left: a.left, bottom: a.bottom }}
            animate={reduce ? undefined : { x: [0, 60, 120], opacity: [0, 0.9, 0] }}
            transition={{ duration: a.dur, repeat: Infinity, delay: a.delay, ease: "linear" }}
          >
            <Diya className="w-full" />
          </motion.div>
        ))}

        {/* the visitor's diyas */}
        <AnimatePresence>
          {wishes.map((w) => (
            <motion.div
              key={w.id}
              className="absolute flex flex-col items-center"
              initial={{ left: "50%", bottom: "4%", x: "-50%", scale: 1.25, opacity: 0 }}
              animate={
                reduce
                  ? { opacity: [0, 1, 1, 0] }
                  : {
                      left: ["50%", `${58 + w.lane * 6}%`, `${96 - w.lane * 4}%`],
                      bottom: ["4%", `${14 + w.lane * 4}%`, `${38 + w.lane * 3}%`],
                      scale: [1.25, 0.9, 0.35],
                      opacity: [0, 1, 0],
                    }
              }
              transition={{ duration: reduce ? 6 : 16, ease: "easeInOut", times: reduce ? [0, 0.1, 0.8, 1] : [0, 0.35, 1] }}
              onAnimationComplete={() => setWishes((all) => all.filter((x) => x.id !== w.id))}
            >
              <span className="mb-2 max-w-[220px] truncate rounded-full bg-black/35 px-3 py-1 text-xs text-gold backdrop-blur">{w.text}</span>
              <motion.div animate={{ y: [0, -4, 0], rotate: [-3, 3, -3] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                <Diya className="w-16" />
              </motion.div>
              <span className="mt-1 h-3 w-20 rounded-full bg-gold/30 blur-md" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
