import { learning, skills } from "@/content/skills";
import { ui, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Capabilities grouped by area, laid out like a parts list. No bars. */
export function Skills({ lang, index }: { lang: Locale; index?: string }) {
  return (
    <section aria-labelledby="skills-title" className="shell py-16 sm:py-24 lg:py-32">
      <SectionLabel index={index}>
        <span id="skills-title">{ui[lang].skills.label}</span>
      </SectionLabel>

      <Reveal className="mt-10">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills[lang].map((group, i) => (
            <div key={group.area} className="bg-bg p-6 lg:p-7">
              <p className="label text-dim">{String.fromCharCode(65 + i)}</p>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{group.area}</h3>
              <ul className="mt-6 space-y-2.5 text-[15px] text-muted">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-dim" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="label mt-6 text-dim">
          {ui[lang].skills.learning}
          <span aria-hidden className="mx-2">·</span>
          <span className="text-muted">{learning[lang].join(", ")}</span>
        </p>
      </Reveal>
    </section>
  );
}
