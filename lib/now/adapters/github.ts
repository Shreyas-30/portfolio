import type { NowAdapter, NowItem } from "../types";
import { fetchWithTimeout } from "../http";

// GitHub public activity. No token required (60 req/hr); supplying
// GITHUB_TOKEN raises the limit to 5000/hr.

type GhEvent = {
  id: string;
  type: string;
  created_at: string;
  repo?: { name: string };
  payload?: {
    commits?: { message: string }[];
    ref_type?: string;
    action?: string;
    pull_request?: { title: string; html_url: string };
  };
};

function describe(e: GhEvent): { title: string; excerpt?: string } | null {
  const repo = e.repo?.name ?? "";
  switch (e.type) {
    case "PushEvent": {
      const n = e.payload?.commits?.length ?? 0;
      return {
        title: `Pushed ${n} commit${n === 1 ? "" : "s"} to ${repo}`,
        excerpt: e.payload?.commits?.[0]?.message,
      };
    }
    case "CreateEvent":
      return { title: `Created ${e.payload?.ref_type ?? "ref"} in ${repo}` };
    case "PullRequestEvent":
      return {
        title: `${e.payload?.action ?? "updated"} PR in ${repo}`,
        excerpt: e.payload?.pull_request?.title,
      };
    case "WatchEvent":
      return { title: `Starred ${repo}` };
    default:
      return null;
  }
}

export function githubAdapter(): NowAdapter {
  const username = process.env.GITHUB_USERNAME ?? "";
  const token = process.env.GITHUB_TOKEN;
  const enabled = Boolean(username);
  return {
    source: "github",
    label: "GitHub",
    enabled,
    async fetch(): Promise<NowItem[]> {
      if (!enabled) return [];
      const res = await fetchWithTimeout(
        `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=20`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );
      if (!res.ok) return [];
      const events = (await res.json()) as GhEvent[];
      return events
        .map((e): NowItem | null => {
          const d = describe(e);
          if (!d) return null;
          return {
            id: `github-${e.id}`,
            source: "github",
            title: d.title,
            excerpt: d.excerpt,
            url: e.repo ? `https://github.com/${e.repo.name}` : "https://github.com",
            timestamp: e.created_at,
          };
        })
        .filter((x): x is NowItem => x !== null);
    },
  };
}
