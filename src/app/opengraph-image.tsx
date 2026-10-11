import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Manas Geotextile — non-woven geotextile manufacturer in India";

export default function Image() {
  return ogImage({ eyebrow: "Made in India since 1995", title: "The layer that holds infrastructure together." });
}
