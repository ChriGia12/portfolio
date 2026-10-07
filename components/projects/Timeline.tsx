import type { PhaseStatus, TimelinePhase } from "@/lib/types";
import { ui, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";


function Marker({ status }: { status: PhaseStatus }) {
  if (status === "in-progress")
    return <span className="block h-3 w-3 bg-accent [animation:pulse-dot_2s_ease-in-out_infinite]" />;
  if (status === "done") return <span className="block h-3 w-3 bg-fg" />;
  return <span className="block h-3 w-3 border border-dim bg-bg" />;
}

/** Engineering log: one entry per phase, each ready to take updates and media. */
export function Timeline({ lang, phases }: { lang: Locale; phases: TimelinePhase[] }) {
  const t = ui[lang].projects;
  const statusLabel = t.status;
  const done = phases.filter((p) => p.status === "done").length;
  const current = phases.find((p) => p.status === "in-progress");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <p className="label text-muted">
          {done} / {phases.length} {t.phasesComplete}
          {current && (
            <>
              <span className="mx-2 text-dim">·</span>
              <span className="text-accent">{t.now}: {current.title}</span>
            </>
          )}
        </p>
        <ol aria-hidden className="flex gap-1">
          {phases.map((p) => (
            <li
              key={p.id}
              className={`h-1 w-6 sm:w-9 ${
                p.status === "done" ? "bg-fg" : p.status === "in-progress" ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </ol>
      </div>

      <ol className="mt-4">
        {phases.map((phase, i) => (
          <li key={phase.id} id={phase.id} className="grid grid-cols-[1.25rem_1fr] gap-x-5 sm:gap-x-8">
            <div className="relative flex justify-center">
              <span aria-hidden className={`absolute inset-y-0 w-px ${i === phases.length - 1 ? "bg-gradient-to-b from-line to-transparent" : "bg-line"}`} />
              <span className="relative mt-10">
                <Marker status={phase.status} />
              </span>
            </div>

            <Reveal className="min-w-0 border-b border-line py-9">
              <div className="grid gap-x-8 gap-y-5 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="label text-dim">
                    {t.phase} {String(i + 1).padStart(2, "0")}
                    <span className="mx-2">·</span>
                    <span className={phase.status === "in-progress" ? "text-accent" : phase.status === "done" ? "text-fg" : ""}>
                      {statusLabel[phase.status]}
                    </span>
                  </p>
                  <h3 className={`mt-2 text-2xl font-medium tracking-tight sm:text-3xl ${phase.status === "planned" ? "text-fg/60" : ""}`}>
                    {phase.title}
                  </h3>
                </div>

                <div className="lg:col-span-7">
                  <p className="leading-relaxed text-muted">{phase.summary}</p>

                  {phase.goals && (
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={ui[lang].a11y.goals}>
                      {phase.goals.map((g) => (
                        <li key={g} className="label border border-line px-2 py-1 text-muted">
                          {g}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6">
                    <h4 className="label text-dim">{t.logLabel}</h4>
                    {phase.updates.length === 0 ? (
                      <p className="mt-2 font-mono text-xs text-dim">— {t.noEntries}</p>
                    ) : (
                      <ul className="mt-3 space-y-5">
                        {phase.updates.map((u) => (
                          <li key={u.date + u.text} className="border-l border-line pl-4">
                            <time dateTime={u.date} className="label text-accent">
                              {u.date}
                            </time>
                            <p className="mt-1 leading-relaxed text-fg/85">{u.text}</p>
                            {u.media && (
                              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                {u.media.map((m) => (
                                  <MediaFrame key={m.label} lang={lang} media={m} sizes="(min-width: 640px) 30vw, 100vw" />
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {phase.media && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {phase.media.map((m) => (
                        <MediaFrame key={m.label} lang={lang} media={m} sizes="(min-width: 640px) 30vw, 100vw" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
