import type { NowItem } from "./types";

// ─────────────────────────────────────────────────────────────
// Manually-authored "now" entries (e.g. notes you write by hand).
// These are merged with the live adapter results in
// lib/now/aggregate.ts. Safe to leave empty.
// ─────────────────────────────────────────────────────────────

export const manualNowItems: NowItem[] = [
  {
    id: "manual-welcome",
    source: "blog",
    title: "Setting up this site",
    excerpt:
      "Rebuilt the portfolio from scratch — photo-wall hero, data-driven projects, and a Now feed that aggregates everything I post.",
    url: "/now",
    timestamp: "2026-06-01T12:00:00.000Z",
  },
];
