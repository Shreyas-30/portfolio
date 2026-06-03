# Shreyas Kulkarni — Portfolio

A personal portfolio site with an animated photo-wall hero, an editorial
project index with hover previews, a floating nav, project case-study
pages, photos, and a polished coming-soon Now page.

Built to **Direction D** of the wireframe — clean and modern, warm paper
palette, a single cobalt accent, refined serif display type. Original
design spec lives in [`docs/DESIGN.md`](docs/DESIGN.md).

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + React 19, TypeScript |
| Styling | Tailwind CSS v4 (tokens in `app/globals.css`) |
| Animation | Motion (`motion`) — hero feature animation, project hover previews, nav cursor |
| Fonts | `next/font` — Fraunces (display), Inter Tight (body), Spline Sans Mono (labels) |
| Images | `/public` + `next/image` (swap-ready loader in `lib/image.ts`) |
| Hosting | Vercel |

All motion respects `prefers-reduced-motion`. Layout is responsive
(rows collapse to single column on mobile; 44px+ nav hit targets).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

> Requires Node 18.18+ (Node 20+ recommended).

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In [vercel.com](https://vercel.com) → **Add New → Project**, import the repo.
3. Framework preset auto-detects **Next.js** — no config needed. Click **Deploy**.

Or from the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

## Adding content (no layout edits needed)

Everything is data-driven. Edit these files and entries appear automatically:

| What | File |
|---|---|
| Projects | `content/projects.ts` |
| Hero photo wall | `content/hero.ts` |
| Gallery photos (`/photos`) | `content/photos.ts` |
| Name / intro / socials / email | `content/site.ts` |
| Nav items | `content/nav.ts` |

**Images:** group gallery files by trip under `public/images/gallery/`
and reference them from `content/photos.ts`, for example
`public/images/gallery/seattle-2025/01.jpg`. Add a collection entry with
its title, year, description, and each photo's dimensions. `next/image`
handles responsive AVIF/WebP automatically.
The current photos are the owner's real shots; project thumbnails reuse
landscape frames as stand-ins until dedicated project images are added.

**Move the hero name card:** change `HERO_NAME_POSITION` in
`content/site.ts` (`"left"` | `"bottom-left"` | `"center"`).

### Scaling images later

When the gallery grows, switch from `/public` to a CDN (e.g. Cloudinary /
Cloudflare Images) by implementing `cdnLoader` in `lib/image.ts`, setting
`NEXT_PUBLIC_IMAGE_CDN`, and wiring the loader in `next.config.ts`.
Components call `imageProps` / `imageFill` and never change.

## Structure

```
app/
  layout.tsx              fonts, grain overlay, floating nav, metadata
  page.tsx                home: hero + projects + footer
  photos/page.tsx         gallery (masonry, lazy-loaded)
  now/page.tsx            coming-soon Now page
  projects/[slug]/page.tsx project detail pages (SSG)
  work/page.tsx           full project archive
components/
  hero/        Hero, PhotoWall (feature animation), NameCard
  projects/    ProjectList, ProjectIndex, ProjectRow
  nav/         FloatingNav
  Footer.tsx, GrainOverlay.tsx
content/       site, nav, projects, hero, photos, types
lib/
  image.ts     image pipeline indirection
public/images/gallery/   photos
```
