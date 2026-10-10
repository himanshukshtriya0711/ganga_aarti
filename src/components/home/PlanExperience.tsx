import { GhatScene } from "@/components/illustrations";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { Reveal, SplitWords } from "@/components/ui/Reveal";

export function PlanExperience() {
  return (
    <section id="plan" className="relative overflow-hidden bg-gradient-to-b from-cream to-sand py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10">
          <h2 className="font-serif text-4xl font-medium text-ink sm:text-[42px]">
            <SplitWords text="Plan Your Experience" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-3 text-sm text-muted">Fill in the details and we will get back to you shortly.</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 rounded-3xl border border-white bg-white/60 p-5 shadow-soft backdrop-blur-sm sm:p-7">
            <EnquiryForm />
          </Reveal>
        </div>
        <GhatScene className="aspect-[1/0.9] w-full lg:aspect-auto lg:h-[540px]" />
      </div>
    </section>
  );
}
