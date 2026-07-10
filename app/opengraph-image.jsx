import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OCR Text Extractor — Free Image to Text Online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #ecfeff 0%, #f8fafc 45%, #ccfbf1 100%)",
          color: "#0f172a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #06b6d4, #0d9488)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            OCR
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>OCR Text Extractor</div>
            <div style={{ fontSize: 22, color: "#64748b" }}>imgtotext.in</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1, maxWidth: 980 }}>
            Extract text from any image
          </div>
          <div style={{ fontSize: 28, color: "#475569", maxWidth: 900 }}>
            Free · AI OCR · Browser fallback · 12+ languages
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 22,
            color: "#0f766e",
            fontWeight: 700,
          }}
        >
          <span>AI OCR first</span>
          <span>·</span>
          <span>Browser fallback</span>
          <span>·</span>
          <span>Copy-ready text</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
