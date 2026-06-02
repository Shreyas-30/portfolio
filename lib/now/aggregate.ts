import "server-only";
import type { NowItem } from "./types";
import { adapters } from "./registry";
import { manualNowItems } from "@/content/now";

export type NowSourceStatus = {
  source: string;
  label: string;
  enabled: boolean;
  count: number;
  ok: boolean;
};

export type NowFeed = {
  items: NowItem[];
  sources: NowSourceStatus[];
};

// Fetch every enabled adapter in parallel, defensively (one bad
// source never breaks the page), merge with manual items, dedupe by
// id, and sort reverse-chronologically.
export async function getNowFeed(): Promise<NowFeed> {
  const results = await Promise.allSettled(
    adapters.map(async (a) => ({ adapter: a, items: await a.fetch() })),
  );

  const sources: NowSourceStatus[] = [];
  const collected: NowItem[] = [...manualNowItems];

  results.forEach((r, i) => {
    const a = adapters[i];
    if (r.status === "fulfilled") {
      collected.push(...r.value.items);
      sources.push({
        source: a.source,
        label: a.label,
        enabled: a.enabled,
        count: r.value.items.length,
        ok: true,
      });
    } else {
      sources.push({ source: a.source, label: a.label, enabled: a.enabled, count: 0, ok: false });
    }
  });

  const seen = new Set<string>();
  const items = collected
    .filter((it) => (seen.has(it.id) ? false : (seen.add(it.id), true)))
    .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));

  return { items, sources };
}
