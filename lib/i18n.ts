export const locales = ["en", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Localised internal link: href("it", "/projects") -> "/it/projects". */
export const href = (lang: Locale, path = "/") => `/${lang}${path === "/" ? "" : path}`;

export const otherLocale = (lang: Locale): Locale => (lang === "en" ? "it" : "en");

/** Canonical + hreflang links for a page, for use in `metadata.alternates`. */
export const alternates = (lang: Locale, path = "/") => ({
  canonical: href(lang, path),
  languages: {
    en: href("en", path),
    it: href("it", path),
    "x-default": href(defaultLocale, path),
  },
});

const en = {
  site: {
    role: "Mechanical Engineering Student",
    focus: ["Robotics", "Automation", "Digital Manufacturing"],
    tagline:
      "I design physical systems and the software that drives them — for robotics and advanced manufacturing.",
    description:
      "Portfolio of Christian Giancola, Mechanical Engineering student working across robotics, automation, additive manufacturing, CAD and software for physical systems.",
  },
  nav: { projects: "Projects", about: "About", cv: "CV", contact: "Contact" },
  a11y: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    zoom: "Enlarge",
    main: "Main",
    mobile: "Mobile",
    footer: "Footer",
    switchTo: "Passa all'italiano",
    sections: "Case study sections",
    projects: "Projects",
    tech: "Main technologies",
    goals: "Goals",
    disciplines: "Disciplines",
    robot: "Schematic of a six-axis robot arm printing a part layer by layer",
    drawing: "Technical drawing for",
  },
  hero: { viewProjects: "View Projects", aboutMe: "About Me", layer: "Layer" },
  home: {
    selected: "Selected Projects",
    all: "All projects",
    cvLabel: "Curriculum Vitae",
    cvLine: "Education, experience and skills, as a PDF.",
    downloadCv: "Download CV",
  },
  about: {
    label: "About",
    lead: [
      "Mechanical Engineering student with a growing focus on robotics, automation and ",
      "software for physical systems.",
    ],
    body: "I like the point where a CAD model, a kinematic chain and a few hundred lines of code become a machine that moves. My work sits between design and control: I model the part, plan the motion and write the code that makes the robot build it.",
    more: "More about me",
    title: [
      "I connect mechanical design, robotics and software — ",
      "and turn ideas into systems that work.",
    ],
    paragraphs: [
      "I’m Christian Giancola, a Mechanical Engineering student. Over the course of my studies my interest has moved steadily towards robotics, automation and the software that runs physical machines.",
      "I work between mechanical design, robotics and software development: modelling a part in CAD, planning how a robot should move to build it, and writing the code that turns that plan into motion. Robotic additive manufacturing on a 6-axis KUKA was where those pieces first came together for me.",
      "Right now I’m developing KinePath, a web application that turns CAD models and meshes into toolpaths and KRL programs. Alongside it I’m designing a six-axis desktop robotic arm: the CAD is complete and the first electronics are on order.",
    ],
    basedIn: "Based in",
    studyingAt: "Studying at",
    getInTouch: "Get in touch",
    portrait: "Portrait",
    meta: "Mechanical Engineering student with a growing focus on robotics, automation and software applied to physical systems.",
  },
  skills: { label: "Skills", learning: "Currently studying" },
  experience: {
    label: "Experience & Education",
    types: {
      Education: "Education",
      Internship: "Internship",
      Experience: "Experience",
      Collaboration: "Collaboration",
    },
  },
  contact: {
    label: "Contact",
    title: ["Let’s build", "something"],
    availability:
      "Available for collaborations, technical internships and R&D projects in robotics and advanced manufacturing.",
    email: "Email",
    meta: "Get in touch with Christian Giancola — email, LinkedIn and GitHub.",
  },
  projects: {
    label: "Projects",
    title: ["Physical systems ", "and the software that moves them."],
    other: "Other projects",
    meta: "Robotics and digital manufacturing projects: robotic additive manufacturing on a KUKA KR16, KinePath (a web application from CAD to KRL) and a 6-DOF desktop robotic arm.",
    back: "All projects",
    inDev: "In development",
    caseStudy: "Case study",
    objectives: "Objectives",
    log: "Engineering Log",
    logIntro:
      "A running record of the build. Each phase collects notes, CAD, photos and results as the project moves forward.",
    phase: "Phase",
    phasesComplete: "phases complete",
    now: "Now",
    logLabel: "Log",
    noEntries: "No entries yet.",
    status: { done: "Done", "in-progress": "In progress", planned: "Planned" },
    next: "Next project",
    previous: "Previous project",
    todo: "To be completed",
    placeholder: "placeholder",
    kinds: { image: "Photo", video: "Video", cad: "CAD", screenshot: "Screenshot", code: "Code" },
    diagram: "System architecture — from geometry to printed part",
    out: "Out",
  },
  cv: {
    label: "Curriculum Vitae",
    download: "Download CV (PDF)",
    projects: "Projects",
    meta: "Curriculum vitae of Christian Giancola: education, experience, skills and projects.",
  },
  notFound: {
    label: "Error 404 · Target out of reach",
    title: ["This position", "is outside the workspace."],
    home: "Back to home",
    projects: "View projects",
  },
};

export type Dictionary = typeof en;

