import { renderOg } from "@/lib/og";

export const alt = "Ganga Aarti Event & Tours — Ahilya Ghat at golden hour";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({ background: "home.jpg", eyebrow: "Varanasi · Kashi · Banaras", title: "Discover the Spiritual Soul of Kashi" });
}
