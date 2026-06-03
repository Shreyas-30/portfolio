"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { site } from "@/content/site";

type Dock = "left" | "right";

export function NameCard() {
  const reduce = useReducedMotion();
  const [dock, setDock] = useState<Dock>("left");
  const [canDock, setCanDock] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const lastHoverToggle = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setCanDock(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const interactive = canDock && !reduce;

  const toggleDock = () => {
    if (!interactive) return;
    setDock((current) => (current === "left" ? "right" : "left"));
  };

  const updateCursor = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setCursor({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  return (
    <div
      className={`pointer-events-none absolute inset-x-4 bottom-6 z-10 flex sm:inset-x-8 sm:bottom-10 ${
        dock === "right" && interactive ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        layout
        transition={{
          layout: {
            type: "spring",
            stiffness: 95,
            damping: 22,
            mass: 1.2,
          },
        }}
        className="pointer-events-auto max-w-[min(34rem,82%)] text-left"
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          lastHoverToggle.current = Date.now();
          toggleDock();
        }}
        onPointerMove={updateCursor}
        onClick={() => {
          if (Date.now() - lastHoverToggle.current < 400) return;
          toggleDock();
        }}
      >
        <div
          className="relative overflow-hidden rounded-xl border border-ink/15 bg-paper/90 px-6 py-6 shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-8 sm:py-7"
        >
          {interactive && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-xl p-px"
              style={{
                background: `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(47,84,214,0.34), rgba(47,84,214,0.08) 24%, transparent 52%)`,
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
          )}
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
            {site.intro}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
