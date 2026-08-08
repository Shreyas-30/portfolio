"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import type { LabProject } from "@/content/labProjects";
import { imageFill } from "@/lib/image";

function LabProjectLinks({ project }: { project: LabProject }) {
  if (!project.links || project.links.length === 0) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-5">
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
          onClick={() =>
            posthog.capture("lab_project_link_clicked", {
              project_slug: project.slug,
              project_title: project.title,
              url: link.href,
              label: link.label,
            })
          }
        >
          {link.label}
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}

export function LabProjectPage({ project }: { project: LabProject }) {
  return (
    <main className="relative z-[2] mx-auto w-full max-w-5xl px-6 pb-32 pt-20 sm:px-10">
      <ProjectPageTracker
        slug={project.slug}
        title={project.title}
        tags={project.tags}
      />

      <Link
        href="/work"
        className="font-mono text-[13px] text-pencil hover:text-accent"
      >
        ← back to work
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="kicker">{project.tags.join(" · ")}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-ink/80">{project.subtitle}</p>
      </header>

      <div className="relative mt-8 aspect-[5/3] w-full overflow-hidden rounded-lg bg-paper-2">
        <Image
          {...imageFill(project.thumbnail)}
          fill
          sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) calc(100vw - 5rem), 960px"
          className="object-cover"
          priority
        />
      </div>

      <LabProjectLinks project={project} />

      <section className="mt-10 grid gap-10 md:grid-cols-[1fr_280px] md:items-start">
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-ink/80">
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15">
          {project.facts.map((fact) => (
            <div key={fact.label} className="bg-paper px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-pencil">
                {fact.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                {fact.value}
              </p>
            </div>
          ))}
        </aside>
      </section>

      {project.demo && (
        <section className="mt-14 grid gap-8 md:grid-cols-[minmax(260px,340px)_1fr] md:items-center">
          <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-lg bg-paper-2">
            <iframe
              src={project.demo.embedUrl}
              title={project.demo.title}
              className="aspect-[9/16] w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div>
            <p className="kicker text-accent">{project.demo.kicker}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {project.demo.heading}
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/75">
              {project.demo.body}
            </p>
          </div>
        </section>
      )}

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
    </main>
  );
}
