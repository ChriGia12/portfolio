import type { Locale } from "@/lib/i18n";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Personal data lives here — the only file you need to edit for name,
 * links and contact details. Translated texts (role, tagline, page copy)
 * are in `lib/i18n.ts`.
 */
export const site = {
  name: "Christian Giancola",

  // Set by the deploy workflow. For a custom domain or Vercel, set
  // NEXT_PUBLIC_SITE_URL there or replace the fallback below.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app").toLowerCase(),

  location: { en: "Bologna, Italy", it: "Bologna, Italia" } as Record<Locale, string>,
  university: { en: "University of Bologna", it: "Università di Bologna" } as Record<Locale, string>,
  email: "christiangiancola23@gmail.com",
  links: {
    github: "https://github.com/ChriGia12",
    linkedin: "https://www.linkedin.com/in/christian-giancola",
  },

  /** One PDF per language, in /public. Replace the files to update them. */
  cv: {
    en: `${basePath}/Resume_Christian_Giancola.pdf`,
    it: `${basePath}/CV_Christian_Giancola.pdf`,
  } as Record<Locale, string>,
} as const;

export const nav = [
  { path: "/projects", key: "projects" },
  { path: "/about", key: "about" },
  { path: "/cv", key: "cv" },
  { path: "/contact", key: "contact" },
] as const;

/** True when a value still contains a [PLACEHOLDER]. */
export const isPlaceholder = (value: string) => /\[.+\]/.test(value);
