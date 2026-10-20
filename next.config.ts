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
  "/case-studies.html": "/projects",
  "/clients.html": "/projects",
  "/picture-gallery.html": "/about",
  "/press-release.html": "/about",
  "/downloads.html": "/downloads",
  "/application-function.html": "/applications",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Photos and PDFs never change name, so they can be cached for a long time.
        source: "/:dir(images|downloads)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      ...Object.entries(legacy).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/products/geocell", destination: "/products", permanent: true },
      // Old brochure links, e.g. /images/Company-Brochure.pdf
      { source: "/images/Company-Brochure.pdf", destination: "/downloads/manas-company-brochure.pdf", permanent: true },
      { source: "/images/Manas-PP-Specifications.pdf", destination: "/downloads/manas-mgt-polypropylene-geotextile-datasheet.pdf", permanent: true },
      { source: "/images/Manas-PE-Specifications.pdf", destination: "/downloads/manas-m-geo-polyester-geotextile-datasheet.pdf", permanent: true },
      { source: "/images/FINAL_Brochure-for-PVC-Geomembrane.pdf", destination: "/downloads/manas-tunnel-waterproofing-pvc-geomembrane-brochure.pdf", permanent: true },
      { source: "/:page([^/]+\\.html)", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
