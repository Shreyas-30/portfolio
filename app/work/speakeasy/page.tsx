import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { speakeasyContent as C } from "@/content/speakeasy";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import {
  ProjectExternalLinks,
  ProjectDownloads,
} from "@/components/projects/ProjectLinks";
import { SECTION_BODIES } from "./sections";
import styles from "./speakeasy.module.css";

const project = projects.find((p) => p.slug === "speakeasy")!;

export const metadata: Metadata = {
  title: `${project.title} — Shreyas Kulkarni`,
};

export default function SpeakEasyPage() {
  return (
    <main className="relative z-[2] w-full pb-32 pt-20">
      <ProjectPageTracker
        slug={project.slug}
        title={project.title}
        tags={project.tags}
      />

      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <Link
          href="/work"
          className="font-mono text-[13px] text-pencil hover:text-accent"
        >
          ← back to work
        </Link>

        {/* Hero */}
        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.15em] text-pencil">
            {C.tagline.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="text-accent"> · </span>}
                {t}
              </span>
            ))}
          </p>
          <h1 className="mt-4 font-display text-[clamp(52px,8vw,92px)] font-semibold leading-[0.98] tracking-tight">
            SpeakEasy
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/80">
            {C.lede}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {C.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[10.5px] text-pencil"
              >
                {chip}
              </span>
            ))}
          </div>
        </header>
      </div>

      {/* Hero image */}
      <div className="mx-auto mt-10 w-full max-w-5xl px-6 sm:px-10">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-paper-2">
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        {/* Role / Stack / Validation / Codebase */}
        {project.details && project.details.length > 0 && (
          <section className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
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

        <ProjectExternalLinks project={project} />
      </div>

      {/* The funnel */}
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        {C.sections.map((section, i) => {
          const Body = SECTION_BODIES[i];
          return (
            <div key={section.k}>
              <div
                className={styles.band}
                style={{ "--band-width": C.bandWidths[i] } as React.CSSProperties}
              >
                <div className="mb-7 flex flex-wrap items-baseline gap-4">
                  <span className="whitespace-nowrap font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {section.k} · {section.label.toUpperCase()}
                  </span>
                  <h3 className="font-display text-[clamp(26px,3.4vw,34px)] font-semibold leading-[1.08] tracking-tight">
                    {section.head}
                  </h3>
                </div>
                <Body />
              </div>
              {i < C.markers.length && (
                <div className={styles.marker}>
                  <span className="text-center font-mono text-[11px] tracking-wide text-pencil">
                    ▽ {C.markers[i]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Download CTA */}
      <div className="mx-auto mt-4 w-full max-w-5xl px-6 sm:px-10">
        <ProjectDownloads project={project} />
      </div>
    </main>
  );
}
