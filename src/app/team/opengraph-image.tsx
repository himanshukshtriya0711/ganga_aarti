import { renderOg } from "@/lib/og";

export const alt = "The Ganga Aarti Event & Tours team";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({ background: "team.jpg", eyebrow: "Our team", title: "The hands behind every ritual" });
}
