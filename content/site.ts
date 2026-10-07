/**
 * Personal data lives here — the only file you need to edit for name,
 * links and contact details. Values wrapped in [BRACKETS] are placeholders.
 */
export const site = {
  name: "Christian Giancola",
  role: "Mechanical Engineering Student",
  focus: ["Robotics", "Automation", "Digital Manufacturing"],
  tagline:
    "I design physical systems and the software that drives them — for robotics and advanced manufacturing.",
  description:
    "Portfolio of Christian Giancola, Mechanical Engineering student working across robotics, automation, additive manufacturing, CAD and software for physical systems.",

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
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;

/** True when a value still contains a [PLACEHOLDER]. */
export const isPlaceholder = (value: string) => /\[.+\]/.test(value);
