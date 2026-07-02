"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function AboutCTAs() {
  return (
    <section className="mt-14 flex flex-wrap gap-5">
      <a
        href="mailto:shreyask3004@gmail.com"
        className="group/link inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
        onClick={() =>
          posthog.capture("contact_email_clicked", {
            source: "about_page",
          })
        }
      >
        get in touch
        <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
          ↗
        </span>
      </a>
      <Link
        href="/#work"
        className="group/link inline-flex items-center gap-2 border-b-2 border-ink/40 pb-0.5 font-mono text-[13px] tracking-wide text-pencil transition-colors hover:border-accent hover:text-accent"
      >
        see my work
        <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
          →
        </span>
      </Link>
    </section>
  );
}

export function ResumeLink() {
  return (
    <a
      href="/Shreyas_Kulkarni_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-pencil transition-colors hover:text-accent"
      onClick={() =>
        posthog.capture("resume_downloaded", {
          source: "about_page",
        })
      }
    >
      resume
      <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}
