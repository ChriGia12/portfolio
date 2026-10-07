import type { SkillArea } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export const skills: Record<Locale, SkillArea[]> = {
  en: [
    {
      area: "Robotics",
      items: ["KUKA KRL", "KUKA|prc", "Robot kinematics", "Trajectory planning"],
    },
    {
      area: "Software",
      items: ["Python", "Grasshopper", "C / C++ (basic)", "ROS 2 (learning)"],
    },
    {
      area: "CAD & Manufacturing",
      items: ["Rhino", "CAD modelling", "3D printing", "Robotic additive manufacturing"],
    },
    {
      area: "Engineering",
      items: ["Mechanical design", "Prototyping", "Manufacturing processes"],
    },
  ],
  it: [
    {
      area: "Robotica",
      items: ["KUKA KRL", "KUKA|prc", "Cinematica dei robot", "Pianificazione di traiettorie"],
    },
    {
      area: "Software",
      items: ["Python", "Grasshopper", "C / C++ (base)", "ROS 2 (in apprendimento)"],
    },
    {
      area: "CAD e produzione",
      items: ["Rhino", "Modellazione CAD", "Stampa 3D", "Additive manufacturing robotico"],
    },
    {
      area: "Ingegneria",
      items: ["Progettazione meccanica", "Prototipazione", "Processi di produzione"],
    },
  ],
};

export const disciplines: Record<Locale, string[]> = {
  en: ["Mechanical Engineering", "Robotics", "Software", "Digital Manufacturing", "CAD"],
  it: ["Ingegneria Meccanica", "Robotica", "Software", "Manifattura digitale", "CAD"],
};
