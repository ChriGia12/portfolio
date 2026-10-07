import type { CodeSample } from "@/lib/types";

export function CodeBlock({ sample }: { sample: CodeSample }) {
  const lines = sample.code.split("\n");
  return (
    <figure className="min-w-0 border border-line bg-surface">
      <div className="label flex items-center justify-between border-b border-line px-4 py-3 text-muted">
        <span>{sample.filename}</span>
        <span className="text-dim">{sample.language}</span>
      </div>
      <pre
        tabIndex={0}
        aria-label={`${sample.filename} source`}
        className="overflow-x-auto py-4 font-mono text-[12.5px] leading-6"
      >
        <code className="grid min-w-max">
          {lines.map((line, i) => (
            <span key={i} className="flex pr-6">
              <span aria-hidden className="w-12 shrink-0 select-none pr-4 text-right text-dim">
                {i + 1}
              </span>
              <span className="whitespace-pre text-fg/85">{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
      {sample.caption && (
        <figcaption className="border-t border-line px-4 py-3 text-xs text-dim">
          {sample.caption}
        </figcaption>
      )}
    </figure>
  );
}
