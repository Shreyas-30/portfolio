"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ImageRef } from "@/content/types";
import { imageProps } from "@/lib/image";

type SpaceChessCarouselProps = {
  images: ImageRef[];
  label: string;
  framed?: boolean;
  size?: "standard" | "large";
};

export function SpaceChessCarousel({
  images,
  label,
  framed = true,
  size = "standard",
}: SpaceChessCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function updateScrollState() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setCanScrollPrev(scroller.scrollLeft > 8);
    setCanScrollNext(scroller.scrollLeft < maxScroll - 8);
  }

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.76,
      behavior: "smooth",
    });
  }

  const itemSizeClass =
    size === "large"
      ? "w-[90vw] sm:w-[86%] lg:w-[82%]"
      : "w-[86vw] sm:w-[74%] lg:w-[68%]";
  const imageSizes =
    size === "large"
      ? "(max-width: 768px) 90vw, (max-width: 1200px) 86vw, 920px"
      : "(max-width: 768px) 86vw, (max-width: 1200px) 74vw, 760px";

  return (
    <div className="group relative">
      <div
        ref={scrollerRef}
        aria-label={label}
        onScroll={updateScrollState}
        className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image) => (
          <figure
            key={image.src}
            className={`${itemSizeClass} shrink-0 snap-start overflow-hidden rounded-lg ${
              framed ? "bg-paper-2" : ""
            }`}
          >
            <Image
              {...imageProps(image)}
              sizes={imageSizes}
              className={
                framed
                  ? "h-[17rem] w-full object-contain sm:h-[24rem] lg:h-[30rem]"
                  : "h-auto w-full"
              }
            />
          </figure>
        ))}
      </div>

      {canScrollPrev && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => scrollByCard(-1)}
          className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/82 font-mono text-2xl leading-none text-paper opacity-0 shadow-lg transition duration-300 ease-out hover:bg-ink focus:opacity-100 group-hover:opacity-100 md:flex"
        >
          ←
        </button>
      )}
      {canScrollNext && (
        <button
          type="button"
          aria-label="Next image"
          onClick={() => scrollByCard(1)}
          className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/82 font-mono text-2xl leading-none text-paper opacity-0 shadow-lg transition duration-300 ease-out hover:bg-ink focus:opacity-100 group-hover:opacity-100 md:flex"
        >
          →
        </button>
      )}
    </div>
  );
}
