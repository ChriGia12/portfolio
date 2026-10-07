import type { MinorProject, Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { roboticAdditiveManufacturing } from "./robotic-additive-manufacturing";
import { kinepath } from "./kinepath";
import { desktopRoboticArm } from "./desktop-robotic-arm";

/**
 * To add a project: create a file next to this one that exports a
 * `Record<Locale, Project>` (same slug in both languages), then add it to
 * this array. Order here = order on the site.
 */
const all: Record<Locale, Project>[] = [roboticAdditiveManufacturing, kinepath, desktopRoboticArm];

/** Projects listed without a dedicated page. Move one to `all` when it gets a case study. */
export const minorProjects: Record<Locale, MinorProject[]> = {
  en: [
    {
      title: "Toolpath Check",
      year: "2026",
      category: "Personal software project",
      summary:
        "Browser-based tool for analysing and validating robotic paths through geometric checks, program inspection and workflow automation.",
    },
    {
      title: "FrameForge",
      year: "2026",
      category: "Personal software project",
      summary:
        "Browser-based platform for generating usable CAD geometry from images, videos and mechanical drawings.",
    },
  ],
  it: [
    {
      title: "Toolpath Check",
      year: "2026",
      category: "Progetto software personale",
      summary:
        "Strumento per analizzare e validare percorsi robotici prima dell’esecuzione, con controlli geometrici e supporto alla lettura dei programmi di lavorazione.",
    },
    {
      title: "FrameForge",
      year: "2026",
      category: "Progetto software personale",
      summary:
        "Piattaforma sperimentale per ricostruire modelli CAD da immagini, video e disegni meccanici, con workflow orientato alla produzione di geometrie 3D utilizzabili.",
    },
  ],
};

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
