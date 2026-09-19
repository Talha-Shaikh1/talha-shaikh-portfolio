import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "#0e0c0a",
          color: "#ede6dd",
          fontFamily: "sans-serif",
          border: "2px solid #2a221b",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#d97736", fontSize: 24, fontWeight: 700, fontFamily: "monospace" }}>
            talhaweb.xyz
          </div>
          <div
            style={{
              background: "#1e1711",
              border: "1px solid #3d2c20",
              color: "#34d399",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ● Systems Architect & Full-Stack
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Muhammad Talha Shaikh
          </div>
          <div style={{ fontSize: 28, color: "#d97736", fontWeight: 600, marginTop: "12px" }}>
            Junior Full-Stack & AI Engineer
          </div>
          <div style={{ fontSize: 22, color: "#9ca3af", marginTop: "16px", maxWidth: "900px", lineHeight: 1.4 }}>
            Building production RAG platforms, autonomous AI directors, and zero-server privacy engines with Next.js 16, FastAPI & Neon PostgreSQL.
          </div>
        </div>

        <div style={{ display: "flex", gap: "24px", fontSize: 18, color: "#78716c", borderTop: "1px solid #221c17", paddingTop: "24px" }}>
          <span>Botaura (Meta Tech Provider)</span>
          <span>·</span>
          <span>FlowCreator OS (Gemini Flash)</span>
          <span>·</span>
          <span>ShieldTools (Canvas PWA)</span>
        </div>
      </div>
    ),
    size,
  );
}
