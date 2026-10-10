export const site = {
  name: "Ganga Aarti",
  tagline: "Event & Tours",
  description:
    "Ganga Aarti bookings, weddings, puja & rituals and Kashi Darshan tours in Varanasi — authentic experiences, beautifully curated.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  email: "info@gangaaartievent.com",
  address: "Dashashwamedh Ghat, Varanasi, Uttar Pradesh 221001",
  shortAddress: "Varanasi, Uttar Pradesh",
  hours: "Every day · 5:00 AM – 9:00 PM",
  mapQuery: "Dashashwamedh Ghat, Varanasi",
  /** Canonical origin for SEO — set NEXT_PUBLIC_SITE_URL once the domain is live. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gangaaartievent.com").replace(/\/$/, ""),
  geo: { lat: 25.3069, lng: 83.0104 },
  /** Opened by the "Watch live" button while an Aarti is in progress. Replace with your own channel's live URL. */
  liveStreamUrl: "https://www.youtube.com/results?search_query=ganga+aarti+live+varanasi&sp=EgJAAQ%253D%253D",
  socials: {
    facebook: "https://facebook.com",
    x: "https://x.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
};

export function whatsappLink(message?: string) {
  const text = message ?? "Namaste! I would like to plan an experience in Kashi.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Optional loop that plays when the service card is hovered. */
  video?: string;
};

// The services offered on gangaaartievent.com (Event Planning intentionally left out).
export const services: Service[] = [
  {
    slug: "ganga-aarti-planning",
    title: "Ganga Aarti Planning",
    description: "Experience the divine beauty of Ganga Aarti with our expert planning services.",
    image: "/media/img/services/ganga-aarti-planning.jpg",
    video: "/media/video/aarti-stage.mp4",
  },
  {
    slug: "ganga-aarti-darshan",
    title: "Ganga Aarti Darshan",
    description: "Witness the mesmerizing Ganga Aarti ceremony with premium arrangements.",
    image: "/media/img/services/ganga-aarti-darshan.jpg",
    video: "/media/video/ghats-night.mp4",
  },
  {
    slug: "kashi-darshan",
    title: "Kashi Darshan",
    description: "Guided tours to experience the spiritual essence of Kashi.",
    image: "/media/img/services/kashi-darshan.jpg",
    video: "/media/video/boat-ride.mp4",
  },
  {
    slug: "temple-darshan",
    title: "Temple Darshan",
    description: "Sacred temple visits with proper rituals and guidance.",
    image: "/media/img/services/temple-darshan.jpg",
  },
  {
    slug: "ritualistic-puja",
    title: "Ritualistic Puja",
    description: "Traditional puja ceremonies conducted by experienced pandits.",
    image: "/media/img/services/ritualistic-puja.jpg",
  },
  {
    slug: "karmkand",
    title: "Karmkand",
    description: "Complete Vedic rituals and ceremonies for all occasions.",
    image: "/media/img/puja-havan.jpg",
  },
  {
    slug: "wedding-pandit",
    title: "Expert Wedding Pandit",
    description: "Experienced wedding pandits for your special day.",
    image: "/media/img/services/wedding-pandit.jpg",
  },
  {
    slug: "astrology",
    title: "Astrology",
    description: "Expert astrological consultations for auspicious timings and guidance.",
    image: "/media/img/services/astrology.jpg",
  },
];

export type Package = {
  name: string;
  tagline: string;
  /** Starting price in INR; null shows "On request". */
  price: number | null;
  unit: string;
  features: string[];
  service: string;
  popular?: boolean;
};

// Indicative placeholder prices — replace with your real rates before launch.
export const packages: Package[] = [
  {
    name: "Aarti Darshan",
    tagline: "A seat on a shared boat for the evening Aarti",
    price: 799,
    unit: "per person",
    features: ["Shared boat in front of Dashashwamedh", "Guide explains every ritual", "Diya to float on the Ganga", "~1.5 hours"],
    service: "ganga-aarti-darshan",
  },
  {
    name: "Private Aarti Boat",
    tagline: "Your own boat, your own pace — sunset to Aarti",
    price: 3499,
    unit: "per boat · up to 6",
    features: ["Private boat & boatman", "Sunset ride past 20+ ghats", "Front-row anchoring for the Aarti", "Tea, diyas & flowers included"],
    service: "boat",
    popular: true,
  },
  {
    name: "Puja & Sanskar",
    tagline: "Rudrabhishek, Pind Daan, Havan and more",
    price: 5100,
    unit: "onwards",
    features: ["Learned Vedic acharya", "Complete samagri arranged", "Ghat or temple venue", "Muhurat guidance"],
    service: "ritualistic-puja",
  },
  {
    name: "Ghat Wedding",
    tagline: "A sacred wedding on the banks of the Ganga",
    price: null,
    unit: "custom quote",
    features: ["Permissions & venue on the ghat", "Pandits, mandap & décor", "Guest stay & transport", "Dedicated wedding manager"],
    service: "wedding-pandit",
  },
];

export type Testimonial = {
  name: string;
  place: string;
  text: string;
  service: string;
  /** Sample entries render only in development and are hidden in production builds. */
  sample?: boolean;
};

// Add real guest reviews here (e.g. copied from Google with permission) and delete the samples.
export const testimonials: Testimonial[] = [
  { name: "Sample Guest", place: "Mumbai", service: "Private Aarti Boat", text: "Sample review — replace with a real guest's words about their evening on the boat.", sample: true },
  { name: "Sample Guest", place: "Bengaluru", service: "Ghat Wedding", text: "Sample review — replace with a real couple's experience of their wedding on the ghats.", sample: true },
  { name: "Sample Guest", place: "London", service: "Kashi Darshan", text: "Sample review — replace with a real traveller's thoughts on the heritage walk and sunrise ride.", sample: true },
  { name: "Sample Guest", place: "Delhi", service: "Rudrabhishek", text: "Sample review — replace with a real family's words about their puja.", sample: true },
  { name: "Sample Guest", place: "Kolkata", service: "Aarti Darshan", text: "Sample review — replace with a real guest's review of the shared boat experience.", sample: true },
  { name: "Sample Guest", place: "Singapore", service: "Pind Daan", text: "Sample review — replace with a real family's experience of the ritual.", sample: true },
];

export type Festival = {
  name: string;
  hindi: string;
  /** ISO date (IST) used for the countdown. */
  date: string;
  /** Shown instead of the formatted date when panchangs differ. */
  dateLabel?: string;
  blurb: string;
  image: string;
  /** Loop shown in the featured panel when the festival is selected. */
  video?: string;
};

// Dates cross-checked against several panchangs (Oct 2026). Re-verify each year.
export const festivals: Festival[] = [
  { name: "Diwali", hindi: "दीपावली", date: "2026-11-08", blurb: "Lakshmi Puja and lamps on every ghat and lane.", image: "/media/img/puja-diyas.jpg" },
  { name: "Dev Deepawali", hindi: "देव दीपावली", date: "2026-11-24", blurb: "Kartik Purnima — a million diyas light all 84 ghats. Boats sell out months ahead.", image: "/media/img/fest-dev-deepawali.jpg", video: "/media/video/festivals/dev-deepawali.mp4" },
  { name: "Makar Sankranti", hindi: "मकर संक्रांति", date: "2027-01-14", dateLabel: "14–15 Jan 2027", blurb: "Holy dip at sunrise and kites over the river.", image: "/media/img/boats-sunrise.jpg", video: "/media/video/festivals/makar-sankranti.mp4" },
  { name: "Mahashivratri", hindi: "महाशिवरात्रि", date: "2027-03-06", blurb: "The great night of Shiva at Kashi Vishwanath.", image: "/media/img/footer-kashi-vishwanath.jpg", video: "/media/video/festivals/mahashivratri.mp4" },
  { name: "Holi", hindi: "होली", date: "2027-03-22", blurb: "Gulal on the ghats — Banaras celebrates like nowhere else.", image: "/media/img/fest-holi.jpg" },
  { name: "Ganga Dussehra", hindi: "गंगा दशहरा", date: "2027-06-13", blurb: "The day Ganga descended to earth — a grand Aarti on the river.", image: "/media/img/aarti-dashashwamedh.jpg", video: "/media/video/festivals/ganga-dussehra.mp4" },
];

export type Ghat = { name: string; hindi: string; story: string; image: string };

// Upstream (south) to downstream (north), the way a boat drifts past them.
export const ghats: Ghat[] = [
  { name: "Assi Ghat", hindi: "अस्सी घाट", story: "Where the Assi stream meets the Ganga — the city wakes here to the Subah-e-Banaras Aarti.", image: "/media/img/aarti-assi-ghat.jpg" },
  { name: "Kedar Ghat", hindi: "केदार घाट", story: "Painted in red-and-white stripes, home to the Kedareshwar temple of the South Indian pilgrims.", image: "/media/img/ghat-kedar.jpg" },
  { name: "Rana Mahal Ghat", hindi: "राणा महल घाट", story: "Built by the Rana of Udaipur — at dawn, mist and boats turn it into a painting.", image: "/media/img/ghat-rana-mahal.jpg" },
  { name: "Ahilyabai Ghat", hindi: "अहिल्याबाई घाट", story: "Named for Queen Ahilyabai Holkar, who rebuilt much of sacred Kashi in the 18th century.", image: "/media/img/hero-ahilya-ghat.jpg" },
  { name: "Dashashwamedh Ghat", hindi: "दशाश्वमेध घाट", story: "Where Brahma performed ten horse sacrifices — and where the grand evening Aarti rises today.", image: "/media/img/aarti-dashashwamedh.jpg" },
  { name: "Manikarnika Ghat", hindi: "मणिकर्णिका घाट", story: "The eternal flame of moksha — fires that, it is said, have not gone out for thousands of years.", image: "/media/img/ghat-manikarnika.jpg" },
  { name: "Scindia Ghat", hindi: "सिंधिया घाट", story: "Home of the leaning Ratneshwar Mahadev temple, half-sunk in the river for centuries.", image: "/media/img/ghat-scindia.jpg" },
  { name: "Panchganga Ghat", hindi: "पंचगंगा घाट", story: "Where five holy rivers are believed to meet, beneath the minarets of the Alamgir mosque.", image: "/media/img/ghat-panchganga.jpg" },
];

export type GalleryCategory = "Ganga Aarti" | "Wedding" | "Puja" | "Kashi Darshan";
export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  video?: string;
  tall?: boolean;
};

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Ganga Aarti",
  "Wedding",
  "Puja",
  "Kashi Darshan",
];

