import type { NowAdapter } from "./types";
import { rssAdapter } from "./adapters/rss";
import { githubAdapter } from "./adapters/github";
import { instagramAdapter } from "./adapters/instagram";
import { twitterAdapter } from "./adapters/twitter";

// ─────────────────────────────────────────────────────────────
// Enabled sources for the Now feed. To add a new source, register
// an adapter here — nothing else in the app needs to change.
//
// RSS + GitHub work with no keys (GitHub just needs a username).
// Instagram / Twitter stay dormant (return []) until tokens exist.
// Fill in the feed URLs / env vars to light each one up.
// ─────────────────────────────────────────────────────────────

export const adapters: NowAdapter[] = [
  rssAdapter({
    source: "blog",
    label: "Blog",
    url: process.env.BLOG_RSS_URL ?? "", // e.g. https://yourblog.com/rss.xml
  }),
  rssAdapter({
    source: "letterboxd",
    label: "Letterboxd",
    url: process.env.LETTERBOXD_RSS_URL ?? "", // https://letterboxd.com/<user>/rss/
  }),
  githubAdapter(),
  instagramAdapter(),
  twitterAdapter(),
];
