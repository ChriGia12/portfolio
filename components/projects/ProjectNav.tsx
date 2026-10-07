import Link from "next/link";
import type { Project } from "@/lib/types";

function NavLink({ project, dir }: { project: Project; dir: "previous" | "next" }) {
  const next = dir === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col gap-3 py-10 sm:py-14 ${next ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="label text-dim">{next ? "Next project" : "Previous project"}</span>
      <span className="flex items-center gap-4 text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl">
        {!next && (
          <span aria-hidden className="font-mono text-lg text-dim transition-all duration-500 ease-out-expo group-hover:-translate-x-1.5 group-hover:text-accent">←</span>
        )}
        {project.title}
        {next && (
          <span aria-hidden className="font-mono text-lg text-dim transition-all duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:text-accent">→</span>
        )}
      </span>
      <span className="label text-muted">{project.category}</span>
    </Link>
  );
}

/** Previous / next navigation at the end of each project page. */
export function ProjectNav({ previous, next }: { previous: Project; next: Project }) {
  const single = previous.slug === next.slug;
  return (
    <nav aria-label="Projects" className="mt-24 border-t border-line">
      <div className={`shell grid ${single ? "" : "sm:grid-cols-2 sm:divide-x sm:divide-line"}`}>
        {!single && <NavLink project={previous} dir="previous" />}
        <div className={single ? "" : "border-t border-line sm:border-t-0 sm:pl-8"}>
          <NavLink project={next} dir="next" />
        </div>
      </div>
    </nav>
  );
}
