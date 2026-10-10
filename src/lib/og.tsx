import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

// Shared Open Graph card: page photo, warm wash, serif title — matches the hero look.

const asset = (...p: string[]) => readFile(join(process.cwd(), "src/assets", ...p));

const [playfair, poppins, mark] = await Promise.all([
  asset("fonts", "playfair-display-latin-600-normal.ttf"),
  asset("fonts", "poppins-latin-500-normal.ttf"),
  asset("logo", "mark-96.png"),
]);
const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

export async function renderOg({ background, eyebrow, title }: { background: string; eyebrow: string; title: string }) {
  const bg = await asset("og", background);
  const bgSrc = `data:image/jpeg;base64,${bg.toString("base64")}`;
  const host = site.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#120c08" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={bgSrc} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            backgroundImage: "linear-gradient(90deg, rgba(18,12,8,0.92) 0%, rgba(18,12,8,0.6) 55%, rgba(18,12,8,0.15) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Poppins", fontSize: 22, color: "#f2a541", letterSpacing: 6 }}>
            <div style={{ width: 40, height: 2, background: "#f2a541" }} />
            {eyebrow.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontFamily: "Playfair", fontSize: 76, lineHeight: 1.08, color: "#fff", maxWidth: 820 }}>{title}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "Poppins", fontSize: 22, color: "rgba(255,255,255,0.75)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src={markSrc} width={44} height={45} />
              Ganga Aarti Events
            </div>
            <div style={{ display: "flex" }}>{host}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Playfair", data: playfair, weight: 600, style: "normal" },
        { name: "Poppins", data: poppins, weight: 500, style: "normal" },
      ],
    },
  );
}
