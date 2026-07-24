"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Tries to load `/images/projects/speakeasy/<filename>`. If it 404s (asset
 * not dropped in yet), falls back to a striped placeholder that names the
 * exact file to add — so the real image appears the moment it's added.
 */
export function MediaSlot({
  filename,
  alt,
  caption,
  aspect = "aspect-video",
  fit = "cover",
  rounded = "rounded-lg",
  transparent = false,
  className = "",
}: {
  filename: string;
  alt: string;
  caption: string;
  aspect?: string;
  fit?: "cover" | "contain";
  rounded?: string;
  /** Skip the paper background/frame once loaded — for assets that are
   * already transparent-background renders (e.g. device mockups) and
   * shouldn't sit inside a visible box. */
  transparent?: boolean;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const src = `/images/projects/speakeasy/${filename}`;

  if (errored) {
    return (
      <div
        className={`media-slot-placeholder relative w-full overflow-hidden border border-ink/15 ${rounded} ${aspect} ${className}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center">
          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-wide text-pencil">
            {caption}
          </p>
          <p className="font-mono text-[10px] text-pencil/70">{filename}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${transparent ? "" : `bg-paper-2 ${rounded}`} ${aspect} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 860px) 100vw, 560px"
        className={fit === "contain" ? "object-contain" : "object-cover"}
        onError={() => setErrored(true)}
      />
    </div>
  );
}
