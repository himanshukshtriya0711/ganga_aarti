"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Gem, Headset, Landmark, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Mandala, TempleSketch } from "@/components/illustrations";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/ui/Reveal";

const features = [
  { label: "Authentic & Traditional", Icon: Landmark },
  { label: "Experienced & Professional Team", Icon: Users },
  { label: "Customized Packages", Icon: Gem },
  { label: "Complete Support", Icon: Headset },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const topY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bottomY = useTransform(scrollYProgress, [0, 1], [50, -40]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [-5, 2]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-cream via-sand/50 to-cream py-20 sm:py-28">
      <TempleSketch className="pointer-events-none absolute right-[-4%] bottom-0 w-[620px] max-w-[80%] opacity-70" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-5 sm:px-8 lg:grid-cols-2">
        {/* collage */}
        <div className="relative h-[380px] sm:h-[540px]">
          <Mandala className="absolute bottom-[-6%] left-[-8%] w-[46%] opacity-50" />
          <motion.div style={{ y: topY }} className="absolute top-0 left-0 w-[86%]">
            <motion.div
              style={{ rotate: frameRotate }}
              className="absolute -top-3 -right-3 h-full w-full rounded-[22px] border-2 border-saffron"
            />
            <div className="relative aspect-[16/10.5] overflow-hidden rounded-[20px] shadow-card">
              <Image
                src="/media/img/boats-sunrise.jpg"
                alt="Boats resting on the Ganges at sunrise"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="animate-kenburns object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            style={{ y: bottomY }}
            className="absolute right-[4%] bottom-0 w-[50%] overflow-hidden rounded-[20px] border-[6px] border-cream shadow-card"
          >
            <div className="relative aspect-[4/3.4]">
              <Image src="/media/img/puja-diyas.jpg" alt="Diyas glowing on a puja plate" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </motion.div>
        </div>

        {/* copy */}
        <div className="relative">
          <h2 className="font-serif text-4xl leading-[1.12] font-medium text-ink sm:text-[44px]">
            <SplitWords text="An Experience" />
            <br />
            <SplitWords text="Beyond a Destination" delay={0.15} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
              From the mesmerizing Ganga Aarti to sacred rituals, from grand wedding celebrations to soulful Kashi darshan — we
              bring you closer to the divine side of Varanasi.
            </p>
          </Reveal>
          <Stagger className="mt-8 space-y-4">
            {features.map(({ label, Icon }) => (
              <StaggerItem key={label} className="group flex items-center gap-4">
                <span className="grid size-10 place-items-center rounded-full bg-saffron-50 text-saffron ring-1 ring-saffron/20 transition duration-500 group-hover:rotate-[360deg] group-hover:bg-saffron group-hover:text-white">
                  <Icon className="size-[18px]" strokeWidth={1.7} />
                </span>
                <span className="text-[15px] font-medium text-ink">{label}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3}>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-ink"
            >
              Learn More
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
