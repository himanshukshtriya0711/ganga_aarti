"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { Mandala } from "@/components/illustrations";
import { staggerItem } from "@/components/ui/Reveal";
import type { TeamMember } from "@/data/site";

/** Temple-arch portrait card that tilts toward the cursor and reveals a bio on hover. */
export function TeamCard({ member, large = false }: { member: TeamMember; large?: boolean }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.35), transparent 55%)`;

  return (
    <motion.div variants={staggerItem} style={{ perspective: 900 }}>
      <motion.article
        className="group relative"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        <div
          className={`relative overflow-hidden rounded-t-[999px] rounded-b-3xl bg-gradient-to-br ${member.tone} shadow-card ${
            large ? "aspect-[4/5]" : "aspect-[3/4]"
          }`}
        >
          <Mandala className="absolute top-[12%] left-1/2 w-[85%] -translate-x-1/2 opacity-30" color="#fff" />
          <span
            className={`absolute inset-0 grid place-items-center font-serif text-white/95 transition duration-500 group-hover:scale-90 group-hover:opacity-0 ${
              large ? "text-7xl" : "text-6xl"
            }`}
            style={{ transform: "translateZ(40px)" }}
          >
            {member.initials}
          </span>
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/95 via-ink/85 to-ink/0 p-6 pt-14 transition duration-500 group-hover:translate-y-0">
            <p className="text-sm leading-relaxed text-white/90">{member.bio}</p>
          </div>
          <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: glow }} />
          <div className="pointer-events-none absolute inset-2 rounded-t-[999px] rounded-b-[20px] border border-white/30" />
        </div>
        <div className="mt-5 text-center" style={{ transform: "translateZ(20px)" }}>
          <h3 className={`font-serif text-ink ${large ? "text-2xl" : "text-xl"}`}>{member.name}</h3>
          <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-saffron uppercase">{member.role}</p>
        </div>
      </motion.article>
    </motion.div>
  );
}
