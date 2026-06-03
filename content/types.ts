// ─────────────────────────────────────────────────────────────
// Shared content types. Everything the site renders is data that
// conforms to one of these shapes — add entries, never edit layout.
// ─────────────────────────────────────────────────────────────

export type ImageRef = {
  /** Path under /public OR an absolute CDN url (loader handles both). */
  src: string;
  /** Alt text — required for a11y. */
  alt: string;
  /** Intrinsic dimensions for next/image (avoids layout shift). */
  width: number;
  height: number;
};

export type HeroTile = ImageRef & {
  /** Stable id used as React key + animation key. */
  id: string;
  /** Tint a few tiles with the accent for graphic punch (DIR D). */
  accent?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  /** Short positioning line, e.g. "AI money coach". */
  subtitle: string;
  /** Display tags, e.g. ["PRODUCT", "FULL-STACK"]. */
  tags: string[];
  /** One- or two-line description (~46ch ideal) — used in the list. */
  description: string;
  /** Longer body shown on the detail page. Falls back to description. */
  body?: string;
  /** Key project facts shown on the detail page. */
  details?: { label: string; value: string }[];
  /** Case-study sections shown below the overview. */
  sections?: { title: string; body: string }[];
  /** Year the project was completed / shipped, shown on the work page. */
  year?: string;
  thumbnail: ImageRef;
  /** How the thumbnail should fit inside fixed project frames. */
  thumbnailFit?: "cover" | "contain";
  /** Background colour shown behind a contained thumbnail (hex / CSS colour). */
  thumbnailBg?: string;
  /** Resting rotation for homepage hover preview cards, in degrees. */
  previewTilt?: number;
  /** Additional images shown as a gallery on the detail page. */
  images?: ImageRef[];
  /** Local demo videos under /public, rendered as looping muted clips. */
  videos?: {
    src: string;
    title: string;
    caption?: string;
  }[];
  /** Local animated GIF flows under /public. */
  gifs?: {
    src: string;
    alt: string;
    title: string;
    caption?: string;
  }[];
  /** YouTube video ID to embed on the detail page. */
  youtubeId?: string;
  /** Source repository for the project. */
  githubUrl?: string;
  /** Download/test links with store badges and QR codes. */
  downloads?: {
    label: string;
    href: string;
    badge: ImageRef;
    qr: ImageRef;
  }[];
  /** External link or internal /projects/[slug]. */
  href: string;
  /** Open in a new tab? (external links). */
  external?: boolean;
};

export type Photo = ImageRef & {
  id: string;
  /** Optional caption / location for the gallery + lightbox. */
  caption?: string;
};
