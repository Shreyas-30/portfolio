import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { WorkDesktopIndex } from "@/components/projects/WorkDesktopIndex";

export const metadata: Metadata = {
  title: "Work — Shreyas Kulkarni",
  description:
    "A full index of projects across product, engineering, and design.",
};

export default function WorkPage() {
  return (
    <main className="relative z-[2] mx-auto w-full max-w-7xl px-6 pb-32 pt-20 sm:px-10 lg:min-h-screen lg:pb-10 lg:pt-20">
      {/* Mobile header keeps the original work page treatment. */}
      <div className="flex items-baseline justify-between lg:hidden">
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          Projects<span className="text-accent">.</span>
        </h1>
        <p className="kicker">Selected work</p>
      </div>

      {/* Desktop header supports the index + preview layout. */}
      <div className="hidden flex-col gap-5 lg:flex lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-display text-6xl font-semibold">
            Projects<span className="text-accent">.</span>
          </h1>
        </div>
      </div>

      <hr className="mt-6 border-t border-ink/20 lg:mt-5" />

      <div className="mt-8 hidden lg:block">
        <WorkDesktopIndex projects={projects} />
      </div>

      {/* Mobile keeps the original project list. */}
      <div className="divide-y divide-ink/15 lg:hidden">
        {projects.map((project, i) => (
          <div key={project.slug} className="py-14 sm:py-16">
            <ProjectRow project={project} index={i} />
          </div>
        ))}
      </div>
    </main>
  );
}
