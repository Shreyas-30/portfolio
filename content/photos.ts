import type { Photo } from "./types";

// ─────────────────────────────────────────────────────────────
// Gallery photos for /photos. Drop new files in
// public/images/gallery and append an entry here.
// ─────────────────────────────────────────────────────────────

const dims: Record<string, [number, number]> = {
  "01": [1280, 1920], "02": [1280, 1920], "03": [1280, 1920],
  "04": [1280, 1920], "05": [1280, 1856], "06": [1280, 1920],
  "07": [1280, 924], "08": [1280, 853], "09": [1280, 875],
  "10": [1280, 1920], "11": [1280, 1920], "12": [1280, 1920],
  "13": [1280, 855], "14": [1280, 905], "15": [1280, 1920],
};

export const photos: Photo[] = Object.entries(dims).map(([n, [w, h]]) => ({
  id: `photo-${n}`,
  src: `/images/gallery/photo-${n}.jpg`,
  alt: `Photograph ${n}`,
  width: w,
  height: h,
}));
