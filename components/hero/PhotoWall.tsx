"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { HeroTile } from "@/content/types";
import { imageFill } from "@/lib/image";

// Ten fixed slots (the grid template in globals.css positions them).
// Each slot has a preferred photo orientation so cropping is minimal.
const SLOT_COUNT = 10;
type Orient = "portrait" | "landscape" | "square";
const SLOT_PREF: Orient[] = [
  "landscape", // s0 — feature (large, ~square; landscape reads well big)
  "square", // s1
  "portrait", // s2
  "portrait", // s3
  "portrait", // s4
  "square", // s5
  "portrait", // s6
  "portrait", // s7
  "landscape", // s8
  "landscape", // s9
];

const CYCLE_MS = 4600;

function orientationOf(t: HeroTile): Orient {
  const r = t.height / t.width;
  if (r > 1.15) return "portrait";
  if (r < 0.87) return "landscape";
  return "square";
}

// Assign each slot a photo, matching orientation where possible.
function initialAssignment(tiles: HeroTile[]): number[] {
  const used = new Set<number>();
  const pick = (pref: Orient) => {
    let idx = tiles.findIndex((t, i) => !used.has(i) && orientationOf(t) === pref);
    if (idx === -1) idx = tiles.findIndex((_, i) => !used.has(i));
    if (idx === -1) idx = 0; // pool smaller than slot count — allow reuse
    used.add(idx);
    return idx;
  };
  return Array.from({ length: SLOT_COUNT }, (_, s) => pick(SLOT_PREF[s]));
}

export function PhotoWall({ tiles }: { tiles: HeroTile[] }) {
  const reduce = useReducedMotion();
  const [assignment, setAssignment] = useState<number[]>(() => initialAssignment(tiles));
  const [visibleCount, setVisibleCount] = useState(SLOT_COUNT);
  const tick = useRef(0);

  // Track how many slots are visible at the current breakpoint so we
  // only cycle photos into tiles the viewer can actually see.
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setVisibleCount(lg.matches ? 10 : sm.matches ? 7 : 6);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (reduce || tiles.length <= SLOT_COUNT) return;
    const id = setInterval(() => {
      setAssignment((prev) => {
        tick.current += 1;
        // Bias toward the feature slot; otherwise refresh a small tile.
        const target =
          tick.current % 2 === 0
            ? 0
            : 1 + Math.floor(Math.random() * (visibleCount - 1));
        const shown = new Set(prev);
        const pref = SLOT_PREF[target];
        let next = tiles.findIndex(
          (t, i) => !shown.has(i) && orientationOf(t) === pref,
        );
        if (next === -1) next = tiles.findIndex((_, i) => !shown.has(i));
        if (next === -1) return prev; // nothing new to show
        const copy = [...prev];
        copy[target] = next;
        return copy;
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, tiles, visibleCount]);

  return (
    <div className="photo-wall">
      {Array.from({ length: SLOT_COUNT }, (_, slot) => {
        const tile = tiles[assignment[slot]];
        return (
          <div
            key={slot}
            className={`wall-slot wall-slot-${slot}`}
            style={{ gridArea: `s${slot}` }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={tile.id}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeInOut" },
                  scale: { duration: CYCLE_MS / 1000, ease: "easeOut" },
                }}
              >
                <Image
                  {...imageFill(tile)}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 50vw"
                  className="object-cover"
                  priority={slot < 6}
                />
                {tile.accent && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-accent/40 mix-blend-multiply"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
