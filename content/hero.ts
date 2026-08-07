import type { HeroTile } from "./types";

// ─────────────────────────────────────────────────────────────
// Hero photo wall. Keep this as a curated selection, not the full
// photo archive: the landing page needs fast loading, good crops,
// and a balanced rhythm of portrait + landscape frames.
// ─────────────────────────────────────────────────────────────

const tile = (
  id: string,
  src: string,
  alt: string,
  width: number,
  height: number,
  accent = false,
): HeroTile => ({
  id,
  src,
  alt,
  width,
  height,
  accent,
});

export const heroTiles: HeroTile[] = [
  tile(
    "hero-clock",
    "/images/hero/clock.jpg",
    "Mechanical cuckoo clock close-up",
    4032,
    3024,
  ),
  tile(
    "hero-mill",
    "/images/hero/mill.jpg",
    "Machining process in the mill",
    4032,
    3024,
  ),
  tile(
    "hero-birdee",
    "/images/hero/birdee.jpg",
    "Birdee product prototype",
    2458,
    3277,
  ),
  tile(
    "hero-pingu",
    "/images/hero/pingu.JPG",
    "Pingu prototype detail",
    4000,
    3545,
  ),
  tile(
    "hero-cnc",
    "/images/hero/cnc.jpg",
    "CNC fabrication detail",
    4032,
    3024,
  ),
  tile(
    "hero-laptop-stand",
    "/images/hero/laptop_stand.jpg",
    "Laptop stand prototype",
    4032,
    3024,
  ),
  tile(
    "hero-chakra",
    "/images/hero/chakra.PNG",
    "Machined chakra detail",
    426,
    538,
    true,
  ),
  tile(
    "hero-egg-cracker",
    "/images/hero/egg_cracker.jpg",
    "Egg cracker prototype",
    4032,
    3024,
  ),
  tile(
    "hero-coat",
    "/images/hero/coat.jpg",
    "Coat detail",
    2580,
    3121,
  ),
  tile(
    "hero-mechatronics",
    "/images/hero/mechtronics.jpg",
    "Mechatronics prototype",
    4032,
    3024,
  ),
  tile(
    "hero-wood",
    "/images/hero/wood.jpg",
    "Wood fabrication detail",
    4032,
    3024,
  ),
  tile(
    "hero-polish",
    "/images/hero/polish.jpg",
    "Polishing a machined component",
    4032,
    3024,
  ),
  tile(
    "hero-mit",
    "/images/hero/mit.JPG",
    "MIT campus detail",
    6000,
    4000,
  ),
];
