import type { Project } from "@/lib/types";
import { roboticAdditiveManufacturing } from "./robotic-additive-manufacturing";
import { desktopRoboticArm } from "./desktop-robotic-arm";

/**
 * To add a project: create a file next to this one that exports a `Project`,
 * then add it to this array. Order here = order on the site.
 */
export const projects: Project[] = [roboticAdditiveManufacturing, desktopRoboticArm];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    previous: projects[(i - 1 + n) % n],
    next: projects[(i + 1) % n],
  };
}
