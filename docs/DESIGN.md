# Handoff: Shreyas Kulkarni — Portfolio (Direction D)

## Overview
A personal portfolio site for Shreyas Kulkarni. The homepage has two core sections:
1. **Hero** — a full-bleed, animated *photo wall* (mixed-size image tiles) with a name + 1–2 line intro overlaid on it.
2. **Projects** — a vertical list of projects in an alternating left/right ("zig-zag") layout, each with a compact thumbnail, title, tags, short description, and a "view project" link.

Plus a simple **footer** (social links) and a **floating, animated center nav**.

It must also be **architected from day one** to grow two more sections the owner will add later:
- **Photos** — a dedicated photography gallery (many images).
- **Now** — a content **aggregator** that pulls everything Shreyas posts online (blog posts, social media, etc.) into one chronological feed.

Target deployment: **Vercel**. The owner can provide high-quality images for the collage.

---

## About the Design Files
The file in this bundle (`Portfolio Wireframes.html`) is a **low-fidelity design reference created in HTML** — a wireframe prototype that communicates **layout, structure, content hierarchy, and motion behavior**. It is **not** production code and should **not** be copied directly.

Open it in a browser and click the **DIR D (Bold graphic)** tab — that is the approved direction. The other tabs (A/B/C) are earlier alternatives; ignore them except as context.

Your job is to **recreate Direction D as a clean, modern, production website** in an appropriate framework (see Tech Stack below), using real images instead of the placeholder tiles.

## Fidelity — IMPORTANT
This is a **low-fidelity wireframe**, intentionally sketchy. When translating to hi-fi:

- **DROP all the "sketchy" treatment**: the hand-drawn SVG displacement filters (`feTurbulence`/`feDisplacementMap`), the diagonal-hatch image placeholders, the wobbly borders, and the browser-chrome frame. These exist only to signal "this is a wireframe."
- **KEEP**: the layout, the section structure, the alternating project rows, the photo-wall hero, the gentle feature animation, the floating nav, and the warm/human tone.
- The final aesthetic is **clean and modern but not sterile** — warm off-white paper, a characterful handwritten display face for the name/headings, a subtle paper grain, generous negative space, and a touch of asymmetry. It should feel hand-made, not template-generated.

---

## Design Direction & Tokens

These are a **starting point** — refine for hi-fi, but stay in this family.

### Color
| Token | Value | Use |
|---|---|---|
| `--paper` | `#efece2` (warm off-white) | page background |
| `--ink` | `#171614` (warm near-black) | text, rules |
| `--pencil` | `#6b675e` | secondary text, tags |
| `--accent` | `#2f54d6` (cobalt) | index numbers, link hovers, a few hero tiles |

Keep one accent only. Warm neutrals; avoid pure white / pure black. (Accent is open to revision — confirm with owner.)

### Typography
- **Display / name / project titles:** a characterful handwritten-but-legible face. Wireframe used **Caveat**. For hi-fi consider a slightly more refined display script or a distinctive serif if Caveat feels too casual — propose 1–2 options.
- **Body:** a warm humanist sans or the wireframe's **Kalam**. Keep it readable.
- **Labels / tags / index numbers / "view project":** a **monospace** (wireframe used **Spline Sans Mono**), uppercase, letter-spaced ~1.5px for the techy/engineering nod.

Type scale (desktop): hero name ~64–84px; section label ("Projects") ~44px; project title ~40px; body ~16–18px; kicker/tags ~12px.

### Spacing, texture, motion
- Generous section padding (~54px+ vertical, clamp horizontal).
- **Subtle grain overlay** across the page (low-opacity noise, ~6%, multiply).
- Motion is **gentle and slow** — see Interactions.

---

## Screens / Views

### 1. Hero — animated photo wall
- **Layout:** full-bleed CSS grid of image tiles of varied column/row spans (a masonry-style wall). ~12–16 tiles. One tile is the **"feature"** at any time (notably larger, e.g. spanning ~4×4 of the grid).
- **Overlay card:** the name + intro sit in a card overlaid on the collage. Per the owner's original paper sketch, anchor it to **one side (left / bottom-left)**; the wireframe currently centers it — left-anchored is preferred, make it easy to change. Card has the warm paper bg, soft shadow.
  - Kicker (mono): `PORTFOLIO · 2026`
  - Name (display): **Shreyas Kulkarni**
  - Intro (body, 1–2 lines): *"Engineering × Design × Business — I build things meant to drive real, meaningful change."* (owner will finalize copy)
- **Images:** real, high-quality photos provided by the owner — a personal photo wall (travel, film, candids, portraits) mixed with a few work shots. Use responsive, optimized images (see Tech Stack). Tiles `object-fit: cover`.
- **A few tiles tinted with the accent** is an intentional graphic touch (optional in hi-fi).

### 2. Projects — alternating zig-zag list
- **Layout:** vertical stack of project rows. Rows **alternate**: thumbnail-left/text-right, then text-left/thumbnail-right, etc. **Compact thumbnail** (~360px wide, 4:3) — NOT full-width. A thin **horizontal rule** separates rows. **No vertical dividers.**
- **Section header:** "Projects." (display) with a small mono "selected work" label to the right.
- **Each row contains:**
  - Kicker line (mono): a cobalt **index number** (`01`, `02`…) + tags (e.g. `PRODUCT · FULL-STACK`).
  - Title (display, ~40px).
  - Short description (body, max ~46ch).
  - **`view project ↗`** link (mono, underline, arrow nudges on hover).
