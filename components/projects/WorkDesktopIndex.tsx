"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { labProjects } from "@/content/labProjects";
import type { Project, ImageRef } from "@/content/types";
import { imageFill } from "@/lib/image";

type WorkEntry = {
  id: string;
  title: string;
  subtitle: string;
  previewSubtitle?: string;
  description: string;
  tags: string[];
  year: string;
  href?: string;
  external?: boolean;
  thumbnail?: ImageRef;
  thumbnailFit?: Project["thumbnailFit"];
  thumbnailBg?: string;
  section: "selected" | "lab";
};

const previewSubtitles: Record<string, string> = {
  speakeasy: "language-learning app",
  kiro: "AI money coach",
  smriti: "family storytelling",
  "mechanical-cuckoo-clock": "all-mechanical timepiece",
  "space-chess": "machined chess set",
  birdie: "machined multitool",
  amtrak: "rail booking redesign",
  "autonomous-battlebot": "mechatronics",
  timewise: "time management",
  "laptop-stand": "woodworking",
};

function projectToEntry(project: Project): WorkEntry {
  return {
    id: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    previewSubtitle: previewSubtitles[project.slug],
    description: project.description,
    tags: project.tags,
    year: project.year ?? "—",
    href: project.href,
    external: project.external,
    thumbnail: project.thumbnail,
    thumbnailFit: project.thumbnailFit,
    thumbnailBg: project.thumbnailBg,
    section: "selected",
  };
}

function labProjectToEntry(project: (typeof labProjects)[number]): WorkEntry {
  return {
    id: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    previewSubtitle: project.previewSubtitle,
    description: project.description,
    tags: project.tags,
    year: project.year,
    href: project.href,
    thumbnail: project.thumbnail,
    section: "lab",
  };
}

function EntryMeta({ entry }: { entry: WorkEntry }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5">
      <span>{entry.tags[0] ?? "Project"}</span>
      {entry.section === "lab" && (
        <span className="rounded-full border border-accent/30 px-2 py-1 text-[9px] leading-none text-accent">
          Lab
        </span>
      )}
    </span>
  );
}

function PreviewMedia({ entry }: { entry: WorkEntry }) {
  if (!entry.thumbnail) {
    return (
      <div className="media-slot-placeholder flex h-full w-full items-center justify-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
          Cover image soon
        </span>
      </div>
    );
  }

  const fit =
    entry.id === "speakeasy"
      ? "object-contain scale-[1.16] p-3"
      : entry.id === "mechanical-cuckoo-clock"
        ? "object-cover"
      : entry.thumbnailFit === "contain"
        ? "object-contain p-8"
        : "object-cover";
  const previewBg =
    entry.id === "mechanical-cuckoo-clock"
      ? "#f4f4f1"
      : entry.thumbnailBg;

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-paper-2"
      style={previewBg ? { backgroundColor: previewBg } : undefined}
    >
      <Image
        {...imageFill(entry.thumbnail)}
        fill
        sizes="(max-width: 1024px) 0px, 58vw"
        className={fit}
        priority
      />
    </div>
  );
}

