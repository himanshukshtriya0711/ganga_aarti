import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Caveat, Playfair_Display, Poppins, Tiro_Devanagari_Hindi } from "next/font/google";
import { CinematicIntro, introSkipScript } from "@/components/fx/CinematicIntro";
import { LazyFx } from "@/components/fx/LazyFx";
import { SoundProvider, SoundToggle } from "@/components/fx/Sound";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { InlineScript } from "@/components/ui/InlineScript";
import { site } from "@/data/site";
import "./globals.css";

// Only the weights the UI uses; Playfair and Caveat are variable fonts (one file covers every weight).
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Decorative fonts: not preloaded, so they never compete with the first paint.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  preload: false,
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ganga Aarti Event & Tours — Discover the Spiritual Soul of Kashi",
    template: "%s · Ganga Aarti Event & Tours",
  },
  description: site.description,
  keywords: ["Ganga Aarti booking", "Varanasi wedding", "Kashi Darshan tour", "puja in Varanasi", "Dashashwamedh Ghat"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ganga Aarti Event & Tours",
    description: site.description,
    siteName: "Ganga Aarti Event & Tours",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// Structured data so search engines can show the business with address, hours and contact.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Ganga Aarti Event & Tours",
  description: site.description,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/media/logo/logo-full.png`,
  telephone: site.phone.replace(/\s/g, ""),
  email: site.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dashashwamedh Ghat",
    addressLocality: "Varanasi",
    addressRegion: "Uttar Pradesh",
    postalCode: "221001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "05:00",
    closes: "21:00",
  },
  areaServed: "Varanasi",
  sameAs: Object.values(site.socials),
};

export const viewport: Viewport = {
  themeColor: "#f7f2ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${playfair.variable} ${caveat.variable} ${tiro.variable} antialiased`}
    >
      <head>
        <InlineScript html={introSkipScript} />
        <InlineScript type="application/ld+json" html={JSON.stringify(businessJsonLd).replace(/</g, "\\u003c")} />
      </head>
      <body className="paper-grain flex min-h-dvh flex-col overflow-x-clip">
        <SoundProvider>
          <CinematicIntro />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <LazyFx />
          <SoundToggle />
        </SoundProvider>
        <Analytics />
      </body>
    </html>
  );
}
