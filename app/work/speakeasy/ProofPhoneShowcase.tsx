"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import styles from "./proof-phone.module.css";

const project = projects.find((p) => p.slug === "speakeasy")!;

// Short, one-to-two-line summaries for the compact step list — the full
// captions in content/projects.ts are written for the generic project
// template's larger layout and read as too wordy here.
const STEP_SUMMARIES: Record<number, string> = {
  0: "Pick your interests once, and get a personalized article feed from day one.",
  1: "Tap any word to define it, listen along, and save new vocabulary as you read.",
  2: "Talk it through with an AI tutor, phone-call style, one gentle question at a time.",
};

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

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="Product flow videos — use left and right arrow keys to navigate"
      className="mx-auto grid max-w-[760px] grid-cols-1 items-center gap-8 text-left outline-none min-[560px]:grid-cols-[1fr_220px] min-[560px]:gap-10"
    >
      <div className="flex flex-col gap-1.5">
        {videos.map((video, i) => {
          const isActive = i === active;
          return (
            <button
              key={video.src}
              type="button"
              onClick={() => goTo(i)}
              className={`text-left transition-[background-color,border-color,box-shadow,opacity] duration-300 ${
                isActive
                  ? "rounded-xl border border-ink/15 bg-white/40 px-5 py-4 shadow-[0_6px_20px_rgba(40,36,28,0.06)]"
                  : "rounded-xl border border-transparent px-5 py-2.5 opacity-60 hover:opacity-100"
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={`font-mono text-[11px] font-semibold transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-pencil"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-display text-xl font-semibold leading-snug">
                  {video.title}
                </h4>
              </div>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  {STEP_SUMMARIES[i] && (
                    <p className="mt-1.5 max-w-[46ch] text-[12px] leading-relaxed text-ink/70">
                      {STEP_SUMMARIES[i]}
                    </p>
                  )}
                  <div className="mt-2.5 h-0.5 w-full max-w-[46ch] overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{
                        width: `${progress}%`,
                        transition: prefersReducedMotion()
                          ? "none"
                          : "width 200ms linear",
                      }}
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mx-auto w-full max-w-[220px]">
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2rem] bg-paper-2 shadow-[0_20px_60px_rgba(40,36,28,0.15)]">
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
              className={`h-full w-full object-contain ${styles.videoFadeIn}`}
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
