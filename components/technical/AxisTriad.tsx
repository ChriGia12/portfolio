/** Small X / Y / Z coordinate frame — the site's recurring mark. */
export function AxisTriad({
  size = 48,
  className = "",
  labels = true,
}: {
  size?: number;
  className?: string;
  labels?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      className={className}
    >
      <line x1="24" y1="40" x2="24" y2="10" stroke="var(--color-fg)" strokeOpacity="0.7" />
      <line x1="24" y1="40" x2="54" y2="40" stroke="var(--color-accent)" />
      <line x1="24" y1="40" x2="8" y2="54" stroke="var(--color-fg)" strokeOpacity="0.7" />
      <circle cx="24" cy="40" r="2" fill="var(--color-fg)" />
      {labels && (
        <g fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-muted)">
          <text x="57" y="43" fill="var(--color-accent)">X</text>
          <text x="2" y="62">Y</text>
          <text x="21" y="7">Z</text>
        </g>
      )}
    </svg>
  );
}
