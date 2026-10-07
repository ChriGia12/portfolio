import type { ExperienceEntry } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

/** Taken from the CV. Keep both languages in the same order. */
export const experience: Record<Locale, ExperienceEntry[]> = {
  en: [
    {
      period: "2026 — Present",
      title: "Industrial Robotics and Additive Manufacturing Intern",
      organisation: "University of Bologna · Montecuccolino Laboratory",
      type: "Internship",
      description:
        "Toolpaths for robotic material deposition on a six-axis KUKA with Rhino 8, Grasshopper and KUKA|prc; planar, inclined and non-planar slicing strategies; Python postprocessors that generate KRL and manage tool orientation, extrusion, an external linear axis, homing and purge sequences; hands-on printing tests on the robot.",
    },
    {
      period: "2023 — Present",
      title: "BSc in Mechanical Engineering",
      organisation: "University of Bologna",
      type: "Education",
      description:
        "Experimental thesis, in progress, on the generation and control of toolpaths for robotic additive manufacturing.",
    },
    {
      period: "2024 — Present",
      title: "First-level Academic Diploma Programme in Classical Guitar",
      organisation: "G. B. Martini Conservatory, Bologna",
      type: "Education",
      description:
        "Parallel programme requiring precision, discipline and long-term management of complex activities.",
    },
  ],
  it: [
    {
      period: "2026 — in corso",
      title: "Tirocinante in robotica industriale e manifattura additiva",
      organisation: "Università di Bologna · Laboratorio di Montecuccolino",
      type: "Internship",
      description:
        "Toolpath per deposizione robotizzata su KUKA a 6 assi con Rhino 8, Grasshopper e KUKA|prc; strategie di slicing planare, inclinato e non planare; postprocessori Python che generano KRL e gestiscono orientamento utensile, estrusione, asse lineare esterno, sequenze di home e spurgo; prove sperimentali sul robot.",
    },
    {
      period: "2023 — in corso",
      title: "Laurea in Ingegneria Meccanica",
      organisation: "Università di Bologna",
      type: "Education",
      description:
        "Tesi sperimentale, in corso, sulla generazione e sul controllo di toolpath per processi robotizzati di manifattura additiva.",
    },
    {
      period: "2024 — in corso",
      title: "Corso di Diploma Accademico di Primo Livello in Chitarra Classica",
      organisation: "Conservatorio G. B. Martini, Bologna",
      type: "Education",
      description:
        "Percorso parallelo dedicato a precisione esecutiva, disciplina e gestione di attività complesse nel tempo.",
    },
  ],
};
