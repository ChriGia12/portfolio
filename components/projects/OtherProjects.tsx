import { minorProjects } from "@/content/projects";
import { ui, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Compact list of projects that do not have a dedicated page yet. */
export function OtherProjects({ lang }: { lang: Locale }) {
  const items = minorProjects[lang];
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="other-projects-title" className="shell pt-16 sm:pt-24 lg:pt-32">
      <SectionLabel>
        <span id="other-projects-title">{ui[lang].projects.other}</span>
      </SectionLabel>
      <Reveal className="mt-10">
        <ul className="border-t border-line">
          {items.map((p) => (
            <li key={p.title} className="grid gap-x-8 gap-y-2 border-b border-line py-7 md:grid-cols-12">
              <p className="label pt-1.5 text-dim md:col-span-3">{p.year}</p>
              <div className="md:col-span-6">
                <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">{p.summary}</p>
              </div>
              <p className="label pt-1.5 text-muted md:col-span-3 md:text-right">{p.category}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
