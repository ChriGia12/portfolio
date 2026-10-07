import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Required for the static export used on GitHub Pages.
export const dynamic = "force-static";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "#0a0a0b",
          color: "#ededef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, color: "#8b8b93" }}>
          <div style={{ width: 14, height: 14, background: "#ff5b1f" }} />
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -5 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#ededef" }}>{site.role}</div>
          <div style={{ marginTop: 12, fontSize: 26, letterSpacing: 3, color: "#8b8b93" }}>
            {site.focus.join("  •  ").toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3, color: "#5c5c63" }}>
          <span>X +000.0   Y +000.0   Z +000.0</span>
          <span style={{ color: "#ff5b1f" }}>TCP</span>
        </div>
      </div>
    ),
    size,
  );
}
