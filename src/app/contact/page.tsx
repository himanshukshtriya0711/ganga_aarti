import { PageTransition } from "@/components/fx/PageTransition";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { AartiCountdown } from "@/components/home/AartiCountdown";
import { Mandala } from "@/components/illustrations";
import { Accordion } from "@/components/shared/Accordion";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { PageHero } from "@/components/shared/PageHero";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Plan your Ganga Aarti, wedding, puja or Kashi Darshan tour — call, WhatsApp or send us an enquiry.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "Call us", value: site.phone, href: site.phoneHref, Icon: Phone, external: false },
  { label: "WhatsApp", value: "Chat instantly", href: whatsappLink(), Icon: WhatsappIcon, external: true },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail, external: false },
  {
    label: "Visit us",
    value: "Dashashwamedh Ghat",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    Icon: MapPin,
    external: true,
  },
];

const faqs = [
  {
    q: "What time does the evening Ganga Aarti start?",
    a: "The Sandhya Aarti at Dashashwamedh begins shortly after sunset — around 6:45–7:15 PM in summer and 5:45–6:15 PM in winter. The live timer on this page estimates today's timing from the sunset in Kashi.",
  },
  {
    q: "Can we watch the Aarti from a boat?",
    a: "Yes — and it is the best view. We arrange shared or private boats that anchor right in front of the ghat, with a guide who explains each part of the ritual.",
  },
  {
    q: "How early should we book a wedding on the ghats?",
    a: "For ghat-side weddings we recommend 2–4 months in advance, especially during the winter wedding season and auspicious muhurats, so we can secure permissions, priests and décor.",
  },
  {
    q: "Do you provide puja samagri and priests?",
    a: "Every puja package includes a learned acharya, complete samagri, seating and dakshina guidance. Just tell us the puja and your preferred date.",
  },
  {
    q: "Can you customise a Kashi Darshan itinerary?",
    a: "Absolutely. Tell us your days, pace and interests — temples, food walks, Sarnath, silk weaving — and we will design a tour around you.",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        crumb="Contact"
        eyebrow="We're listening"
        title="Let's Plan Your Journey"
        subtitle="Call, WhatsApp or send an enquiry — our team usually replies within a few hours."
        video="/media/video/ghats-night.mp4"
        poster="/media/video/ghats-night.jpg"
      />

      <section className="relative z-10 -mt-6 px-5 sm:px-8">
        <Stagger className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, value, href, Icon, external }) => (
            <StaggerItem key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-white bg-white/90 p-5 shadow-soft backdrop-blur transition duration-500 hover:-translate-y-1.5 hover:shadow-card"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-saffron-50 text-saffron transition duration-500 group-hover:bg-saffron group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-[0.16em] text-muted uppercase">{label}</span>
                  <span className="mt-0.5 block truncate text-sm font-semibold text-ink">{value}</span>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="enquiry" className="relative overflow-hidden py-20 sm:py-24">
        <Mandala className="pointer-events-none absolute top-10 -left-40 w-[420px] opacity-20" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <h2 className="font-serif text-4xl font-medium text-ink sm:text-[42px]">
              <SplitWords text="Plan Your Experience" />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-3 text-sm text-muted">Fill in the details and we will get back to you shortly.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 rounded-3xl border border-white bg-white/70 p-5 shadow-soft backdrop-blur sm:p-7">
              <EnquiryForm />
            </Reveal>
          </div>

          <Reveal delay={0.2} x={30} y={0} className="space-y-5 lg:pt-24">
            <AartiCountdown variant="panel" />
            <div className="rounded-2xl border border-line bg-white/70 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-ink">
                <Clock className="size-4 text-saffron" /> Office hours
              </h3>
              <p className="mt-2 text-sm text-muted">{site.hours}</p>
              <p className="mt-1 text-sm text-muted">Emergency & same-day bookings on WhatsApp.</p>
            </div>
            <div className="rounded-2xl border border-line bg-white/70 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-ink">
                <MapPin className="size-4 text-saffron" /> Find us
              </h3>
              <p className="mt-2 text-sm text-muted">{site.address}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 sm:px-8">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border-[6px] border-white shadow-card">
          <iframe
            title="Map to Dashashwamedh Ghat, Varanasi"
            src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
            className="block h-[380px] w-full bg-sand sepia-[0.35] saturate-[0.9] transition duration-700 hover:sepia-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQ" title="Questions pilgrims often ask" subtitle="Can't find your answer? Ask us on WhatsApp — we reply fast." />
          <Reveal delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
