"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function ProjectPageTracker({
  slug,
  title,
  tags,
}: {
  slug: string;
  title: string;
  tags: string[];
}) {
  useEffect(() => {
    posthog.capture("project_viewed", {
      project_slug: slug,
      project_title: title,
      project_tags: tags,
    });
  }, [slug, title, tags]);

  return null;
}
