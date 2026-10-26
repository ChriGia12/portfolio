import type { Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

/** Media files live in public/projects/orbinel-motion/. */
const img = "/projects/orbinel-motion";

/** Written from the Orbinel Motion source (Orbinel/motion in the Orbinel project folder). */
const shared = {
  slug: "orbinel-motion",
  title: "Orbinel Motion",
  year: "2026 — ongoing",
  status: "in-development",
  coverArt: "arm",
  shareImage: `${img}/analisi.jpg`,
  stack: ["JavaScript", "Three.js", "Web Serial", "Feetech STS protocol", "Kinematics", "Statics"],
  cover: { kind: "screenshot", label: "Orbinel Motion", src: `${img}/analisi.jpg`, alt: "Orbinel Motion: the Kheiron arm in 3D with joint sliders and the torque analysis panel" },
} as const;

const app = "https://orbinel.it/motion/";
const site = "https://orbinel.it/";

export const orbinelMotion: Record<Locale, Project> = {
  en: {
    ...shared,
    stack: [...shared.stack],
    category: "Software · Robot simulation · Orbinel Robotics",
    summary:
      "An open-source browser simulator for the Kheiron arm: kinematics, static torque analysis, workspace and lessons — and the same app drives the real robot over USB.",
    intro:
      "Orbinel Motion started as the control panel of Kheiron and became the simulator of Orbinel Robotics. It loads the arm from the CAD meshes, solves its kinematics, estimates the load on every servo in the current pose and checks every move before it can reach the robot. It runs in the browser with no installation, it is released under the MIT licence, and it is the base of a robotics course for schools.",
    links: [
      { label: "Open the simulator", href: app },
      { label: "Orbinel Robotics", href: site },
    ],
    specs: [
      { label: "Type", value: "Web app · runs in the browser" },
      { label: "Robot", value: "Kheiron · 6 axes · spherical wrist" },
      { label: "Connection", value: "Web Serial · Feetech STS bus at 1 Mbaud" },
      { label: "Licence", value: "MIT" },
    ],
    pipeline: [
      { name: "CAD meshes", role: "STL files of every link, exported from the Fusion model", output: "Model" },
      { name: "Kinematics", role: "Forward and closed-form inverse kinematics, solution closest to the current pose", output: "Joint angles" },
      { name: "Checks", role: "Joint limits, gripper against the table or the base", output: "Safe pose" },
      { name: "Analysis", role: "Masses from mesh volumes, gravity torque per joint, servo margins, singularities", output: "Estimate" },
      { name: "Robot", role: "Feetech packets over Web Serial, through the ESP32 bridge", output: "Motion" },
    ],
    caseStudy: [
      {
        id: "problem",
        title: "Problem",
        body: [
          "A desktop arm driven by hobby servos has little margin: a pose that looks harmless can ask the shoulder for more torque than the servos give, and a wrong command can drive the gripper into the table.",
          "I wanted to know, before printing and wiring anything, whether each pose is reachable, safe and within the motors — and to use the same tool to drive the real robot, so that what is checked is exactly what is sent.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        body: ["One page, the same code for simulation and hardware."],
        bullets: [
          "Move the arm from joint sliders or from a target point and orientation; the inverse kinematics picks the solution closest to the current pose.",
          "Every pose is checked against joint limits and collisions with the table and the base: an unsafe pose turns the model red and is never sent.",
          "The gripper can be swapped for the tools of Orbinel Parts, and the kinematics and torques follow the tool.",
          "Poses can be saved and played back as timed sequences, with a countdown before the robot moves.",
          "With the robot connected, the simulation and the arm move together; the servo panel scans the bus, changes IDs, calibrates the zero and shows voltage, temperature and load.",
        ],
      },
      {
        id: "system-architecture",
        title: "System Architecture",
        body: [
          "Plain JavaScript modules on top of three.js. The robot description (link lengths, joint limits, meshes, material, servo data) lives in one file, so the same simulator can host other robots of the family.",
        ],
        showPipeline: true,
      },
      {
        id: "analysis",
        title: "Static Analysis",
        body: [
          "The analysis is an estimate, and the page says so: no friction, no accelerations. It is meant to be compared with the real robot.",
        ],
        items: [
          {
            title: "Masses from the CAD",
            text: "Volume and centre of mass of every link are computed from the closed STL meshes (signed tetrahedra), then turned into grams for PETG printed at 55 % of solid, plus 55 g for each servo.",
          },
          {
            title: "Gravity torque per joint",
            text: "For the current pose and the payload in the gripper (0–500 g), the static torque on each joint axis in kg·cm, compared with the STS3215 at 12 V: about 10 kg·cm continuous, 30 kg·cm peak. The shoulder counts two servos.",
          },
          {
            title: "Margins and payload",
            text: "Each joint shows its margin against the continuous torque, coloured green, amber or red, and the panel gives the largest payload the arm can hold in that pose.",
          },
          {
            title: "Singularities and workspace",
            text: "Warnings for the straight wrist, the fully stretched arm and the wrist above the base axis. A cloud of 5000 random poses within the limits shows the reachable space, red where a pose would collide.",
          },
        ],
      },
      {
        id: "tools",
        title: "Tools",
        body: [
          "The gripper can be swapped for any tool of Orbinel Parts — calibration stylus, marker holder, 1/4\" camera mount, suction cup holder, magnetic pick-up — built in the page by the same parametric generator as the website (manifold-3d), with the same dimensions.",
          "The tool sits on the standard Kheiron tool interface at the J6 flange. Changing it updates the 3D model, the tool centre point used by the kinematics and the masses used by the torque analysis; the STL can be downloaded from the same panel.",
        ],
        media: [
          {
            kind: "screenshot",
            label: "Calibration stylus mounted instead of the gripper",
            aspect: "16/9",
            fit: "contain",
            src: `${img}/utensile.jpg`,
            alt: "Kheiron with a conical stylus on the wrist; on the right, the Tool panel with the stylus parameters",
          },
        ],
      },
      {
        id: "lessons",
        title: "Lessons for Schools",
        body: [
          "Six lessons run inside the simulator, in Italian and English, for technical schools: joints and degrees of freedom, workspace and limits, forward and inverse kinematics, singularities, torque and motor sizing, sequences and pick-and-place.",
          "Each lesson has goals, a short explanation, exercises that check themselves while the student moves the arm, and a question. Teacher notes and student sheets come with it.",
        ],
      },
      {
        id: "safety",
        title: "Safety",
        items: [
          {
            title: "Nothing unsafe is sent",
            text: "Joint limits and collisions are checked on the computer before any command; a failed check blocks the move.",
          },
          {
            title: "Stop button in the firmware",
            text: "The ESP32 bridge reads a normally-closed emergency stop on its own: the arm holds its position and every movement command is dropped until it is released, even if the computer hangs.",
          },
          {
            title: "Stop from the page",
            text: "A STOP button, also on the Esc key, freezes all servos where they are.",
          },
        ],
      },
      {
        id: "limits",
        title: "Limits",
        bullets: [
          "Torques are static estimates from the CAD: real friction, print density and dynamic loads will differ.",
          "The simulator is complete; the first tests on the real servos are the next step.",
        ],
      },
      {
        id: "technologies",
        title: "Technologies",
        stackGroups: [
          { label: "Application", items: ["JavaScript", "HTML / CSS", "No build step"] },
          { label: "Geometry", items: ["manifold-3d (WASM)", "Parametric tools"] },
          { label: "3D", items: ["Three.js", "STL meshes from Fusion"] },
          { label: "Robot", items: ["Forward / inverse kinematics", "Static torque analysis", "Feetech STS protocol", "Web Serial"] },
        ],
      },
      {
        id: "gallery",
        title: "Gallery",
        media: [
          {
            kind: "screenshot",
            label: "Torque analysis with 150 g in the gripper",
            aspect: "4/3",
            fit: "contain",
            src: `${img}/analisi.jpg`,
            alt: "Kheiron reaching forward in 3D; on the right, joint sliders and bars with the torque and margin of each joint",
          },
          {
            kind: "screenshot",
            label: "Workspace — 5000 random poses, red where they would collide",
            aspect: "16/9",
            fit: "contain",
            src: `${img}/spazio.jpg`,
            alt: "The arm surrounded by a cloud of green and red points showing the reachable space",
          },
          {
            kind: "screenshot",
            label: "Lessons — exercises that check themselves",
            aspect: "16/9",
            fit: "contain",
            src: `${img}/lezioni.jpg`,
            alt: "Lesson 1, Joints and degrees of freedom: goals, explanation, exercises and a question",
          },
        ],
      },
    ],
  },

  it: {
    ...shared,
    year: "2026 — in corso",
    stack: ["JavaScript", "Three.js", "Web Serial", "Protocollo Feetech STS", "Cinematica", "Statica"],
    cover: { ...shared.cover, alt: "Orbinel Motion: il braccio Kheiron in 3D con i cursori dei giunti e il pannello di analisi delle coppie" },
    category: "Software · Simulazione robotica · Orbinel Robotics",
    summary:
      "Un simulatore open source nel browser per il braccio Kheiron: cinematica, analisi statica delle coppie, spazio di lavoro e lezioni. La stessa app comanda il robot vero via USB.",
    intro:
      "Orbinel Motion è nato come pannello di controllo di Kheiron ed è diventato il simulatore di Orbinel Robotics. Carica il braccio dalle mesh del CAD, ne risolve la cinematica, stima il carico su ogni servo nella posa attuale e controlla ogni movimento prima che possa arrivare al robot. Gira nel browser senza installazioni, è rilasciato con licenza MIT ed è la base di un percorso di robotica per le scuole.",
    links: [
      { label: "Apri il simulatore", href: app },
      { label: "Orbinel Robotics", href: site },
    ],
    specs: [
      { label: "Tipo", value: "App web · gira nel browser" },
      { label: "Robot", value: "Kheiron · 6 assi · polso sferico" },
      { label: "Collegamento", value: "Web Serial · bus Feetech STS a 1 Mbaud" },
      { label: "Licenza", value: "MIT" },
    ],
    pipeline: [
      { name: "Mesh del CAD", role: "File STL di ogni link, esportati dal modello Fusion", output: "Modello" },
      { name: "Cinematica", role: "Diretta e inversa in forma chiusa, soluzione più vicina alla posa attuale", output: "Angoli dei giunti" },
      { name: "Controlli", role: "Limiti dei giunti, pinza contro il tavolo o la base", output: "Posa sicura" },
      { name: "Analisi", role: "Masse dai volumi delle mesh, coppia di gravità per giunto, margini dei servo, singolarità", output: "Stima" },
      { name: "Robot", role: "Pacchetti Feetech via Web Serial, attraverso il ponte ESP32", output: "Movimento" },
    ],
    caseStudy: [
      {
        id: "problem",
        title: "Problema",
        body: [
          "Un braccio desktop mosso da servo hobbistici ha poco margine: una posa che sembra innocua può chiedere alla spalla più coppia di quella che i servo danno, e un comando sbagliato può portare la pinza contro il tavolo.",
          "Volevo sapere, prima di stampare e cablare, se ogni posa è raggiungibile, sicura e dentro i limiti dei motori, e usare lo stesso strumento per comandare il robot vero, così quello che viene controllato è esattamente quello che viene inviato.",
        ],
      },
      {
        id: "approach",
        title: "Approccio",
        body: ["Una pagina, lo stesso codice per simulazione e hardware."],
        bullets: [
          "Il braccio si muove dai cursori dei giunti o da un punto e un orientamento bersaglio; la cinematica inversa sceglie la soluzione più vicina alla posa attuale.",
          "Ogni posa è controllata rispetto ai limiti dei giunti e alle collisioni con tavolo e base: una posa pericolosa colora di rosso il modello e non viene mai inviata.",
          "La pinza si può sostituire con gli utensili di Orbinel Parts, e cinematica e coppie seguono l’utensile.",
          "Le pose si salvano e si riproducono in sequenze temporizzate, con un conto alla rovescia prima che il robot si muova.",
          "Con il robot collegato, simulazione e braccio si muovono insieme; il pannello dei servo cerca i servo sul bus, ne cambia l’ID, calibra lo zero e mostra tensione, temperatura e carico.",
        ],
      },
      {
        id: "system-architecture",
        title: "Architettura del sistema",
        body: [
          "Moduli JavaScript semplici sopra three.js. La descrizione del robot (lunghezze dei link, limiti dei giunti, mesh, materiale, dati dei servo) sta in un solo file, così lo stesso simulatore può ospitare gli altri robot della famiglia.",
        ],
        showPipeline: true,
      },
      {
        id: "analysis",
        title: "Analisi statica",
        body: [
          "L’analisi è una stima, e la pagina lo dice: niente attriti, niente accelerazioni. Serve per essere confrontata con il robot vero.",
        ],
        items: [
          {
            title: "Masse dal CAD",
            text: "Volume e baricentro di ogni link si calcolano dalle mesh STL chiuse (tetraedri con segno), poi diventano grammi per PETG stampato al 55 % del pieno, più 55 g per ogni servo.",
          },
          {
            title: "Coppia di gravità per giunto",
            text: "Per la posa attuale e il carico in presa (0–500 g), la coppia statica su ogni asse in kg·cm, confrontata con lo STS3215 a 12 V: circa 10 kg·cm continui e 30 kg·cm di picco. La spalla conta due servo.",
          },
          {
            title: "Margini e carico",
            text: "Ogni giunto mostra il suo margine rispetto alla coppia continua, in verde, giallo o rosso, e il pannello indica il carico massimo che il braccio può tenere in quella posa.",
          },
          {
            title: "Singolarità e spazio di lavoro",
            text: "Avvisi per polso dritto, braccio disteso e polso sopra l’asse della base. Una nuvola di 5000 pose casuali entro i limiti mostra lo spazio raggiungibile, in rosso dove una posa andrebbe in collisione.",
          },
        ],
      },
      {
        id: "tools",
        title: "Utensili",
        body: [
          "La pinza si può sostituire con uno qualsiasi degli utensili di Orbinel Parts (stilo di calibrazione, portapennarello, attacco fotocamera 1/4\", supporto per ventosa, presa magnetica), costruiti nella pagina dallo stesso generatore parametrico del sito (manifold-3d), con le stesse misure.",
          "L’utensile si monta sull’attacco utensile standard di Kheiron, sulla flangia di J6. Cambiandolo si aggiornano il modello 3D, il punto utensile usato dalla cinematica e le masse usate dall’analisi delle coppie; dallo stesso pannello si scarica l’STL.",
        ],
        media: [
          {
            kind: "screenshot",
            label: "Stilo di calibrazione montato al posto della pinza",
            aspect: "16/9",
            fit: "contain",
            src: `${img}/utensile.jpg`,
            alt: "Kheiron con uno stilo conico sul polso; a destra il pannello Utensile con i parametri dello stilo",
          },
        ],
      },
      {
        id: "lessons",
        title: "Lezioni per le scuole",
        body: [
          "Sei lezioni girano dentro il simulatore, in italiano e in inglese, per gli istituti tecnici: giunti e gradi di libertà, spazio di lavoro e limiti, cinematica diretta e inversa, singolarità, coppie e scelta dei motori, sequenze e pick-and-place.",
          "Ogni lezione ha obiettivi, una breve spiegazione, esercizi che si verificano da soli mentre lo studente muove il braccio e una domanda. Con le lezioni ci sono le schede per il docente e per lo studente.",
        ],
      },
      {
        id: "safety",
        title: "Sicurezza",
        items: [
          {
            title: "Niente di pericoloso viene inviato",
            text: "Limiti dei giunti e collisioni si controllano sul computer prima di ogni comando; un controllo fallito blocca il movimento.",
          },
          {
            title: "Fungo di arresto nel firmware",
            text: "Il ponte ESP32 legge da solo un fungo di arresto normalmente chiuso: il braccio tiene la posizione e ogni comando di movimento viene scartato finché non viene rilasciato, anche se il computer si blocca.",
          },
          {
            title: "Arresto dalla pagina",
            text: "Un pulsante FERMA, anche con il tasto Esc, blocca tutti i servo dove sono.",
          },
        ],
      },
      {
        id: "limits",
        title: "Limiti",
        bullets: [
          "Le coppie sono stime statiche dal CAD: attriti reali, densità di stampa e carichi dinamici saranno diversi.",
          "Il simulatore è completo; le prime prove sui servo veri sono il passo successivo.",
        ],
      },
      {
        id: "technologies",
        title: "Tecnologie",
        stackGroups: [
          { label: "Applicazione", items: ["JavaScript", "HTML / CSS", "Nessuna build"] },
          { label: "Geometria", items: ["manifold-3d (WASM)", "Utensili parametrici"] },
          { label: "3D", items: ["Three.js", "Mesh STL da Fusion"] },
          { label: "Robot", items: ["Cinematica diretta / inversa", "Analisi statica delle coppie", "Protocollo Feetech STS", "Web Serial"] },
        ],
      },
      {
        id: "gallery",
        title: "Galleria",
        media: [
          {
            kind: "screenshot",
            label: "Analisi delle coppie con 150 g in presa",
            aspect: "4/3",
            fit: "contain",
            src: `${img}/analisi.jpg`,
            alt: "Kheiron proteso in avanti in 3D; a destra i cursori dei giunti e le barre con coppia e margine di ogni giunto",
          },
          {
            kind: "screenshot",
            label: "Spazio di lavoro — 5000 pose casuali, in rosso quelle in collisione",
            aspect: "16/9",
            fit: "contain",
            src: `${img}/spazio.jpg`,
            alt: "Il braccio circondato da una nuvola di punti verdi e rossi che mostra lo spazio raggiungibile",
          },
          {
            kind: "screenshot",
            label: "Lezioni — esercizi che si verificano da soli",
            aspect: "16/9",
            fit: "contain",
            src: `${img}/lezioni.jpg`,
            alt: "Lezione 1, Giunti e gradi di libertà: obiettivi, spiegazione, esercizi e una domanda",
          },
        ],
      },
    ],
  },
};
