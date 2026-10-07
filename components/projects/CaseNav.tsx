"use client";

import { useEffect, useRef, useState } from "react";

/** Sticky table of contents that highlights the section in view. */
export function CaseNav({
  sections,
  label,
  variant = "list",
}: {
  sections: { id: string; title: string }[];
  label: string;
  /** "list": sticky sidebar on desktop. "bar": horizontal strip on phones. */
  variant?: "list" | "bar";
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

  // Keep the active link visible in the horizontal bar as the reader scrolls.
  const barRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    const current = bar?.querySelector<HTMLElement>("[aria-current]");
    if (bar && current) bar.scrollTo({ left: current.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  if (variant === "bar") {
    // Phones and tablets: a strip of section links that scrolls sideways under the header.
    return (
      <nav
        aria-label={label}
        className="sticky top-16 z-30 -mx-5 border-b border-line bg-bg sm:-mx-8 lg:hidden"
      >
        <ol ref={barRef} className="flex gap-5 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8">
          {sections.map((s, i) => {
            const on = s.id === active;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`label flex h-11 items-center gap-2 border-b-2 ${
                    on ? "border-accent text-fg" : "border-transparent text-muted"
                  }`}
                >
                  <span className={on ? "text-accent" : "text-dim"}>{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

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
