"use client";

import posthog from "posthog-js";
import type { Project } from "@/content/types";

type SpeakEasyActionLinksProps = {
  project: Pick<Project, "slug" | "title" | "githubUrl" | "downloads">;
};

type ActionLink = {
  label: string;
  href: string;
  event: "project_github_clicked" | "app_download_clicked";
  payload: Record<string, string>;
};

export function SpeakEasyActionLinks({ project }: SpeakEasyActionLinksProps) {
  const links: ActionLink[] = [];

  if (project.githubUrl) {
    links.push({
      label: "view GitHub",
      href: project.githubUrl,
      event: "project_github_clicked",
      payload: { url: project.githubUrl },
    });
  }

  links.push(
    ...(project.downloads ?? []).map<ActionLink>((download) => {
      const isIos =
        download.label.toLowerCase().includes("app") ||
        download.label.toLowerCase().includes("ios");

      return {
        label: isIos ? "download on iOS" : "download on Android",
        href: download.href,
        event: "app_download_clicked",
        payload: {
          platform: download.label,
          url: download.href,
        },
      };
    }),
  );

  if (links.length === 0) return null;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center justify-between border-b border-ink/25 pb-2 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
          onClick={() =>
            posthog.capture(link.event, {
              project_slug: project.slug,
              project_title: project.title,
              ...link.payload,
            })
          }
        >
          <span>{link.label}</span>
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}
