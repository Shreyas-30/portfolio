"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MediaSlot } from "./MediaSlot";

type Stage = "video" | "gif" | "png" | "placeholder";

/**
 * Prototype walkthrough media for the case-file overlay: tries a local video
 * first, then a gif, then a static png, then the standard lo-fi placeholder
 * if none of those assets have been dropped in yet. The video plays only
 * while `active` (the overlay is open), pausing on close.
 */
export function PrototypeMedia({
  slug,
  name,
  active,
}: {
  slug: string;
  name: string;
  active: boolean;
}) {
  const [stage, setStage] = useState<Stage>("video");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || stage !== "video") return;
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, stage]);

  if (stage === "video") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-paper-2">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={`/images/projects/speakeasy/proto-${slug}.mp4`}
          muted
          loop
          playsInline
          preload="none"
          onError={() => setStage("gif")}
        />
      </div>
    );
  }

  if (stage === "gif") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-paper-2">
        <Image
          src={`/images/projects/speakeasy/proto-${slug}.gif`}
          alt={`${name} prototype walkthrough`}
          fill
          unoptimized
          sizes="(max-width: 860px) 100vw, 560px"
          className="object-cover"
          onError={() => setStage("png")}
        />
      </div>
    );
  }

  if (stage === "png") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-paper-2">
        <Image
          src={`/images/projects/speakeasy/proto-${slug}.png`}
          alt={`${name} prototype walkthrough`}
          fill
          sizes="(max-width: 860px) 100vw, 560px"
          className="object-cover"
          onError={() => setStage("placeholder")}
        />
      </div>
    );
  }

  return (
    <MediaSlot
      filename={`proto-${slug}.gif`}
      alt={`${name} prototype walkthrough`}
      caption={`${name} · prototype walkthrough (video / gif)`}
      aspect="aspect-video"
    />
  );
}
