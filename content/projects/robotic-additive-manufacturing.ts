import type { Project } from "@/lib/types";

const dir = "/public/projects/robotic-additive-manufacturing";

/**
 * NOTE: the copy below is a first draft written from the project outline.
 * Check every sentence against what actually happened, and fill the
 * sections marked `placeholder: true` with real data.
 */
export const roboticAdditiveManufacturing: Project = {
  slug: "robotic-additive-manufacturing",
  title: "Robotic Additive Manufacturing",
  year: "[YEAR]",
  category: "Robotics · Additive Manufacturing",
  status: "completed",
  summary:
    "A design-to-robot workflow that turns Rhino geometry into KRL motion for planar and non-planar printing on a KUKA KR16.",
  intro:
    "A university and experimental project built around a 6-axis industrial robot. I designed the workflow from parametric toolpath to robot code, wrote the Python post processor that generates KRL, and tested the result on the real machine.",
  stack: ["KUKA KR16", "Rhino", "Grasshopper", "KUKA|prc", "Python", "KRL"],
  specs: [
    { label: "Robot", value: "KUKA KR16 · 6 axes" },
    { label: "Process", value: "Planar + non-planar extrusion" },
    { label: "Role", value: "Workflow, post processor, testing" },
    { label: "Context", value: "[UNIVERSITY LAB / COURSE]" },
  ],
  coverArt: "toolpath",
  // cover: { kind: "image", label: "Robot printing", src: "/projects/robotic-additive-manufacturing/cover.jpg", alt: "…" },

  pipeline: [
    { name: "Rhino", role: "Part geometry and print surfaces", output: "NURBS" },
    {
      name: "Grasshopper",
      role: "Parametric slicing, toolpath and tool orientation",
      output: "Planes",
    },
    {
      name: "KUKA|prc",
      role: "Robot simulation, reachability and axis checks",
      output: "Verified path",
    },
    {
      name: "Python post processor",
      role: "Frames to motion commands, TOOL / BASE, extruder I/O",
      output: ".src",
    },
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
          aspect: "16/9",
          hint: `${dir}/grasshopper-01.png`,
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
      code: [
        {
          language: "python",
          filename: "post_processor.py",
          caption:
            "Illustrative excerpt — replace with the real post processor code.",
          code: `def lin(plane, blend=True):
    """Target plane -> KRL linear move in the active BASE."""
    x, y, z = plane.origin
    a, b, c = to_kuka_abc(plane)          # ZYX Euler angles, degrees
    suffix = " C_DIS" if blend else ""
    return (
        f"LIN {{X {x:.3f}, Y {y:.3f}, Z {z:.3f}, "
        f"A {a:.3f}, B {b:.3f}, C {c:.3f}}}{suffix}"
    )


def write_program(name, layers, tool, base):
    lines = [f"DEF {name}()", "  BAS(#INITMOV, 0)"]
    lines += [f"  $TOOL = TOOL_DATA[{tool}]", f"  $BASE = BASE_DATA[{base}]"]
    for layer in layers:
        lines.append("  " + ptp(layer.approach))
        lines.append("  " + extruder(on=True))
        lines += ["  " + lin(p) for p in layer.planes]
        lines.append("  " + extruder(on=False))
    lines.append("END")
    return "\\n".join(lines)`,
        },
        {
          language: "krl",
          filename: "print_part.src",
          caption: "Illustrative excerpt — replace with a generated program.",
          code: `DEF print_part()
  BAS(#INITMOV, 0)
  $TOOL = TOOL_DATA[1]
  $BASE = BASE_DATA[1]

  PTP {A1 0, A2 -90, A3 90, A4 0, A5 30, A6 0}
  $VEL.CP = 0.02

  PTP {X 120.000, Y 80.000, Z 20.000, A 0.000, B 90.000, C 0.000}
  $OUT[1] = TRUE                 ; extruder on
  LIN {X 120.000, Y 80.000, Z 0.400, A 0.000, B 90.000, C 0.000} C_DIS
  LIN {X 180.000, Y 80.000, Z 0.400, A 0.000, B 90.000, C 0.000} C_DIS
  LIN {X 180.000, Y 140.000, Z 0.400, A 0.000, B 90.000, C 0.000} C_DIS
  $OUT[1] = FALSE                ; extruder off
END`,
        },
      ],
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
      placeholder: true,
      body: [
        "[PLACEHOLDER — describe what was printed, what worked and what you measured. Add real numbers only: part size, layer height, print time, accuracy.]",
      ],
      media: [
        {
          kind: "image",
          label: "Printed part",
          aspect: "4/3",
          hint: `${dir}/result-01.jpg`,
        },
        {
          kind: "video",
          label: "Robot printing",
          aspect: "4/3",
          hint: `${dir}/print.mp4`,
        },
      ],
    },
    {
      id: "technologies",
      title: "Technologies",
      stackGroups: [
        { label: "Robot", items: ["KUKA KR16", "KRL", "TOOL / BASE frames"] },
        { label: "Design", items: ["Rhino", "Grasshopper", "KUKA|prc"] },
        { label: "Software", items: ["Python", "Post processing"] },
        {
          label: "Process",
          items: ["Planar printing", "Non-planar printing", "Extruder control"],
        },
      ],
    },
    {
      id: "gallery",
      title: "Gallery",
      media: [
        { kind: "cad", label: "CAD — cell and end effector", aspect: "16/9", hint: `${dir}/cad-01.png` },
        { kind: "screenshot", label: "Grasshopper — toolpath", aspect: "4/3", hint: `${dir}/grasshopper-02.png` },
        { kind: "screenshot", label: "KUKA|prc — simulation", aspect: "4/3", hint: `${dir}/prc-01.png` },
        { kind: "image", label: "Extruder on the flange", aspect: "3/4", hint: `${dir}/extruder.jpg` },
        { kind: "image", label: "Non-planar test", aspect: "3/4", hint: `${dir}/nonplanar.jpg` },
        { kind: "video", label: "Machine video", aspect: "16/9", hint: `${dir}/machine.mp4` },
      ],
    },
  ],
};
