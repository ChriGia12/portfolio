import type { SkillArea } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export const skills: Record<Locale, SkillArea[]> = {
  en: [
    {
      area: "Robotics",
      items: [
        "KUKA KRL",
        "KUKA|prc",
        "Offline programming",
        "Toolpath generation",
        "Inverse kinematics",
        "Robot simulation",
        "External axes",
      ],
    },
    {
      area: "Software",
      items: [
        "Python",
        "TypeScript",
        "Grasshopper",
        "Three.js",
        "Testing (Vitest, Playwright)",
        "C / C++ (basic)",
      ],
    },
    {
      area: "CAD & Manufacturing",
      items: [
        "Rhino",
        "CAD modelling (PTC Creo, AutoCAD)",
        "Mesh and BREP processing",
        "Planar and non-planar slicing",
        "Computational geometry",
        "Robotic CAM",
      ],
    },
    {
      area: "Engineering",
      items: [
        "Mechanical design",
        "Prototyping",
        "Manufacturing processes",
        "Experimental validation",
      ],
    },
  ],
  it: [
    {
      area: "Robotica",
      items: [
        "KUKA KRL",
        "KUKA|prc",
        "Programmazione offline",
        "Generazione di toolpath",
        "Cinematica inversa",
        "Simulazione robotica",
        "Assi esterni",
      ],
    },
    {
      area: "Software",
      items: [
        "Python",
        "TypeScript",
        "Grasshopper",
        "Three.js",
        "Testing (Vitest, Playwright)",
        "C / C++ (base)",
      ],
    },
    {
      area: "CAD e produzione",
      items: [
        "Rhino",
        "Modellazione CAD (PTC Creo, AutoCAD)",
        "Elaborazione di mesh e BREP",
        "Slicing planare e non planare",
        "Geometria computazionale",
        "CAM robotico",
      ],
    },
    {
      area: "Ingegneria",
      items: [
        "Progettazione meccanica",
        "Prototipazione",
        "Processi di produzione",
        "Validazione sperimentale",
      ],
    },
  ],
};

/** Shown on a separate line under the skills, not among them. */
export const learning: Record<Locale, string[]> = {
  en: ["ROS 2"],
  it: ["ROS 2"],
};

export const disciplines: Record<Locale, string[]> = {
  en: ["Mechanical Engineering", "Robotics", "Software", "Digital Manufacturing", "CAD"],
  it: ["Ingegneria Meccanica", "Robotica", "Software", "Manifattura digitale", "CAD"],
};
