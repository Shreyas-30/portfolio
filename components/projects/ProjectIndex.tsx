"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import posthog from "posthog-js";
import type { Project } from "@/content/types";
import { imageFill } from "@/lib/image";

const PREVIEW_WIDTH = 248;
const PREVIEW_HEIGHT = 186;
const LERP = 0.14;

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function projectHrefProps(project: Project) {
  return project.external
    ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: project.href };
}

function PreviewImage({ project }: { project: Project }) {
  const fit =
    project.thumbnailFit === "contain"
      ? "object-contain scale-[1.08]"
      : "object-cover";

  return (
    <Image
      {...imageFill(project.thumbnail)}
      fill
      sizes={`${PREVIEW_WIDTH}px`}
      className={fit}
      priority={false}
    />
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-pencil sm:text-xs sm:tracking-[0.16em]">
      {tags.map((tag, index) => (
        <span key={tag} className="inline-flex items-center gap-x-2">
          <span>{tag}</span>
          {index < tags.length - 1 && (
            <span className="text-pencil/55" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const activeTiltRef = useRef(0);
  const hasPositionRef = useRef(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const setTargetFromEvent = useCallback((event: React.MouseEvent) => {
    const bounds = listRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = event.clientX - bounds.left + 32;
    const y = event.clientY - bounds.top - PREVIEW_HEIGHT / 2;
    targetRef.current = { x, y };

    if (!hasPositionRef.current) {
      currentRef.current = { x, y };
      hasPositionRef.current = true;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${activeTiltRef.current}deg)`;
      }
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const current = currentRef.current;
    const target = targetRef.current;
    const nextX = current.x + (target.x - current.x) * LERP;
    const nextY = current.y + (target.y - current.y) * LERP;
    const lean = clamp((target.x - nextX) * 0.6, -12, 12);
    const rotation = activeTiltRef.current + lean;

    currentRef.current = { x: nextX, y: nextY };
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) rotate(${rotation}deg)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startLoop = useCallback(() => {
    if (reduce || rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(tick);
  }, [reduce, tick]);

  const showPreview = useCallback(
    (project: Project, event: React.MouseEvent) => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      activeTiltRef.current = project.previewTilt ?? 0;
      setTargetFromEvent(event);
      setActiveSlug(project.slug);
      setPreviewProject(project);
      if (!reduce) {
        setPreviewVisible(true);
        startLoop();
      }
    },
    [reduce, setTargetFromEvent, startLoop],
  );

  const hidePreview = useCallback(() => {
    setActiveSlug(null);
    setPreviewVisible(false);
    if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      setPreviewProject(null);
      hasPositionRef.current = false;
      stopLoop();
    }, 430);
  }, [stopLoop]);

  useEffect(() => {
    return () => {
      stopLoop();
      if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    };
  }, [stopLoop]);

  return (
    <div
      ref={listRef}
      className="relative"
      onMouseMove={(event) => {
        if (!activeSlug || reduce) return;
        setTargetFromEvent(event);
      }}
      onMouseLeave={hidePreview}
    >
      <div className="border-t border-ink/20">
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, "0");
          const isActive = activeSlug === project.slug;
          const isDimmed = Boolean(activeSlug && !isActive);
          const rowClass = `group grid grid-cols-[3rem_1fr_2rem] items-center gap-4 border-b border-ink/15 py-8 transition-[padding] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] sm:grid-cols-[5rem_1fr_3rem] sm:py-10 ${
            isActive ? "pl-3 sm:pl-5" : "pl-0"
          }`;
          const content = (
            <>
              <span
                className={`font-mono text-sm font-semibold tracking-[0.14em] transition-all duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                  isActive
                    ? "-translate-x-1 text-accent"
                    : isDimmed
                    ? "text-pencil"
                    : "text-ink"
                }`}
              >
                {number}
              </span>
              <span className="min-w-0">
                <span
                  className={`block font-display text-4xl font-semibold leading-tight transition-colors duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] sm:text-5xl lg:text-6xl ${
                    isDimmed ? "text-pencil" : "text-ink"
                  }`}
                >
                  {project.title}
                </span>
                <ProjectTags tags={project.tags} />
              </span>
              <span
                className={`justify-self-end font-mono text-2xl transition-all duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                  isActive
                    ? "-translate-y-[5px] translate-x-[5px] text-accent"
                    : isDimmed
                    ? "text-pencil"
                    : "text-ink"
                }`}
                aria-hidden="true"
              >
                ↗
              </span>
            </>
          );

          const handleProjectClick = () => {
            posthog.capture("project_clicked", {
              project_slug: project.slug,
              project_title: project.title,
              project_tags: project.tags,
              is_external: project.external ?? false,
            });
          };

          return project.external ? (
            <a
              key={project.slug}
              {...projectHrefProps(project)}
              className={rowClass}
              onMouseEnter={(event) => showPreview(project, event)}
              onFocus={() => setActiveSlug(project.slug)}
              onBlur={() => setActiveSlug(null)}
              onClick={handleProjectClick}
            >
              {content}
            </a>
          ) : (
            <Link
              key={project.slug}
              {...projectHrefProps(project)}
              className={rowClass}
              onMouseEnter={(event) => showPreview(project, event)}
              onFocus={() => setActiveSlug(project.slug)}
              onBlur={() => setActiveSlug(null)}
              onClick={handleProjectClick}
            >
              {content}
            </Link>
          );
        })}
      </div>

      {!reduce && previewProject && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[248px] max-[820px]:hidden min-[821px]:block"
        >
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-lg border border-ink/10 shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-[opacity,transform] duration-[420ms] ${
              previewVisible ? "scale-100 opacity-100" : "scale-[0.7] opacity-0"
            }`}
            style={{
              backgroundColor: previewProject.thumbnailBg ?? "var(--color-paper-2)",
              transitionTimingFunction: previewVisible
                ? "cubic-bezier(.34,1.56,.5,1)"
                : "ease",
            }}
          >
            <PreviewImage project={previewProject} />
          </div>
        </div>
      )}
    </div>
  );
}
