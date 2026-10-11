import { getGuide, guides } from "@/lib/guides";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Geotextile guide";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  return ogImage({ eyebrow: "Guide", title: g?.title ?? "Geotextile guide" });
}
