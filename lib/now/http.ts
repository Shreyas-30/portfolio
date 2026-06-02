// Fetch with a hard timeout so one slow source can't stall the page.
export async function fetchWithTimeout(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = 6000, ...rest } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: { "User-Agent": "kshreyas-portfolio/1.0", ...rest.headers },
      // Cached + revalidated by the page's `revalidate`; override per call.
      next: { revalidate: 3600, ...(rest as { next?: object }).next },
    });
  } finally {
    clearTimeout(timer);
  }
}
