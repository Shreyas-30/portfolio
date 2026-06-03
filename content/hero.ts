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
    "hero-seattle-07170",
    "/images/gallery/seattle-2025/DSC07170.JPG",
    "Seattle landscape",
    6000,
    4000,
  ),
  tile(
    "hero-uk-01",
    "/images/gallery/uk-2023/photo-01.jpg",
    "UK portrait frame",
    1280,
    1920,
    true,
  ),
  tile(
    "hero-newyork-06630",
    "/images/gallery/newyork-2024/DSC06630.JPG",
    "New York street scene",
    6000,
    4000,
  ),
  tile(
    "hero-uk-02",
    "/images/gallery/uk-2023/photo-02.jpg",
    "UK candid frame",
    1280,
    1920,
  ),
  tile(
    "hero-seattle-07249",
    "/images/gallery/seattle-2025/DSC07249.JPG",
    "Seattle travel frame",
    6000,
    4000,
  ),
  tile(
    "hero-uk-03",
    "/images/gallery/uk-2023/photo-03.jpg",
    "UK portrait frame",
    1280,
    1920,
  ),
  tile(
    "hero-newyork-06686",
    "/images/gallery/newyork-2024/DSC06686.JPG",
    "New York detail",
    6000,
    4000,
    true,
  ),
  tile(
    "hero-uk-10",
    "/images/gallery/uk-2023/photo-10.jpg",
    "UK film frame",
    1280,
    1920,
  ),
  tile(
    "hero-seattle-07352",
    "/images/gallery/seattle-2025/DSC07352.JPG",
    "Seattle architecture",
    6000,
    4000,
  ),
  tile(
    "hero-uk-04",
    "/images/gallery/uk-2023/photo-04.jpg",
    "UK portrait frame",
    1280,
    1920,
  ),
  tile(
    "hero-newyork-06783",
    "/images/gallery/newyork-2024/DSC06783.JPG",
    "New York candid frame",
    6000,
    4000,
    true,
  ),
  tile(
    "hero-uk-15",
    "/images/gallery/uk-2023/photo-15.jpg",
    "UK travel frame",
    1280,
    1920,
  ),
  tile(
    "hero-seattle-07630",
    "/images/gallery/seattle-2025/DSC07630.jpg",
    "Seattle portrait frame",
    3233,
    4850,
  ),
  tile(
    "hero-newyork-06744",
    "/images/gallery/newyork-2024/DSC06744.JPG",
    "New York travel frame",
    6000,
    4000,
  ),
  tile(
    "hero-uk-13",
    "/images/gallery/uk-2023/photo-13.jpg",
    "UK street scene",
    1280,
    855,
  ),
  tile(
    "hero-seattle-img-6139",
    "/images/gallery/seattle-2025/IMG_6139.jpg",
    "Seattle phone photo",
    4032,
    3024,
  ),
  tile(
    "hero-newyork-img-2824",
    "/images/gallery/newyork-2024/IMG_2824.jpg",
    "New York phone photo",
    4032,
    3024,
  ),
  tile(
    "hero-uk-06",
    "/images/gallery/uk-2023/photo-06.jpg",
    "UK portrait frame",
    1280,
    1920,
  ),
];
