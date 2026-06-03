import type { PhotoCollection } from "./types";

// ─────────────────────────────────────────────────────────────
// Gallery photos for /photos. Add each trip as a collection and
// keep its files grouped under public/images/gallery/<trip-slug>/.
// ─────────────────────────────────────────────────────────────

const uk2023Dims: Record<string, [number, number]> = {
  "01": [1280, 1920],
  "02": [1280, 1920],
  "03": [1280, 1920],
  "04": [1280, 1920],
  "05": [1280, 1856],
  "06": [1280, 1920],
  "07": [1280, 924],
  "08": [1280, 853],
  "09": [1280, 875],
  "10": [1280, 1920],
  "11": [1280, 1920],
  "12": [1280, 1920],
  "13": [1280, 855],
  "14": [1280, 905],
  "15": [1280, 1920],
};

const seattle2025Photos = [
  { file: "DSC07170.JPG", width: 6000, height: 4000 },
  { file: "DSC07179.JPG", width: 6000, height: 4000 },
  { file: "DSC07204.JPG", width: 6000, height: 4000 },
  { file: "DSC07218.JPG", width: 6000, height: 4000 },
  { file: "DSC07249.JPG", width: 6000, height: 4000 },
  { file: "DSC07340.JPG", width: 6000, height: 4000 },
  { file: "DSC07352.JPG", width: 6000, height: 4000 },
  { file: "DSC07372.JPG", width: 6000, height: 4000 },
  { file: "DSC07381.JPG", width: 6000, height: 4000 },
  { file: "DSC07518.JPG", width: 6000, height: 4000 },
  { file: "DSC07542.JPG", width: 6000, height: 4000 },
  { file: "DSC07630.jpg", width: 3233, height: 4850 },
  { file: "DSC07685.JPG", width: 6000, height: 4000 },
  { file: "IMG_6139.jpg", width: 4032, height: 3024 },
  { file: "IMG_6164.jpg", width: 4032, height: 3024 },
];

const newYork2024Photos = [
  { file: "DSC06602.JPG", width: 6000, height: 4000 },
  { file: "DSC06630.JPG", width: 6000, height: 4000 },
  { file: "DSC06641.JPG", width: 6000, height: 4000 },
  { file: "DSC06662.JPG", width: 6000, height: 4000 },
  { file: "DSC06686.JPG", width: 6000, height: 4000 },
  { file: "DSC06695.JPG", width: 6000, height: 4000 },
  { file: "DSC06730.JPG", width: 6000, height: 4000 },
  { file: "DSC06744.JPG", width: 6000, height: 4000 },
  { file: "DSC06763.JPG", width: 6000, height: 4000 },
  { file: "DSC06765.JPG", width: 6000, height: 4000 },
  { file: "DSC06783.JPG", width: 6000, height: 4000 },
  { file: "DSC06789.JPG", width: 6000, height: 4000 },
  { file: "DSC06797.JPG", width: 6000, height: 4000 },
  { file: "IMG_2824.jpg", width: 4032, height: 3024 },
];

export const photoCollections: PhotoCollection[] = [
  {
    slug: "seattle-2025",
    title: "Seattle",
    year: "2025",
    description: "4 days in Seattle August 2025",
    photos: seattle2025Photos.map(({ file, width, height }, index) => ({
      id: `seattle-2025-${String(index + 1).padStart(2, "0")}`,
      src: `/images/gallery/seattle-2025/${file}`,
      alt: `Seattle trip photograph ${index + 1}`,
      width,
      height,
    })),
  },
  {
    slug: "newyork-2024",
    title: "New York",
    year: "2024",
    description: "A few frames from New York.",
    photos: newYork2024Photos.map(({ file, width, height }, index) => ({
      id: `newyork-2024-${String(index + 1).padStart(2, "0")}`,
      src: `/images/gallery/newyork-2024/${file}`,
      alt: `New York trip photograph ${index + 1}`,
      width,
      height,
    })),
  },
  {
    slug: "uk-2023",
    title: "UK",
    year: "2023",
    description: "Frames from 2 months through the UK.",
    photos: Object.entries(uk2023Dims).map(([n, [width, height]]) => ({
      id: `uk-2023-${n}`,
      src: `/images/gallery/uk-2023/photo-${n}.jpg`,
      alt: `UK trip photograph ${n}`,
      width,
      height,
    })),
  },
];
