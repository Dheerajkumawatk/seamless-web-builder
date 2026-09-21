import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "भारत पहचान • BharatPahchan — डिजिटल अभियान, सुरक्षित पहचान";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadDevanagariFont() {
  try {
    const data = await readFile(
      path.join(process.cwd(), "src/assets/fonts/NotoSansDevanagari-Regular.ttf"),
    );
    return [
      { name: "Noto Sans Devanagari", data, weight: 400 as const, style: "normal" as const },
      { name: "Noto Sans Devanagari", data, weight: 700 as const, style: "normal" as const },
    ];
  } catch {
    // Font failure falls back to the default renderer font instead of breaking the build.
    return [];
  }
}

export default async function OpengraphImage() {
  const fonts = await loadDevanagariFont();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 64px",
        color: "#ffffff",
        background: "linear-gradient(135deg, #0e2f5e 0%, #123a72 55%, #0f5c3e 100%)",
        fontFamily: "Noto Sans Devanagari, sans-serif",
      }}
    >
      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        <div style={{ width: 120, height: 12, background: "#ff720e", borderRadius: 999 }} />
        <div style={{ width: 120, height: 12, background: "#ffffff", borderRadius: 999 }} />
        <div style={{ width: 120, height: 12, background: "#159a56", borderRadius: 999 }} />
      </div>
      <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1.1 }}>भारत पहचान</div>
      <div style={{ fontSize: 54, fontWeight: 400, marginTop: 16, letterSpacing: 2 }}>
        BharatPahchan
      </div>
      <div style={{ fontSize: 40, fontWeight: 400, marginTop: 40, opacity: 0.95 }}>
        डिजिटल अभियान, सुरक्षित पहचान
      </div>
      <div style={{ fontSize: 30, fontWeight: 400, marginTop: 36, opacity: 0.85 }}>
        bharatpahchan.com
      </div>
    </div>,
    {
      width: size.width,
      height: size.height,
      fonts,
    },
  );
}
