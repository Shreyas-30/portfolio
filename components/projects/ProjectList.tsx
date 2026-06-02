import { projects } from "@/content/projects";
import { ProjectRow } from "./ProjectRow";

export function ProjectList() {
  return (
    <section
      id="work"
      aria-label="Projects"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-16 sm:px-10 sm:py-20"
    >
      <h2 className="font-display text-4xl font-semibold sm:text-5xl">
        Projects<span className="text-accent">.</span>
      </h2>

      <hr className="mt-6 border-t border-ink/20" />

      <div className="divide-y divide-ink/15">
        {projects.map((project, i) => (
          <div key={project.slug} className="py-16 sm:py-20">
            <ProjectRow project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