export const gallery: GalleryItem[] = [
  { src: "/media/img/aarti-dashashwamedh.jpg", alt: "Priests performing the evening Ganga Aarti at Dashashwamedh Ghat", category: "Ganga Aarti" },
  { src: "/media/img/wedding-mandap.jpg", alt: "Floral wedding mandap ready for the ceremony", category: "Wedding", tall: true },
  { src: "/media/img/puja-havan.jpg", alt: "Sacred havan fire during a puja", category: "Puja" },
  { src: "/media/img/boats-sunrise.jpg", alt: "Wooden boats on the Ganges at sunrise", category: "Kashi Darshan" },
  { src: "/media/video/aarti-vertical.jpg", alt: "Incense smoke rising during the Ganga Aarti", category: "Ganga Aarti", video: "/media/video/aarti-vertical.mp4", tall: true },
  { src: "/media/img/wedding-varmala.jpg", alt: "Bride and groom during the varmala ritual", category: "Wedding" },
  { src: "/media/img/aarti-priests-row.jpg", alt: "A row of priests holding flaming lamps", category: "Ganga Aarti" },
  { src: "/media/img/puja-diyas.jpg", alt: "Clay diyas glowing on a puja thali", category: "Puja" },
  { src: "/media/img/boatman.jpg", alt: "A boatman rowing past the ghats", category: "Kashi Darshan" },
  { src: "/media/img/diya-pujan.jpg", alt: "Priest raising a multi-tiered brass lamp", category: "Ganga Aarti", tall: true },
  { src: "/media/img/wedding-kanyadaan.jpg", alt: "Hands joined during the kanyadaan ritual", category: "Wedding" },
  { src: "/media/video/ghats-night.jpg", alt: "The ghats glowing at night, seen from a boat", category: "Kashi Darshan", video: "/media/video/ghats-night.mp4" },
  { src: "/media/img/aarti-assi-flame.jpg", alt: "Aarti at Assi Ghat with a tall flame lamp", category: "Ganga Aarti" },
  { src: "/media/img/ghat-palace.jpg", alt: "Historic palace architecture on the ghats", category: "Kashi Darshan" },
  { src: "/media/img/aarti-lamp.jpg", alt: "Young priest holding the aarti lamp", category: "Puja", tall: true },
  { src: "/media/img/boats-sunset.jpg", alt: "Boats resting on the sand at sunset", category: "Kashi Darshan" },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  tone: string;
};

