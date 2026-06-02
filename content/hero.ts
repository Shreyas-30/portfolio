import type { HeroTile } from "./types";

// ─────────────────────────────────────────────────────────────
// Hero photo wall. ~12–16 mixed-size tiles; the PhotoWall picks
// one "feature" at a time and cycles it every ~4.6s.
// Add/remove entries freely — layout adapts. A few `accent: true`
// tiles get a cobalt tint for graphic punch (DIR D).
// Images live in /public/images/gallery (shared with the gallery).
// ─────────────────────────────────────────────────────────────

const g = (n: number, alt: string, w: number, h: number, accent = false): HeroTile => ({
  id: `hero-${String(n).padStart(2, "0")}`,
  src: `/images/gallery/photo-${String(n).padStart(2, "0")}.jpg`,
  alt,
  width: w,
  height: h,
  accent,
});

export const heroTiles: HeroTile[] = [
  g(7, "Landscape", 1280, 924),
  g(1, "Portrait", 1280, 1920, true),
  g(13, "Street scene", 1280, 855),
  g(2, "Candid", 1280, 1920),
  g(8, "Travel", 1280, 853),
  g(3, "Portrait", 1280, 1920),
  g(14, "Detail", 1280, 905, true),
  g(10, "Film frame", 1280, 1920),
  g(9, "Architecture", 1280, 875),
  g(4, "Portrait", 1280, 1920),
  g(11, "Candid", 1280, 1920, true),
  g(15, "Travel", 1280, 1920),
  g(5, "Portrait", 1280, 1856),
  g(12, "Film frame", 1280, 1920),
  g(6, "Portrait", 1280, 1920),
];
