import { renderOg } from "@/lib/og";

export const alt = "About Ganga Aarti Event & Tours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({ background: "about.jpg", eyebrow: "About us", title: "Rooted in Kashi, crafted with devotion" });
}
