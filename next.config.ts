import type { NextConfig } from "next";

// GitHub Pages serves the site as static files from /<repo-name>, so the
// deploy workflow sets these. On Vercel neither is set and nothing changes.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  basePath,
  ...(staticExport
    ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
