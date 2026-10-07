import type { CodeSample, Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

/** Media files live in public/projects/robotic-additive-manufacturing/. */
const img = "/projects/robotic-additive-manufacturing";

/**
 * NOTE: Problem, Approach, Development, Challenges and Solutions are still
 * the first draft written from the project outline — check them against what
 * actually happened. Code excerpts, results and photos are real.
 * English and Italian versions are kept side by side — update both.
 */

const shared = {
  slug: "robotic-additive-manufacturing",
  year: "2026",
  status: "completed",
  coverArt: "toolpath",
  stack: ["KUKA KR16", "Rhino", "Grasshopper", "KUKA|prc", "Python", "KRL"],
  // cover: { kind: "image", label: "Robot printing", src: "/projects/robotic-additive-manufacturing/cover.jpg", alt: "…" },
} as const;

// Real excerpts: the beginning and the end of each file, the middle is omitted.
const pythonCode = `import re

PROGRAM_NAME = str(ProgramName)
TOOL_NUMBER = 11
BASE_NUMBER = 1

LIN_SPEED = 0.80
ADVANCE = 5

EXTRUDER_ANOUT = 7
EXTRUDER_SPEED_ANOUT = 6
EXTRUDER_SPEED = 4
EXTRUDER_DELAY = 1

E1_VALUE = float(stepE1)
E2_VALUE = float(stepE2)
E3_VALUE = float(stepE3)
E4_VALUE = float(stepE4)

A_VALUE = float(ToolA)
B_VALUE = float(ToolB)
C_VALUE = float(ToolC)

USE_HOMING = True

with open(path, "r") as f:
    lines = f.readlines()

BASE_X = 1448.0
BASE_Y = -1000.0
BASE_Z = 5.0

# ...

footer += "END"

final_code = header + first_lin + start_extrusion + "".join(remaining_lin) + footer

import os

folder = os.path.dirname(path)

new_path = os.path.join(folder, PROGRAM_NAME + ".src")

with open(new_path, "w") as f:
    f.write(final_code)

newPath = new_path`;

const krlCode = `DEF Sella11 ( )
GLOBAL INTERRUPT DECL 3 WHEN $STOPMESS==TRUE DO IR_STOPM ( )

;FOLD INI
BAS (#INITMOV,0)
BAS (#VEL_PTP,50)
BAS (#ACC_PTP,100)
;ENDFOLD

;FOLD STARTPOS
$BWDSTART = FALSE
PDAT_ACT = {VEL 50,ACC 100,APO_DIST 10}
BAS(#PTP_DAT)
FDAT_ACT = {TOOL_NO 0,BASE_NO 0,IPO_FRAME #BASE}
BAS (#FRAMES)
BAS (#VEL_PTP,50)
;ENDFOLD

; ...

; =========================
; SPEGNIMENTO ESTRUSORE
; =========================
$ANOUT[7]=0
$ANOUT[6]=0

PTP {A1 0.000, A2 -90.000, A3 90.000, A4 0.000, A5 -1.000, A6 0.000, E1 0, E2 0, E3 0, E4 0, E5 0, E6 0}

PTP {A1 0.000, A2 -90.000, A3 90.000, A4 0.000, A5 -1.000, A6 0.000, E1 0, E2 0, E3 0, E4 0, E5 0, E6 0}

; MACRO FINALE
PTP $AXIS_ACT ; skip BCO quickly
; HOMING
PTP {A1 0.000, A2 -90.000, A3 0.000, A4 0.000, A5 -1.000, A6 0.000}
$ANOUT[4]=0.6
WAIT SEC 2
WAIT FOR ($ANIN[2] < 0)
PTP {A1 0.000, A2 -90.000, A3 90.000, A4 0.000, A5 -1.000, A6 0.000}
END`;

const code = (pyCaption: string, krlCaption: string): CodeSample[] => [
  { language: "python", filename: "post_processor.py", caption: pyCaption, code: pythonCode },
  { language: "krl", filename: "Sella11.src", caption: krlCaption, code: krlCode },
];

export const roboticAdditiveManufacturing: Record<Locale, Project> = {
  en: {
    ...shared,
    stack: [...shared.stack],
    title: "Robotic Additive Manufacturing",
    category: "Robotics · Additive Manufacturing",
    summary:
      "A design-to-robot workflow that turns Rhino geometry into KRL motion for planar and non-planar printing on a KUKA KR16.",
    intro:
      "A university and experimental project built around a 6-axis industrial robot. I designed the workflow from parametric toolpath to robot code, wrote the Python post processor that generates KRL, and tested the result on the real machine.",
    specs: [
      { label: "Robot", value: "KUKA KR16 · 6 axes" },
      { label: "Process", value: "Planar + non-planar extrusion" },
      { label: "Role", value: "Workflow, post processor, testing" },
      { label: "Context", value: "University of Bologna · Montecuccolino Laboratory" },
    ],
    pipeline: [
      { name: "Rhino", role: "Part geometry and print surfaces", output: "NURBS" },
      { name: "Grasshopper", role: "Parametric slicing, toolpath and tool orientation", output: "Planes" },
      { name: "KUKA|prc", role: "Robot simulation, reachability and axis checks", output: "Verified path" },
      { name: "Python post processor", role: "Frames to motion commands, TOOL / BASE, extruder I/O", output: ".src" },
      { name: "KRL", role: "PTP and LIN program for the controller", output: "Program" },
      { name: "KUKA KR16", role: "Robot and extruder, real test prints", output: "Part" },
    ],
    caseStudy: [
      {
        id: "problem",
        title: "Problem",
        body: [
          "Industrial robots are not built to print. Conventional slicers produce G-code for three-axis gantries and assume the nozzle always points straight down. A 6-axis arm expects something different: KRL motion commands with an explicit tool frame, base frame, motion type and orientation for every target.",
          "The aim was a workflow that goes from a CAD model to a program the robot can run, and that is not limited to flat layers.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        body: [
          "Keep geometry, toolpath and robot code in one parametric chain, so a change to the model propagates all the way to the generated program.",
        ],
        bullets: [
          "Model and slice in Rhino + Grasshopper, where every target is a plane with position and orientation.",
          "Simulate the robot in KUKA|prc before anything reaches the controller.",
          "Generate KRL with a custom Python post processor, to keep full control of the output.",
          "Validate on the real KR16, starting from planar prints and moving to non-planar ones.",
        ],
      },
      {
        id: "system-architecture",
        title: "System Architecture",
        body: [
          "Six stages, each with one job and a defined output. The post processor is the boundary between design software and robot controller.",
        ],
        showPipeline: true,
        media: [
          {
            kind: "screenshot",
            label: "Grasshopper definition",
            aspect: "2/1",
            fit: "contain",
            src: `${img}/grasshopper-01.jpg`,
            alt: "Annotated Grasshopper definition: LIN command, merge, KUKA|prc core and tool position",
          },
        ],
      },
      {
        id: "development",
        title: "Development",
        items: [
          {
            title: "Toolpath generation",
            text: "Grasshopper definition that slices the part and outputs an ordered list of target planes, for planar layers and for layers that follow a curved surface.",
          },
          {
            title: "TOOL and BASE",
            text: "The extruder tip is defined as the robot TOOL and the print bed as the BASE, so the program is written in part coordinates rather than robot coordinates.",
          },
          {
            title: "Motion programming",
            text: "PTP moves for approach and repositioning, LIN moves for deposition, with tool orientation taken from each target plane.",
          },
          {
            title: "Python post processor",
            text: "Converts the target planes into KRL: frame conversion to KUKA X Y Z A B C, motion commands, velocity settings and program structure, written automatically to a .src file.",
          },
          {
            title: "Extruder control",
            text: "Extrusion is switched from inside the robot program, so deposition starts and stops together with the motion.",
          },
        ],
        code: code(
          "Excerpt from the Python post processor: configuration at the top, file writing at the end.",
          "Excerpt from a generated program: initialisation, then extruder shutdown and homing.",
        ),
      },
      {
        id: "challenges",
        title: "Challenges",
        items: [
          {
            title: "Frames",
            text: "A print is only as accurate as its TOOL and BASE definitions. Any error in either shows up directly in the first layer.",
          },
          {
            title: "Tool orientation",
            text: "On non-planar layers the nozzle has to follow the surface while the robot stays inside its axis limits and away from singularities.",
          },
          {
            title: "Motion and extrusion",
            text: "Deposition has to stay consistent while the robot blends between many short linear segments.",
          },
          {
            title: "From simulation to machine",
            text: "A path that looks right in simulation still has to be reachable, safe and repeatable on the real cell.",
          },
        ],
      },
      {
        id: "solutions",
        title: "Solutions",
        items: [
          {
            title: "Part-centred coordinates",
            text: "All targets are expressed in the print BASE, so recalibrating the bed does not require regenerating the toolpath logic.",
          },
          {
            title: "Orientation from geometry",
            text: "Tool orientation is derived from the target planes in Grasshopper and checked in KUKA|prc before code generation.",
          },
          {
            title: "Own post processor",
            text: "Writing the KRL from Python makes motion type, blending, velocity and extruder commands explicit and adjustable per layer.",
          },
          {
            title: "Incremental testing",
            text: "Dry runs first, then planar prints, then non-planar ones — each step on the real robot.",
          },
        ],
      },
      {
        id: "results",
        title: "Results",
        body: [
          "The workflow was put to the test with a series of prints of growing difficulty: a vase, a design chair, a honeycomb structure.",
          "The most significant step came last: the first ironing pass on a non-planar object, with the robot following the curved surface instead of working in flat layers. The result is fair, and it shows clearly where to work next — a more even material flow, and a definitive implementation of the non-planar tool tilt.",
        ],
        media: [
          {
            kind: "image",
            label: "First non-planar ironing",
            aspect: "3/4",
            src: `${img}/result-01.jpg`,
            alt: "Extruder depositing red material along the curved top surface of a part",
          },
          { kind: "video", label: "Non-planar ironing", aspect: "3/4", src: `${img}/print.mp4`, poster: `${img}/print-poster.jpg` },
        ],
      },
      {
        id: "technologies",
        title: "Technologies",
        stackGroups: [
          { label: "Robot", items: ["KUKA KR16", "KRL", "TOOL / BASE frames"] },
          { label: "Design", items: ["Rhino", "Grasshopper", "KUKA|prc"] },
          { label: "Software", items: ["Python", "Post processing"] },
          { label: "Process", items: ["Planar printing", "Non-planar printing", "Extruder control"] },
        ],
      },
      {
        id: "gallery",
        title: "Gallery",
        media: [
          { kind: "image", label: "Robot cell — KUKA on the linear axis", aspect: "1/1", fit: "contain", src: `${img}/cell.png`, alt: "KUKA robot mounted on a linear axis next to the work table" },
          { kind: "image", label: "Extruder on the flange", aspect: "3/4", src: `${img}/extruder.jpg`, alt: "Extruder with hopper mounted on the robot flange" },
          { kind: "screenshot", label: "KUKA|prc — simulation", aspect: "16/9", src: `${img}/prc-01.jpg`, alt: "Rhino viewport with the robot, the linear axis and a toolpath over the table" },
          { kind: "image", label: "Honeycomb — print", aspect: "3/4", src: `${img}/honeycomb.jpg`, alt: "Printed honeycomb structure on the print bed" },
          { kind: "image", label: "Design chair — print", aspect: "3/4", src: `${img}/sedia.jpg`, alt: "Robot printing the curved shell of a chair" },
          { kind: "video", label: "Machine video", aspect: "3/4", src: `${img}/machine.mp4`, poster: `${img}/machine-poster.jpg` },
        ],
      },
    ],
  },

  it: {
    ...shared,
    stack: [...shared.stack],
    title: "Additive manufacturing robotico",
    category: "Robotica · Additive Manufacturing",
    summary:
      "Un workflow dal progetto al robot che trasforma la geometria di Rhino in movimenti KRL, per la stampa planare e non planare su un KUKA KR16.",
    intro:
      "Un progetto universitario e sperimentale costruito attorno a un robot industriale a 6 assi. Ho progettato il workflow dal percorso utensile parametrico al codice robot, ho scritto il post processor Python che genera il KRL e ho provato il risultato sulla macchina reale.",
    specs: [
      { label: "Robot", value: "KUKA KR16 · 6 assi" },
      { label: "Processo", value: "Estrusione planare + non planare" },
      { label: "Ruolo", value: "Workflow, post processor, test" },
      { label: "Contesto", value: "Università di Bologna · Laboratorio di Montecuccolino" },
    ],
    pipeline: [
      { name: "Rhino", role: "Geometria del pezzo e superfici di stampa", output: "NURBS" },
      { name: "Grasshopper", role: "Slicing parametrico, percorso e orientamento utensile", output: "Piani" },
      { name: "KUKA|prc", role: "Simulazione del robot, raggiungibilità e controllo assi", output: "Percorso verificato" },
      { name: "Post processor Python", role: "Da frame a comandi di moto, TOOL / BASE, I/O estrusore", output: ".src" },
      { name: "KRL", role: "Programma PTP e LIN per il controllore", output: "Programma" },
      { name: "KUKA KR16", role: "Robot ed estrusore, prove di stampa reali", output: "Pezzo" },
    ],
    caseStudy: [
      {
        id: "problem",
        title: "Problema",
        body: [
          "I robot industriali non nascono per stampare. Gli slicer tradizionali producono G-code per macchine cartesiane a tre assi e danno per scontato che l’ugello punti sempre verso il basso. Un braccio a 6 assi si aspetta altro: comandi di moto KRL con frame utensile, frame base, tipo di movimento e orientamento espliciti per ogni punto.",
          "L’obiettivo era un workflow che andasse dal modello CAD a un programma eseguibile dal robot, senza limitarsi a strati piani.",
        ],
      },
      {
        id: "approach",
        title: "Approccio",
        body: [
          "Tenere geometria, percorso utensile e codice robot in un’unica catena parametrica, così che una modifica al modello arrivi fino al programma generato.",
        ],
        bullets: [
          "Modellare e fare lo slicing in Rhino + Grasshopper, dove ogni punto è un piano con posizione e orientamento.",
          "Simulare il robot in KUKA|prc prima che qualcosa arrivi al controllore.",
          "Generare il KRL con un post processor Python scritto su misura, per avere pieno controllo sull’output.",
          "Validare sul KR16 reale, partendo da stampe planari per arrivare a quelle non planari.",
        ],
      },
      {
        id: "system-architecture",
        title: "Architettura del sistema",
        body: [
          "Sei stadi, ognuno con un compito e un output definito. Il post processor è il confine tra il software di progettazione e il controllore del robot.",
        ],
        showPipeline: true,
        media: [
          {
            kind: "screenshot",
            label: "Definizione Grasshopper",
            aspect: "2/1",
            fit: "contain",
            src: `${img}/grasshopper-01.jpg`,
            alt: "Definizione Grasshopper annotata: comando LIN, merge, core KUKA|prc e posizione utensile",
          },
        ],
      },
      {
        id: "development",
        title: "Sviluppo",
        items: [
          {
            title: "Generazione del percorso",
            text: "Definizione Grasshopper che seziona il pezzo e restituisce una lista ordinata di piani target, per strati planari e per strati che seguono una superficie curva.",
          },
          {
            title: "TOOL e BASE",
            text: "La punta dell’estrusore è definita come TOOL del robot e il piano di stampa come BASE, così il programma è scritto nelle coordinate del pezzo e non in quelle del robot.",
          },
          {
            title: "Programmazione dei movimenti",
            text: "Movimenti PTP per avvicinamento e riposizionamento, movimenti LIN per la deposizione, con l’orientamento utensile ricavato da ogni piano target.",
          },
          {
            title: "Post processor Python",
            text: "Converte i piani target in KRL: conversione dei frame in X Y Z A B C KUKA, comandi di moto, velocità e struttura del programma, scritti automaticamente in un file .src.",
          },
          {
            title: "Gestione dell’estrusore",
            text: "L’estrusione è comandata dall’interno del programma robot, così la deposizione parte e si ferma insieme al movimento.",
          },
        ],
        code: code(
          "Estratto del post processor Python: configurazione in testa, scrittura del file in coda.",
          "Estratto di un programma generato: inizializzazione, poi spegnimento dell’estrusore e homing.",
        ),
      },
      {
        id: "challenges",
        title: "Sfide",
        items: [
          {
            title: "Frame",
            text: "Una stampa è precisa quanto lo sono le definizioni di TOOL e BASE. Ogni errore in una delle due si vede subito nel primo strato.",
          },
          {
            title: "Orientamento utensile",
            text: "Negli strati non planari l’ugello deve seguire la superficie mentre il robot resta entro i limiti degli assi e lontano dalle singolarità.",
          },
          {
            title: "Moto ed estrusione",
            text: "La deposizione deve restare costante mentre il robot raccorda molti segmenti lineari brevi.",
          },
          {
            title: "Dalla simulazione alla macchina",
            text: "Un percorso che in simulazione sembra corretto deve comunque essere raggiungibile, sicuro e ripetibile sulla cella reale.",
          },
        ],
      },
      {
        id: "solutions",
        title: "Soluzioni",
        items: [
          {
            title: "Coordinate riferite al pezzo",
            text: "Tutti i punti sono espressi nella BASE di stampa, quindi ricalibrare il piano non richiede di rigenerare la logica del percorso.",
          },
          {
            title: "Orientamento dalla geometria",
            text: "L’orientamento utensile deriva dai piani target in Grasshopper ed è verificato in KUKA|prc prima della generazione del codice.",
          },
          {
            title: "Post processor proprio",
            text: "Scrivere il KRL da Python rende espliciti e regolabili, strato per strato, tipo di moto, raccordo, velocità e comandi dell’estrusore.",
          },
          {
            title: "Test incrementali",
            text: "Prima corse a vuoto, poi stampe planari, poi non planari — ogni passo sul robot reale.",
          },
        ],
      },
      {
        id: "results",
        title: "Risultati",
        body: [
          "Il workflow è stato messo alla prova con una serie di stampe via via più impegnative: un vaso, una sedia di design, una struttura a nido d’ape.",
          "Il passo più significativo è arrivato per ultimo: la prima stampa in ironing su un oggetto non planare, con il robot che segue la superficie curva invece di procedere per strati piani. Il risultato è discreto e indica con chiarezza dove lavorare: una fuoriuscita del materiale più regolare e l’implementazione definitiva dell’inclinazione non planare dell’utensile.",
        ],
        media: [
          {
            kind: "image",
            label: "Prima stampa in ironing non planare",
            aspect: "3/4",
            src: `${img}/result-01.jpg`,
            alt: "Estrusore che deposita materiale rosso lungo la superficie curva superiore di un pezzo",
          },
          { kind: "video", label: "Ironing non planare", aspect: "3/4", src: `${img}/print.mp4`, poster: `${img}/print-poster.jpg` },
        ],
      },
      {
        id: "technologies",
        title: "Tecnologie",
        stackGroups: [
          { label: "Robot", items: ["KUKA KR16", "KRL", "Frame TOOL / BASE"] },
          { label: "Progettazione", items: ["Rhino", "Grasshopper", "KUKA|prc"] },
          { label: "Software", items: ["Python", "Post processing"] },
          { label: "Processo", items: ["Stampa planare", "Stampa non planare", "Gestione estrusore"] },
        ],
      },
      {
        id: "gallery",
        title: "Galleria",
        media: [
          { kind: "image", label: "Cella robotica — KUKA su asse lineare", aspect: "1/1", fit: "contain", src: `${img}/cell.png`, alt: "Robot KUKA montato su un asse lineare accanto al piano di lavoro" },
          { kind: "image", label: "Estrusore sulla flangia", aspect: "3/4", src: `${img}/extruder.jpg`, alt: "Estrusore con tramoggia montato sulla flangia del robot" },
          { kind: "screenshot", label: "KUKA|prc — simulazione", aspect: "16/9", src: `${img}/prc-01.jpg`, alt: "Vista Rhino con il robot, l’asse lineare e un percorso utensile sopra il tavolo" },
          { kind: "image", label: "Honeycomb — stampa", aspect: "3/4", src: `${img}/honeycomb.jpg`, alt: "Struttura a nido d’ape stampata sul piano di stampa" },
          { kind: "image", label: "Sedia da design — stampa", aspect: "3/4", src: `${img}/sedia.jpg`, alt: "Robot che stampa il guscio curvo di una sedia" },
          { kind: "video", label: "Video della macchina", aspect: "3/4", src: `${img}/machine.mp4`, poster: `${img}/machine-poster.jpg` },
        ],
      },
    ],
  },
};
