import type { NowAdapter, NowItem } from "../types";
import { fetchWithTimeout } from "../http";

// X / Twitter — STUB. The v2 API requires a paid tier for user-timeline
// reads and is heavily rate-limited. Returns [] until a bearer token is
// supplied. A no-cost fallback is to expose an RSS bridge (e.g. Nitter)
// and use the rssAdapter instead.

type Tweet = { id: string; text: string; created_at: string };

export function twitterAdapter(): NowAdapter {
  const token = process.env.TWITTER_BEARER_TOKEN ?? "";
  const userId = process.env.TWITTER_USER_ID ?? "";
  const enabled = Boolean(token && userId);
  return {
    source: "twitter",
    label: "X",
    enabled,
    async fetch(): Promise<NowItem[]> {
      if (!enabled) return []; // graceful fallback — paid API not configured
      const res = await fetchWithTimeout(
        `https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!res.ok) return [];
      const json = (await res.json()) as { data?: Tweet[] };
      return (json.data ?? []).map((t): NowItem => ({
        id: `twitter-${t.id}`,
        source: "twitter",
        title: t.text.slice(0, 120),
        excerpt: t.text,
        url: `https://x.com/i/web/status/${t.id}`,
        timestamp: t.created_at,
      }));
    },
  };
}
