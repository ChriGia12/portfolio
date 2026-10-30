import type { ExperienceEntry } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

/** Taken from the CV. Keep both languages in the same order. */
export const experience: Record<Locale, ExperienceEntry[]> = {
  en: [
    {
      period: "2026 — Present",
      title: "Founder & CEO",
      organisation: "Orbinel Robotics",
      type: "Experience",
      description:
        "Early-stage robotics project: modular, open robots and the tools to learn, simulate and build them. Designing Kheiron, a 6-axis 3D-printable arm; building Orbinel Motion, an open-source browser simulator that also drives the real robot; preparing a simulator-based robotics course for schools. Coordinating a team of three engineering students covering robot applications, firmware and controls, assembly and testing. orbinel.it",
    },
    {
      period: "Mar — Oct 2026",
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
      title: "Founder & CEO",
      organisation: "Orbinel Robotics",
      type: "Experience",
      description:
        "Progetto di robotica in fase iniziale: robot modulari e aperti, e gli strumenti per impararli, simularli e costruirli. Progetto Kheiron, un braccio a 6 assi stampabile in 3D; sviluppo Orbinel Motion, un simulatore open source nel browser che comanda anche il robot reale; preparo un percorso di robotica per le scuole basato sul simulatore. Coordino un team di tre studenti di ingegneria: applicazioni robotiche, firmware e controllo, montaggio e prove. orbinel.it",
    },
    {
      period: "Mar — ott 2026",
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
