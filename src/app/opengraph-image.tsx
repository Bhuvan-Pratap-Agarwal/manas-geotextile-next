import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Manas Geo Tech, non-woven geotextile manufacturer in India";

export default function Image() {
  return ogImage({ eyebrow: "Non-woven geotextile and PVC membrane manufacturer", title: "Made in Haryana. Laid under India's roads, railways and tunnels." });
}
