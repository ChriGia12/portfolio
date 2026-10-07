import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { asset } from "@/lib/asset";
import { href, ui, type Locale } from "@/lib/i18n";
import { CoverArt } from "@/components/technical/CoverArt";
import { CropMarks } from "@/components/ui/MediaFrame";

/** Large project entry: big image, title block underneath. Not a card. */
export function ProjectFeature({
  lang,
  project,
  index,
  priority = false,
}: {
  lang: Locale;
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");
  const t = ui[lang];
  return (
    <article>
      <Link href={href(lang, `/projects/${project.slug}`)} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface sm:aspect-[16/9]">
          <div className="absolute inset-0 transition-transform duration-[1100ms] ease-out-expo group-hover:scale-[1.03]">
            {project.cover?.src ? (
              <Image
                src={asset(project.cover.src)}
                alt={project.cover.alt ?? project.title}
                fill
                priority={priority}
                sizes="(min-width: 1280px) 1184px, 100vw"
                className="object-cover"
              />
            ) : (
              <CoverArt kind={project.coverArt} label={`${t.a11y.drawing} ${project.title}`} />
            )}
          </div>
          <CropMarks />
          <div className="label absolute inset-x-6 top-6 flex justify-between text-muted sm:inset-x-8 sm:top-8">
            <span>P / {number}</span>
            <span className="flex items-center gap-2">
              {project.status === "in-development" && (
                <span aria-hidden className="h-1.5 w-1.5 bg-accent [animation:pulse-dot_2s_ease-in-out_infinite]" />
              )}
              {project.status === "in-development" ? t.projects.inDev : t.projects.caseStudy}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-x-8 gap-y-4 md:mt-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label text-muted">
              {project.year} <span className="mx-2 text-dim">/</span> {project.category}
            </p>
            <h3 className="mt-3 flex items-start gap-4 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              <span className="transition-colors duration-300 group-hover:text-accent">{project.title}</span>
              <span
                aria-hidden
                className="mt-1 font-mono text-xl text-dim transition-all duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:text-accent lg:mt-2"
              >
                →
              </span>
            </h3>
          </div>
          <div className="md:col-span-5">
            <p className="text-base leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.a11y.tech}>
              {project.stack.map((t) => (
                <li key={t} className="label border border-line px-2 py-1 text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
}
