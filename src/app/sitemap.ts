import type { MetadataRoute } from "next";
import { applications } from "@/lib/applications";
import { guides } from "@/lib/guides";
import { products } from "@/lib/products";
import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, images: string[] = [], lastModified = new Date()) => ({
    url: path === "/" ? absoluteUrl() : absoluteUrl(path),
    lastModified,
    priority,
    // Listing real photos helps them appear in Google Images.
    ...(images.length ? { images: [...new Set(images)].map((i) => absoluteUrl(i)) } : {}),
  });
  return [
    entry("/", 1, ["/images/tunnel-pvc-green.jpg", "/images/plant-hall.jpg", "/images/factory-bawal.jpg"]),
    entry("/products", 0.9, products.map((p) => p.image)),
    ...products.map((p) => entry(`/products/${p.slug}`, p.origin === "manufactured" ? 0.9 : 0.6, [p.image])),
    entry("/applications", 0.8, applications.map((a) => a.image)),
    ...applications.map((a) =>
      entry(`/applications/${a.slug}`, 0.8, [a.image, ...projects.filter((p) => p.application === a.slug).map((p) => p.image)]),
    ),
    entry("/projects", 0.8, projects.map((p) => p.image)),
    entry("/guides", 0.7),
    ...guides.map((g) => entry(`/guides/${g.slug}`, 0.7, [], new Date(g.updated))),
    entry("/tools/geotextile-calculator", 0.8),
    entry("/tools/build-a-road", 0.6),
    entry("/downloads", 0.7),
    entry("/about", 0.6, ["/images/factory-bawal.jpg", "/images/plant-hall.jpg", "/images/plant-carding.jpg", "/images/plant-ramina-winder.jpg"]),
    entry("/contact", 0.6),
    entry("/privacy", 0.2),
  ];
}
