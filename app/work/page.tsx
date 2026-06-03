import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectRow } from "@/components/projects/ProjectRow";

export const metadata: Metadata = {
  title: "Work — Shreyas Kulkarni",
  description:
    "A full index of projects across product, engineering, and design.",
};

export default function WorkPage() {
  return (
    <main className="relative z-[2] mx-auto w-full max-w-6xl px-6 pb-32 pt-20 sm:px-10">
      {/* Page header */}
      <div className="flex items-baseline justify-between">
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          Projects<span className="text-accent">.</span>
        </h1>
        <p className="kicker">Selected work</p>
      </div>

      <hr className="mt-6 border-t border-ink/20" />

      {/* Project list */}
      <div className="divide-y divide-ink/15">
        {projects.map((project, i) => (
          <div key={project.slug} className="py-14 sm:py-16">
            <ProjectRow project={project} index={i} />
          </div>
        ))}
      </div>
    </main>
  );
}
