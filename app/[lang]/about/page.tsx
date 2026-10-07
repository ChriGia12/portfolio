import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { disciplines } from "@/content/skills";
import { alternates, href, isLocale, ui } from "@/lib/i18n";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export async function generateMetadata(props: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const t = ui[lang].about;
  return { title: t.label, description: t.meta, alternates: alternates(lang, "/about") };
}

export default async function AboutPage(props: PageProps<"/[lang]/about">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const t = ui[lang];

  return (
    <>
      <section className="shell pb-8 pt-14 sm:pt-20">
        <SectionLabel>{t.about.label}</SectionLabel>
        <h1 className="mt-6 max-w-5xl text-[clamp(2.25rem,6.2vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {t.about.title[0]}
          <span className="text-muted">{t.about.title[1]}</span>
        </h1>

        <div className="mt-16 grid gap-x-8 gap-y-12 lg:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            {/* Add a portrait: set `src: "/portrait.jpg"` and put the file in /public. */}
            <MediaFrame
              lang={lang}
              media={{ kind: "image", label: t.about.portrait, aspect: "3/4", hint: "/public/portrait.jpg" }}
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              {t.about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-xl text-fg/90" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 border-t border-line">
              {[
                [t.about.basedIn, site.location],
                [t.about.studyingAt, site.university],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-line py-5">
                  <dt className="label text-dim">{k}</dt>
                  <dd className="mt-2 font-mono text-xs text-muted">{v}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-10 flex flex-wrap gap-2" aria-label={t.a11y.disciplines}>
              {disciplines[lang].map((d) => (
                <li key={d} className="label border border-line px-2.5 py-1.5 text-muted">
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={site.cv} variant="primary" download>
                {t.home.downloadCv}
              </ButtonLink>
              <ButtonLink href={href(lang, "/contact")}>{t.about.getInTouch}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Skills lang={lang} />
      <div className="border-t border-line" />
      <Experience lang={lang} />
    </>
  );
}
