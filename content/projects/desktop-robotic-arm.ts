import type { Project } from "@/lib/types";

const dir = "/public/projects/desktop-robotic-arm";

/**
 * Engineering log. To post an update, add an entry to the `updates` array of
 * a phase and change its `status` ("planned" | "in-progress" | "done"):
 *
 *   { date: "2026-11-02", text: "First joint printed and assembled.",
 *     media: [{ kind: "image", label: "Joint 1", src: "/projects/desktop-robotic-arm/j1.jpg" }] }
 */
export const desktopRoboticArm: Project = {
  slug: "desktop-robotic-arm",
  title: "6-DOF Desktop Robotic Arm",
  year: "2026 — ongoing",
  category: "Robotics · Personal Project",
  status: "in-development",
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
  coverArt: "arm",
  // cover: { kind: "cad", label: "Arm assembly", src: "/projects/desktop-robotic-arm/cover.png", alt: "…" },

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
      status: "in-progress",
      summary:
        "Requirements, workspace, payload target and overall kinematic layout.",
      goals: ["Define requirements", "Choose the kinematic structure"],
      updates: [],
      media: [{ kind: "image", label: "Concept sketch", aspect: "4/3", hint: `${dir}/concept-01.jpg` }],
    },
    {
      id: "mechanical-design",
      title: "Mechanical Design",
      status: "planned",
      summary: "Full CAD of links, joints and housings, designed for 3D printing.",
      goals: ["Complete CAD assembly", "Design for printability"],
      updates: [],
      media: [{ kind: "cad", label: "CAD assembly", aspect: "4/3", hint: `${dir}/cad-01.png` }],
    },
    {
      id: "joint-prototyping",
      title: "Joint Prototyping",
      status: "planned",
      summary: "One joint built and tested in isolation: motor, transmission, bearing, encoder.",
      goals: ["Motor and transmission choice", "Single-joint test rig"],
      updates: [],
    },
    {
      id: "electronics",
      title: "Electronics",
      status: "planned",
      summary: "Motor drivers, controller, encoders, power and wiring.",
      goals: ["Driver and controller selection", "Encoder feedback"],
      updates: [],
    },
    {
      id: "control-software",
      title: "Control Software",
      status: "planned",
      summary: "Python layer for commanding joints and reading feedback.",
      goals: ["Joint-space motion", "Python control interface"],
      updates: [],
    },
    {
      id: "kinematics",
      title: "Kinematics",
      status: "planned",
      summary: "Forward and inverse kinematics, then Cartesian motion.",
      goals: ["Forward kinematics", "Inverse kinematics", "Cartesian moves"],
      updates: [],
    },
    {
      id: "assembly",
      title: "Assembly",
      status: "planned",
      summary: "All six axes printed, assembled and wired.",
      updates: [],
    },
    {
      id: "testing",
      title: "Testing",
      status: "planned",
      summary: "Motion tests, repeatability checks and a path towards ROS 2.",
      goals: ["Motion tests", "ROS 2 integration"],
      updates: [],
    },
  ],
};