const it: Dictionary = {
  site: {
    role: "Studente di Ingegneria Meccanica",
    focus: ["Robotica", "Automazione", "Manifattura digitale"],
    tagline:
      "Progetto sistemi fisici e il software che li muove — per la robotica e la produzione avanzata.",
    description:
      "Portfolio di Christian Giancola, studente di Ingegneria Meccanica: robotica, automazione, additive manufacturing, CAD e software per sistemi fisici.",
  },
  nav: { projects: "Progetti", about: "Chi sono", cv: "CV", contact: "Contatti" },
  a11y: {
    skip: "Vai al contenuto",
    menu: "Menu",
    close: "Chiudi",
    zoom: "Ingrandisci",
    main: "Principale",
    mobile: "Mobile",
    footer: "Piè di pagina",
    switchTo: "Switch to English",
    sections: "Sezioni del case study",
    projects: "Progetti",
    tech: "Tecnologie principali",
    goals: "Obiettivi",
    disciplines: "Discipline",
    robot: "Schema di un braccio robotico a sei assi che stampa un pezzo strato per strato",
    drawing: "Disegno tecnico di",
  },
  hero: { viewProjects: "Vedi i progetti", aboutMe: "Chi sono", layer: "Strato" },
  home: {
    selected: "Progetti selezionati",
    all: "Tutti i progetti",
    cvLabel: "Curriculum Vitae",
    cvLine: "Formazione, esperienza e competenze, in PDF.",
    downloadCv: "Scarica il CV",
  },
  about: {
    label: "Chi sono",
    lead: [
      "Studente di Ingegneria Meccanica con un interesse crescente per robotica, automazione e ",
      "software per sistemi fisici.",
    ],
    body: "Mi interessa il punto in cui un modello CAD, una catena cinematica e qualche centinaio di righe di codice diventano una macchina che si muove. Lavoro tra progettazione e controllo: modello il pezzo, pianifico il movimento e scrivo il codice con cui il robot lo realizza.",
    more: "Di più su di me",
    title: [
      "Collego progettazione meccanica, robotica e software — ",
      "e trasformo idee in sistemi che funzionano.",
    ],
    paragraphs: [
      "Sono Christian Giancola, studente di Ingegneria Meccanica. Nel corso degli studi il mio interesse si è spostato sempre di più verso la robotica, l’automazione e il software che fa funzionare le macchine.",
      "Lavoro tra progettazione meccanica, robotica e sviluppo software: modellare un pezzo in CAD, pianificare come un robot deve muoversi per realizzarlo e scrivere il codice che trasforma quel piano in movimento. L’additive manufacturing robotico su un KUKA a 6 assi è stato il primo progetto in cui questi pezzi si sono uniti.",
      "In questo momento sto sviluppando KinePath, un’applicazione web che trasforma modelli CAD e mesh in toolpath e programmi KRL. In parallelo sto progettando un braccio robotico desktop a sei assi: il CAD è completo e la prima elettronica è in ordine.",
    ],
    basedIn: "Dove vivo",
    studyingAt: "Dove studio",
    getInTouch: "Contattami",
    portrait: "Ritratto",
    meta: "Studente di Ingegneria Meccanica con un interesse crescente per robotica, automazione e software applicato ai sistemi fisici.",
  },
  skills: { label: "Competenze", learning: "Attualmente in studio" },
  experience: {
    label: "Esperienza e formazione",
    types: {
      Education: "Formazione",
      Internship: "Tirocinio",
      Experience: "Esperienza",
      Collaboration: "Collaborazione",
    },
  },
  contact: {
    label: "Contatti",
    title: ["Costruiamo", "qualcosa"],
    availability:
      "Disponibile per collaborazioni, tirocini tecnici e progetti R&D in robotica e manifattura avanzata.",
    email: "Email",
    meta: "Contatta Christian Giancola — email, LinkedIn e GitHub.",
  },
  projects: {
    label: "Progetti",
    title: ["Sistemi fisici ", "e il software che li muove."],
    other: "Altri progetti",
    meta: "Progetti di robotica e manifattura digitale: additive manufacturing robotico su KUKA KR16, KinePath (applicazione web dal CAD al KRL) e un braccio robotico desktop a 6 gradi di libertà.",
    back: "Tutti i progetti",
    inDev: "In sviluppo",
    caseStudy: "Case study",
    objectives: "Obiettivi",
    log: "Diario di progetto",
    logIntro:
      "Il registro del lavoro mentre procede. Ogni fase raccoglie note, CAD, foto e risultati man mano che il progetto avanza.",
    phase: "Fase",
    phasesComplete: "fasi completate",
    now: "Ora",
    logLabel: "Diario",
    noEntries: "Ancora nessuna voce.",
    status: { done: "Completata", "in-progress": "In corso", planned: "Pianificata" },
    next: "Progetto successivo",
    previous: "Progetto precedente",
    todo: "Da completare",
    placeholder: "segnaposto",
    kinds: { image: "Foto", video: "Video", cad: "CAD", screenshot: "Screenshot", code: "Codice" },
    diagram: "Architettura del sistema — dalla geometria al pezzo stampato",
    out: "Out",
  },
  cv: {
    label: "Curriculum Vitae",
    download: "Scarica il CV (PDF)",
    projects: "Progetti",
    meta: "Curriculum vitae di Christian Giancola: formazione, esperienza, competenze e progetti.",
  },
  notFound: {
    label: "Errore 404 · Punto non raggiungibile",
    title: ["Questa posizione", "è fuori dall’area di lavoro."],
    home: "Torna alla home",
    projects: "Vedi i progetti",
  },
};

export const ui: Record<Locale, Dictionary> = { en, it };
