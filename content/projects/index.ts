import type { Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { roboticAdditiveManufacturing } from "./robotic-additive-manufacturing";
import { desktopRoboticArm } from "./desktop-robotic-arm";

/**
 * To add a project: create a file next to this one that exports a
 * `Record<Locale, Project>` (same slug in both languages), then add it to
 * this array. Order here = order on the site.
 */
const all: Record<Locale, Project>[] = [roboticAdditiveManufacturing, desktopRoboticArm];

export const slugs = all.map((p) => p.en.slug);

export const getProjects = (lang: Locale) => all.map((p) => p[lang]);

export const getProject = (lang: Locale, slug: string) =>
  getProjects(lang).find((p) => p.slug === slug);

export function getAdjacentProjects(lang: Locale, slug: string) {
  const projects = getProjects(lang);
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    previous: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}
