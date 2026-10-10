"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { useIntroDone } from "@/components/fx/introState";
import { useSound } from "@/components/fx/Sound";
import { Birds } from "@/components/illustrations";
import { TornEdge } from "@/components/shared/PageHero";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { RiseWords } from "@/components/ui/RiseWords";
import { VideoModal } from "@/components/ui/VideoModal";
import { AartiCountdown } from "./AartiCountdown";

const tags = ["Ganga Aarti", "Events", "Puja", "Kashi Darshan"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const { play } = useSound();
  const [videoOpen, setVideoOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // CSS entrance (see .rise-in) so these paint before hydration; held while the intro plays.
  const appear = (delay: number) => ({ style: { "--d": `${delay}s` } as CSSProperties });

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#1a120c]">
      {/* Full-bleed Banaras film: the first frame paints instantly, the video fades in over it */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <div className="hero-zoom absolute inset-0">
          <Image
            src="/media/video/hero-landing.jpg"
            alt="The ghats of Banaras in golden light"
            fill
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          <AutoVideo
            src="/media/video/hero-landing.mp4"
            fadeIn
            className="absolute inset-0 size-full object-cover"
            label="Banaras — the ghats at sunrise, a boat on the river, and the evening Ganga Aarti"
          />
        </div>
      </motion.div>
      {/* Legibility washes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#120c08]/85 via-[#120c08]/45 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#120c08]/55 via-transparent to-[#120c08]/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(242,165,65,0.25),transparent_55%)] mix-blend-screen" />

      <motion.div
        className="absolute top-[16%] right-[8%] w-[26%] min-w-40"
        initial={{ opacity: 0, x: -30 }}
        animate={ready ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 2, delay: 0.8 }}
      >
        <Birds className="w-full" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-32 sm:px-8 lg:pt-28">
        <div className="max-w-2xl">
          <p {...appear(0.1)} className="rise-in flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-gold uppercase">
            <span className="h-px w-8 bg-gold" />
            Varanasi · Kashi · Banaras
          </p>
          <h1 className="mt-5 font-serif text-[46px] leading-[1.05] font-medium text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] sm:text-6xl xl:text-[76px]">
            <RiseWords text="Discover the" />
            <br />
            <RiseWords text="Spiritual Soul" start={0.2} className="text-[#ff8a5c]" />
            <br />
            <RiseWords text="of Kashi" start={0.4} className="text-[#ff8a5c]" />
          </h1>

          <p {...appear(0.7)} className="rise-in mt-6 flex flex-wrap items-center gap-x-2.5 text-[15px] font-medium text-white/90">
            {tags.map((t, i) => (
              <span key={t} className="flex items-center gap-2.5">
                {i > 0 && <span className="text-saffron">|</span>}
                {t}
              </span>
            ))}
          </p>
          <p {...appear(0.8)} className="rise-in mt-1.5 text-[15px] text-white/70">
            Authentic Experiences, Beautifully Curated.
          </p>

          <div {...appear(0.95)} className="rise-in mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact#enquiry"
              className="group relative overflow-hidden rounded-full bg-saffron px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(226,88,43,0.9)] transition hover:-translate-y-0.5"
            >
              <span className="relative z-10">Book Your Experience</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setVideoOpen(true);
                play();
              }}
              className="group flex items-center gap-3 rounded-full border border-white/25 bg-white/10 py-2 pr-6 pl-2 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <span className="relative grid size-10 place-items-center rounded-full bg-white text-ink">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                <Play className="relative size-4 translate-x-[1px] fill-current" />
              </span>
              Explore Now
            </button>
          </div>

          <div {...appear(1.15)} className="rise-in mt-10 max-w-md">
            <AartiCountdown variant="glass" />
          </div>
        </div>
      </motion.div>

      <motion.p
        className="absolute right-6 bottom-20 hidden rotate-[-7deg] text-right font-script text-3xl leading-[0.95] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:right-12 sm:bottom-24 sm:block sm:text-[42px]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={ready ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{ duration: 1.6, delay: 1.4, ease: "easeInOut" }}
      >
        Varanasi
        <br />
        <span className="pl-6">Beyond Ordinary</span>
      </motion.p>

      <TornEdge />

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src="/media/video/aarti-stage.mp4"
        poster="/media/video/aarti-stage.jpg"
        title="The evening Ganga Aarti at Dashashwamedh Ghat"
      />
    </section>
  );
}
