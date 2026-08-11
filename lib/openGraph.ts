import type { NowLinkPreview, NowPost } from "@/content/types";

const PREVIEW_TIMEOUT_MS = 3500;

function decodeHtml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getMeta(html: string, key: string) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escaped}["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+name=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${escaped}["'][^>]*>`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1].trim());
  }

  return undefined;
}

function getTitle(html: string) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match?.[1] ? decodeHtml(match[1].trim()) : undefined;
}

function resolveUrl(value: string | undefined, baseUrl: string) {
  if (!value) return undefined;

  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return undefined;
  }
}

function domainLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function fetchLinkPreview(
  link: NowLinkPreview,
): Promise<NowLinkPreview> {
  if (link.title && link.description) return link;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PREVIEW_TIMEOUT_MS);

  try {
    const response = await fetch(link.url, {
      signal: controller.signal,
      next: { revalidate: 60 * 60 * 24 },
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent":
          "Mozilla/5.0 (compatible; kshreyas-now-preview/1.0; +https://www.kshreyas.com)",
      },
    });

    if (!response.ok) return link;

    const html = await response.text();
    const title =
      link.title ??
      getMeta(html, "og:title") ??
      getMeta(html, "twitter:title") ??
      getTitle(html);
    const description =
      link.description ??
      getMeta(html, "og:description") ??
      getMeta(html, "twitter:description") ??
      getMeta(html, "description");
    const siteName =
      link.siteName ?? getMeta(html, "og:site_name") ?? domainLabel(link.url);
    const imageUrl =
      link.imageUrl ??
      resolveUrl(
        getMeta(html, "og:image") ?? getMeta(html, "twitter:image"),
        link.url,
      );

    return {
      ...link,
      title,
      description,
      siteName,
      imageUrl,
    };
  } catch {
    return link;
  } finally {
    clearTimeout(timeout);
  }
}

export async function enrichNowPosts(posts: NowPost[]): Promise<NowPost[]> {
  return Promise.all(
    posts.map(async (post) => {
      if (post.type !== "post" || !post.links) return post;

      return {
        ...post,
        links: await Promise.all(post.links.map(fetchLinkPreview)),
      };
    }),
  );
}
