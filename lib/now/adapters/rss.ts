import { XMLParser } from "fast-xml-parser";
import type { NowAdapter, NowItem, NowSource } from "../types";
import { fetchWithTimeout } from "../http";

// Generic RSS/Atom adapter. Works with any feed that needs no auth:
// a blog, Letterboxd (letterboxd.com/<user>/rss/), Mastodon (.rss), etc.
// No API key required.

type RssConfig = {
  source: NowSource;
  label: string;
  /** Feed URL — empty string disables the adapter. */
  url: string;
  /** Cap the number of items pulled. */
  limit?: number;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

function asArray<T>(v: T | T[] | undefined): T[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

function text(v: unknown): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object" && "#text" in v) return String((v as { "#text": unknown })["#text"]);
  return "";
}

function strip(html: string, max = 200): string {
  const t = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

export function rssAdapter(cfg: RssConfig): NowAdapter {
  const enabled = Boolean(cfg.url);
  return {
    source: cfg.source,
    label: cfg.label,
    enabled,
    async fetch(): Promise<NowItem[]> {
      if (!enabled) return [];
      const res = await fetchWithTimeout(cfg.url);
      if (!res.ok) return [];
      const xml = await res.text();
      const doc = parser.parse(xml);

      // RSS 2.0 (channel.item) or Atom (feed.entry).
      const rssItems = asArray(doc?.rss?.channel?.item);
      const atomItems = asArray(doc?.feed?.entry);
      const raw = rssItems.length ? rssItems : atomItems;

      return raw.slice(0, cfg.limit ?? 15).map((it: Record<string, unknown>, i): NowItem => {
        const link =
          text(it.link) ||
          (it.link as { "@_href"?: string })?.["@_href"] ||
          "";
        const when = text(it.pubDate) || text(it.published) || text(it.updated);
        const body = text(it.description) || text(it.summary) || text(it.content);
        return {
          id: `${cfg.source}-${text(it.guid) || link || i}`,
          source: cfg.source,
          title: strip(text(it.title), 140) || "(untitled)",
          excerpt: body ? strip(body) : undefined,
          url: typeof link === "string" ? link : "",
          timestamp: when ? new Date(when).toISOString() : new Date().toISOString(),
        };
      });
    },
  };
}
