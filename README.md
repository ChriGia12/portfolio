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

## Placeholders to replace

Search the project for `[` and `TODO`. In short:

- `content/site.ts` — domain, city, university, email, GitHub, LinkedIn
- `content/experience.ts` — every entry
- `content/projects/robotic-additive-manufacturing.ts` — year, context, the **Results** section, and check the draft copy and the two "illustrative" code excerpts against the real project
- `content/projects/desktop-robotic-arm.ts` — phase statuses
- `public/cv.pdf` — placeholder PDF, replace with the real CV (same file name)

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

## Deploy on Vercel

Push the repository to GitHub, import it on vercel.com, keep the defaults.
Then set the real domain in `content/site.ts` (`url`) — it drives canonical
URLs, the sitemap and social previews.
