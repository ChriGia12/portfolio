import Image from "next/image";
import type { Media } from "@/lib/types";
import { asset } from "@/lib/asset";

const kindLabel: Record<Media["kind"], string> = {
  image: "Photo",
  video: "Video",
  cad: "CAD",
  screenshot: "Screenshot",
  code: "Code",
};

/** Four corner crop marks, the recurring "drawing sheet" detail. */
export function CropMarks({ className = "" }: { className?: string }) {
  const mark = "absolute h-3 w-3 border-fg/40 transition-all duration-500 ease-out-expo";
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-3 ${className}`}>
      <span className={`${mark} left-0 top-0 border-l border-t group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-accent`} />
      <span className={`${mark} right-0 top-0 border-r border-t group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-accent`} />
      <span className={`${mark} bottom-0 left-0 border-b border-l group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:border-accent`} />
      <span className={`${mark} bottom-0 right-0 border-b border-r group-hover:translate-x-1 group-hover:translate-y-1 group-hover:border-accent`} />
    </span>
  );
}

/**
 * Renders a media slot. With `src` it shows the real image or video;
 * without it, a placeholder that names the file to add.
 */
export function MediaFrame({
  media,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  showCaption = true,
  priority = false,
}: {
  media: Media;
  sizes?: string;
  showCaption?: boolean;
  priority?: boolean;
}) {
  const aspect = (media.aspect ?? "16/9").replace("/", " / ");

  return (
    <figure className="min-w-0">
      <div
        className="relative overflow-hidden border border-line bg-surface"
        style={{ aspectRatio: aspect }}
      >
        {media.src ? (
          media.kind === "video" ? (
            <video
              src={asset(media.src)}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label={media.alt ?? media.label}
            />
          ) : (
            <Image
              src={asset(media.src)}
              alt={media.alt ?? media.label}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          )
        ) : (
          <div className="absolute inset-0">
            <div aria-hidden className="sheet-grid fade-edges absolute inset-0 opacity-50" />
            <CropMarks />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="label text-dim">{kindLabel[media.kind]} placeholder</span>
              <span className="text-sm text-muted">{media.label}</span>
              {media.hint && (
                <span className="max-w-full break-all font-mono text-[10px] leading-4 text-dim">
                  {media.hint}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {showCaption && (
        <figcaption className="label mt-3 flex justify-between gap-4 text-dim">
          <span>{media.label}</span>
          <span>{kindLabel[media.kind]}</span>
        </figcaption>
      )}
    </figure>
  );
}
