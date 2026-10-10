"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Diya } from "@/components/ui/Diya";
import { introSkipped, markIntroDone } from "./introState";
import { useSound } from "./Sound";

const HOLD_MS = 3400;
const noop = () => () => {};
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * First-visit intro: a diya ignites over the Aarti footage, then its light
 * opens a circular window that reveals the site. Skipped before paint (inline
 * script in the root layout) for repeat visits in a session or reduced motion.
 */
export function CinematicIntro() {
  const [done, setDone] = useState(false);
  const skipped = useSyncExternalStore(noop, introSkipped, () => false);
  const radius = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(circle at 50% 42%, transparent ${radius}vmax, #000 calc(${radius}vmax + 1px))`;
  const exiting = useRef(false);
  const { play } = useSound();

  const finish = useCallback(() => {
    document.documentElement.style.overflow = "";
    try {
      sessionStorage.setItem("ga-intro", "1");
    } catch {}
    setDone(true);
  }, []);

  const exit = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;
    markIntroDone();
    animate(radius, 150, { duration: 1.5, ease: [0.65, 0, 0.35, 1], onComplete: finish });
  }, [radius, finish]);

  useEffect(() => {
    if (introSkipped()) {
      markIntroDone();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(exit, HOLD_MS);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [exit]);

  if (done || skipped) return null;

  return (
    <motion.div
      className="intro-overlay fixed inset-0 z-[100] overflow-hidden bg-[#0d0907] text-white"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
      role="dialog"
      aria-label="Welcome to Ganga Aarti Event & Tours"
    >
      {/* A still of the Aarti (not the 3 MB video) — at this opacity and blur it reads the same */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{ opacity: 0.32, scale: 1.05 }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{ filter: "blur(2px) saturate(1.2)" }}
      >
        <Image src="/media/video/aarti-stage.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,transparent_0%,#0d0907_70%)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="relative -mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-[62%] rounded-full bg-[radial-gradient(circle,rgba(255,190,90,0.45),rgba(226,88,43,0.12)_40%,transparent_70%)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.15, 1], opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.6, ease }}
          />
          <motion.div initial={{ filter: "brightness(0.3)" }} animate={{ filter: "brightness(1)" }} transition={{ delay: 0.6, duration: 0.8 }}>
            <Diya className="relative w-36 sm:w-44" />
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-8 font-deva text-3xl text-gold sm:text-5xl"
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(8px)" }}
          animate={{ opacity: 1, letterSpacing: "0.12em", filter: "blur(0px)" }}
          transition={{ delay: 1.2, duration: 1.4, ease }}
        >
          ॥ हर हर गंगे ॥
        </motion.p>
        <motion.p
          className="mt-4 text-[11px] font-medium tracking-[0.45em] text-white/70 uppercase sm:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease }}
        >
          Ganga Aarti · Event &amp; Tours · Kashi
        </motion.p>

        <motion.div
          className="absolute bottom-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <button
            type="button"
            onClick={() => {
              play();
              exit();
            }}
            className="rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 text-xs font-medium tracking-wider text-gold backdrop-blur transition hover:bg-gold hover:text-ink"
          >
            Enter with sound 🔔
          </button>
          <button
            type="button"
            onClick={exit}
            className="rounded-full px-4 py-2.5 text-xs tracking-wider text-white/60 transition hover:text-white"
          >
            Skip intro
          </button>
        </motion.div>

        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-saffron to-gold"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

/** Runs before first paint: skip the intro for repeat visits, reduced motion or small screens. */
// Phones skip it too: a multi-second overlay delays the first meaningful paint on mobile networks.
export const introSkipScript = `try{var d=document.documentElement;if(sessionStorage.getItem("ga-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches||matchMedia("(max-width: 767px)").matches){d.dataset.intro="skip"}else{d.dataset.intro="playing"}}catch(e){}`;
