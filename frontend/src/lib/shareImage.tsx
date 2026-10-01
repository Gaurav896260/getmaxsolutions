import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "./site";

// Link-preview card (WhatsApp, LinkedIn, X, Slack…): app mark + wordmark on brand purple.
export const shareSize = { width: 1200, height: 630 };
export const shareAlt = `${SITE.name} — ${SITE.tagline}`;

const svgData = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

export async function renderShareImage() {
  const pub = join(process.cwd(), "public");
  const mark = await readFile(join(pub, "logo.svg"), "utf8");
  // White version of the purple wordmark for the dark background.
  const wordmark = (await readFile(join(pub, "purple name logo.svg"), "utf8")).replaceAll("#5932EA", "#FFFFFF");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          position: "relative",
          background: "linear-gradient(135deg, #7a5cf3 0%, #5932ea 45%, #1e0b78 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -260,
            top: -200,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "rgba(122, 92, 243, 0.45)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgData(mark)} width={112} height={112} alt="" style={{ borderRadius: 24 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={svgData(wordmark)} width={272} height={70} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            Getmax stands for growth
          </div>
          <div style={{ fontSize: 34, marginTop: 26, opacity: 0.88, maxWidth: 900 }}>{SITE.tagline}</div>
          <div style={{ fontSize: 24, marginTop: 30, opacity: 0.7 }}>getmaxsolutions.com</div>
        </div>
      </div>
    ),
    shareSize,
  );
}
