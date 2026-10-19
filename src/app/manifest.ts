import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Manas",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10347a",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
