import { PageTransition } from "@/components/fx/PageTransition";
import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { Mandala } from "@/components/illustrations";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { TeamCard } from "@/components/team/TeamCard";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadership, site, team, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the acharyas, planners, guides and boatmen behind every Ganga Aarti Event & Tours experience.",
  alternates: { canonical: "/team" },
};

const crafts = ["Vedic Acharyas", "Aarti Performers", "Wedding Planners", "Banarasi Décor Artisans", "Heritage Guides", "Boatmen", "Photographers", "Guest Relations"];

export default function TeamPage() {
  return (
    <PageTransition>
      <PageHero
        crumb="Our Team"
        eyebrow="The people of Kashi"
        title="Hands Behind Every Ritual"
        subtitle="Priests, planners, storytellers and boatmen — a family that turns your visit into a memory."
        video="/media/video/aarti-stage.mp4"
        poster="/media/video/aarti-stage.jpg"
      />

      <section className="relative overflow-hidden py-20 sm:py-24">
        <Mandala className="pointer-events-none absolute -top-20 -right-32 w-[420px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Leadership"
            title="Guided by tradition"
            subtitle="Three people who carry the spirit of Kashi into everything we plan."
          />
          <Stagger className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((m) => (
              <TeamCard key={m.name} member={m} large />
            ))}
          </Stagger>
        </div>
      </section>

      {/* crafts marquee */}
      <section className="overflow-hidden border-y border-line bg-paper py-6" aria-label="Our crafts">
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
          {[...crafts, ...crafts].map((c, i) => (
            <span key={i} className="flex items-center gap-10 font-serif text-2xl whitespace-nowrap text-ink/80 italic sm:text-3xl">
              {c}
              <span className="font-deva text-xl text-saffron not-italic">ॐ</span>
            </span>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading align="center" eyebrow="Our family" title="The team on the ghats" subtitle="Hover over a portrait to meet them." />
          <Stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-5 sm:px-8">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl border border-saffron/20 bg-saffron-50 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
          <div>
            <h2 className="font-serif text-3xl text-ink">Want to join our family?</h2>
            <p className="mt-2 text-sm text-muted">We are always looking for guides, planners and artisans who love Kashi as much as we do.</p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Joining the team")}`}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              <Mail className="size-4" /> Email us
            </a>
            <a
              href={whatsappLink("Namaste! I'd like to join the Ganga Aarti team.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              <WhatsappIcon className="size-4" /> WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <CtaBand title="Meet Us on the Ghats" />
    </PageTransition>
  );
}
