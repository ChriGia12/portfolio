import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { getProjects } from "@/content/projects";
import { alternates, href, isLocale, ui } from "@/lib/i18n";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionLabel } from "@/components/ui/SectionLabel";

export async function generateMetadata(props: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  return { title: "CV", description: ui[lang].cv.meta, alternates: alternates(lang, "/cv") };
}

export default async function CvPage(props: PageProps<"/[lang]/cv">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = ui[lang];

  return (
    <>
      <section className="shell pt-14 sm:pt-20">
        <SectionLabel>{t.cv.label}</SectionLabel>
        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
              {site.name}
            </h1>
            <p className="mt-4 text-lg text-muted">
              {t.site.role} — {t.site.focus.join(", ")}
            </p>
          </div>
          <ButtonLink href={site.cv[lang]}variant="primary" download>
            {t.cv.download}
          </ButtonLink>
        </div>
        <p className="mt-10 max-w-2xl border-t border-line pt-8 text-lg leading-relaxed text-muted">
          {t.site.tagline}
        </p>
      </section>

      <Experience lang={lang} />
      <div className="border-t border-line" />
      <Skills lang={lang} />
      <div className="border-t border-line" />

      <section aria-labelledby="cv-projects" className="shell py-24 lg:py-32">
        <SectionLabel>
          <span id="cv-projects">{t.cv.projects}</span>
        </SectionLabel>
        <ul className="mt-10 border-t border-line">
          {getProjects(lang).map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={href(lang, `/projects/${p.slug}`)}
                className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-12"
              >
                <span className="label pt-1.5 text-dim md:col-span-3">{p.year}</span>
                <span className="md:col-span-8">
                  <span className="block text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-[15px] leading-relaxed text-muted">
                    {p.summary}
                  </span>
                </span>
                <span aria-hidden className="hidden font-mono text-dim transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:block md:text-right">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
