"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import styles from "./proof-phone.module.css";

const project = projects.find((p) => p.slug === "speakeasy")!;

const FLOW_STEPS = [
  { label: "Choose", videoIndex: 0 },
  { label: "Read + listen", videoIndex: 1 },
  { label: "Save words", videoIndex: 1 },
  { label: "Discuss", videoIndex: 2 },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * "Guided walkthrough" (ported from se-v4/proof.js p1): one phone, one
 * story. A single active flow video plays at a time while the steps sit
 * beside it as a numbered chapter list. The active step's progress bar
 * tracks the video's real playback position; when the video ends, the next
 * step auto-advances (wrapping after the last). Clicking a step, or the
 * left/right arrow keys, jumps straight to it.
 */
export function ProofPhoneShowcase() {
  const videos = project.videos ?? [];
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Accepts either an index or an updater — the updater form always sees the
  // latest state, so rapid-fire events (key repeat, back-to-back 'ended'
  // dispatches) can't compute their next step from a stale closure.
  const goTo = useCallback((next: number | ((prev: number) => number)) => {
    setActive(next);
    setProgress(0);
    setVideoFailed(false);
  }, []);

  /* real playback progress + ended-event auto-advance */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed || videos.length === 0) return;

    const handleTimeUpdate = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    const handleEnded = () => goTo((prev) => (prev + 1) % videos.length);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [active, videoFailed, goTo, videos.length]);

  /* left/right arrow keys, clamped (no wrap) */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo((prev) => Math.min(videos.length - 1, prev + 1));
      if (e.key === "ArrowLeft") goTo((prev) => Math.max(0, prev - 1));
    };
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [goTo, videos.length]);

  if (videos.length === 0) return null;

  const activeVideo = videos[active];
  const fallbackFilename = activeVideo.src.split("/").pop() ?? activeVideo.src;
  const overallProgress =
    videos.length > 0 ? (active + progress / 100) / videos.length : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="Product flow video — use left and right arrow keys to navigate"
      className="mx-auto w-full text-center outline-none"
    >
      <div className="grid gap-3 min-[760px]:grid-cols-4">
        {FLOW_STEPS.map((step, i) => {
          const stepStart = i / FLOW_STEPS.length;
          const stepEnd = (i + 1) / FLOW_STEPS.length;
          const fill = Math.max(
            0,
            Math.min(
              100,
              ((overallProgress - stepStart) / (stepEnd - stepStart)) * 100,
            ),
          );
          const isActive = fill > 0 && fill < 100;
          const isComplete = fill >= 100;

          return (
            <button
              key={step.label}
              type="button"
              onClick={() => goTo(Math.min(step.videoIndex, videos.length - 1))}
              className={`group relative overflow-hidden rounded-lg bg-white/25 px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-white/40 ${
                isActive || isComplete ? "text-ink" : "text-pencil"
              }`}
            >
              <span className="mr-2 text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-ink/8">
                <span
                  className="block h-full bg-accent"
                  style={{
                    width: `${fill}%`,
                    transition: prefersReducedMotion()
                      ? "none"
                      : "width 200ms linear",
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-[230px]">
        <div className="relative mt-9 aspect-[9/19.5] w-full overflow-hidden rounded-[2.45rem] bg-transparent shadow-[0_20px_60px_rgba(40,36,28,0.15)]">
          {videoFailed ? (
            <div className="media-slot-placeholder relative h-full w-full overflow-hidden border border-ink/15">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center">
                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-wide text-pencil">
                  flow video · {activeVideo.title}
                </p>
                <p className="font-mono text-[10px] text-pencil/70">
                  {fallbackFilename}
                </p>
              </div>
            </div>
          ) : (
            <video
              key={activeVideo.src}
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-contain ${styles.videoFadeIn}`}
              src={activeVideo.src}
              muted
              playsInline
              autoPlay
              preload="none"
              onError={() => setVideoFailed(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
