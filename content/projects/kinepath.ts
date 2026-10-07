import type { Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

/** Media files live in public/projects/kinepath/. */
const img = "/projects/kinepath";

/** Written from the KinePath README. */
const shared = {
  slug: "kinepath",
  title: "KinePath",
  year: "2026",
  status: "completed",
  coverArt: "slicer",
  stack: ["TypeScript", "Three.js", "WebAssembly", "OpenCascade", "KRL", "Vitest", "Playwright"],
  // cover: { kind: "screenshot", label: "KinePath", src: "/projects/kinepath/cover.png", alt: "…" },
} as const;

const app = "https://chrigia12.github.io/KinePath/";
const repo = "https://github.com/ChriGia12/KinePath";

export const kinepath: Record<Locale, Project> = {
  en: {
    ...shared,
    stack: [...shared.stack],
    category: "Software · Robotic CAM",
    summary:
      "A browser application that takes a CAD model or mesh to a KUKA .src program: orientation, slicing, toolpath, reach and collision checks, KRL export.",
    intro:
      "A personal software project that grew out of the laboratory work on the KUKA. It replaces the Rhino and Grasshopper chain with one web application: load a part, choose how to print it, and download a robot program that has already been checked against the real cell. Everything runs in the browser; the model is never uploaded to a server.",
    links: [
      { label: "Open the app", href: app },
      { label: "Source code", href: repo },
    ],
    specs: [
      { label: "Type", value: "Web app · runs in the browser" },
      { label: "Robot", value: "KUKA KR16 R2010" },
      { label: "Input", value: "STL, OBJ, PLY, 3DM, STEP, IGES, BREP" },
      { label: "Output", value: "KUKA .src (KRL)" },
    ],
    pipeline: [
      { name: "Import", role: "Mesh and BREP files read directly in the browser", output: "Mesh" },
      { name: "Orientation", role: "Candidate orientations scored on overhangs, islands and contact area", output: "Placed part" },
      { name: "Slicing", role: "Plane–mesh intersection, contours chained through the mesh topology", output: "Contours" },
      { name: "Toolpath", role: "Four print modes; links extruded only where they rest on material", output: "Path" },
      { name: "Checks", role: "Inverse kinematics, axis limits and collisions along the whole path", output: "Verified path" },
      { name: "KRL writer", role: "LIN and PTP moves, extruder I/O, shutdown and homing", output: ".src" },
    ],
    caseStudy: [
      {
        id: "problem",
        title: "Problem",
        body: [
          "KinePath started from the process-planning needs that came up during the laboratory tests. Going from a part to a robot program meant a chain of Rhino, Grasshopper and a Python postprocessor.",
          "The goal was a single tool that does the whole job — and checks the result before anything reaches the robot.",
        ],
      },
      {
        id: "approach",
        title: "Approach",
        body: ["Four steps, one page, no installation."],
        bullets: [
          "Load a mesh or BREP model. Several parts can be placed on the table and are printed one after the other.",
          "The application proposes the best orientation; you choose the print mode.",
          "It computes the toolpath that follows the contour of the part within the set tolerance (0.2 mm by default), layer by layer.",
          "It exports the KUKA .src file, with BASE and TOOL, extruder I/O, LIN moves, shutdown and homing.",
        ],
      },
      {
        id: "system-architecture",
        title: "System Architecture",
        body: [
          "The computation runs in a Web Worker, so the 3D view stays responsive. CAD import uses OpenCascade and rhino3dm compiled to WebAssembly and served by the site itself.",
        ],
        showPipeline: true,
      },
      {
        id: "print-modes",
        title: "Print Modes",
        items: [
          {
            title: "Contour layers",
            text: "The contour of every layer at constant height. At the layer change the bead climbs gradually along the new loop, like one continuous thread.",
          },
          {
            title: "Contour spiral",
            text: "The height rises along the turn, with no seam. Used when every layer is a single contour.",
          },
          {
            title: "Solid serpentine",
            text: "The solid part filled with a continuous serpentine. Planar layers first, then blended non-planar layers that go from flat to the shape of the top surface.",
          },
          {
            title: "Top surface serpentine",
            text: "Non-planar: the serpentine follows the top surface of the part, with the tool optionally tilted to follow the slope.",
          },
        ],
      },
      {
        id: "checks",
        title: "Checks Before Export",
        body: [
          "The download button stays disabled until the program has passed every check on the real cell geometry.",
        ],
        items: [
          {
            title: "Reach and axis limits",
            text: "Inverse kinematics is solved for every toolpath point and for intermediate points of each LIN, sampled every 20 mm, against the KR16 axis limits.",
          },
          {
            title: "Collisions",
            text: "The path is replayed bead by bead: forearm, wrist and spindle must not touch the plate or the material already deposited. PTP moves are checked too, with the controller's axis interpolation.",
          },
          {
            title: "Printability",
            text: "Overhangs beyond the critical angle, islands starting in mid-air and walls thinner than one bead are highlighted on the part and require an explicit confirmation.",
          },
          {
            title: "No outdated results",
            text: "Parameters are validated before computing, and a result can only be downloaded once the latest computation has finished.",
          },
        ],
      },
      {
        id: "development",
        title: "Development",
        items: [
          {
            title: "Simulation",
            text: "The robot runs the LIN moves of the .src file at the programmed speed, multiplied by 1–500×, showing the current line, the X Y Z A B C values and the A1–A6 angles.",
          },
          {
            title: "Tool tilt",
            text: "The tool leans like the wall it is printing, up to a maximum tilt of 30° by default, so on overhangs the bead is pushed against the layer below.",
          },
          {
            title: "Supports",
            text: "None, in the same program, or in a separate file printed first. A separation layer is left under the part so the support comes off cleanly.",
          },
          {
            title: "Cutting a part",
            text: "If a part cannot be printed without supports in any orientation, the application looks for a cut that makes both pieces printable and suggests it.",
          },
        ],
      },
      {
        id: "limits",
        title: "Limits",
        body: ["The limits are stated in the tool, not hidden."],
        bullets: [
          "The collision check samples the geometry (points every 8 mm on the spindle, 25 mm on the arm) and ignores the upper arm and the robot base.",
          "The check of intermediate LIN points covers the programmed path, not the blended trajectory the controller runs with C_DIS.",
          "Before printing, the .src must still be run dry or in the simulation of the real cell.",
        ],
      },
      {
        id: "testing",
        title: "Testing",
        items: [
          {
            title: "Engine tests",
            text: "Slicing, toolpath, orientation and the KUKA writer are covered by automated tests.",
          },
          {
            title: "Reference part",
            text: "A STEP part goes through the whole chain and the resulting .src is compared with a saved reference: if a change alters even one line, the test fails.",
          },
          {
            title: "Interface tests",
            text: "The user interface is tested in a real browser with Playwright.",
          },
          {
            title: "Continuous delivery",
            text: "Every push runs the tests and publishes the site.",
          },
        ],
      },
      {
        id: "technologies",
        title: "Technologies",
        stackGroups: [
          { label: "Application", items: ["TypeScript", "Vite", "Web Workers"] },
          { label: "3D and geometry", items: ["Three.js", "OpenCascade (WASM)", "rhino3dm", "Clipper"] },
          { label: "Robot", items: ["KR16 forward / inverse kinematics", "KRL .src writer"] },
          { label: "Testing", items: ["Vitest", "Playwright", "GitHub Actions"] },
        ],
      },
      {
        id: "gallery",
        title: "Gallery",
        media: [
          {
            kind: "screenshot",
            label: "The application — model, cell and toolpath",
            aspect: "2/1",
            fit: "contain",
            src: `${img}/app-01.png`,
            alt: "KinePath with a part on the table: model data on the left, the robot cell in 3D and the simulation panel",
          },
          { kind: "video", label: "Demo — cutting a part and simulating the print", aspect: "2/1", src: `${img}/demo.mp4`, poster: `${img}/demo-poster.jpg` },
        ],
      },
    ],
  },

  it: {
    ...shared,
    stack: [...shared.stack],
    category: "Software · CAM robotico",
    summary:
      "Un’applicazione nel browser che porta un modello CAD o una mesh fino al programma KUKA .src: orientamento, slicing, toolpath, controlli di raggiungibilità e collisione, export KRL.",
    intro:
      "Un progetto software personale nato dal lavoro in laboratorio sul KUKA. Sostituisce la catena Rhino e Grasshopper con un’unica applicazione web: carichi un pezzo, scegli come stamparlo e scarichi un programma robot già verificato sulla cella reale. Tutto gira nel browser; il modello non viene mai caricato su un server.",
    links: [
      { label: "Apri l’applicazione", href: app },
      { label: "Codice sorgente", href: repo },
    ],
    specs: [
      { label: "Tipo", value: "Web app · gira nel browser" },
      { label: "Robot", value: "KUKA KR16 R2010" },
      { label: "Input", value: "STL, OBJ, PLY, 3DM, STEP, IGES, BREP" },
      { label: "Output", value: "KUKA .src (KRL)" },
    ],
    pipeline: [
      { name: "Import", role: "File mesh e BREP letti direttamente nel browser", output: "Mesh" },
      { name: "Orientamento", role: "Orientamenti candidati valutati su sbalzi, isole e area di appoggio", output: "Pezzo posizionato" },
      { name: "Slicing", role: "Intersezione piano–mesh, contorni concatenati tramite la topologia della mesh", output: "Contorni" },
      { name: "Toolpath", role: "Quattro modalità di stampa; collegamenti estrusi solo dove poggiano su materiale", output: "Percorso" },
      { name: "Controlli", role: "Cinematica inversa, limiti degli assi e collisioni lungo tutto il percorso", output: "Percorso verificato" },
      { name: "Scrittura KRL", role: "Movimenti LIN e PTP, I/O estrusore, spegnimento e homing", output: ".src" },
    ],
    caseStudy: [
      {
        id: "problem",
        title: "Problema",
        body: [
          "KinePath nasce dalle esigenze di preparazione del processo emerse durante le prove di laboratorio. Passare da un pezzo a un programma robot richiedeva una catena di Rhino, Grasshopper e un postprocessore Python.",
          "L’obiettivo era un unico strumento che facesse tutto il lavoro — e verificasse il risultato prima che qualcosa arrivasse al robot.",
        ],
      },
      {
        id: "approach",
        title: "Approccio",
        body: ["Quattro passaggi, una pagina, nessuna installazione."],
        bullets: [
          "Carichi un modello mesh o BREP. Si possono disporre più pezzi sul piano, stampati uno dopo l’altro.",
          "L’applicazione propone l’orientamento migliore; tu scegli la modalità di stampa.",
          "Calcola il toolpath che segue il contorno del pezzo entro la tolleranza impostata (0,2 mm di default), strato per strato.",
          "Esporta il file KUKA .src, con BASE e TOOL, I/O dell’estrusore, movimenti LIN, spegnimento e homing.",
        ],
      },
      {
        id: "system-architecture",
        title: "Architettura del sistema",
        body: [
          "Il calcolo gira in un Web Worker, così la vista 3D resta fluida. L’import CAD usa OpenCascade e rhino3dm compilati in WebAssembly e serviti dal sito stesso.",
        ],
        showPipeline: true,
      },
      {
        id: "print-modes",
        title: "Modalità di stampa",
        items: [
          {
            title: "Strati a contorno",
            text: "Il contorno di ogni strato a quota costante. Al cambio strato il cordone sale gradualmente lungo il nuovo anello, come un unico filo continuo.",
          },
          {
            title: "Spirale a contorno",
            text: "La quota sale lungo il giro, senza cucitura. Si usa quando ogni strato è un solo contorno.",
          },
          {
            title: "Serpentina piena",
            text: "Il pieno del pezzo riempito con una serpentina continua. Prima strati planari, poi strati non planari raccordati che passano dal piano alla forma della superficie superiore.",
          },
          {
            title: "Serpentina sulla superficie",
            text: "Non planare: la serpentina segue la superficie superiore del pezzo, con l’utensile che può inclinarsi per seguire la pendenza.",
          },
        ],
      },
      {
        id: "checks",
        title: "Controlli prima dell’export",
        body: [
          "Il pulsante di download resta disattivato finché il programma non ha superato ogni controllo sulla geometria reale della cella.",
        ],
        items: [
          {
            title: "Raggiungibilità e limiti degli assi",
            text: "La cinematica inversa è risolta per ogni punto del toolpath e per i punti intermedi di ogni LIN, campionati ogni 20 mm, rispetto ai limiti degli assi del KR16.",
          },
          {
            title: "Collisioni",
            text: "Il percorso viene ripercorso cordone per cordone: avambraccio, polso e mandrino non devono toccare il piano né il materiale già depositato. Sono verificati anche i movimenti PTP, con l’interpolazione degli assi del controllore.",
          },
          {
            title: "Stampabilità",
            text: "Sbalzi oltre l’angolo critico, isole che partono nel vuoto e pareti più sottili di un cordone sono evidenziati sul pezzo e richiedono una conferma esplicita.",
          },
          {
            title: "Nessun risultato superato",
            text: "I parametri sono validati prima del calcolo, e un risultato si può scaricare solo quando l’ultimo calcolo è terminato.",
          },
        ],
      },
      {
        id: "development",
        title: "Sviluppo",
        items: [
          {
            title: "Simulazione",
            text: "Il robot esegue i movimenti LIN del file .src alla velocità programmata, moltiplicata da 1 a 500×, mostrando la riga corrente, i valori X Y Z A B C e gli angoli A1–A6.",
          },
          {
            title: "Inclinazione utensile",
            text: "L’utensile si inclina come la parete che sta stampando, fino a un massimo di 30° di default, così sugli sbalzi il cordone viene spinto contro lo strato sottostante.",
          },
          {
            title: "Supporti",
            text: "Nessuno, nello stesso programma, oppure in un file separato stampato per primo. Sotto il pezzo resta uno strato di separazione, così il supporto si stacca pulito.",
          },
          {
            title: "Taglio del pezzo",
            text: "Se un pezzo non è stampabile senza supporti in nessun orientamento, l’applicazione cerca un taglio che renda stampabili entrambe le parti e lo propone.",
          },
        ],
      },
      {
        id: "limits",
        title: "Limiti",
        body: ["I limiti sono dichiarati nello strumento, non nascosti."],
        bullets: [
          "Il controllo collisioni campiona la geometria (punti ogni 8 mm sul mandrino, 25 mm sul braccio) e ignora il braccio superiore e la base del robot.",
          "Il controllo dei punti intermedi dei LIN copre il percorso programmato, non la traiettoria raccordata che il controllore esegue con C_DIS.",
          "Prima di stampare, il file .src va comunque eseguito a vuoto o nella simulazione della cella reale.",
        ],
      },
      {
        id: "testing",
        title: "Test",
        items: [
          {
            title: "Test del motore",
            text: "Slicing, toolpath, orientamento e scrittura KUKA sono coperti da test automatici.",
          },
          {
            title: "Pezzo di riferimento",
            text: "Un pezzo STEP attraversa tutta la catena e il file .src risultante è confrontato con un riferimento salvato: se una modifica cambia anche una sola riga, il test fallisce.",
          },
          {
            title: "Test dell’interfaccia",
            text: "L’interfaccia utente è provata in un browser reale con Playwright.",
          },
          {
            title: "Pubblicazione continua",
            text: "Ogni push esegue i test e pubblica il sito.",
          },
        ],
      },
      {
        id: "technologies",
        title: "Tecnologie",
        stackGroups: [
          { label: "Applicazione", items: ["TypeScript", "Vite", "Web Workers"] },
          { label: "3D e geometria", items: ["Three.js", "OpenCascade (WASM)", "rhino3dm", "Clipper"] },
          { label: "Robot", items: ["Cinematica diretta / inversa KR16", "Scrittura KRL .src"] },
          { label: "Test", items: ["Vitest", "Playwright", "GitHub Actions"] },
        ],
      },
      {
        id: "gallery",
        title: "Galleria",
        media: [
          {
            kind: "screenshot",
            label: "L’applicazione — modello, cella e toolpath",
            aspect: "2/1",
            fit: "contain",
            src: `${img}/app-01.png`,
            alt: "KinePath con un pezzo sul piano: dati del modello a sinistra, la cella robotica in 3D e il pannello di simulazione",
          },
          { kind: "video", label: "Demo — taglio di un pezzo e simulazione della stampa", aspect: "2/1", src: `${img}/demo.mp4`, poster: `${img}/demo-poster.jpg` },
        ],
      },
    ],
  },
};
