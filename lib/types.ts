export type MediaKind = "image" | "video" | "cad" | "screenshot" | "code";

/**
 * A media slot. Leave `src` undefined to render an elegant placeholder that
 * tells you which file to drop in. Files live in /public.
 */
export type Media = {
  kind: MediaKind;
  /** Short label shown on the placeholder and used as caption. */
  label: string;
  /** e.g. "/projects/robotic-am/gh-01.png". Undefined = placeholder. */
  src?: string;
  alt?: string;
  aspect?: "16/9" | "4/3" | "1/1" | "3/4" | "21/9";
  /** Where the real file should go (shown on the placeholder). */
  hint?: string;
};

export type CodeSample = {
  language: string;
  filename: string;
  code: string;
  caption?: string;
};

export type CaseItem = { title: string; text: string };

export type CaseSection = {
  id: string;
  title: string;
  body?: string[];
  bullets?: string[];
  items?: CaseItem[];
  media?: Media[];
  code?: CodeSample[];
  /** Renders the project's `pipeline` as a system diagram. */
  showPipeline?: boolean;
  /** Renders grouped technologies. */
  stackGroups?: { label: string; items: string[] }[];
  /** True while the copy is a placeholder waiting for real data. */
  placeholder?: boolean;
};

export type PipelineNode = { name: string; role: string; output?: string };

export type PhaseStatus = "done" | "in-progress" | "planned";

export type LogEntry = {
  /** ISO date, e.g. "2026-10-07". */
  date: string;
  text: string;
  media?: Media[];
};

export type TimelinePhase = {
  id: string;
  title: string;
  status: PhaseStatus;
  summary: string;
  goals?: string[];
  updates: LogEntry[];
  media?: Media[];
};

export type CoverArtKind = "toolpath" | "arm" | "slicer";

/** A short entry for the "other projects" list (no dedicated page). */
export type MinorProject = {
  title: string;
  year: string;
  category: string;
  summary: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  status: "completed" | "in-development";
  /** One line, used on cards and in metadata. */
  summary: string;
  /** Two or three sentences for the project page intro. */
  intro: string;
  stack: string[];
  specs: { label: string; value: string }[];
  /** Real cover image. If undefined the generated `coverArt` drawing is used. */
  cover?: Media;
  coverArt: CoverArtKind;
  /** External links shown under the title, e.g. live app or repository. */
  links?: { label: string; href: string }[];
  objectives?: string[];
  pipeline?: PipelineNode[];
  caseStudy?: CaseSection[];
  timeline?: TimelinePhase[];
};

export type SkillArea = { area: string; items: string[] };

export type ExperienceEntry = {
  period: string;
  title: string;
  organisation: string;
  type: "Education" | "Internship" | "Experience" | "Collaboration";
  description?: string;
  /** True while the entry is a placeholder. */
  placeholder?: boolean;
};
