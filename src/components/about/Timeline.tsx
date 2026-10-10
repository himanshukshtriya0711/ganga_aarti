"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

// Placeholder milestones — replace with the real company history.
const milestones = [
  { year: "2012", title: "A family of ghat hosts", text: "Started by welcoming pilgrims for the evening Aarti from our family's boat at Dashashwamedh." },
  { year: "2015", title: "Pujas & sanskars", text: "Partnered with Vedic acharyas to offer Rudrabhishek, Pind Daan and Havan with complete samagri." },
  { year: "2018", title: "First ghat-side wedding", text: "Hosted our first destination wedding on the ghats — 300 guests, one unforgettable sunset." },
  { year: "2022", title: "Kashi Darshan tours", text: "Launched storyteller-led heritage walks, sunrise boat rides and Sarnath day trips." },
  { year: "Today", title: "Guests from 30+ countries", text: "A team of priests, planners, guides and boatmen — one promise: authentic Kashi, beautifully curated." },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-4xl">
      <div className="absolute top-0 bottom-0 left-5 w-px bg-line sm:left-1/2" />
      <motion.div style={{ scaleY }} className="absolute top-0 bottom-0 left-5 w-[2px] origin-top bg-gradient-to-b from-saffron to-gold sm:left-1/2 sm:-ml-px" />
      <ol className="space-y-12">
        {milestones.map((m, i) => {
          const right = i % 2 === 1;
          return (
            <li key={m.year} className="relative grid pl-14 sm:grid-cols-2 sm:pl-0">
              <motion.span
                className="absolute top-1 left-5 z-10 grid size-5 -translate-x-1/2 place-items-center rounded-full bg-cream ring-2 ring-saffron sm:left-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <span className="size-2 rounded-full bg-saffron" />
              </motion.span>
              <Reveal x={right ? 30 : -30} y={0} className={right ? "sm:col-start-2 sm:pl-12" : "sm:pr-12 sm:text-right"}>
                <span className="font-serif text-3xl text-saffron italic">{m.year}</span>
                <h3 className="mt-1 text-lg font-semibold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
