"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/** An image that opens full screen when clicked. Esc or a click closes it. */
export function ZoomImage({
  src,
  alt,
  sizes,
  className,
  priority,
  zoomLabel,
  closeLabel,
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  priority?: boolean;
  zoomLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${zoomLabel}: ${alt}`}
        className="group/zoom absolute inset-0 cursor-zoom-in"
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
        <span
          aria-hidden
          className="label absolute bottom-3 right-3 bg-bg/80 px-2 py-1 text-fg opacity-0 transition-opacity duration-300 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
        >
          {zoomLabel} ⤢
        </span>
      </button>

      {/* Rendered on <body>: inside the page it would be trapped by animated ancestors. */}
      {open &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="rise fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-bg/95 p-3 sm:p-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- full-size original, no layout box to size against */}
          <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
          <button
            type="button"
            autoFocus
            onClick={() => setOpen(false)}
            className="label absolute right-4 top-4 border border-line bg-bg px-3 py-2 text-fg hover:border-fg"
          >
            {closeLabel} ✕
          </button>
        </div>,
        document.body,
        )}
    </>
  );
}
