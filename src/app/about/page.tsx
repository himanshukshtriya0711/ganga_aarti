import { PageTransition } from "@/components/fx/PageTransition";
import { BookOpen, Flame, Flower2, HandHeart, HeartHandshake, Landmark, Moon, Sailboat, ShieldCheck, Sparkles, Users, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Timeline } from "@/components/about/Timeline";
import { Mandala, TempleSketch } from "@/components/illustrations";
import { CtaBand } from "@/components/shared/CtaBand";
import { Counter } from "@/components/shared/Counter";
import { PageHero } from "@/components/shared/PageHero";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Rooted in Kashi, crafted with devotion — the story behind Ganga Aarti Event & Tours.",
  alternates: { canonical: "/about" },
};

// Placeholder figures — replace with real numbers.
const stats = [
  { to: 12, suffix: "+", label: "Years on the ghats" },
  { to: 5000, suffix: "+", label: "Aarti experiences hosted" },
  { to: 800, suffix: "+", label: "Weddings & events" },
  { to: 4.9, decimals: 1, suffix: "★", label: "Average guest rating" },
];

const serviceIcons: Record<string, LucideIcon> = {
  "ganga-aarti-planning": Flame,
  "ganga-aarti-darshan": Sparkles,
  "kashi-darshan": Sailboat,
  "temple-darshan": Landmark,
  "ritualistic-puja": Flower2,
  karmkand: BookOpen,
  "wedding-pandit": HeartHandshake,
  astrology: Moon,
};

const values = [
  { title: "Authentic", text: "Every ritual follows the shastras, performed by acharyas who have lived them for generations.", Icon: Flower2 },
  { title: "Devotion", text: "We treat each booking as seva — your moments are sacred to us, too.", Icon: HandHeart },
  { title: "Hospitality", text: "Atithi Devo Bhava. From pickup to farewell, you are our honoured guest.", Icon: Users },
  { title: "Seamless", text: "Permissions, priests, boats, décor, timings — handled so you can simply be present.", Icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        crumb="About Us"
        eyebrow="Our Story"
        title="Rooted in Kashi"
        subtitle="Crafted with devotion — we bring you closer to the divine side of Varanasi, one sacred moment at a time."
        video="/media/video/boat-ride.mp4"
        poster="/media/video/boat-ride.jpg"
      />

      {/* story */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal x={-30} y={0} className="relative">
            <Mandala className="absolute -top-14 -left-14 w-56 opacity-40" />
            <div className="relative aspect-[4/4.4] overflow-hidden rounded-[28px] shadow-card">
              <Image src="/media/img/aarti-assi-ghat.jpg" alt="Priest performing the Aarti at Assi Ghat" fill sizes="(min-width: 1024px) 45vw, 90vw" className="animate-kenburns object-cover" />
            </div>
            <div className="absolute -right-4 -bottom-8 w-44 rounded-2xl border-[6px] border-cream bg-saffron p-5 text-white shadow-card sm:-right-10">
              <p className="font-serif text-5xl leading-none">12+</p>
              <p className="mt-2 text-xs leading-snug text-white/85">years of hosting pilgrims on the ghats of Kashi</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Who we are" title="Born on the ghats, devoted to Kashi" />
            <Reveal delay={0.15}>
              <p className="mt-6 text-[15px] leading-relaxed text-muted">
                Ganga Aarti Event &amp; Tours began with a simple tradition — our family welcoming pilgrims to witness the evening
                Aarti from our boat. Over the years, that tradition grew into a team of Vedic acharyas, event planners, guides and
                boatmen who share one belief: Kashi should be experienced, not just visited.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Today we curate Aarti bookings, sacred weddings, pujas and Kashi Darshan tours for families and travellers from
                across the world — with the warmth of a local home and the care of a professional team.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <blockquote className="mt-8 border-l-2 border-saffron pl-5 font-serif text-xl text-ink italic">
                “Kashi is not a place you see. It is a place that sees you.”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="px-5 sm:px-8">
        <Stagger className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-white/10 shadow-card lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="bg-navy px-6 py-10 text-center">
              <p className="font-serif text-4xl text-white sm:text-5xl">
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs tracking-wide text-white/60 uppercase">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* what we do */}
      <section id="what-we-do" className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading align="center" eyebrow="What we do" title="Every sacred moment, curated" subtitle="Eight ways we bring the spirit of Kashi to your journey." />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => {
              const Icon = serviceIcons[s.slug] ?? Sparkles;
              return (
                <StaggerItem
                  key={s.title}
                  className="group relative overflow-hidden rounded-3xl border border-line bg-white/70 p-7 backdrop-blur transition duration-500 hover:-translate-y-1.5 hover:border-saffron/40 hover:shadow-card"
                >
                  <span className="absolute -top-10 -right-10 size-32 rounded-full bg-saffron-50 transition-transform duration-700 group-hover:scale-[3]" />
                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl bg-saffron text-white shadow-[0_10px_20px_-8px_rgba(226,88,43,0.8)]">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* video quote */}
      <section className="relative overflow-hidden bg-[#0d0907] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <div className="text-center lg:text-right">
            <p className="font-deva text-4xl text-gold sm:text-5xl">हर हर गंगे</p>
            <p className="mt-3 text-sm tracking-[0.3em] text-white/50 uppercase">Har Har Gange</p>
          </div>
          <Reveal className="mx-auto w-64 sm:w-72">
            <div className="relative aspect-[9/15] overflow-hidden rounded-[999px_999px_28px_28px] border border-gold/30 shadow-[0_0_80px_-10px_rgba(242,165,65,0.45)]">
              <Image src="/media/video/aarti-vertical.jpg" alt="Incense smoke rising during the Ganga Aarti" fill sizes="288px" className="object-cover" />
              <AutoVideo src="/media/video/aarti-vertical.mp4" fadeIn className="absolute inset-0 size-full object-cover" />
            </div>
          </Reveal>
          <div className="text-center lg:text-left">
            <p className="font-serif text-2xl leading-snug text-white/90 italic">
              Every evening, as the conch sounds and a hundred lamps rise together, Kashi bows to the Ganga.
            </p>
            <p className="mt-4 text-sm text-white/50">We make sure you have the best seat for that moment.</p>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <TempleSketch className="pointer-events-none absolute -bottom-6 -left-10 w-[560px] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading align="center" eyebrow="Our values" title="What guides every booking" />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, text, Icon }) => (
              <StaggerItem key={title} className="rounded-3xl bg-white/80 p-7 text-center shadow-soft">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-saffron-50 text-saffron ring-1 ring-saffron/20">
                  <Icon className="size-6" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* journey */}
      <section className="bg-gradient-to-b from-cream via-sand/60 to-cream py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <Eyebrow>Our journey</Eyebrow>
            <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-[44px]">
              <SplitWords text="From one boat to a family of hosts" />
            </h2>
          </div>
          <Timeline />
        </div>
      </section>

      <CtaBand />
    </PageTransition>
  );
}
