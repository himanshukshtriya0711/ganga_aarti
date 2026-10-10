"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Diya } from "@/components/ui/Diya";

const UP = "M0 6 Q5 0 10 6 Q15 0 20 6";
const DOWN = "M0 3 Q5 9 10 6 Q15 9 20 3";

const flock = [
  { x: 40, y: 40, s: 1.1, d: 0 },
  { x: 90, y: 18, s: 0.8, d: 0.3 },
  { x: 130, y: 52, s: 0.65, d: 0.15 },
  { x: 175, y: 28, s: 0.9, d: 0.45 },
  { x: 230, y: 8, s: 0.55, d: 0.6 },
  { x: 8, y: 70, s: 0.6, d: 0.2 },
];

export function Birds({ className, color = "#1b2e38" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 260 90" className={className} aria-hidden overflow="visible">
      <motion.g animate={{ x: [0, 24, 0], y: [0, -6, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}>
        {flock.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.s})`}>
            <motion.path
              d={UP}
              animate={{ d: [UP, DOWN, UP] }}
              transition={{ duration: 0.9 + i * 0.07, repeat: Infinity, delay: b.d, ease: "easeInOut" }}
              stroke={color}
              strokeWidth={1.8}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

const templePaths = [
  // ghat steps
  "M10 262 H510", "M24 272 H496", "M40 282 H480",
  // main shikhara temple
  "M262 262 V204 H338 V262", "M256 204 H344",
  "M266 204 C270 150 288 104 300 74 C312 104 330 150 334 204",
  "M274 180 C285 176 315 176 326 180", "M279 156 C289 152 311 152 321 156", "M285 132 C292 129 308 129 315 132", "M291 108 C296 106 304 106 309 108",
  "M300 74 V58", "M300 58 L314 62 L300 66",
  "M284 262 V232 Q300 214 316 232 V262",
  // side temple
  "M384 262 V218 H436 V262", "M380 218 H440",
  "M388 218 C392 186 402 160 410 140 C418 160 428 186 432 218",
  "M394 196 C404 193 416 193 426 196", "M399 174 C406 172 414 172 421 174",
  "M410 140 V128",
  // palace block
  "M110 262 V170 H226 V262", "M104 170 H232",
  "M126 170 Q138 148 150 170", "M186 170 Q198 148 210 170",
  "M128 200 V186 Q134 178 140 186 V200", "M156 200 V186 Q162 178 168 186 V200", "M184 200 V186 Q190 178 196 186 V200",
  "M128 236 V222 Q134 214 140 222 V236", "M156 236 V222 Q162 214 168 222 V236", "M184 236 V222 Q190 214 196 222 V236",
  // chhatri umbrellas on the ghat
  "M60 262 V240", "M40 242 Q60 226 80 242 Z",
  "M470 262 V242", "M452 244 Q470 230 488 244 Z",
  // water ripples
  "M70 294 H130", "M180 296 H260", "M320 293 H390", "M430 297 H470",
];

/** Line-art ghat skyline that draws itself when scrolled into view (CSS dash animation, see .sketch). */
export function TempleSketch({ className, color = "#b9b2a6" }: { className?: string; color?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const drawn = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg ref={ref} viewBox="0 0 520 310" className={`sketch ${drawn ? "is-drawn" : ""} ${className ?? ""}`} aria-hidden fill="none">
      {templePaths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke={color}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transitionDelay: `${i * 35}ms` }}
        />
      ))}
    </svg>
  );
}

/** Slowly rotating line mandala. */
export function Mandala({ className, color = "#e2582b" }: { className?: string; color?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const small = Array.from({ length: 32 }, (_, i) => i * 11.25);
  return (
    <svg viewBox="0 0 200 200" className={`animate-spin-slow ${className ?? ""}`} aria-hidden fill="none" stroke={color} strokeWidth={0.8}>
      <circle cx="100" cy="100" r="96" strokeDasharray="1 4" />
      <circle cx="100" cy="100" r="88" />
      {small.map((a) => (
        <path key={`s${a}`} d="M100 12 Q104 20 100 28 Q96 20 100 12Z" transform={`rotate(${a} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="70" />
      {petals.map((a) => (
        <path key={`p${a}`} d="M100 30 C112 48 112 62 100 74 C88 62 88 48 100 30Z" transform={`rotate(${a} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="24" />
      {petals.map((a) => (
        <circle key={`d${a}`} cx="100" cy="82" r="1.6" fill={color} transform={`rotate(${a} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="8" />
    </svg>
  );
}

/** Evening ghat scene for the enquiry section: sun, skyline, boat and floating diyas. */
export function GhatScene({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`} aria-hidden>
      <motion.div
        className="absolute top-[8%] left-1/2 aspect-square w-[58%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,#f9d3b1,#f3b88c_60%,#efa877)]"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <Birds className="absolute top-[6%] right-[8%] w-[34%]" color="#3a4a52" />
      <Mandala className="absolute top-0 left-[6%] w-[22%] opacity-40" color="#c9471c" />
      <TempleSketch className="absolute bottom-[22%] left-0 w-full" color="#9aa1a3" />

      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-b from-transparent to-[#efe5d6]" />
      {/* boat silhouette */}
      <div className="absolute bottom-[8%] left-1/2 w-[62%] -translate-x-1/2 animate-bob">
        <svg viewBox="0 0 300 110" className="w-full" fill="#1d2a30">
          <path d="M150 6 V70" stroke="#1d2a30" strokeWidth="2" />
          <path d="M20 72 H286 Q268 102 222 106 H76 Q36 100 20 72Z" />
          {[60, 96, 132, 168, 204].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={48 - (i % 2) * 2} r="7" />
              <path d={`M${x - 10} 74 Q${x - 11} 56 ${x} 56 Q${x + 11} 56 ${x + 10} 74Z`} />
            </g>
          ))}
          <circle cx="250" cy="34" r="7" />
          <path d="M240 74 Q238 42 250 42 Q262 42 260 74Z" />
          <path d="M256 46 L292 104" stroke="#1d2a30" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 300 20" className="-mt-1 w-full opacity-40">
          <motion.path
            d="M30 8 Q60 2 90 8 T150 8 T210 8 T270 8"
            stroke="#1d2a30"
            strokeWidth="1.5"
            fill="none"
            animate={{ x: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      {/* floating diyas */}
      {[
        { l: "12%", b: "6%", d: 0 },
        { l: "80%", b: "4%", d: 1.2 },
        { l: "70%", b: "14%", d: 0.6 },
        { l: "24%", b: "15%", d: 1.8 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-8 sm:w-10"
          style={{ left: p.l, bottom: p.b }}
          animate={{ y: [0, -5, 0], x: [0, 8, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: p.d }}
        >
          <Diya className="w-full" />
        </motion.div>
      ))}
    </div>
  );
}