function PreviewPanel({ entry }: { entry: WorkEntry }) {
  const isLinked = Boolean(entry.href);
  const subtitle = entry.previewSubtitle ?? entry.subtitle;

  const handleClick = () => {
    if (!isLinked) return;
    posthog.capture("work_desktop_preview_clicked", {
      project_slug: entry.id,
      project_title: entry.title,
      is_external: entry.external ?? false,
    });
  };

  const content = (
    <div className="relative -ml-6 w-[min(100%,calc(166.667vh-45rem))] overflow-hidden rounded-lg bg-paper-2/54">
      <div className="relative aspect-[5/3] w-full overflow-hidden bg-paper-2">
        <PreviewMedia entry={entry} />
      </div>

      <div className="relative grid h-[190px] grid-rows-[auto_auto_1fr] px-5 pb-4 pt-4 xl:px-6 xl:pb-5 xl:pt-5">
        <h2 className="line-clamp-1 min-h-[2.75rem] font-display text-[2.5rem] font-semibold leading-[0.95] xl:min-h-[3.05rem] xl:text-[2.75rem]">
          {entry.title}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-[2.6rem] max-w-[56ch] text-[0.95rem] leading-snug text-ink/75 xl:text-base">
          {entry.description}
        </p>

        <div className="mt-3 flex items-end justify-between gap-6 border-t border-ink/15 pt-3">
          <p className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-pencil xl:text-[10.5px]">
            <span className="shrink-0">{entry.year}</span>
            <span className="shrink-0 text-pencil/40">·</span>
            <EntryMeta entry={entry} />
            <span className="shrink-0 text-pencil/40">·</span>
            <span className="min-w-0 truncate">{subtitle}</span>
          </p>
          {isLinked ? (
            <span className="shrink-0 border-b border-accent pb-0.5 font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
              view project ↗
            </span>
          ) : (
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
              coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (!isLinked) {
    return <div className="outline-none">{content}</div>;
  }

  if (entry.external) {
    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={entry.href ?? "#"}
      className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      onClick={handleClick}
    >
      {content}
    </Link>
  );
}

function EntryRow({
  entry,
  index,
  active,
  onActivate,
}: {
  entry: WorkEntry;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const year = entry.year.match(/\d{4}/)?.[0] ?? entry.year;
  const rowClasses = [
    "relative flex w-full items-baseline gap-3 overflow-visible rounded-md px-3 py-1.5 text-left transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] outline-none",
    active
      ? "bg-paper-2/54 text-ink after:pointer-events-none after:absolute after:left-[calc(100%-0.25rem)] after:top-0 after:h-full after:w-[9rem] after:rounded-r-lg after:bg-paper-2/54 after:content-['']"
      : "text-pencil hover:text-ink focus-visible:text-ink",
  ].join(" ");

  const content = (
    <>
      <span
        className={`font-mono text-[11px] tracking-[0.12em] transition-colors ${
          active ? "text-accent" : "text-pencil/70"
        }`}
      >
        {number}
      </span>
      <span className="shrink-0 whitespace-nowrap font-display text-[1rem] font-semibold leading-[1.05] xl:text-[1.08rem] 2xl:text-[1.14rem]">
        {entry.title}
      </span>
      <span className="shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-pencil/70">
        {year}
      </span>
    </>
  );

  if (!entry.href) {
    return (
      <button
        type="button"
        className={rowClasses}
        onMouseEnter={onActivate}
        onFocus={onActivate}
      >
        {content}
      </button>
    );
  }

  const handleClick = () => {
    posthog.capture("work_desktop_row_clicked", {
      project_slug: entry.id,
      project_title: entry.title,
      is_external: entry.external ?? false,
    });
  };

  if (entry.external) {
    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        className={rowClasses}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={entry.href}
      className={rowClasses}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={handleClick}
    >
      {content}
    </Link>
  );
}

function AnimatedPreview({ entry }: { entry: WorkEntry }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={entry.id}
      className="w-full"
      initial={reduce ? false : { opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <PreviewPanel entry={entry} />
    </motion.div>
  );
}

export function WorkDesktopIndex({ projects }: { projects: Project[] }) {
  const sections = useMemo(
    () => [
      {
        label: "Selected",
        entries: projects.map(projectToEntry),
      },
      {
        label: "Lab",
        entries: labProjects.map(labProjectToEntry),
      },
    ],
    [projects],
  );
  const entries = sections.flatMap((section) => section.entries);
  const [activeId, setActiveId] = useState(entries[0]?.id ?? "");
  const activeEntry = entries.find((entry) => entry.id === activeId) ?? entries[0];

  return (
    <div className="hidden lg:grid lg:grid-cols-[minmax(390px,0.48fr)_minmax(0,1.52fr)] lg:gap-7 xl:grid-cols-[minmax(420px,0.5fr)_minmax(0,1.5fr)]">
      <div className="pr-1 xl:pr-2">
        {sections.map((section) => (
          <section
            key={section.label}
            className="py-3 first:pt-0 last:pb-0"
          >
            <h2 className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-pencil">
              {section.label}
            </h2>
            <div className="space-y-0.5">
              {section.entries.map((entry) => {
                const index = entries.findIndex((item) => item.id === entry.id);
                return (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    index={index}
                    active={activeEntry.id === entry.id}
                    onActivate={() => setActiveId(entry.id)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <aside className="sticky top-24 self-start min-w-0">
        <div className="relative w-full">
          <AnimatedPreview entry={activeEntry} />
        </div>
      </aside>
    </div>
  );
}
