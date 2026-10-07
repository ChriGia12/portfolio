import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { asset } from "@/lib/asset";
import { href, ui, type Locale } from "@/lib/i18n";
import { isPlaceholder } from "@/content/site";
import { CoverArt } from "@/components/technical/CoverArt";
import { CropMarks } from "@/components/ui/MediaFrame";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ProjectHeader({ lang, project }: { lang: Locale; project: Project }) {
  const t = ui[lang];
  return (
    <header className="shell pt-10 sm:pt-16">
      <Link href={href(lang, "/projects")} className="label text-muted transition-colors hover:text-fg">
        ← {t.projects.back}
      </Link>

      <div className="mt-10 grid gap-x-8 gap-y-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="label text-muted">
            <span className="text-accent">{project.year}</span>
            <span className="mx-2 text-dim">/</span>
            {project.category}
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.035em]">
            {project.title}
          </h1>
          {project.links && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link, i) => (
                <ButtonLink key={link.href} href={link.href} variant={i === 0 ? "primary" : "ghost"} external>
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-muted lg:col-span-4 lg:self-end">
          {project.intro}
        </p>
      </div>

      <dl className="mt-12 grid grid-cols-2 border-t border-line lg:grid-cols-4">
        {project.specs.map((s) => (
          <div key={s.label} className="border-b border-line py-5 pr-6 lg:border-b-0">
            <dt className="label text-dim">{s.label}</dt>
            <dd className={`mt-2 text-sm leading-snug ${isPlaceholder(s.value) ? "font-mono text-xs text-dim" : ""}`}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="group relative mt-2 aspect-[4/3] overflow-hidden border border-line bg-surface sm:aspect-[16/9] lg:aspect-[21/9]">
        {project.cover?.src ? (
          <Image
            src={asset(project.cover.src)}
            alt={project.cover.alt ?? project.title}
            fill
            priority
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="object-cover"
          />
        ) : (
          <CoverArt kind={project.coverArt} label={`${t.a11y.drawing} ${project.title}`} />
        )}
        <CropMarks />
      </div>
    </header>
  );
}