// Placeholder team — replace names, bios and add real portraits.
export const leadership: TeamMember[] = [
  {
    name: "Aarav Mishra",
    role: "Founder & Experience Curator",
    bio: "Born on the ghats of Kashi, Aarav turned a family tradition of hosting pilgrims into a team that has welcomed guests from over 30 countries.",
    initials: "AM",
    tone: "from-saffron to-gold",
  },
  {
    name: "Acharya Shivnath Tiwari",
    role: "Head Vedic Acharya",
    bio: "A scholar of the Shukla Yajurveda with 25 years of practice, he leads every puja, sanskar and wedding ritual we perform.",
    initials: "ST",
    tone: "from-navy to-teal",
  },
  {
    name: "Meera Pandey",
    role: "Head of Weddings & Events",
    bio: "Meera designs ghat-side ceremonies down to the last marigold — and makes sure every guest feels like family.",
    initials: "MP",
    tone: "from-teal to-saffron",
  },
];

export const team: TeamMember[] = [
  { name: "Rohit Upadhyay", role: "Aarti & Boat Experiences", bio: "Knows every ghat by its story — and the best spot on the river for the evening Aarti.", initials: "RU", tone: "from-saffron to-gold" },
  { name: "Kavya Singh", role: "Guest Relations", bio: "Your first call and your last goodbye — Kavya plans every detail of your stay.", initials: "KS", tone: "from-teal to-navy" },
  { name: "Pt. Anand Shastri", role: "Puja & Sanskar Specialist", bio: "Performs Rudrabhishek, Pind Daan and Havan with traditional precision.", initials: "AS", tone: "from-navy to-saffron" },
  { name: "Imran Ansari", role: "Décor & Banarasi Craft", bio: "Third-generation craftsman behind our mandaps, flower work and silk drapes.", initials: "IA", tone: "from-gold to-saffron" },
  { name: "Neha Gupta", role: "Kashi Darshan Lead Guide", bio: "Historian and storyteller who turns old lanes into living legends.", initials: "NG", tone: "from-teal to-gold" },
  { name: "Sanjay Nishad", role: "Head Boatman", bio: "Has rowed the Ganga since he was twelve — calm waters, safe hands.", initials: "SN", tone: "from-saffron to-navy" },
  { name: "Ritika Jaiswal", role: "Photography & Films", bio: "Captures the glow of the diyas and the emotion of your moments.", initials: "RJ", tone: "from-navy to-teal" },
  { name: "Vikas Yadav", role: "Logistics & Travel", bio: "Airport pickups, hotels and timings — handled quietly in the background.", initials: "VY", tone: "from-gold to-teal" },
];

