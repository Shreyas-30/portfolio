import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabProjectPage } from "@/components/projects/LabProjectPage";
import { getLabProject } from "@/content/labProjects";

const project = getLabProject("context-colab");

export const metadata: Metadata = {
  title: project ? `${project.title} — Shreyas Kulkarni` : "Project",
  description: project?.metadataDescription,
};

export default function ContextCollabPage() {
  if (!project) notFound();

  return <LabProjectPage project={project} />;
}
