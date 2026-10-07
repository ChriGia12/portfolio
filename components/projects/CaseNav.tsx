"use client";

import { useEffect, useState } from "react";

/** Sticky table of contents that highlights the section in view. */
export function CaseNav({
  sections,
  label,
}: {
  sections: { id: string; title: string }[];
  label: string;
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label}>
      <ol className="space-y-2.5">
        {sections.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`label flex items-center gap-3 transition-colors duration-300 hover:text-fg ${
                  on ? "text-fg" : "text-dim"
                }`}
              >
                <span className={on ? "text-accent" : ""}>{String(i + 1).padStart(2, "0")}</span>
                <span
                  aria-hidden
                  className={`h-px transition-all duration-500 ease-out-expo ${on ? "w-6 bg-accent" : "w-3 bg-line"}`}
                />
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
