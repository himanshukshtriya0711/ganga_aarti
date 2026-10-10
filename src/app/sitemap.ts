import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const pages = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: "2026-10-10",
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