export const credits = [
  { title: "Ganga aarti (video)", author: "Davide Mauro", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_aarti.webm" },
  { title: "Ganga aarti at Varanasi (video)", author: "Kasyap", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Ganga_aarti_at_Varanasi.webm" },
  { title: "Benaras Ghat (video)", author: "Akankshasharma584", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Benaras_Ghat.webm" },
  { title: "Ganges River in Varanasi by boat (video)", author: "Davide Mauro", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganges_River_in_Varanasi_by_boat.webm" },
  { title: "Ganga Aarti – Sacred Ritual on the Banks of River Ganga 05 (video)", author: "Shoot stufz", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Aarti_-_Sacred_Ritual_on_the_Banks_of_River_Ganga_05.webm" },
  ...[
    ["Ahilya Ghat by the Ganges, Varanasi.jpg", "Ken Wieland", "CC BY-SA 2.0"],
    ["Kedar Ghat on the Ganges, Varanasi.jpg", "J Duval", "CC BY 2.0"],
    ["Manikarnika Ghat 2.jpg", "Heliophilous", "CC BY-SA 4.0"],
    ["Ratneshwar Mahadev Temple, 2019.jpg", "Redeemer", "CC BY-SA 4.0"],
    ["Varanasi 145 Panchaganga ghat and Aurangzeb mosque (34524292510).jpg", "juggadery", "CC BY-SA 2.0"],
    ["Morning at Rana Mahal Ghat, Varanasi.jpg", "Apoorva Prakash", "CC BY-SA 4.0"],
    ["The hues of Holi - HighRes - IMG 5214.jpg", "Shikhers", "CC BY-SA 4.0"],
    ["Ghats of Varanasi Getting ready for Dev Deepawali 03.jpg", "Goutam1962", "CC BY-SA 4.0"],
    ["Benares- The Golden Temple, India, ca. 1915 (IMP-CSCNWW33-OS14-66).jpg", "Unknown author (hand-tinted lantern slide)", "Public domain"],
    ["Ganga Aarti in evening at Dashashwamedh ghat, Varanasi.jpg", "Sujay25", "CC BY-SA 4.0"],
    ["Ganga Aarti Describes the synchronized movements of the priests and the musical prayers 08.jpg", "Goutam1962", "CC BY-SA 4.0"],
    ["Evening Ganga Aarti Assi Ghat, Varanasi 1.jpg", "Rangan Datta Wiki", "CC BY-SA 4.0"],
    ["Evening Ganga Aarti Assi Ghat, Varanasi 5.jpg", "Rangan Datta Wiki", "CC BY-SA 4.0"],
    ["Diya Pujan at Ganga Aarti at Dashashwamedh Ghat, Varanasi.jpg", "Chetanbtc", "CC BY-SA 4.0"],
    ["Aarti, Ganga Aarti at Dashashwamedh Ghat, Varanasi.jpg", "Chetanbtc", "CC BY-SA 4.0"],
    ["Indian Telugu Hindu wedding.jpg", "Doctorpori", "CC BY-SA 4.0"],
    ["Kanyadaan Ceremony in a Gujarati, Hindu Wedding Ceremony.jpg", "Gagan Shridhrani", "CC BY-SA 4.0"],
    ["Indian Wedding Mandap Decoration.jpg", "Wikilover90", "CC BY-SA 4.0"],
    ["(A) Hindu puja, yajna, yagna, Havanam in progress.jpg", "Bharat Mudgal", "CC BY 2.0"],
    ["Diwali Diyas Lamps.jpg", "humdingor", "CC BY-SA 2.0"],
    ["Boats at sunrise Ganges River Varanasi Uttar Pradesh Schwiki.jpg", "Schwiki", "CC BY-SA 4.0"],
    ["Varanasi, India, Sunset in Varanasi, Boats on Ganges River.jpg", "Vyacheslav Argenberg", "CC BY 4.0"],
    ["Boat Varanasi 2.jpg", "Philip Nalangan", "CC BY 4.0"],
    ["Ghat Varanasi 2.jpg", "Philip Nalangan", "CC BY 4.0"],
    ["Varanasi ghats at the sunrise.JPG", "Ilya Mauter", "CC BY 3.0"],
  ].map(([file, author, license]) => ({
    title: file.replace(/\.(jpe?g)$/i, ""),
    author,
    license,
    url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replaceAll(" ", "_"))}`,
  })),
];
