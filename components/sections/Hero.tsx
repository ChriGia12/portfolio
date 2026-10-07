import { site } from "@/content/site";
import { href, ui, type Locale } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RobotWireframe } from "@/components/technical/RobotWireframe";

const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero({ lang }: { lang: Locale }) {
  const t = ui[lang];
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="sheet-grid fade-edges absolute inset-0 opacity-35" />

      <div className="shell relative grid gap-x-8 gap-y-12 pb-14 pt-14 sm:pt-20 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:items-center lg:pb-24 lg:pt-16">
        <div className="lg:col-span-7">
          {/* The name is visible immediately; the rest follows with a short CSS stagger. */}
          <h1 className="text-[clamp(3rem,9.5vw,7.25rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            {site.name.split(" ").map((word) => (
              <span key={word} className="block">
                {word}{" "}
              </span>
            ))}
          </h1>

          <div className="rise" style={delay(0.05)}>
            <p className="mt-8 text-lg font-medium tracking-tight sm:text-xl">{t.site.role}</p>
            <p className="label mt-2 text-muted">
              {t.site.focus.map((f, i) => (
                <span key={f}>
                  {i > 0 && <span className="mx-2 text-accent">•</span>}
                  {f}
                </span>
              ))}
            </p>
          </div>

          <p
            className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            style={delay(0.1)}
          >
            {t.site.tagline}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-4" style={delay(0.15)}>
            <ButtonLink href={href(lang, "/projects")} variant="primary">
              {t.hero.viewProjects}
            </ButtonLink>
            <ButtonLink href={href(lang, "/about")}>{t.hero.aboutMe}</ButtonLink>
            <span className="flex gap-6 pl-2 sm:pl-4">
              <ButtonLink href={site.links.github} variant="text" external>
                GitHub
              </ButtonLink>
              <ButtonLink href={site.links.linkedin} variant="text" external>
                LinkedIn
              </ButtonLink>
            </span>
          </div>
        </div>

        <div className="rise lg:col-span-5" style={delay(0.15)}>
          {/* Swap for a photo or a real render of the robot cell when available. */}
          <RobotWireframe
            label={t.a11y.robot}
            layerLabel={t.hero.layer}
            className="mx-auto max-w-md pb-7 pt-2 lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
