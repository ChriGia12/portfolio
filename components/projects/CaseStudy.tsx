import type { Project } from "@/lib/types";
import { ui, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { CaseNav } from "./CaseNav";
import { SystemDiagram } from "./SystemDiagram";
import { CodeBlock } from "./CodeBlock";

const wide = (aspect?: string) => aspect === "16/9" || aspect === "21/9";

export function CaseStudy({ lang, project }: { lang: Locale; project: Project }) {
  const sections = project.caseStudy ?? [];
  const t = ui[lang];
  return (
    <div className="shell mt-20 grid gap-x-8 lg:mt-28 lg:grid-cols-12">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <CaseNav label={t.a11y.sections} sections={sections.map(({ id, title }) => ({ id, title }))} />
        </div>
      </aside>

      <div className="min-w-0 lg:col-span-9">
        {sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="border-t border-line py-14 first:border-t-0 first:pt-0 sm:py-20"
          >
            <Reveal>
              <p className="label text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.id}-title`} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                {s.title}
              </h2>
            </Reveal>

            {s.body && (
              <Reveal
                className={
                  s.placeholder
                    ? "mt-8 border border-dashed border-line p-5"
                    : "mt-8 max-w-2xl space-y-5"
                }
              >
                {s.placeholder && <p className="label mb-3 text-accent">{t.projects.todo}</p>}
                {s.body.map((p, k) => (
                  <p
                    key={k}
                    className={
                      s.placeholder
                        ? "font-mono text-xs leading-6 text-muted"
                        : k === 0
                          ? "text-xl leading-relaxed text-fg/90"
                          : "text-base leading-relaxed text-muted"
                    }
                  >
                    {p}
                  </p>
                ))}
              </Reveal>
            )}

            {s.bullets && (
              <Reveal className="mt-8 max-w-2xl">
                <ul className="border-t border-line">
                  {s.bullets.map((b, k) => (
                    <li key={k} className="flex gap-5 border-b border-line py-4 text-base leading-relaxed text-fg/85">
                      <span aria-hidden className="label pt-1.5 text-dim">
                        {String(k + 1).padStart(2, "0")}
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {s.showPipeline && project.pipeline && (
              <Reveal className="mt-10">
                <SystemDiagram nodes={project.pipeline} caption={t.projects.diagram} outLabel={t.projects.out} />
              </Reveal>
            )}

            {s.items && (
              <Reveal className="mt-10">
                <dl className="grid gap-x-8 sm:grid-cols-2">
                  {s.items.map((item, k) => (
                    <div key={item.title} className="border-t border-line py-6">
                      <dt className="flex items-baseline gap-3 text-lg font-medium tracking-tight">
                        <span className="label text-dim">{String(k + 1).padStart(2, "0")}</span>
                        {item.title}
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            {s.stackGroups && (
              <Reveal className="mt-10">
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-6 lg:grid-cols-4">
                  {s.stackGroups.map((g) => (
                    <div key={g.label}>
                      <h3 className="label text-dim">{g.label}</h3>
                      <ul className="mt-4 space-y-2 text-[15px]">
                        {g.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {s.code && (
              <div className="mt-10 grid gap-6">
                {s.code.map((c) => (
                  <Reveal key={c.filename}>
                    <CodeBlock sample={c} />
                  </Reveal>
                ))}
              </div>
            )}

            {s.media && (
              <div className="mt-10 grid items-center gap-x-6 gap-y-10 sm:grid-cols-2">
                {s.media.map((m) => (
                  <Reveal key={m.label} className={wide(m.aspect) ? "sm:col-span-2" : ""}>
                    <MediaFrame lang={lang} media={m} />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
