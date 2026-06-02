import type { NowAdapter, NowItem } from "../types";
import { fetchWithTimeout } from "../http";

// Instagram — STUB. The public scraping endpoints are blocked; the
// only sanctioned path is the Instagram Graph API, which requires a
// Business/Creator account, a Meta app, and a long-lived access token.
//
// Fallback while disabled: returns []. To enable, set
// INSTAGRAM_ACCESS_TOKEN + INSTAGRAM_USER_ID and the fetch below works.

type IgMedia = {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  media_type: string;
};

export function instagramAdapter(): NowAdapter {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN ?? "";
  const userId = process.env.INSTAGRAM_USER_ID ?? "";
  const enabled = Boolean(token && userId);
  return {
    source: "instagram",
    label: "Instagram",
    enabled,
    async fetch(): Promise<NowItem[]> {
      if (!enabled) return []; // graceful fallback — no keys yet
      const fields = "id,caption,media_url,permalink,timestamp,media_type";
      const res = await fetchWithTimeout(
        `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${token}&limit=12`,
      );
      if (!res.ok) return [];
      const json = (await res.json()) as { data?: IgMedia[] };
      return (json.data ?? []).map((m): NowItem => ({
        id: `instagram-${m.id}`,
        source: "instagram",
        title: m.caption ? m.caption.split("\n")[0].slice(0, 120) : "Instagram post",
        excerpt: m.caption,
        url: m.permalink,
        timestamp: m.timestamp,
        thumbnail:
          m.media_type === "IMAGE" || m.media_type === "CAROUSEL_ALBUM"
            ? { src: m.media_url, alt: "Instagram post", width: 1080, height: 1080 }
            : undefined,
      }));
    },
  };
}
