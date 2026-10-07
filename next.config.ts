import type { NextConfig } from "next";

// GitHub Pages serves the site as static files from /<repo-name>, so the
// deploy workflow sets these. On Vercel neither is set and nothing changes.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  basePath,
  experimental: { globalNotFound: true },
  ...(staticExport
    ? // Static hosting: "/" is served by public/index.html, which picks the language.
      { output: "export" as const, trailingSlash: true, images: { unoptimized: true } }
    : {
        async redirects() {
          return [{ source: "/", destination: "/en", permanent: false }];
        },
      }),
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
