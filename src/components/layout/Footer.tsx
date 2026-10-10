import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { credits, services, site } from "@/data/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "X", href: site.socials.x, Icon: XIcon },
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: site.socials.youtube, Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="relative z-10 isolate overflow-hidden bg-[#120c08] text-white">
      {/* Banaras ghats from the river, under the same warm wash as the hero */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/media/img2/footer.jpg"
          alt=""
          fill
          sizes="100vw"
          className="animate-kenburns object-cover object-[50%_0%]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#120c08]/92 via-[#120c08]/72 to-[#120c08]/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#120c08]/45 via-transparent to-[#120c08]/90" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_30%,rgba(242,165,65,0.22),transparent_55%)] mix-blend-screen" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div>
            <p className="font-deva text-xl text-gold">॥ हर हर महादेव ॥</p>
            <h2 className="mt-2 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">Your journey to the soul of Kashi begins here.</h2>
          </div>
          <Link
            href="/contact#enquiry"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(226,88,43,0.9)] transition hover:-translate-y-0.5 hover:bg-saffron-600"
          >
            Book Your Experience <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pt-12 pb-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo variant="full" />
          <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-white/65">
            Bringing the spiritual essence of Kashi to your special moments.
          </p>
          <ul className="mt-6 flex gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-saffron hover:bg-saffron hover:text-white"
                >
                  <Icon className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-gold">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13.5px] text-white/70 transition hover:pl-1 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-gold">Our Services</h3>
          <ul className="mt-5 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/contact?service=${s.slug}#enquiry`}
                  className="text-[13.5px] text-white/70 transition hover:pl-1 hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact?service=special#enquiry" className="text-[13.5px] text-white/70 transition hover:pl-1 hover:text-white">
                Special Events
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-gold">Contact Us</h3>
          <ul className="mt-5 space-y-4 text-[13.5px] text-white/70">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                <Phone className="size-4 text-gold" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition hover:text-white">
                <Mail className="size-4 text-gold" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 shrink-0 text-gold" /> {site.shortAddress}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-white/50 sm:flex-row sm:px-8">
          <p>© 2026 Ganga Aarti Event. All Rights Reserved.</p>
          <details className="group text-center sm:text-right">
            <summary className="cursor-pointer list-none transition hover:text-gold">Photo &amp; video credits</summary>
            <ul data-lenis-prevent className="mt-3 max-h-56 max-w-xl space-y-1.5 overflow-auto text-left text-[11px] leading-snug">
              {credits.map((c) => (
                <li key={c.url}>
                  <a href={c.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                    {c.title}
                  </a>{" "}
                  — {c.author}, {c.license}, via Wikimedia Commons
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
