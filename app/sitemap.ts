import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { slugs } from "@/content/projects";
import { locales } from "@/lib/i18n";

// Required for the static export used on GitHub Pages.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    ...slugs.map((slug) => `/projects/${slug}`),
    "/about",
    "/cv",
    "/contact",
  ];
  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${site.url}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
