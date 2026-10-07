import { experience } from "@/content/experience";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Experience({ index }: { index?: string }) {
  return (
    <section aria-labelledby="experience-title" className="shell py-24 lg:py-32">
      <SectionLabel index={index}>
        <span id="experience-title">Experience &amp; Education</span>
      </SectionLabel>

      <Reveal className="mt-10">
        <ul className="border-t border-line">
          {experience.map((e) => (
            <li
              key={e.title + e.organisation}
              className="grid gap-x-8 gap-y-2 border-b border-line py-7 md:grid-cols-12"
            >
              <p className="label pt-1.5 text-dim md:col-span-3">{e.period}</p>
              <div className="md:col-span-7">
                <h3 className="text-xl font-medium tracking-tight">{e.title}</h3>
                <p className={e.placeholder ? "mt-1 font-mono text-xs text-dim" : "mt-1 text-muted"}>
                  {e.organisation}
                </p>
                {e.description && (
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{e.description}</p>
                )}
              </div>
              <p className="label pt-1.5 text-muted md:col-span-2 md:text-right">{e.type}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
