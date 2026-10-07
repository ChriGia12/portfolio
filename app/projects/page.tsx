import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Robotics, automation and digital manufacturing projects: robotic additive manufacturing on a KUKA KR16 and a 6-DOF desktop robotic arm.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="shell pb-8 pt-14 sm:pt-20">
      <SectionLabel>Projects · {String(projects.length).padStart(2, "0")}</SectionLabel>
      <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
        Physical systems, <span className="text-muted">and the software that moves them.</span>
      </h1>

      <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <ProjectFeature project={project} index={i} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
