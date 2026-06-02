"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { navItems } from "@/content/nav";
import { useState, useRef, useEffect, useCallback } from "react";

export function FloatingNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Spring-animated highlight: position + width + opacity
  const hx = useMotionValue(0);
  const hw = useMotionValue(0);
  const ho = useMotionValue(0);
  const springX = useSpring(hx, { stiffness: 420, damping: 30, mass: 0.5 });
  const springW = useSpring(hw, { stiffness: 420, damping: 30, mass: 0.5 });
  const springO = useSpring(ho, { stiffness: 300, damping: 28 });

  const updateHighlight = useCallback(
    (label: string | null) => {
      if (!label || !containerRef.current) {
        ho.set(0);
        return;
      }
      const el = itemRefs.current[label];
      const container = containerRef.current;
      if (!el) return;
      const cr = container.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      hx.set(er.left - cr.left);
      hw.set(er.width);
      ho.set(1);
    },
    [hx, hw, ho],
  );

  useEffect(() => {
    updateHighlight(hoveredLabel);
  }, [hoveredLabel, updateHighlight]);

  const isActive = (href: string) => {
    const route = href.split("#")[0] || "/";
    if (route === "/") return pathname === "/";
    return pathname.startsWith(route);
  };

  return (
    <motion.nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
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
        className="relative flex items-center gap-1 rounded-full border border-ink/15 bg-paper/90 px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm"
      >
        {/* Sliding cobalt highlight — follows the cursor between items */}
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-2 rounded-full bg-accent/[0.14]"
            style={{ left: springX, width: springW, opacity: springO }}
          />
        )}

        {/* Pulsating dot — stops pulsing while nav is in use */}
        <motion.span
          aria-hidden="true"
          className="relative z-10 ml-2 mr-1 h-2.5 w-2.5 flex-none rounded-full bg-accent"
          animate={
            reduce
              ? {}
              : hoveredLabel
              ? { scale: 1, opacity: 0.6 }
              : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }
          }
          transition={
            reduce
              ? undefined
              : hoveredLabel
              ? { duration: 0.2 }
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        />

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
              onMouseEnter={() => setHoveredLabel(item.label)}
              onMouseLeave={() => setHoveredLabel(null)}
              className={`relative z-10 inline-flex min-h-11 items-center rounded-full px-3.5 py-2 font-mono text-[13px] tracking-wide transition-colors duration-150 ${
                active || isHovered ? "text-ink" : "text-pencil"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
