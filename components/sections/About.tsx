import { disciplines } from "@/content/skills";
import { href, ui, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Short About block for the homepage. The full version lives in /about. */
export function About({ lang, index }: { lang: Locale; index?: string }) {
  const t = ui[lang];
  return (
    <section aria-labelledby="about-title" className="shell py-16 sm:py-24 lg:py-36">
      <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <SectionLabel index={index}>
            <span id="about-title">{t.about.label}</span>
          </SectionLabel>
        </div>
        <div className="lg:col-span-9">
          <Reveal>
            <p className="text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-[-0.025em]">
              {t.about.lead[0]}
              <span className="text-muted">{t.about.lead[1]}</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{t.about.body}</p>
            <ul className="label mt-8 flex flex-wrap gap-x-3 gap-y-2 text-muted" aria-label={t.a11y.disciplines}>
              {disciplines[lang].map((d, i) => (
                <li key={d}>
                  {i > 0 && <span aria-hidden className="mr-3 text-accent">+</span>}
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href={href(lang, "/about")} variant="text">
                {t.about.more}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
