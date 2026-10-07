import type { PhaseStatus, Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

const dir = "/public/projects/desktop-robotic-arm";

/**
 * Engineering log.
 *
 * 1. Phase progress is set once, here, for both languages:
 */
const status: Record<string, PhaseStatus> = {
  concept: "in-progress",
  "mechanical-design": "planned",
  "joint-prototyping": "planned",
  electronics: "planned",
  "control-software": "planned",
  kinematics: "planned",
  assembly: "planned",
  testing: "planned",
};

/**
 * 2. To post an update, add an entry to the `updates` array of a phase,
 *    in both `en` and `it`:
 *
 *   { date: "2026-11-02", text: "First joint printed and assembled.",
 *     media: [{ kind: "image", label: "Joint 1", src: "/projects/desktop-robotic-arm/j1.jpg" }] }
 */
const shared = {
  slug: "desktop-robotic-arm",
  status: "in-development",
  coverArt: "arm",
  // cover: { kind: "cad", label: "Arm assembly", src: "/projects/desktop-robotic-arm/cover.png", alt: "…" },
} as const;

export const desktopRoboticArm: Record<Locale, Project> = {
  en: {
    ...shared,
    title: "6-DOF Desktop Robotic Arm",
    year: "2026 — ongoing",
    category: "Robotics · Personal Project",
    summary:
      "A six-axis desktop robot designed from scratch: mechanics, electronics, kinematics and Python control.",
    intro:
      "A personal robotic arm, designed from a blank CAD file. The goal is to own every layer of the system — structure, transmissions, electronics and control software — and to document the process as it happens.",
    stack: ["CAD", "3D printing", "Python", "Kinematics", "ROS 2 (planned)"],
    specs: [
      { label: "Type", value: "Desktop arm · 6 axes" },
      { label: "Structure", value: "3D printed parts" },
      { label: "Control", value: "Python · joint + Cartesian" },
      { label: "Status", value: "In development" },
    ],
    objectives: [
      "Six-axis desktop robot",
      "Complete CAD design",
      "3D printed components",
      "Motors and transmissions",
      "Electronics",
      "Encoders",
      "Forward kinematics",
      "Inverse kinematics",
      "Python control",
      "Joint and Cartesian motion",
      "Future ROS 2 integration",
    ],
    timeline: [
      {
        id: "concept",
        title: "Concept",
        status: status.concept,
        summary: "Requirements, workspace, payload target and overall kinematic layout.",
        goals: ["Define requirements", "Choose the kinematic structure"],
        updates: [],
        media: [{ kind: "image", label: "Concept sketch", aspect: "4/3", hint: `${dir}/concept-01.jpg` }],
      },
      {
        id: "mechanical-design",
        title: "Mechanical Design",
        status: status["mechanical-design"],
        summary: "Full CAD of links, joints and housings, designed for 3D printing.",
        goals: ["Complete CAD assembly", "Design for printability"],
        updates: [],
        media: [{ kind: "cad", label: "CAD assembly", aspect: "4/3", hint: `${dir}/cad-01.png` }],
      },
      {
        id: "joint-prototyping",
        title: "Joint Prototyping",
        status: status["joint-prototyping"],
        summary: "One joint built and tested in isolation: motor, transmission, bearing, encoder.",
        goals: ["Motor and transmission choice", "Single-joint test rig"],
        updates: [],
      },
      {
        id: "electronics",
        title: "Electronics",
        status: status.electronics,
        summary: "Motor drivers, controller, encoders, power and wiring.",
        goals: ["Driver and controller selection", "Encoder feedback"],
        updates: [],
      },
      {
        id: "control-software",
        title: "Control Software",
        status: status["control-software"],
        summary: "Python layer for commanding joints and reading feedback.",
        goals: ["Joint-space motion", "Python control interface"],
        updates: [],
      },
      {
        id: "kinematics",
        title: "Kinematics",
        status: status.kinematics,
        summary: "Forward and inverse kinematics, then Cartesian motion.",
        goals: ["Forward kinematics", "Inverse kinematics", "Cartesian moves"],
        updates: [],
      },
      {
        id: "assembly",
        title: "Assembly",
        status: status.assembly,
        summary: "All six axes printed, assembled and wired.",
        updates: [],
      },
      {
        id: "testing",
        title: "Testing",
        status: status.testing,
        summary: "Motion tests, repeatability checks and a path towards ROS 2.",
        goals: ["Motion tests", "ROS 2 integration"],
        updates: [],
      },
    ],
  },

  it: {
    ...shared,
    title: "Braccio robotico desktop a 6 assi",
    year: "2026 — in corso",
    category: "Robotica · Progetto personale",
    summary:
      "Un robot desktop a sei assi progettato da zero: meccanica, elettronica, cinematica e controllo in Python.",
    intro:
      "Un braccio robotico personale, progettato partendo da un file CAD vuoto. L’obiettivo è padroneggiare ogni livello del sistema — struttura, trasmissioni, elettronica e software di controllo — e documentare il processo mentre avviene.",
    stack: ["CAD", "Stampa 3D", "Python", "Cinematica", "ROS 2 (previsto)"],
    specs: [
      { label: "Tipo", value: "Braccio desktop · 6 assi" },
      { label: "Struttura", value: "Componenti stampati in 3D" },
      { label: "Controllo", value: "Python · giunti + cartesiano" },
      { label: "Stato", value: "In sviluppo" },
    ],
    objectives: [
      "Robot desktop a sei assi",
      "Progettazione CAD completa",
      "Componenti stampati in 3D",
      "Motori e trasmissioni",
      "Elettronica",
      "Encoder",
      "Cinematica diretta",
      "Cinematica inversa",
      "Controllo tramite Python",
      "Movimenti joint e cartesiani",
      "Futura integrazione ROS 2",
    ],
    timeline: [
      {
        id: "concept",
        title: "Concept",
        status: status.concept,
        summary: "Requisiti, area di lavoro, carico utile e schema cinematico generale.",
        goals: ["Definire i requisiti", "Scegliere la struttura cinematica"],
        updates: [],
        media: [{ kind: "image", label: "Schizzo del concept", aspect: "4/3", hint: `${dir}/concept-01.jpg` }],
      },
      {
        id: "mechanical-design",
        title: "Progettazione meccanica",
        status: status["mechanical-design"],
        summary: "CAD completo di link, giunti e carter, pensato per la stampa 3D.",
        goals: ["Assieme CAD completo", "Progettare per la stampa"],
        updates: [],
        media: [{ kind: "cad", label: "Assieme CAD", aspect: "4/3", hint: `${dir}/cad-01.png` }],
      },
      {
        id: "joint-prototyping",
        title: "Prototipo del giunto",
        status: status["joint-prototyping"],
        summary: "Un giunto costruito e provato da solo: motore, trasmissione, cuscinetto, encoder.",
        goals: ["Scelta di motore e trasmissione", "Banco prova per un giunto"],
        updates: [],
      },
      {
        id: "electronics",
        title: "Elettronica",
        status: status.electronics,
        summary: "Driver dei motori, controllore, encoder, alimentazione e cablaggio.",
        goals: ["Scelta di driver e controllore", "Feedback da encoder"],
        updates: [],
      },
      {
        id: "control-software",
        title: "Software di controllo",
        status: status["control-software"],
        summary: "Livello Python per comandare i giunti e leggere il feedback.",
        goals: ["Movimento nello spazio dei giunti", "Interfaccia di controllo Python"],
        updates: [],
      },
      {
        id: "kinematics",
        title: "Cinematica",
        status: status.kinematics,
        summary: "Cinematica diretta e inversa, poi movimento cartesiano.",
        goals: ["Cinematica diretta", "Cinematica inversa", "Movimenti cartesiani"],
        updates: [],
      },
      {
        id: "assembly",
        title: "Assemblaggio",
        status: status.assembly,
        summary: "Tutti e sei gli assi stampati, assemblati e cablati.",
        updates: [],
      },
      {
        id: "testing",
        title: "Test",
        status: status.testing,
        summary: "Prove di movimento, verifiche di ripetibilità e percorso verso ROS 2.",
        goals: ["Prove di movimento", "Integrazione ROS 2"],
        updates: [],
      },
    ],
  },
};
