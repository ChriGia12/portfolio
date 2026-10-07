import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { getProjects } from "@/content/projects";
import { href, isLocale, ui } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = ui[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: t.site.role,
    description: t.site.description,
    url: `${site.url}/${lang}`,
    knowsAbout: [...t.site.focus, "Additive Manufacturing", "CAD", "Python"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero lang={lang} />

      <section aria-labelledby="work-title" className="shell pb-8 pt-16 lg:pt-28">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="01">
            <span id="work-title">{t.home.selected}</span>
          </SectionLabel>
          <ButtonLink href={href(lang, "/projects")} variant="text" className="hidden sm:inline-flex">
            {t.home.all}
          </ButtonLink>
        </div>

        <div className="mt-10 space-y-20 lg:mt-14 lg:space-y-32">
          {getProjects(lang).map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectFeature lang={lang} project={project} index={i} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <About lang={lang} index="02" />
      <div className="border-t border-line" />
      <Skills lang={lang} index="03" />
      <div className="border-t border-line" />
      <Experience lang={lang} index="04" />

      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 border border-line p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="label text-dim">{t.home.cvLabel}</p>
            <p className="mt-2 text-xl font-medium tracking-tight">{t.home.cvLine}</p>
          </div>
          <ButtonLink href={site.cv} variant="primary" download>
            {t.home.downloadCv}
          </ButtonLink>
        </div>
      </div>

      <Contact lang={lang} index="05" />
    </>
  );
}
