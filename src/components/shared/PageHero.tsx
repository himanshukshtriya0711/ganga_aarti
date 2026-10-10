"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { Birds } from "@/components/illustrations";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { RiseWords } from "@/components/ui/RiseWords";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  video,
  poster,
  crumb,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  video: string;
  poster: string;
  crumb: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex h-[72svh] min-h-[480px] items-center justify-center overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        {/* The still paints first (fast LCP); the video fades in over it once it plays */}
        <Image src={poster} alt="" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
        <AutoVideo src={video} fadeIn desktopOnly className="absolute inset-0 size-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0d0907]/75 via-[#0d0907]/50 to-[#0d0907]/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_60%,rgba(226,88,43,0.25),transparent_60%)]" />

      <Birds className="absolute top-[22%] right-[8%] w-48 opacity-80" color="#fff" />

      <motion.div style={{ y: contentY, opacity }} className="px-5 pt-16 text-center">
        <nav aria-label="Breadcrumb" className="rise-in flex items-center justify-center gap-1.5 text-xs text-white/70">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-gold">{crumb}</span>
        </nav>
        <p className="rise-in mt-5 text-[11px] font-semibold tracking-[0.3em] text-gold uppercase" style={{ "--d": "0.1s" } as CSSProperties}>
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] font-medium text-white sm:text-7xl">
          <RiseWords text={title} start={0.15} />
        </h1>
        <p className="rise-in mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/80" style={{ "--d": "0.5s" } as CSSProperties}>
          {subtitle}
        </p>
      </motion.div>

      <TornEdge />
    </section>
  );
}

export function TornEdge() {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-14 w-full sm:h-20" aria-hidden>
      <defs>
        <filter id="torn" x="0" y="-50%" width="100%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.18" numOctaves="3" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <rect x="-40" y="46" width="1520" height="80" fill="#f7f2ea" filter="url(#torn)" />
      <rect x="0" y="80" width="1440" height="10" fill="#f7f2ea" />
    </svg>
  );
}
