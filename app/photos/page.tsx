import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/content/photos";
import { imageProps } from "@/lib/image";

export const metadata: Metadata = {
  title: "Photos — Shreyas Kulkarni",
  description: "Photography by Shreyas Kulkarni.",
};

// Scaffolded gallery. Masonry via CSS columns, lazy-loaded, reusing
// the same image pipeline as the hero. A lightbox can be layered on
// later without changing the data layer.
export default function PhotosPage() {
  return (
    <main className="relative z-[2] mx-auto w-full max-w-6xl px-6 pb-32 pt-20 sm:px-10">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-5xl font-semibold sm:text-6xl">
          Photos<span className="text-accent">.</span>
        </h1>
        <span className="kicker">selected frames</span>
      </header>

      <hr className="mt-6 border-t border-ink/20" />

      <div className="mt-8 [column-gap:1rem] columns-2 lg:columns-3">
        {photos.map((photo) => (
          <figure
            key={photo.id}
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg bg-paper-2"
          >
            <Image
              {...imageProps(photo)}
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full"
              loading="lazy"
            />
            {photo.caption && (
              <figcaption className="px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-pencil">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </main>
  );
}
