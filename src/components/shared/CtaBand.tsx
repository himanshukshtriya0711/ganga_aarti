import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Mandala } from "@/components/illustrations";
import { AutoVideo } from "@/components/ui/AutoVideo";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { Reveal, SplitWords } from "@/components/ui/Reveal";
import { whatsappLink } from "@/data/site";

export function CtaBand({ title = "Let Kashi Welcome You", text }: { title?: string; text?: string }) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-navy px-6 py-16 text-center sm:px-16">
        <Image src="/media/video/ghats-night.jpg" alt="" fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 opacity-30">
          <AutoVideo src="/media/video/ghats-night.mp4" fadeIn desktopOnly className="size-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-navy" />
        <Mandala className="absolute -top-24 -left-24 w-80 opacity-25" color="#f2a541" />
        <Mandala className="absolute -right-24 -bottom-24 w-80 opacity-25" color="#f2a541" />
        <div className="relative">
          <p className="font-deva text-2xl text-gold">॥ स्वागतम् ॥</p>
          <h2 className="mt-3 font-serif text-4xl font-medium text-white sm:text-5xl">
            <SplitWords text={title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
              {text ?? "Tell us what you have in mind — an Aarti by boat, a ghat-side wedding or a family puja — and we will plan every detail."}
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact#enquiry"
              className="group inline-flex items-center gap-2 rounded-full bg-saffron px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-saffron-600"
            >
              Plan Your Experience <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <WhatsappIcon className="size-[18px]" /> WhatsApp Us
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
