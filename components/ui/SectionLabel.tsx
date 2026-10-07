/** Numbered section marker, styled like a drawing callout: "01 ── PROJECTS". */
export function SectionLabel({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`label flex items-center gap-3 text-muted ${className}`}>
      {index && <span className="text-accent">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-line" />
      <span>{children}</span>
    </p>
  );
}
