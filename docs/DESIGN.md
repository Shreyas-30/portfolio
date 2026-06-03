# Portfolio Design Notes

This site is a warm, editorial portfolio for Shreyas Kulkarni. It should feel
personal, polished, and quietly interactive rather than like a template or a
marketing page.

## Core Experience

- **Home:** full-bleed photo-wall hero, name card, project index, footer.
- **Projects:** text-led index on the homepage with one cursor-follow preview
  card on desktop. Project detail pages hold the deeper case-study content.
- **Photos:** a dedicated gallery for travel and personal photography.
- **Now:** a polished coming-soon page for a future living feed.
- **Navigation:** bottom floating pill with a subtle iPadOS-style cursor that
  follows inside the nav and snaps softly behind hovered items.

## Visual System

- Warm paper background, warm near-black text, muted pencil secondary text.
- Cobalt is the single accent and should be used sparingly.
- Display type is serif and expressive; labels, tags, and indexes use mono.
- Motion should be soft, slow, and responsive to `prefers-reduced-motion`.

## Content Model

Primary content remains data-driven:

- `content/projects.ts` for project cards and case-study content.
- `content/hero.ts` for hero photo-wall images.
- `content/photos.ts` for the Photos page.
- `content/site.ts` for identity, intro copy, socials, and email.
- `content/nav.ts` for nav items.

## Launch Principle

If a section is not finished, make it feel intentional and public-facing.
Avoid exposed scaffolding, implementation notes, placeholder feed entries, or
messages that imply broken configuration.
