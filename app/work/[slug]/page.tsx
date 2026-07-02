import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { imageFill, imageProps } from "@/lib/image";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import { ProjectExternalLinks, ProjectDownloads } from "@/components/projects/ProjectLinks";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? `${project.title} — Shreyas Kulkarni` : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const thumbnailFit =
    project.thumbnailFit === "contain" ? "object-contain" : "object-cover";

  return (
    <main className="relative z-[2] mx-auto w-full max-w-5xl px-6 pb-32 pt-20 sm:px-10">
      <ProjectPageTracker slug={project.slug} title={project.title} tags={project.tags} />
      <Link href="/work" className="font-mono text-[13px] text-pencil hover:text-accent">
        ← back to work
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="kicker">{project.tags.join(" · ")}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-ink/80">{project.subtitle}</p>
      </header>

      {/* Hero thumbnail */}
      <div
        className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-lg bg-paper-2"
        style={
          project.thumbnailBg
            ? { backgroundColor: project.thumbnailBg }
            : undefined
        }
      >
        <Image
          {...imageFill(project.thumbnail)}
          fill
          sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(100vw - 5rem), 960px"
          className={`${thumbnailFit}${project.thumbnailFit === "contain" ? " scale-[1.08]" : ""}`}
          priority
        />
      </div>

      {/* Body text */}
      <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink/80">
        {project.body ?? project.description}
      </p>

      <ProjectExternalLinks project={project} />

      <ProjectDownloads project={project} />

      {project.details && project.details.length > 0 && (
        <section className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {project.details.map((detail) => (
            <div key={detail.label} className="bg-paper px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-pencil">
                {detail.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                {detail.value}
              </p>
            </div>
          ))}
        </section>
      )}

      {project.sections && project.sections.length > 0 && (
        <section className="mt-14 divide-y divide-ink/15 border-y border-ink/15">
          {project.sections.map((section) => (
            <article
              key={section.title}
              className="grid gap-3 py-7 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <h2 className="font-display text-2xl font-semibold leading-tight">
                {section.title}
              </h2>
              <p className="max-w-3xl text-base leading-relaxed text-ink/80">
                {section.body}
              </p>
            </article>
          ))}
        </section>
      )}

      {project.videos && project.videos.length > 0 && (
        <section className="mt-14">
          <p className="kicker mb-10">product flows</p>
          <div className="space-y-20">
            {project.videos.map((video, i) => (
              <div
                key={video.src}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-[260px_1fr] md:gap-14"
              >
                {/* Phone video */}
                <div className="relative mx-auto w-full max-w-[260px]">
                  <div
                    className="relative aspect-[9/16] overflow-hidden"
                    style={{ clipPath: "inset(0 0 0 0 round 4rem)" }}
                  >
                    <video
                      className="absolute inset-0 h-full w-full object-contain"
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p className="kicker text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                    {video.title}
                  </h3>
                  {video.caption && (
                    <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/75">
                      {video.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.systemDesign && (
        <section className="mt-14">
          <p className="kicker">system design</p>
          <div className="mt-6 overflow-hidden rounded-lg border border-ink/10 bg-paper-2">
            <Image
              {...imageProps(project.systemDesign)}
              sizes="(max-width: 1024px) 100vw, 960px"
              className="h-auto w-full"
            />
          </div>
        </section>
      )}

      {project.gifs && project.gifs.length > 0 && (
        <section className="mt-14">
          <p className="kicker mb-6">product flows</p>
          <div className="space-y-6">
            {project.gifs.map((gif) => (
              <figure
                key={gif.src}
                className="grid gap-5 rounded-lg bg-paper-2 p-4 md:grid-cols-[minmax(220px,340px)_1fr] md:items-center md:p-5"
              >
                <div className="relative aspect-[720/1486] overflow-hidden bg-paper-2">
                  <img
                    src={gif.src}
                    alt={gif.alt}
                    className="absolute inset-0 h-full w-full rounded-[2.75rem] object-contain"
                  />
                </div>
                <figcaption>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-pencil">
                    {gif.title}
                  </p>
                  {gif.caption && (
                    <p className="mt-3 max-w-lg text-lg leading-relaxed text-ink/75">
                      {gif.caption}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* YouTube embed */}
      {project.youtubeId && (
        <div
          className="mt-10 overflow-hidden rounded-lg bg-paper-2"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}`}
            title={`${project.title} — video`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}

      {/* Image gallery */}
      {project.images && project.images.length > 0 && (
        <section className="mt-14">
          <p className="kicker mb-6">gallery</p>
          <div className="space-y-8">
            {project.images.map((img, i) => (
              <figure key={i} className="overflow-hidden rounded-lg bg-paper-2">
                <Image
                  {...imageProps(img)}
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="h-auto w-full"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Placeholder for projects without content yet */}
      {!project.external &&
        !project.images &&
        !project.youtubeId &&
        !project.sections &&
        !project.videos &&
        !project.gifs && (
          <p className="mt-6 font-mono text-[13px] text-pencil">
            Full case study coming soon.
          </p>
        )}
    </main>
  );
}
