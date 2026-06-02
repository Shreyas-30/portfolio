import type { ImageProps } from "next/image";
import type { ImageRef } from "@/content/types";

// ─────────────────────────────────────────────────────────────
// Single indirection point for the image pipeline.
//
// Today: images live in /public and are served by next/image's
// default optimizer (automatic AVIF/WebP + responsive srcset).
//
// Later (growing /photos gallery): point IMAGE_CDN at a provider
// and implement `cdnLoader`. Components never change — they call
// imageProps() and stay agnostic about where bytes come from.
// ─────────────────────────────────────────────────────────────

const IMAGE_CDN: string | null = process.env.NEXT_PUBLIC_IMAGE_CDN ?? null;

/** Props for an intrinsically-sized <Image /> (width + height). */
export function imageProps(ref: ImageRef): Pick<
  ImageProps,
  "src" | "alt" | "width" | "height"
> {
  return {
    src: ref.src,
    alt: ref.alt,
    width: ref.width,
    height: ref.height,
  };
}

/** Props for a fill-mode <Image /> (no width/height — parent sets size). */
export function imageFill(ref: ImageRef): Pick<ImageProps, "src" | "alt"> {
  return { src: ref.src, alt: ref.alt };
}

/**
 * Custom loader stub for a future CDN. Wire this into <Image loader={cdnLoader}>
 * (or next.config images.loaderFile) when you migrate off /public.
 */
export function cdnLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!IMAGE_CDN) return src;
  const q = quality ?? 75;
  // Example shape — adjust to the chosen provider's transform API.
  return `${IMAGE_CDN}/${encodeURIComponent(src)}?w=${width}&q=${q}&auto=format`;
}
