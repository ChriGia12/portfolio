import { isPlaceholder, site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  {
    label: "LinkedIn",
    value: site.links.linkedin.replace("https://www.", ""),
    href: site.links.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: site.links.github.replace("https://", ""),
    href: site.links.github,
    external: true,
  },
];

export function Contact({ index, as: Heading = "h2" }: { index?: string; as?: "h1" | "h2" }) {
  return (
    <section aria-labelledby="contact-title" className="shell py-24 lg:py-36">
      <SectionLabel index={index}>Contact</SectionLabel>

      <Reveal>
        <Heading
          id="contact-title"
          className="mt-8 text-[clamp(2.75rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
        >
          Let&rsquo;s build
          <br />
          something<span className="text-accent">.</span>
        </Heading>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <ul className="border-t border-line">
          {channels.map((c) => (
            <li key={c.label} className="border-b border-line">
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid grid-cols-[6rem_1fr_auto] items-baseline gap-4 py-6 sm:grid-cols-[10rem_1fr_auto]"
              >
                <span className="label text-dim">{c.label}</span>
                <span
                  className={`min-w-0 break-words transition-colors duration-300 group-hover:text-accent ${
                    isPlaceholder(c.value) ? "font-mono text-sm text-muted" : "text-lg sm:text-2xl"
                  }`}
                >
                  {c.value}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-dim transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
