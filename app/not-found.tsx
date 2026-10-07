import { ButtonLink } from "@/components/ui/ButtonLink";
import { AxisTriad } from "@/components/technical/AxisTriad";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <AxisTriad size={64} />
      <p className="label mt-8 text-accent">Error 404 · Target out of reach</p>
      <h1 className="mt-4 text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
        This position
        <br />
        is outside the workspace.
      </h1>
      <div className="mt-10 flex gap-3">
        <ButtonLink href="/" variant="primary">
          Back to home
        </ButtonLink>
        <ButtonLink href="/projects">View projects</ButtonLink>
      </div>
    </section>
  );
}
