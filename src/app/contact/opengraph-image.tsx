import { renderOg } from "@/lib/og";

export const alt = "Contact Ganga Aarti Event & Tours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg({ background: "contact.jpg", eyebrow: "Contact", title: "Let's plan your sacred journey" });
}
