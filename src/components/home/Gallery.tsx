"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { Reveal, SplitWords } from "@/components/ui/Reveal";
import { gallery, galleryCategories, type GalleryItem } from "@/data/site";

type Filter = (typeof galleryCategories)[number];

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);

  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setPages(Math.max(1, Math.ceil((el.scrollWidth - 4) / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    // Only reset when the track is actually scrolled (never on first load).
    if (track.current && track.current.scrollLeft > 0) track.current.scrollTo({ left: 0 });
    const t = setTimeout(measure, 450);
    return () => clearTimeout(t);
  }, [filter, measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h2 className="font-serif text-4xl font-medium text-ink sm:text-[44px]">
            <SplitWords text="Gallery" />
          </h2>
          <Reveal y={10} delay={0.2}>
            <p className="text-sm text-muted">Moments from Our Spiritual Journeys</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Filter gallery">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full px-5 py-2 text-[13px] font-medium transition ${
                  filter === c ? "text-white" : "border border-line bg-white text-ink hover:border-saffron hover:text-saffron"
                }`}
              >
                {filter === c && (
                  <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-saffron" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1400px]">
        <div
          ref={track}
          onScroll={measure}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => {
              const index = gallery.indexOf(item);
              return (
                <motion.button
                  layout
                  key={item.src}
                  type="button"
                  onClick={() => setLightbox(index)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative h-[260px] shrink-0 snap-start overflow-hidden rounded-2xl bg-sand shadow-soft sm:h-[300px] ${
                    item.tall ? "w-[200px] sm:w-[220px]" : "w-[300px] sm:w-[380px]"
                  }`}
                  aria-label={`Open: ${item.alt}`}
                >
                  <Image src={item.src} alt={item.alt} fill sizes="380px" className="object-cover transition duration-700 group-hover:scale-110" />
                  {item.video && (
                    <AutoVideo src={item.video} fadeIn className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 translate-y-3 text-left opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block text-[10.5px] font-semibold tracking-[0.2em] text-gold uppercase">{item.category}</span>
                    <span className="mt-1 block text-[13px] leading-snug text-white">{item.alt}</span>
                  </span>
                  {item.video && (
                    <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
                      <Play className="size-3 fill-current" /> Video
                    </span>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="absolute top-[130px] left-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:bg-saffron hover:text-white sm:top-[150px] sm:left-4"
          aria-label="Previous photos"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="absolute top-[130px] right-2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:bg-saffron hover:text-white sm:top-[150px] sm:right-4"
          aria-label="Next photos"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
          {Array.from({ length: pages }, (_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === page ? "w-6 bg-saffron" : "w-1.5 bg-stone/50"}`} />
          ))}
        </div>
      </div>

      <Lightbox items={gallery} index={lightbox} onChange={setLightbox} />
    </section>
  );
}

function Lightbox({ items, index, onChange }: { items: GalleryItem[]; index: number | null; onChange: (i: number | null) => void }) {
  const open = index !== null;
  const go = useCallback(
    (d: number) => index !== null && onChange((index + d + items.length) % items.length),
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, go, onChange]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#0d0907]/95 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.src}
              className="relative h-[72vh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              {item.video ? (
                <video src={item.video} poster={item.src} className="size-full object-contain" autoPlay muted loop playsInline controls />
              ) : (
                <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
              )}
            </motion.div>
          </AnimatePresence>
          <p className="mt-5 max-w-xl text-center text-sm text-white/80">
            <span className="mr-2 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">{item.category}</span>
            {item.alt}
          </p>
          {[
            { d: -1, Icon: ChevronLeft, cls: "left-3 sm:left-8", label: "Previous" },
            { d: 1, Icon: ChevronRight, cls: "right-3 sm:right-8", label: "Next" },
          ].map(({ d, Icon, cls, label }) => (
            <button
              key={d}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(d);
              }}
              className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-saffron ${cls}`}
              aria-label={label}
            >
              <Icon className="size-6" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white text-ink transition hover:rotate-90"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
