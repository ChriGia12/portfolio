import type { ExperienceEntry } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

/**
 * Every entry below is a placeholder. Replace the bracketed values and
 * remove `placeholder: true` once an entry is real. Keep both languages
 * in the same order.
 */
export const experience: Record<Locale, ExperienceEntry[]> = {
  en: [
    {
      period: "[YEAR] — Present",
      title: "BSc Mechanical Engineering",
      organisation: "[UNIVERSITY NAME]",
      type: "Education",
      description: "[Relevant courses, thesis topic or focus area.]",
      placeholder: true,
    },
    {
      period: "[YEAR]",
      title: "[Internship role]",
      organisation: "[COMPANY / LAB]",
      type: "Internship",
      description: "[One line on what you worked on.]",
      placeholder: true,
    },
    {
      period: "[YEAR]",
      title: "Robotic Additive Manufacturing",
      organisation: "[UNIVERSITY LAB / DEPARTMENT]",
      type: "Collaboration",
      description:
        "University and experimental project on a KUKA KR16 6-axis industrial robot.",
      placeholder: true,
    },
  ],
  it: [
    {
      period: "[ANNO] — Oggi",
      title: "Laurea in Ingegneria Meccanica",
      organisation: "[NOME UNIVERSITÀ]",
      type: "Education",
      description: "[Corsi rilevanti, argomento di tesi o area di interesse.]",
      placeholder: true,
    },
    {
      period: "[ANNO]",
      title: "[Ruolo del tirocinio]",
      organisation: "[AZIENDA / LABORATORIO]",
      type: "Internship",
      description: "[Una riga su cosa hai fatto.]",
      placeholder: true,
    },
    {
      period: "[ANNO]",
      title: "Additive manufacturing robotico",
      organisation: "[LABORATORIO / DIPARTIMENTO]",
      type: "Collaboration",
      description:
        "Progetto universitario e sperimentale su un robot industriale KUKA KR16 a 6 assi.",
      placeholder: true,
    },
  ],
};
