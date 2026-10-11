import type { MetadataRoute } from "next";
import { products } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/applications", "/about", "/contact", ...products.map((p) => `/products/${p.slug}`)];
  return routes.map((r) => ({ url: `${site.url}${r}`, lastModified: new Date() }));
}
