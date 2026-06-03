import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now — Shreyas Kulkarni",
  description: "A future home for what Shreyas is currently exploring.",
};

export default function NowPage() {
  return (
    <main className="relative z-[2] mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 pb-32 pt-20 sm:px-10">
      <section>
        <p className="kicker mb-5">Coming soon</p>
        <h1 className="font-display text-5xl font-semibold sm:text-6xl">
          Now<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80 sm:text-xl">
          This will become a small living page for what I&rsquo;m currently
          reading, building, thinking about, and spending time on.
        </p>
      </section>
    </main>
  );
}
