import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials, type Testimonial } from "@/data/site";

// Sample entries are a design preview only — they never ship in a production build.
const showSamples = process.env.NODE_ENV !== "production";
const items = testimonials.filter((t) => !t.sample || showSamples);

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="relative w-[320px] shrink-0 rounded-3xl border border-line bg-white/85 p-6 shadow-soft backdrop-blur sm:w-[380px]">
      {t.sample && (
        <span className="absolute top-4 right-4 rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-semibold text-red-700">
          SAMPLE — replace before launch
        </span>
      )}
      <Quote className="size-7 text-saffron/40" />
      <blockquote className="mt-3 text-[14px] leading-relaxed text-ink/85">“{t.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-saffron to-gold font-serif text-white">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">{t.name}</span>
          <span className="block text-xs text-muted">
            {t.place} · {t.service}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ list, reverse = false }: { list: Testimonial[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={`flex w-max animate-marquee gap-5 py-2 pr-5 group-hover:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {[...list, ...list].map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  if (items.length === 0) return null;
  const half = Math.ceil(items.length / 2);
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading align="center" eyebrow="Guest stories" title="Words from our yatris" />
      </div>
      <div className="mt-12 space-y-5">
        <Row list={items.slice(0, half)} />
        {items.length > 2 && <Row list={items.slice(half)} reverse />}
      </div>
    </section>
  );
}
