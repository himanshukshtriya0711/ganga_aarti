"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useIntroDone } from "./introState";

type SoundCtx = { playing: boolean; play: () => void; toggle: () => void };
const Ctx = createContext<SoundCtx>({ playing: false, play: () => {}, toggle: () => {} });
export const useSound = () => useContext(Ctx);

const SRC = "/media/audio/aarti-ambient.mp3";
const VOLUME = 0.5;

export function SoundProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const raf = useRef(0);
  const [playing, setPlaying] = useState(false);

  const fadeTo = useCallback((a: HTMLAudioElement, target: number, ms: number, done?: () => void) => {
    cancelAnimationFrame(raf.current);
    const from = a.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      a.volume = from + (target - from) * p;
      if (p < 1) raf.current = requestAnimationFrame(step);
      else done?.();
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    if (!audio.current) {
      audio.current = new Audio(SRC);
      audio.current.loop = true;
      audio.current.volume = 0;
    }
    const a = audio.current;
    a.play()
      .then(() => {
        setPlaying(true);
        fadeTo(a, VOLUME, 1800);
      })
      .catch(() => setPlaying(false));
  }, [fadeTo]);

  const pause = useCallback(() => {
    const a = audio.current;
    setPlaying(false);
    if (a) fadeTo(a, 0, 600, () => a.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);

  // Go quiet when the tab is hidden.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && playing) pause();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playing, pause]);

  return <Ctx.Provider value={{ playing, play, toggle }}>{children}</Ctx.Provider>;
}

export function SoundToggle() {
  const { playing, toggle } = useSound();
  const [hint, setHint] = useState(false);
  const introDone = useIntroDone();

  useEffect(() => {
    if (!introDone) return;
    try {
      if (sessionStorage.getItem("ga-sound-hint")) return;
      sessionStorage.setItem("ga-sound-hint", "1");
    } catch {}
    const t1 = setTimeout(() => setHint(true), 2400);
    const t2 = setTimeout(() => setHint(false), 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [introDone]);

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      <button
        type="button"
        onClick={() => {
          setHint(false);
          toggle();
        }}
        aria-pressed={playing}
        aria-label={playing ? "Mute Aarti ambience" : "Play Aarti ambience"}
        className="group relative grid size-13 place-items-center rounded-full bg-navy text-white shadow-card ring-4 ring-white/70 transition hover:scale-105"
      >
        {playing && <span className="absolute inset-0 animate-ping rounded-full bg-saffron/30" />}
        <span className="relative flex h-5 items-end gap-[3px]">
          {[0.9, 0.5, 1, 0.65].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gold"
              animate={playing ? { height: ["30%", `${h * 100}%`, "45%", `${h * 80}%`, "30%"] } : { height: "22%" }}
              transition={playing ? { duration: 1.1 + i * 0.15, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
              style={{ height: "22%" }}
            />
          ))}
        </span>
      </button>
      <AnimatePresence>
        {hint && !playing && (
          <motion.button
            type="button"
            onClick={() => {
              setHint(false);
              toggle();
            }}
            initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -10 }}
            className="rounded-full bg-white/95 px-4 py-2 text-left text-xs font-medium text-ink shadow-soft backdrop-blur"
          >
            <span className="font-deva text-saffron">ॐ</span> Feel the Aarti — tap for sound
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
