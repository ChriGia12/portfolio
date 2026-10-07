import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  knowsAbout: [...site.focus, "Additive Manufacturing", "CAD", "Python"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <section aria-labelledby="work-title" className="shell pb-8 pt-16 lg:pt-28">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="01">
            <span id="work-title">Selected Projects</span>
          </SectionLabel>
          <ButtonLink href="/projects" variant="text" className="hidden sm:inline-flex">
            All projects
          </ButtonLink>
        </div>

        <div className="mt-10 space-y-20 lg:mt-14 lg:space-y-32">
          {projects.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectFeature project={project} index={i} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <About index="02" />
      <div className="border-t border-line" />
      <Skills index="03" />
      <div className="border-t border-line" />
      <Experience index="04" />

      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 border border-line p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="label text-dim">Curriculum Vitae</p>
            <p className="mt-2 text-xl font-medium tracking-tight">
              The short version, on one page.
            </p>
          </div>
          <ButtonLink href={site.cv} variant="primary" download>
            Download CV
          </ButtonLink>
        </div>
      </div>

      <Contact index="05" />
    </>
  );
}
