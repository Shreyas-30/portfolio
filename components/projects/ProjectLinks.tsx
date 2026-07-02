"use client";

import Image from "next/image";
import posthog from "posthog-js";
import { imageProps } from "@/lib/image";
import type { Project } from "@/content/types";

export function ProjectExternalLinks({
  project,
}: {
  project: Pick<
    Project,
    "slug" | "title" | "href" | "githubUrl" | "liveUrl" | "external"
  >;
}) {
  const liveUrl = project.external ? project.href : project.liveUrl;

  if (!liveUrl && !project.githubUrl) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-5">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
          onClick={() =>
            posthog.capture("project_external_link_clicked", {
              project_slug: project.slug,
              project_title: project.title,
              url: liveUrl,
            })
          }
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
          onClick={() =>
            posthog.capture("project_github_clicked", {
              project_slug: project.slug,
              project_title: project.title,
              url: project.githubUrl,
            })
          }
        >
          view GitHub
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}

export function ProjectDownloads({
  project,
}: {
  project: Pick<Project, "slug" | "title" | "downloads">;
}) {
  if (!project.downloads || project.downloads.length === 0) return null;

  return (
    <section className="mt-10 rounded-lg border border-ink/15 bg-paper-2/70 p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">LAUNCHED IN PUBLIC BETA</p>
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
                onClick={() =>
                  posthog.capture("app_download_clicked", {
                    project_slug: project.slug,
                    project_title: project.title,
                    platform: download.label,
                    url: download.href,
                  })
                }
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
              onClick={() =>
                posthog.capture("app_download_clicked", {
                  project_slug: project.slug,
                  project_title: project.title,
                  platform: download.label,
                  url: download.href,
                  via: "qr_code",
                })
              }
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
  );
}
