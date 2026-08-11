import type { Metadata } from "next";
import Image from "next/image";
import { photoCollections } from "@/content/photos";
import { imageProps } from "@/lib/image";

export const metadata: Metadata = {
  title: "Photos — Shreyas Kulkarni",
  description: "Photography by Shreyas Kulkarni.",
};

export default function PhotosPage() {
  const visibleCollections = photoCollections.filter(
    (collection) => collection.photos.length > 0,
  );

  return (
    <main className="relative z-[2] mx-auto w-full max-w-6xl px-6 pb-32 pt-32 sm:px-10 sm:pt-36">
      <header className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-5xl font-semibold sm:text-6xl">
          Photos<span className="text-accent">.</span>
        </h1>
      </header>

      <hr className="mt-6 border-t border-ink/20" />

      <div className="mt-14 space-y-24">
        {visibleCollections.map((collection, index) => (
          <section key={collection.slug} aria-labelledby={`${collection.slug}-title`}>
            <div
              className={`mb-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end ${
                index > 0 ? "border-t border-ink/15 pt-10" : ""
              }`}
            >
              <div>
                <p className="kicker mb-2">{collection.year}</p>
                <h2
                  id={`${collection.slug}-title`}
                  className="font-display text-4xl font-semibold sm:text-5xl"
                >
                  {collection.title}
                  <span className="text-accent">.</span>
                </h2>
                {collection.description && (
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/75">
                    {collection.description}
                  </p>
                )}
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-pencil">
                {collection.photos.length} frames
              </p>
            </div>

            <div className="[column-gap:1rem] columns-2 lg:columns-3">
              {collection.photos.map((photo) => (
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
          </section>
        ))}
      </div>
    </main>
  );
}
