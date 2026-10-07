import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/content/projects";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { Timeline } from "@/components/projects/Timeline";
import { ProjectNav } from "@/components/projects/ProjectNav";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <article>
      <ProjectHeader project={project} />

      {project.objectives && (
        <section aria-labelledby="objectives-title" className="shell mt-20 lg:mt-28">
          <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="01">
                <span id="objectives-title">Objectives</span>
              </SectionLabel>
            </div>
            <Reveal className="lg:col-span-9">
              <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                {project.objectives.map((o, i) => (
                  <li key={o} className="flex items-baseline gap-4 border-b border-line py-4 text-lg tracking-tight">
                    <span className="label text-dim">{String(i + 1).padStart(2, "0")}</span>
                    {o}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>
      )}

      {project.caseStudy && <CaseStudy project={project} />}

      {project.timeline && (
        <section aria-labelledby="log-title" className="shell mt-20 lg:mt-28">
          <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="02">
                <span id="log-title">Engineering Log</span>
              </SectionLabel>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                A running record of the build. Each phase collects notes, CAD,
                photos and results as the project moves forward.
              </p>
            </div>
            <div className="min-w-0 lg:col-span-9">
              <Timeline phases={project.timeline} />
            </div>
          </div>
        </section>
      )}

      <ProjectNav previous={previous} next={next} />
    </article>
  );
}
