import type { NextConfig } from "next";

// 301s from the old manasgeotextile.com URLs so existing rankings and
// backlinks carry over to the new pages.
const legacy: Record<string, string> = {
  "/index.html": "/",
  "/about-us.html": "/about",
  "/contact-us.html": "/contact",
  "/products.html": "/products",
  "/non-woven-geo-textile.html": "/products/non-woven-geotextile",
  "/manas-pvc-geo-membrane.html": "/products/pvc-geomembrane",
  "/geo-bag.html": "/products/geo-bags",
  "/geo-bags.html": "/products/geo-bags",
  "/case-studies.html": "/applications",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      ...Object.entries(legacy).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/:page([^/]+\\.html)", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
