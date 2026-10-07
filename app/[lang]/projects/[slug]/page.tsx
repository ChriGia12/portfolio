import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, slugs } from "@/content/projects";
import { alternates, isLocale, locales, ui } from "@/lib/i18n";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { Timeline } from "@/components/projects/Timeline";
import { ProjectNav } from "@/components/projects/ProjectNav";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/projects/[slug]">,
): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const project = isLocale(lang) ? getProject(lang, slug) : undefined;
  if (!project || !isLocale(lang)) return {};
  const path = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: alternates(lang, path),
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/${lang}${path}`,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const project = getProject(lang, slug);
  if (!project) notFound();

  const t = ui[lang].projects;
  const { previous, next } = getAdjacentProjects(lang, project.slug);

  return (
    <article>
      <ProjectHeader lang={lang} project={project} />

      {project.objectives && (
        <section aria-labelledby="objectives-title" className="shell mt-20 lg:mt-28">
          <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="01">
                <span id="objectives-title">{t.objectives}</span>
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

      {project.caseStudy && <CaseStudy lang={lang} project={project} />}

      {project.timeline && (
        <section aria-labelledby="log-title" className="shell mt-20 lg:mt-28">
          <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <SectionLabel index="02">
                <span id="log-title">{t.log}</span>
              </SectionLabel>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{t.logIntro}</p>
            </div>
            <div className="min-w-0 lg:col-span-9">
              <Timeline lang={lang} phases={project.timeline} />
            </div>
          </div>
        </section>
      )}

      <ProjectNav lang={lang} previous={previous} next={next} />
    </article>
  );
}
