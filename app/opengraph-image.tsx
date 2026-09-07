import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Daniel Osonuga — Design Partner for Early-Stage Startups";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadImage(name: string) {
  const buf = await readFile(join(process.cwd(), "public", name));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function OGImage() {
  const [profilePic, bayana, coldstone, daash] = await Promise.all([
    loadImage("profile pic.png"),
    loadImage("Bayana image preview.png"),
    loadImage("Coldstone image preview.png"),
    loadImage("Daash image preview.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0A0A0A",
          overflow: "hidden",
        }}
      >
        {/* Left side — text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 40px 80px 80px",
            width: "55%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <img
              src={profilePic}
              width={56}
              height={56}
              style={{ borderRadius: "50%" }}
            />
            <span style={{ color: "#A0A0A0", fontSize: 22, fontWeight: 500 }}>
              Daniel Osonuga
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              Design partner for
            </span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              early-stage startups
            </span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              and founders.
            </span>
          </div>
          <span
            style={{
              color: "#666666",
              fontSize: 20,
              marginTop: "28px",
              fontWeight: 400,
            }}
          >
            From 0 → 1 · Open to relocate
          </span>
        </div>

        {/* Right side — vertical project images, top & bottom cut off */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "45%",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "40px",
          }}
        >
          {/* Top image — cut off at top */}
          <img
            src={bayana}
            width={440}
            height={245}
            style={{
              borderRadius: "12px",
              marginTop: "-80px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
          {/* Middle image — fully visible */}
          <img
            src={coldstone}
            width={440}
            height={245}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
          {/* Bottom image — cut off at bottom */}
          <img
            src={daash}
            width={440}
            height={245}
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
