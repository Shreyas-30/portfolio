import type { Metadata } from "next";
import { NowFeed } from "@/components/now/NowFeed";
import { nowPosts } from "@/content/now";
import { enrichNowPosts } from "@/lib/openGraph";

export const metadata: Metadata = {
  title: "Now — Shreyas Kulkarni",
  description: "Short updates, photos, links, and notes from Shreyas Kulkarni.",
};

export const revalidate = 86400;

export default async function NowPage() {
  const posts = await enrichNowPosts(nowPosts);

  return (
    <main className="relative z-[2] mx-auto w-full max-w-3xl px-6 pb-32 pt-32 sm:px-10 sm:pt-36">
      <header>
        <h1 className="font-display text-5xl font-semibold sm:text-6xl">
          Now<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-pencil sm:text-[1.05rem]">
          Sharing what I'm up to
        </p>
      </header>

      <NowFeed posts={posts} />
    </main>
  );
}
