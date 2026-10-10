"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { Reveal, Stagger, staggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type Service } from "@/data/site";

function ServiceCard({ service }: { service: Service }) {
  const video = useRef<HTMLVideoElement>(null);
  const title = service.title;

  return (
    <motion.div variants={staggerItem}>
      <Link
        href={`/contact?service=${service.slug}#enquiry`}
        className="group relative block overflow-hidden rounded-[18px] bg-white shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgba(27,46,56,0.55)]"
        onMouseEnter={() => video.current?.play().catch(() => {})}
        onMouseLeave={() => {
          if (!video.current) return;
          video.current.pause();
          video.current.currentTime = 0;
        }}
      >
        <div className="relative aspect-[4/3.6] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-[1.2s] ease-out group-hover:scale-110"
          />
          {service.video && (
            <AutoVideo
              ref={video}
              mode="manual"
              src={service.video}
              className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <p className="absolute inset-x-5 bottom-10 translate-y-4 text-[12.5px] leading-relaxed text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {service.description}
          </p>
        </div>
        <div className="relative -mt-5 flex items-center justify-between gap-3 rounded-t-[18px] bg-white px-5 pt-5 pb-5">
          <h3 className="max-w-[9rem] text-[15px] leading-snug font-semibold text-ink">{title}</h3>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition duration-500 group-hover:rotate-[-45deg] group-hover:border-saffron group-hover:bg-saffron group-hover:text-white">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Explore our offerings" title="Our Services" />
          <Reveal y={12}>
            <Link href="/about#what-we-do" className="group flex items-center gap-2 text-sm font-semibold text-ink">
              View All Services
              <ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-saffron" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
