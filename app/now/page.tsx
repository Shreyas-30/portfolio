import type { Metadata } from "next";
import Image from "next/image";
import { getNowFeed } from "@/lib/now/aggregate";
import type { NowSource } from "@/content/types";
import { imageFill } from "@/lib/image";

export const metadata: Metadata = {
  title: "Now — Shreyas Kulkarni",
  description: "Everything Shreyas is posting online, in one feed.",
};

// ISR: rebuild the aggregated feed at most once an hour.
export const revalidate = 3600;

const SOURCE_LABEL: Record<NowSource, string> = {
  blog: "Blog",
  github: "GitHub",
  instagram: "Instagram",
  twitter: "X",
  letterboxd: "Letterboxd",
  mastodon: "Mastodon",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function NowPage() {
  const { items, sources } = await getNowFeed();
  const liveSources = sources.filter((s) => s.enabled);

  return (
    <main className="relative z-[2] mx-auto w-full max-w-3xl px-6 pb-32 pt-20 sm:px-10">
      <header>
        <h1 className="font-display text-5xl font-semibold sm:text-6xl">
          Now<span className="text-accent">.</span>
        </h1>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-ink/80">
          A single reverse-chronological feed of what I&rsquo;m posting across
          the web. New sources plug in as adapters.
        </p>
        <p className="mt-4 kicker">
          {liveSources.length > 0
            ? `live sources: ${liveSources.map((s) => s.label).join(" · ")}`
            : "no live sources configured yet — add feeds in .env"}
        </p>
      </header>

      <hr className="mt-6 border-t border-ink/20" />

      {items.length === 0 ? (
        <p className="mt-10 text-pencil">Nothing here yet. Check back soon.</p>
      ) : (
        <ul className="mt-8 divide-y divide-ink/15">
          {items.map((item) => (
            <li key={item.id} className="py-6">
              <a
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex gap-4"
              >
                {item.thumbnail && (
                  <div className="relative h-20 w-20 flex-none overflow-hidden rounded-md bg-paper-2">
                    <Image
                      {...imageFill(item.thumbnail)}
                      fill
                      sizes="80px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-pencil">
                      {SOURCE_LABEL[item.source]}
                    </span>
                    <time className="font-mono text-[11px] text-pencil" dateTime={item.timestamp}>
                      {formatDate(item.timestamp)}
                    </time>
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-snug transition-colors group-hover:text-accent">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink/75">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
