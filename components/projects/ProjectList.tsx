"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { projects } from "@/content/projects";
import { ProjectIndex } from "./ProjectIndex";

const FEATURED_PROJECT_SLUGS = [
  "speakeasy",
  "kiro",
  "smriti",
  "space-chess",
  "autonomous-battlebot",
];

export function ProjectList() {
  const featured = FEATURED_PROJECT_SLUGS.map((slug) =>
    projects.find((project) => project.slug === slug),
  ).filter((project) => project !== undefined);

  return (
    <section
      id="work"
      aria-label="Projects"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-16 sm:px-10 sm:py-20"
    >
      <h2 className="font-display text-4xl font-semibold sm:text-5xl">
        Projects<span className="text-accent">.</span>
      </h2>

      <div className="mt-6">
        <ProjectIndex projects={featured} />
      </div>

      {/* See all work CTA — sits flush below the last list border */}
      <div className="flex items-center justify-between border-b border-ink/15 py-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-pencil">
          {projects.length} projects total
        </span>
        <Link
          href="/work"
          className="group/link inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent"
          onClick={() => posthog.capture("view_all_work_clicked", { total_projects: projects.length })}
        >
          View all work
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
