/**
 * Personal data lives here — the only file you need to edit for name,
 * links and contact details. Values wrapped in [BRACKETS] are placeholders.
 * Translated texts (role, tagline, page copy) are in `lib/i18n.ts`.
 */
export const site = {
  name: "Christian Giancola",

  // Set by the deploy workflow. For a custom domain or Vercel, set
  // NEXT_PUBLIC_SITE_URL there or replace the fallback below.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.vercel.app").toLowerCase(),

  // TODO: replace the placeholders below.
  location: "[CITY, COUNTRY]",
  university: "[UNIVERSITY NAME]",
  email: "[your.email@example.com]",
  links: {
    github: "https://github.com/[your-username]",
    linkedin: "https://www.linkedin.com/in/[your-profile]",
  },

  /** Replace /public/cv.pdf with the real file — the button picks it up. */
  cv: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cv.pdf`,
} as const;

export const nav = [
  { path: "/projects", key: "projects" },
  { path: "/about", key: "about" },
  { path: "/cv", key: "cv" },
  { path: "/contact", key: "contact" },
] as const;

/** True when a value still contains a [PLACEHOLDER]. */
export const isPlaceholder = (value: string) => /\[.+\]/.test(value);
