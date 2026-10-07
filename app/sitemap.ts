import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

// Required for the static export used on GitHub Pages.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/about", "/cv", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const projectPages = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  return [...pages, ...projectPages];
}
