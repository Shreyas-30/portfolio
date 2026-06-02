# Paste this into Claude Code

I'm building my personal portfolio website and I want you to implement it as a real, deployable codebase. I'll deploy on **Vercel**.

In this folder you'll find:
- `README.md` — a detailed design + architecture spec. **Read it fully first.**
- `Portfolio Wireframes.html` — a low-fidelity wireframe. Open it in a browser and look at the **"DIR D" (Bold graphic)** tab — that's the approved direction. Ignore tabs A/B/C. The wireframe is intentionally sketchy; recreate it as a **clean, modern, hi-fi site** (drop all the hand-drawn/hatch/displacement treatment — see the README's Fidelity section).

## What I want
A portfolio with:
1. A **hero** = full-bleed animated **photo wall** (mixed-size tiles; one image gently grows to a larger "feature" size and a different photo features every ~4.6s), with my **name + a 1–2 line intro** overlaid on one side.
2. A **projects** section = vertical **alternating left/right** list of project cards (compact thumbnail, title, tags, short description, "view project ↗" link, cobalt index number), separated by horizontal rules — **no vertical dividers**.
3. A simple **footer** with social links.
4. A **floating, animated center nav** (gentle bob) with: Work, Photos, Now, Contact.

I will provide **high-quality images** for the collage.

## Build for the future
I'll add two more sections later, so architect for them now:
- A **Photos** tab (`/photos`) — a big photography gallery.
- A **Now** tab (`/now`) — an **aggregator** that collects everything I post online (blog/RSS, social media posts, maybe GitHub/Letterboxd) into one chronological feed, with pluggable per-source adapters.

Make all content **data-driven** (projects, hero photos, gallery photos, now-feed items) so I can add entries without editing layout code. Scaffold the `/photos` and `/now` routes + their data layer now, even if the full UI comes later.

## Before you write app code
**Don't start implementing yet.** First give me a short proposal and wait for my approval, covering:
1. **Exact tech stack** (I'm expecting something like Next.js App Router + TypeScript + Tailwind + Framer Motion on Vercel — confirm or suggest better, with reasons).
2. **How I should host the photos** — give me options (e.g. `/public` + next/image, Vercel Blob, Cloudinary/Cloudflare Images) with a recommendation and trade-offs, and tell me where/how I upload them.
3. **Content model** — how projects/photos/now-items are authored and stored (local MDX/JSON vs. a headless CMS), lightest option that supports the future tabs.
4. **How the Now aggregator works** — options (build-time/ISR fetch vs. Vercel Cron + stored feed), which feeds need API keys vs. RSS, and rate-limit/fallback notes.
5. **Folder/route structure.**

Once I approve, implement the **homepage fully** (hero + projects + footer + floating nav, matching DIR D), scaffold `/photos` and `/now`, make it build cleanly, respect `prefers-reduced-motion`, be responsive, and include clear **run + Vercel deploy** instructions in the README.

Design tokens, seed content, copy, and exact interaction details are all in `README.md` — follow it.
