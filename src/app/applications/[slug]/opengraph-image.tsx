import { applications, getApplication } from "@/lib/applications";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Geotextile application";

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = getApplication((await params).slug);
  return ogImage({ eyebrow: "Application", title: `Geotextile for ${a?.name.toLowerCase() ?? "infrastructure"}` });
}
