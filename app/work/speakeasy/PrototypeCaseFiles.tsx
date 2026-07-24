"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { speakeasyContent as C } from "@/content/speakeasy";
import { MediaSlot } from "./MediaSlot";
import { PrototypeMedia } from "./PrototypeMedia";
import styles from "./case-file.module.css";

const SLUGS = ["langlearn", "verba"];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Section 03 "case file" interaction: cover-plate teaser cards that open a
 * centered overlay with a FLIP transition grown from the clicked card's
 * bounding rect, ported from se-v4/case-cards.js + expand.css (variant c1 /
 * "Cover plate").
 */
export function PrototypeCaseFiles() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mountedIndex, setMountedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [tip, setTip] = useState({ x: 0, y: 0, text: "", on: false });

  const cardRefs = useRef<Array<HTMLDivElement | null>>([null, null]);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastOpenedIndex = useRef<number | null>(null);

  const isOpen = openIndex !== null;

  /* cursor-following tooltip — desktop hover only, hidden while overlay open */
  useEffect(() => {
    if (!canHover()) return;
    const handleMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest?.(
        "[data-tip]",
      ) as HTMLElement | null;
      if (target && openIndex === null) {
        setTip({
          x: e.clientX,
          y: e.clientY + 22,
          text: target.dataset.tip ?? "",
          on: true,
        });
      } else {
        setTip((t) => (t.on ? { ...t, on: false } : t));
      }
    };
    document.addEventListener("pointermove", handleMove);
    return () => document.removeEventListener("pointermove", handleMove);
  }, [openIndex]);

  const openCard = useCallback((ci: number) => {
    lastOpenedIndex.current = ci;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setRevealed(false);
    setMountedIndex(ci);
    setOpenIndex(ci);
    setTip((t) => ({ ...t, on: false }));
  }, []);

  const closeOverlay = useCallback(() => {
    setOpenIndex(null);
    setRevealed(false);
    const reduced = prefersReducedMotion();
    const restoreFocus = () => {
      const idx = lastOpenedIndex.current;
      if (idx !== null) cardRefs.current[idx]?.focus();
    };
    if (reduced) {
      setMountedIndex(null);
      restoreFocus();
      return;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setMountedIndex(null);
      restoreFocus();
    }, 300);
  }, []);

  /* FLIP-in: grow the panel from the clicked card's rect to its final spot */
  useLayoutEffect(() => {
    if (openIndex === null) return;
    const panel = panelRef.current;
    const card = cardRefs.current[openIndex];
    if (!panel || !card) return;

    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    panel.style.transition = "none";
    panel.style.transform = `translate(${cardRect.left - panelRect.left}px, ${
      cardRect.top - panelRect.top
    }px) scale(${cardRect.width / panelRect.width}, ${
      cardRect.height / panelRect.height
    })`;
    panel.style.opacity = ".4";

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        panel.style.transition = "";
        panel.style.transform = "none";
        panel.style.opacity = "1";
        setRevealed(true);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [openIndex]);

  /* Escape closes */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeOverlay]);

  /* Focus trap + initial focus */
  useEffect(() => {
    if (mountedIndex === null) return;
    const panel = panelRef.current;
    if (!panel) return;
    const closeBtn = panel.querySelector<HTMLElement>("[data-close-btn]");
    (closeBtn ?? panel).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [mountedIndex]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  const activeConcept = mountedIndex !== null ? C.concepts[mountedIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 min-[860px]:grid-cols-2">
        {C.concepts.map((c, ci) => (
          <div
            key={c.k}
            ref={(el) => {
              cardRefs.current[ci] = el;
            }}
            role="button"
            tabIndex={0}
            data-tip="click to expand"
            onClick={() => openCard(ci)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openCard(ci);
              }
            }}
            className="group relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white/40 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_10px_30px_rgba(40,36,28,0.09)]"
          >
            <div className="relative border-b border-ink/15">
              <span className="absolute left-3.5 top-3.5 z-10 rounded-md bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-paper">
                {c.k}
              </span>
              <MediaSlot
                filename={`cover-${SLUGS[ci]}.png`}
                alt={`${c.name} cover still`}
                caption={`${c.name} · cover still (key mockup or video frame)`}
                aspect="aspect-[16/10]"
                rounded="rounded-none"
              />
            </div>
            <div className="flex flex-1 flex-col px-6 pb-[22px] pt-5">
              <h4 className="font-display text-2xl font-semibold leading-snug">
                {c.name}
              </h4>
              <span className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wide text-pencil">
                {c.sub}
              </span>
              <p className="line-clamp-2 mt-2 text-[13px] leading-relaxed text-ink/70">
                {c.what}
              </p>
              <div className="mt-3.5 border-t border-dashed border-ink/15 pt-3 font-mono text-[10.5px] tracking-wide">
                <span className="font-semibold text-accent">
                  explore the prototype →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* cursor-following tooltip */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed z-[200] whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wide text-paper transition-[opacity,transform] duration-150 ease-out ${
          tip.on ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: tip.x,
          top: tip.y,
          transform: `translate(-50%, ${tip.on ? "0" : "4px"}) scale(${
            tip.on ? 1 : 0.92
          })`,
        }}
      >
        {tip.text}
      </div>

      {/* case-file overlay */}
      {mountedIndex !== null && activeConcept && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[4vh_3vw]">
          <div
            className={`absolute inset-0 bg-[rgba(28,26,22,.45)] backdrop-blur-[3px] ${styles.backdrop} ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeOverlay}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-file-heading"
            tabIndex={-1}
            className={`relative flex max-h-[88vh] w-[min(860px,100%)] flex-col rounded-2xl border border-[#c8c2b0] bg-paper shadow-[0_40px_100px_rgba(28,26,22,0.4)] ${styles.panel} ${
              isOpen ? "scale-100 opacity-100" : "scale-[.96] opacity-0"
            }`}
          >
            <span className="absolute -top-px left-[34px] -translate-y-full rounded-t-lg bg-ink px-4 py-1.5 font-mono text-[10px] uppercase tracking-wide text-paper">
              case file · {activeConcept.k}
            </span>
            <div className="overflow-auto rounded-2xl px-[clamp(22px,3.5vw,44px)] pb-10 pt-[34px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-wide text-pencil">
                    {activeConcept.k}
                  </p>
                  <h4
                    id="case-file-heading"
                    className="mt-2 font-display text-[26px] font-semibold leading-snug"
                  >
                    {activeConcept.name}
                  </h4>
                  <span className="font-mono text-[10.5px] uppercase tracking-wide text-pencil">
                    {activeConcept.sub}
                  </span>
                </div>
                <button
                  type="button"
                  data-close-btn
                  onClick={closeOverlay}
                  className="whitespace-nowrap rounded-full border border-ink/15 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wide text-pencil transition-colors hover:border-pencil hover:text-ink"
                >
                  ✕ close
                </button>
              </div>

              <p className="mt-4 text-[13.5px] leading-relaxed text-ink/70">
                {activeConcept.what}
              </p>

              <div className={revealed ? styles.revealed : ""}>
                <div className={`${styles.reveal} mt-4`}>
                  <PrototypeMedia
                    slug={SLUGS[mountedIndex]}
                    name={activeConcept.name}
                    active={isOpen}
                  />
                </div>
                <div
                  className={`${styles.reveal} mt-4 grid grid-cols-2 gap-3 min-[640px]:grid-cols-4`}
                >
                  {activeConcept.story.map((line, i) => (
                    <div key={line}>
                      <MediaSlot
                        filename={`storyboard-${SLUGS[mountedIndex]}-0${i + 1}.png`}
                        alt={`${activeConcept.name} storyboard frame ${i + 1}`}
                        caption={`${activeConcept.name} storyboard frame ${i + 1}`}
                        aspect="aspect-square"
                      />
                      <p className="mt-1.5 font-mono text-[9.5px] leading-relaxed text-pencil">
                        {String(i + 1).padStart(2, "0")} · {line}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className={`${styles.reveal} mt-3 border-t border-dashed border-ink/15 pt-2.5 font-mono text-[11px] leading-relaxed text-pencil`}
                >
                  <b className="font-semibold text-[#a4432e]">round 1:</b>{" "}
                  {activeConcept.fb1}
                </div>
                <div
                  className={`${styles.reveal} mt-2 font-mono text-[11px] leading-relaxed text-pencil`}
                >
                  <b className="font-semibold text-accent">iteration:</b>{" "}
                  {activeConcept.iter}
                </div>
                <div
                  className={`${styles.reveal} mt-2 font-mono text-[11px] leading-relaxed text-pencil`}
                >
                  <b className="font-semibold text-[#3c6e4f]">verdict:</b>{" "}
                  {activeConcept.verdict}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
