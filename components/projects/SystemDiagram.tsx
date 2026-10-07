import type { PipelineNode } from "@/lib/types";

/** Pipeline as a row of stages: what each one does and what it hands on. */
export function SystemDiagram({
  nodes,
  caption,
  outLabel,
}: {
  nodes: PipelineNode[];
  caption: string;
  outLabel: string;
}) {
  return (
    <figure>
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((n, i) => (
          <li key={n.name} className="relative flex min-h-40 flex-col bg-bg p-5">
            <div className="label flex items-center justify-between text-dim">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {i < nodes.length - 1 && <span aria-hidden className="text-accent">→</span>}
            </div>
            <p className="mt-4 text-lg font-medium leading-tight tracking-tight">{n.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{n.role}</p>
            {n.output && (
              <p className="label mt-auto pt-5 text-dim">
                {outLabel} <span className="mx-1 text-accent">▸</span>
                <span className="text-muted">{n.output}</span>
              </p>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="label mt-3 text-dim">{caption}</figcaption>
    </figure>
  );
}
