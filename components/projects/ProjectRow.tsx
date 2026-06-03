import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { imageFill } from "@/lib/image";

// Image always on the left, text always on the right.
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const Wrapper = project.external ? "a" : Link;
  const imageFit =
    project.thumbnailFit === "contain"
      ? "object-contain scale-[1.08]"
      : "object-cover transition-transform duration-500 ease-out group-hover:scale-105";
  const linkProps = project.external
    ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: project.href };

  return (
    <article className="grid grid-cols-1 items-center gap-8 md:grid-cols-[380px_1fr] md:gap-16 md:min-h-[285px]">
      {/* Thumbnail — always left */}
      <div
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-paper-2"
        style={project.thumbnailBg ? { backgroundColor: project.thumbnailBg } : undefined}
      >
        <Image
          {...imageFill(project.thumbnail)}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className={imageFit}
          priority={index < 2}
        />
      </div>

      {/* Text — always right */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="kicker">
            <span className="font-semibold text-accent">{num}</span>
            <span className="mx-2 text-pencil/50">·</span>
            {project.tags.join(" · ")}
          </p>
          {project.year && (
            <span className="shrink-0 font-mono text-[11px] tracking-wide text-pencil">
              {project.year}
            </span>
          )}
        </div>
        <h3 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-ink/80">
          {project.description}
        </p>
        <Wrapper
          {...linkProps}
          className="group/link mt-5 inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
        >
          view project
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
            ↗
          </span>
        </Wrapper>
      </div>
    </article>
  );
}
