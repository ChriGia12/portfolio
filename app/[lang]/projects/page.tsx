import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/content/projects";
import { alternates, isLocale, ui } from "@/lib/i18n";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { OtherProjects } from "@/components/projects/OtherProjects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export async function generateMetadata(props: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const t = ui[lang].projects;
  return { title: t.label, description: t.meta, alternates: alternates(lang, "/projects") };
}

export default async function ProjectsPage(props: PageProps<"/[lang]/projects">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = ui[lang].projects;
  const projects = getProjects(lang);

  return (
    <>
    <div className="shell pb-8 pt-14 sm:pt-20">
      <SectionLabel>
        {t.label} · {String(projects.length).padStart(2, "0")}
      </SectionLabel>
      <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
        {t.title[0]}
        <span className="text-muted">{t.title[1]}</span>
      </h1>

      <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <ProjectFeature lang={lang} project={project} index={i} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
    <div className="pb-8">
      <OtherProjects lang={lang} />
    </div>
    </>
  );
}
