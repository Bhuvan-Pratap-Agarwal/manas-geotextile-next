import type { Metadata } from "next";

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    // Pages with their own opengraph-image file override this default.
    openGraph: { title, description, url: path, type: "website", siteName: "Manas Geo Tech", locale: "en_IN", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
