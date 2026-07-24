"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { navItems } from "@/content/nav";
import { useCallback, useRef, useState } from "react";
import type { MouseEvent } from "react";

const CURSOR_SIZE = 40;
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function FloatingNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorW = useMotionValue(CURSOR_SIZE);
  const cursorH = useMotionValue(CURSOR_SIZE);
  const opacity = useMotionValue(0);
  const springCursorX = useSpring(cursorX, { stiffness: 360, damping: 38, mass: 0.72 });
  const springCursorY = useSpring(cursorY, { stiffness: 360, damping: 38, mass: 0.72 });
  const springCursorW = useSpring(cursorW, { stiffness: 420, damping: 40, mass: 0.6 });
  const springCursorH = useSpring(cursorH, { stiffness: 420, damping: 40, mass: 0.6 });
  const springOpacity = useSpring(opacity, { stiffness: 260, damping: 30 });

  const hideCursor = useCallback(() => {
    setHoveredLabel(null);
    opacity.set(0);
  }, [opacity]);

  const setCircleAtPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (reduce || !containerRef.current) return;

      const cr = containerRef.current.getBoundingClientRect();
      cursorX.set(
        clamp(clientX - cr.left - CURSOR_SIZE / 2, 0, cr.width - CURSOR_SIZE),
      );
      cursorY.set(
        clamp(clientY - cr.top - CURSOR_SIZE / 2, 0, cr.height - CURSOR_SIZE),
      );
      cursorW.set(CURSOR_SIZE);
      cursorH.set(CURSOR_SIZE);
      opacity.set(1);
    },
    [cursorH, cursorW, cursorX, cursorY, opacity, reduce],
  );

  const followPointer = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (hoveredLabel) return;
      setCircleAtPointer(event.clientX, event.clientY);
    },
    [hoveredLabel, setCircleAtPointer],
  );

  const updateCursor = useCallback(
    (label: string | null) => {
      if (reduce || !label || !containerRef.current) return;

      const el = itemRefs.current[label];
      const container = containerRef.current;
      if (!el) return;

      const cr = container.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      cursorX.set(er.left - cr.left);
      cursorY.set(er.top - cr.top);
      cursorW.set(er.width);
      cursorH.set(er.height);
      opacity.set(1);
    },
    [cursorH, cursorW, cursorX, cursorY, opacity, reduce],
  );

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    const route = href.split("#")[0] || "/";
    if (route === "/") return pathname === "/";
    return pathname.startsWith(route);
  };

  return (
    <motion.nav
      aria-label="Primary"
      className="fixed inset-x-3 top-4 z-50 sm:inset-x-auto sm:left-1/2 sm:top-5 sm:-translate-x-1/2"
      initial={false}
      animate={reduce ? {} : { y: [0, -5, 0] }}
      transition={
        reduce
          ? undefined
          : { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <div
        ref={containerRef}
        onMouseMove={followPointer}
        onMouseLeave={hideCursor}
        className="relative mx-auto w-[min(22rem,100%)] overflow-hidden rounded-[1.75rem] border border-ink/20 bg-paper/95 shadow-[0_14px_36px_rgba(26,26,23,0.18)] backdrop-blur-md sm:mx-0 sm:w-auto sm:flex sm:items-center sm:gap-1 sm:rounded-full sm:bg-paper/94 sm:px-2 sm:py-2"
      >
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-primary-nav"
          onClick={() => setMobileOpen((open) => !open)}
          className="relative z-10 grid h-14 w-full grid-cols-[1fr_auto] items-center rounded-full px-5 font-mono text-[13px] tracking-wide text-ink sm:hidden"
        >
          <span className="flex h-6 translate-y-[3px] items-center leading-[1]">
            Menu
          </span>
          <motion.span
            aria-hidden="true"
            animate={reduce ? {} : { rotate: mobileOpen ? 45 : 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-6 w-6 translate-y-[3px] items-center justify-center text-[22px] leading-[1] text-accent"
          >
            +
          </motion.span>
        </button>

        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute z-0 hidden rounded-full bg-ink/[0.075] backdrop-blur-[1.5px] sm:block"
            style={{
              left: springCursorX,
              top: springCursorY,
              width: springCursorW,
              height: springCursorH,
              opacity: springOpacity,
            }}
          />
        )}

        <motion.div
          id="mobile-primary-nav"
          aria-hidden={!mobileOpen}
          initial={false}
          animate={
            mobileOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className={`grid grid-cols-3 gap-1 px-2 pb-2 sm:hidden ${
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
                tabIndex={mobileOpen ? 0 : -1}
                className={`relative z-10 inline-flex min-h-11 items-center justify-center rounded-full px-3 py-2 text-center font-mono text-[12px] tracking-wide transition-colors duration-150 ${
                  active
                    ? "bg-ink/[0.075] text-ink backdrop-blur-[1.5px]"
                    : "text-pencil"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </motion.div>

        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const isHovered = hoveredLabel === item.label;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                ref={(el) => {
                  itemRefs.current[item.label] = el;
                }}
                onMouseEnter={() => {
                  setHoveredLabel(item.label);
                  updateCursor(item.label);
                }}
                onMouseMove={() => updateCursor(item.label)}
                onMouseLeave={(event) => {
                  setHoveredLabel(null);
                  setCircleAtPointer(event.clientX, event.clientY);
                }}
                onFocus={() => {
                  setHoveredLabel(item.label);
                  updateCursor(item.label);
                }}
                onBlur={hideCursor}
                className={`relative z-10 inline-flex min-h-11 items-center rounded-full px-3.5 py-2 font-mono text-[13px] tracking-wide transition-colors duration-150 ${
                  active || isHovered ? "text-ink" : "text-pencil"
                } ${
                  active ? "bg-ink/[0.075] backdrop-blur-[1.5px]" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
