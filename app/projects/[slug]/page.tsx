import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { imageFill, imageProps } from "@/lib/image";

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
  const thumbnailFit = project.thumbnailFit === "contain" ? "object-contain" : "object-cover";

  return (
    <main className="relative z-[2] mx-auto w-full max-w-5xl px-6 pb-32 pt-20 sm:px-10">
      <Link href="/#work" className="font-mono text-[13px] text-pencil hover:text-accent">
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
      <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-lg bg-paper-2">
        <Image
          {...imageFill(project.thumbnail)}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className={thumbnailFit}
          priority
        />
      </div>

      {/* Body text */}
      <p className="mt-8 max-w-3xl text-base leading-relaxed text-ink/80">
        {project.body ?? project.description}
      </p>

      {(project.external || project.githubUrl) && (
        <div className="mt-6 flex flex-wrap gap-5">
          {project.external && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
            >
              visit site
              <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                ↗
              </span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
            >
              view GitHub
              <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                ↗
              </span>
            </a>
          )}
        </div>
      )}

      {project.downloads && project.downloads.length > 0 && (
        <section className="mt-10 rounded-lg border border-ink/15 bg-paper-2/70 p-4 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="kicker">try the prototype</p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-tight">
                Download SpeakEasy
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/70">
              Use the store link directly or scan a QR code from your phone.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {project.downloads.map((download) => (
              <article
                key={download.label}
                className="flex items-center justify-between gap-4 rounded-md border border-ink/10 bg-paper p-4"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-pencil">
                    {download.label}
                  </p>
                  <a
                    href={download.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block w-fit transition-opacity hover:opacity-80"
                  >
                    <Image
                      {...imageProps(download.badge)}
                      className="h-10 w-auto sm:h-11"
                    />
                  </a>
                </div>
                <a
                  href={download.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md bg-paper-2 p-2 transition-transform hover:-translate-y-0.5"
                  aria-label={`${download.label} QR code`}
                >
                  <Image
                    {...imageProps(download.qr)}
                    className="h-24 w-24 rounded-sm sm:h-28 sm:w-28"
                  />
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

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
          <p className="kicker mb-6">product flows</p>
          <div className="grid gap-5 lg:grid-cols-3">
            {project.videos.map((video) => (
              <figure key={video.src} className="overflow-hidden rounded-lg bg-paper-2">
                <div className="relative aspect-[9/16] overflow-hidden bg-paper-2">
                  <video
                    className="absolute inset-0 h-full w-full object-contain [clip-path:inset(0_7.5%_0_7.5%_round_2.7rem)]"
                    src={video.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                </div>
                <figcaption className="px-4 py-3">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-pencil">
                    {video.title}
                  </p>
                  {video.caption && (
                    <p className="mt-1 text-sm leading-relaxed text-ink/75">
                      {video.caption}
                    </p>
                  )}
                </figcaption>
              </figure>
            ))}
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
        <div className="mt-10 overflow-hidden rounded-lg bg-paper-2" style={{ aspectRatio: "16/9" }}>
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
