import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f5f1",
          color: "#0e100f",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ width: 40, height: 6, background: "#0e100f" }} />
            <div style={{ width: 40, height: 6, background: "#e0531f" }} />
            <div style={{ width: 40, height: 6, background: "#0e100f" }} />
          </div>
          <span style={{ fontWeight: 700 }}>Manas</span>
          <span style={{ color: "#7a7d79" }}>Geotextile</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#e0531f" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 48 ? 64 : 80, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", height: 14, width: "100%" }}>
          <div style={{ flex: 3, background: "#0e100f" }} />
          <div style={{ flex: 1, background: "#e0531f" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
