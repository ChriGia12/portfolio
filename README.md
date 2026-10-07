# Portfolio — Christian Giancola

Personal portfolio: Next.js (App Router), React, TypeScript, Tailwind CSS v4, Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things are

| What | Where |
| --- | --- |
| Name, email, links, CV path | `content/site.ts` |
| Projects | `content/projects/*.ts` (registered in `content/projects/index.ts`) |
| Skills | `content/skills.ts` |
| Experience / education | `content/experience.ts` |
| Colours, fonts | `app/globals.css` (`@theme` block — one accent colour) |
| Images, video, CV | `public/` |

Layout and components never need to change to update content.

## Languages (EN / IT)

Every page exists at `/en/...` and `/it/...`; the EN / IT button in the header
switches to the same page in the other language. The site root sends visitors
to their last choice, or to Italian if the browser is set to Italian.

- Interface and page copy (nav, hero, About, buttons): `lib/i18n.ts`, one
  `en` and one `it` block with the same keys.
- Projects, skills, experience: each content file holds an `en` and an `it`
  version side by side. When you change one, change the other.
- Personal data in `content/site.ts` is shared by both languages.

## Placeholders to replace

Contacts, CVs, university and experience are real. Still to complete:

- `content/projects/robotic-additive-manufacturing.ts` — the **Results** section (marked `placeholder: true`) and the two "illustrative" code excerpts, to be replaced with real code
- Images, screenshots and videos for all projects (every empty slot shows the file path it expects)
- `public/portrait.jpg` for the About page
- `content/projects/desktop-robotic-arm.ts` — phase statuses and log entries as the build progresses

## CVs

The site serves `public/CV_Christian_Giancola.pdf` on the Italian pages and
`public/Resume_Christian_Giancola.pdf` on the English ones. Their sources are
`cv/cv-it.html` and `cv/cv-en.html`: one A4 page each, plain font and real text
so that applicant-tracking systems can read them.

To update a CV, edit the HTML, open it in Chrome, print it (Cmd+P) to PDF with
margins "Default" and headers/footers off, check it is still one page, and save
it over the file in `public/`.

## Adding images and video

Every media slot is an object in a content file. Without `src` it renders a
placeholder that shows the suggested file path. To fill it:

1. Put the file in `public/projects/<project-slug>/`.
2. Add `src` (path from `public/`) and `alt`:

```ts
{ kind: "screenshot", label: "Grasshopper definition", aspect: "16/9",
  src: "/projects/robotic-additive-manufacturing/grasshopper-01.png",
  alt: "Grasshopper definition generating the toolpath" }
```

Project covers work the same way: set `cover` on the project and it replaces
the generated drawing on the homepage and the project page.

## Posting to the engineering log

In `content/projects/desktop-robotic-arm.ts`, add to a phase's `updates` and
set its `status` (`"planned"`, `"in-progress"`, `"done"`):

```ts
updates: [
  { date: "2026-11-02", text: "First joint printed and assembled.",
    media: [{ kind: "image", label: "Joint 1", src: "/projects/desktop-robotic-arm/j1.jpg" }] },
],
```

## Adding a project

1. Copy one of the files in `content/projects/`, change the `slug` and content.
2. Add it to the array in `content/projects/index.ts`.

The page, the card, the sitemap and the previous/next navigation are generated
from that. Use `caseStudy` for a finished project, `timeline` for one in progress.

## Deploy

**GitHub Pages (current):** every push to `main` runs
`.github/workflows/deploy.yml`, which builds a static export and publishes it
at https://chrigia12.github.io/portfolio/.

**Vercel (alternative):** import the repository on vercel.com and keep the
defaults; set `NEXT_PUBLIC_SITE_URL` to the real domain — it drives canonical
URLs, the sitemap and social previews.
