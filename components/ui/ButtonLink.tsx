import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "text";
  external?: boolean;
  download?: boolean;
  className?: string;
};

const base =
  "group/btn inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300";

const variants = {
  primary: "h-11 bg-fg px-5 text-bg hover:bg-accent",
  ghost: "h-11 border border-line px-5 text-fg hover:border-fg",
  text: "min-h-11 text-muted hover:text-fg",
};

export function ButtonLink({
  href,
  children,
  variant = "ghost",
  external,
  download,
  className = "",
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const arrow = (
    <span
      aria-hidden
      className="font-mono text-xs transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
    >
      {download ? "↓" : external ? "↗" : "→"}
    </span>
  );

  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        {...(download
          ? { download: true }
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}