- **Seed content** (owner will expand/replace — keep it data-driven):
  1. **Kiro** — AI money coach — `PRODUCT · FULL-STACK` — "Designed, built & shipped. Plaid bank APIs, 1,000+ users."
  2. **Mechanical Cuckoo Clock** — `MECHANICAL · FABRICATION` — "Hand-cut gears, escapement & finished wood — no electronics."
  3. **Amtrak Rebooked** — `UX · CONCEPT` — "Rethinking the long-haul booking flow end to end."
  4. **Laptop Stand** — `ID · CMF` — "CMF studies and a weighted aluminium base."
  5. **Mechatronics** — `ROBOTICS · EMBEDDED` — "Closed-loop control on embedded C."
- End the list with a subtle "more" affordance (the sketch shows a `⋮`).

### 3. Footer
- Simple. A short line (display) like "Let's make something." + social links (mono, underline): **Instagram, LinkedIn, GitHub, Email**. Copyright line. Owner's email: `kuls@seas.upenn.edu` (confirm).

### 4. Floating nav (animated, centered)
- A pill-shaped nav **fixed near bottom-center**, gently **bobbing** (slow vertical float, ~6s) with a small pulsing accent dot.
- Items: **Work**, **Photos**, **Now**, **Contact** (the owner explicitly wants a center floating menu that animates). It must accommodate the future Photos and Now routes.
- Hover: item lifts/tilts slightly.

### 5. Photos tab — FUTURE (build the route + data layer now)
- A dedicated gallery page (`/photos`) for many photographs — masonry or justified grid, lightbox on click, lazy-loaded. Reuse the same image pipeline as the hero. Architect now; full UI can come later.

### 6. Now tab — FUTURE (build the route + aggregation layer now)
- `/now` is a **content aggregator**: a single reverse-chronological feed combining the owner's posts from multiple sources — **blog/RSS, social media (e.g. Instagram, X/Twitter, LinkedIn), maybe GitHub activity, Letterboxd, etc.**
- Each feed item: source badge, thumbnail (if any), title/excerpt, timestamp, link out.
- Design the data model so new sources are pluggable. See Architecture for suggested aggregation approaches.

---

## Interactions & Behavior
- **Hero feature animation:** every ~4.6s, a **different** tile smoothly grows to the feature size while the others reflow. Use a FLIP technique (or the framework's layout-animation, e.g. Framer Motion `layout`) so position+size changes animate smoothly. Easing ~`cubic-bezier(.4,0,.2,1)`, duration ~1.4–1.6s. **Subtle, not a full reshuffle.** Pause on `prefers-reduced-motion`.
- **Floating nav:** continuous gentle bob; pauses on `prefers-reduced-motion`. Active route indicated.
- **Project rows:** `view project` arrow translates on hover; optional subtle thumbnail zoom on hover.
- **Responsive:** rows collapse to single-column stack on mobile (thumbnail above text); hero collage reduces tile count / spans; floating nav stays reachable (min 44px hit targets).

## State / Data
- Everything content-driven. **Projects**, **hero photos**, **gallery photos**, and **now-feed items** are data, not hardcoded JSX. Prefer typed content (MDX or JSON/TS) so the owner can add entries without touching layout code.

---

## Tech Stack — PROPOSE BEFORE BUILDING
Before writing app code, **present a short proposal and get the owner's sign-off** covering:

1. **Framework:** recommend **Next.js (App Router) + TypeScript**, deployed on **Vercel** (first-class fit). Styling via **Tailwind CSS**. Animation via **Framer Motion** (great for the layout/feature animation + nav). Confirm before proceeding.
2. **Photo hosting** — present options with a recommendation:
   - `/public` + `next/image` (simplest; fine for a modest, version-controlled set).
   - **Vercel Blob** (owner uploads, served from Vercel).
   - **Cloudinary / imgix / Cloudflare Images** (transformations, responsive derivatives, good for a growing photo gallery) — likely best given a future Photos tab.
   Recommend one and explain trade-offs (cost, transforms, DX, where the owner uploads).
3. **Content model:** how projects / photos / now-items are authored and stored (local MDX/JSON vs. a headless CMS like Sanity/Contentlayer). Recommend the lightest thing that supports the future tabs.
4. **Now aggregation approach** — present options with a recommendation:
   - **Build-time / ISR fetch** of RSS + social feeds, cached (simplest, no DB).
   - **Vercel Cron + serverless** to refresh a stored feed (Vercel KV / Postgres / Edge Config).
   - Per-source adapters (RSS parser for blog; official APIs or RSS bridges for socials — note Instagram/X API limitations and suggest fallbacks).
   Explain auth/keys needed and rate-limit considerations.
5. **Folder structure** for routes (`/`, `/photos`, `/now`, optional `/projects/[slug]`) and the content/data layer.

Then implement the **homepage (hero + projects + footer + floating nav)** fully, and **scaffold** the `/photos` and `/now` routes + data adapters so they're ready to fill in. Ensure it builds clean and is **ready to deploy on Vercel** (include README run/deploy steps).

---

## Files
- `Portfolio Wireframes.html` — the wireframe. Open it and use the **DIR D** tab as the source of truth for layout, content, and motion. (Self-contained; just open in a browser.)
