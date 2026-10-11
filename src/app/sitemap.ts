import type { MetadataRoute } from "next";
import { applications } from "@/lib/applications";
import { guides } from "@/lib/guides";
import { products } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, lastModified = new Date()) => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
  });
  return [
    entry("/", 1),
    entry("/products", 0.9),
    ...products.map((p) => entry(`/products/${p.slug}`, p.origin === "manufactured" ? 0.9 : 0.6)),
    entry("/applications", 0.8),
    ...applications.map((a) => entry(`/applications/${a.slug}`, 0.8)),
    entry("/guides", 0.7),
    ...guides.map((g) => entry(`/guides/${g.slug}`, 0.7, new Date(g.updated))),
    entry("/tools/geotextile-calculator", 0.8),
    entry("/about", 0.5),
    entry("/contact", 0.6),
  ];
}
