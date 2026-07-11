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
          justifyContent: "center",
          padding: "80px",
          background: "#14110e",
          color: "#ede6dd",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#f0803c", fontSize: 28, fontFamily: "monospace" }}>Full-stack & AI Engineer</div>
        <div style={{ fontSize: 72, fontWeight: 600, marginTop: 20, lineHeight: 1.1 }}>
          I build and ship production SaaS and AI systems solo.
        </div>
        <div style={{ fontSize: 30, color: "#a79e92", marginTop: 28 }}>Talha Shaikh</div>
      </div>
    ),
    size,
  );
}
