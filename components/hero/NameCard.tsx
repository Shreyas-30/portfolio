import { site, HERO_NAME_POSITION } from "@/content/site";

// Position presets — change HERO_NAME_POSITION in content/site.ts.
const POSITION: Record<typeof HERO_NAME_POSITION, string> = {
  left: "left-4 sm:left-8 top-1/2 -translate-y-1/2 text-left",
  "bottom-left": "left-4 sm:left-8 bottom-6 sm:bottom-10 text-left",
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
};

export function NameCard() {
  return (
    <div
      className={`absolute z-10 max-w-[min(34rem,82%)] ${POSITION[HERO_NAME_POSITION]}`}
    >
      <div className="rounded-xl border border-ink/15 bg-paper/90 px-6 py-6 shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-8 sm:py-7">
        <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          {site.name}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
          {site.intro}
        </p>
      </div>
    </div>
  );
}
