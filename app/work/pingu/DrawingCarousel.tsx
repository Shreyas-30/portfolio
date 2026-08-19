"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Drawing = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
};

export function DrawingCarousel({ drawings }: { drawings: Drawing[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

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
      left: direction * scroller.clientWidth * 0.72,
      behavior: "smooth",
    });
  }

  return (
    <div className="group relative">
      <div
        ref={scrollerRef}
        aria-label="Pingu technical drawings"
        onScroll={updateScrollState}
        className="flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {drawings.map((drawing) => (
          <figure
            key={drawing.src}
            className="w-[84vw] shrink-0 snap-start overflow-hidden rounded-lg sm:w-[52%] lg:w-[49%]"
          >
            <Image
              src={drawing.src}
              alt={drawing.alt}
              width={drawing.width}
              height={drawing.height}
              sizes="(max-width: 768px) 84vw, 560px"
              className="h-[19rem] w-full object-contain sm:h-[23rem] lg:h-[25rem]"
            />
          </figure>
        ))}
      </div>

      {canScrollPrev && (
        <button
          type="button"
          aria-label="Previous drawing"
          onClick={() => scrollByCard(-1)}
          className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/82 font-mono text-2xl leading-none text-paper opacity-0 shadow-lg transition duration-300 ease-out hover:bg-ink focus:opacity-100 group-hover:opacity-100 md:flex"
        >
          ←
        </button>
      )}
      {canScrollNext && (
        <button
          type="button"
          aria-label="Next drawing"
          onClick={() => scrollByCard(1)}
          className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/82 font-mono text-2xl leading-none text-paper opacity-0 shadow-lg transition duration-300 ease-out hover:bg-ink focus:opacity-100 group-hover:opacity-100 md:flex"
        >
          →
        </button>
      )}
    </div>
  );
}
