import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Mandala } from "@/components/illustrations";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packages } from "@/data/site";

export function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden py-20 sm:py-24">
      <Mandala className="pointer-events-none absolute -top-32 -left-32 w-[420px] opacity-15" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Packages"
          title="Choose your experience"
          subtitle="Transparent starting prices. Every package can be tailored to your date, group and budget."
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <StaggerItem key={p.name} className={p.popular ? "lg:-mt-4" : ""}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-1.5 ${
                  p.popular
                    ? "bg-navy text-white shadow-[0_30px_60px_-30px_rgba(21,51,63,0.8)] lg:pb-11"
                    : "border border-line bg-white/80 text-ink shadow-soft backdrop-blur hover:shadow-card"
                }`}
              >
                {p.popular && (
                  <>
                    <span className="absolute -top-16 -right-16 size-44 rounded-full bg-saffron/25 blur-2xl" />
                    <span className="relative mb-4 inline-flex w-fit items-center gap-1 rounded-full bg-gold px-3 py-1 text-[10.5px] font-semibold tracking-wider text-ink uppercase">
                      <Sparkles className="size-3" /> Most loved
                    </span>
                  </>
                )}
                <h3 className="relative font-serif text-2xl">{p.name}</h3>
                <p className={`relative mt-2 text-[13.5px] leading-relaxed ${p.popular ? "text-white/70" : "text-muted"}`}>{p.tagline}</p>

                <div className="relative mt-6 flex items-baseline gap-2">
                  {p.price !== null ? (
                    <>
                      <span className={`text-xs ${p.popular ? "text-white/60" : "text-muted"}`}>from</span>
                      <span className={`font-serif text-4xl ${p.popular ? "text-gold" : "text-saffron"}`}>
                        ₹{p.price.toLocaleString("en-IN")}
                      </span>
                    </>
                  ) : (
                    <span className={`font-serif text-3xl ${p.popular ? "text-gold" : "text-saffron"}`}>On request</span>
                  )}
                </div>
                <p className={`relative text-xs ${p.popular ? "text-white/55" : "text-muted"}`}>{p.unit}</p>

                <ul className={`relative mt-6 flex-1 space-y-3 border-t pt-6 text-[13.5px] ${p.popular ? "border-white/10" : "border-line"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span
                        className={`mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full ${
                          p.popular ? "bg-gold/20 text-gold" : "bg-saffron-50 text-saffron"
                        }`}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className={p.popular ? "text-white/85" : "text-ink/85"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?service=${p.service}#enquiry`}
                  className={`relative mt-7 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                    p.popular
                      ? "bg-saffron text-white shadow-[0_14px_30px_-12px_rgba(226,88,43,0.9)] hover:bg-saffron-600"
                      : "border border-line text-ink hover:border-saffron hover:bg-saffron hover:text-white"
                  }`}
                >
                  {p.price !== null ? "Book this" : "Get a quote"}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-xs text-muted">
            Indicative starting prices. Final quotes depend on date, season and group size — festival dates book out early.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
