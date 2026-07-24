import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { speakeasyContent as C } from "@/content/speakeasy";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import { SpeakEasyActionLinks } from "./ActionLinks";
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

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
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

        <section className={`${styles.hero} mt-8`} aria-label="SpeakEasy app preview">
          <div className={styles.heroCopy}>
            <Image
              src="/images/projects/speakeasy/header-logo.png"
              alt="SpeakEasy"
              width={1290}
              height={375}
              className={styles.heroLogo}
              priority
            />
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroArc} aria-hidden="true" />
            <Image
              src="/images/projects/speakeasy/header-image-phones.png"
              alt="Three SpeakEasy app screens showing interest selection, AI discussion, and article learning"
              width={1730}
              height={1550}
              sizes="(max-width: 860px) 92vw, 650px"
              className={styles.heroPhones}
              priority
            />
          </div>
        </section>
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

        <SpeakEasyActionLinks project={project} />
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
            </div>
          );
        })}
      </div>

    </main>
  );
}
