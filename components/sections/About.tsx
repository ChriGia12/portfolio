import { disciplines } from "@/content/skills";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Short About block for the homepage. The full version lives in /about. */
export function About({ index }: { index?: string }) {
  return (
    <section aria-labelledby="about-title" className="shell py-24 lg:py-36">
      <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <SectionLabel index={index}>
            <span id="about-title">About</span>
          </SectionLabel>
        </div>
        <div className="lg:col-span-9">
          <Reveal>
            <p className="text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-[-0.025em]">
              Mechanical Engineering student with a growing focus on robotics,
              automation and <span className="text-muted">software for physical systems.</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              I like the point where a CAD model, a kinematic chain and a few
              hundred lines of code become a machine that moves. My work sits
              between design and control: I model the part, plan the motion and
              write the code that makes the robot build it.
            </p>
            <ul className="label mt-8 flex flex-wrap gap-x-3 gap-y-2 text-muted" aria-label="Disciplines">
              {disciplines.map((d, i) => (
                <li key={d}>
                  {i > 0 && <span aria-hidden className="mr-3 text-accent">+</span>}
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/about" variant="text">
                More about me
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
