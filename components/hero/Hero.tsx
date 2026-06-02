import { heroTiles } from "@/content/hero";
import { PhotoWall } from "./PhotoWall";
import { NameCard } from "./NameCard";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative h-[88vh] min-h-[560px] w-full overflow-hidden p-2 sm:p-3"
    >
      <PhotoWall tiles={heroTiles} />
      <NameCard />
    </section>
  );
}
