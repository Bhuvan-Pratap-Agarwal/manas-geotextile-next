import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/images/logo-go.png")).toString("base64")}`;

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
          background: "#ffffff",
          color: "#10347a",
          padding: "64px 80px",
          borderTop: "18px solid #10347a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={76} height={70} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 800 }}>MANAS</span>
            <span style={{ fontSize: 18, letterSpacing: 3, color: "#1a62b0" }}>GEO TECH INDIA</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 28, color: "#1a62b0" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 48 ? 62 : 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 1040 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#5a6472" }}>
          ISO 9001 certified · Factory at IMT Bawal, Haryana · manasgeotextile.com
        </div>
      </div>
    ),
    ogSize,
  );
}
