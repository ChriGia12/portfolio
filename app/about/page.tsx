import type { Metadata } from "next";
import { site } from "@/content/site";
import { disciplines } from "@/content/skills";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mechanical Engineering student with a growing focus on robotics, automation and software applied to physical systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="shell pb-8 pt-14 sm:pt-20">
        <SectionLabel>About</SectionLabel>
        <h1 className="mt-6 max-w-5xl text-[clamp(2.25rem,6.2vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          I connect mechanical design, robotics and software —{" "}
          <span className="text-muted">and turn ideas into systems that work.</span>
        </h1>

        <div className="mt-16 grid gap-x-8 gap-y-12 lg:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            {/* Add a portrait: set `src: "/portrait.jpg"` and put the file in /public. */}
            <MediaFrame
              media={{ kind: "image", label: "Portrait", aspect: "3/4", hint: "/public/portrait.jpg" }}
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p className="text-xl text-fg/90">
                I&rsquo;m {site.name}, a Mechanical Engineering student. Over the
                course of my studies my interest has moved steadily towards
                robotics, automation and the software that runs physical
                machines.
              </p>
              <p>
                I work best where disciplines overlap: modelling a part in CAD,
                planning how a robot should move to build it, and writing the
                code that turns that plan into motion. Robotic additive
                manufacturing on a 6-axis KUKA was where those pieces first came
                together for me.
              </p>
              <p>
                Right now I&rsquo;m designing my own six-axis desktop arm from
                scratch, to understand every layer of a robot — structure,
                transmissions, electronics, kinematics and control.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 border-t border-line">
              {[
                ["Based in", site.location],
                ["Studying at", site.university],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-line py-5">
                  <dt className="label text-dim">{k}</dt>
                  <dd className="mt-2 font-mono text-xs text-muted">{v}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Disciplines">
              {disciplines.map((d) => (
                <li key={d} className="label border border-line px-2.5 py-1.5 text-muted">
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={site.cv} variant="primary" download>
                Download CV
              </ButtonLink>
              <ButtonLink href="/contact">Get in touch</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Skills />
      <div className="border-t border-line" />
      <Experience />
    </>
  );
}
