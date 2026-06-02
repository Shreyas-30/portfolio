import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Shreyas Kulkarni",
  description:
    "Engineer, designer, builder. Master's in Integrated Product Design at Penn.",
};

type Entry = { role: string; org: string; period: string; note?: string };

const experience: Entry[] = [
  { role: "Product Manager Intern",  org: "Kiro — AI Financial Coaching App",       period: "Jun 2025 – Aug 2025"  },
  { role: "Teaching Assistant",       org: "Wharton School of Business · UPenn GSE", period: "Jun 2025 – Aug 2025"  },
  { role: "Technical Analyst",        org: "Citi Corp — Institutional Client Group", period: "Aug 2020 – Oct 2022"  },
];

const education: Entry[] = [
  { role: "M.S. Integrated Product Design", org: "University of Pennsylvania",    period: "Aug 2024 – May 2026", note: "Penn Engineering · Wharton · Weitzman" },
  { role: "B.Tech Information Technology",  org: "COEP Technological University", period: "Aug 2016 – May 2020", note: "Minors in Financial Engineering"       },
];

const interests = [
  "Photography",
  "Building things by hand",
  "Reading",
  "Technology",
  "Design",
  "History",
  "Filmmaking",
  "Travel",
];

export default function AboutPage() {
  return (
    <main className="relative z-[2] mx-auto w-full max-w-3xl px-6 pb-32 pt-20 sm:px-10">
      <p className="kicker">About</p>
      <h1 className="mt-2 font-display text-5xl font-semibold leading-tight sm:text-6xl">
        Shreyas<br />Kulkarni<span className="text-accent">.</span>
      </h1>

      {/* Bio */}
      <div className="mt-10 max-w-prose space-y-5 text-base leading-relaxed text-ink/80">
        <p>
          I&rsquo;m a generalist who sits at the intersection of engineering, design,
          and business. Currently pursuing a Master&rsquo;s in Integrated Product Design
          at the University of Pennsylvania — a joint degree across Penn Engineering,
          Wharton, and the Weitzman School of Design.
        </p>
        <p>
          Before Penn I spent two years as a Technical Analyst at Citi and a year
          consulting on digital solutions for small businesses. Before that, I
          studied Information Technology at COEP Technological University, Pune.
          Born and raised in Amravati, Maharashtra.
        </p>
        <p>
          I&rsquo;m drawn to problems that sit in the gap between disciplines — where
          the mechanical meets the digital, or where a sharp product idea meets
          the messy reality of getting it built and into people&rsquo;s hands.
        </p>
      </div>

      {/* Quote */}
      <blockquote className="mt-12 border-l-2 border-accent pl-6">
        <p className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
          &ldquo;To design a life where I can travel the world, meet incredible
          people, and have the time and freedom to solve real-world problems —
          one thoughtful innovation at a time.&rdquo;
        </p>
      </blockquote>

      {/* Experience */}
      <section className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="kicker">Experience &amp; Education</p>
          <a
            href="/Shreyas_Kulkarni_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-pencil transition-colors hover:text-accent"
          >
            resume
            <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
          </a>
        </div>
        <ul className="divide-y divide-ink/10">
          {[...experience, ...education].map((e) => (
            <li key={e.role} className="flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="font-semibold text-ink">{e.role}</p>
                <p className="text-sm text-pencil">{e.org}</p>
                {e.note && (
                  <p className="mt-0.5 font-mono text-[11px] text-pencil/60">{e.note}</p>
                )}
              </div>
              <p className="font-mono text-[12px] text-pencil sm:shrink-0 sm:pl-6 sm:text-right">{e.period}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Interests */}
      <section className="mt-14">
        <p className="kicker mb-6">Interests</p>
        <ul className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <li
              key={interest}
              className="rounded-full border border-ink/20 px-4 py-1.5 font-mono text-[12px] uppercase tracking-wide text-pencil"
            >
              {interest}
            </li>
          ))}
        </ul>
      </section>

      {/* CTAs */}
      <section className="mt-14 flex flex-wrap gap-5">
        <a
          href="mailto:shreyask3004@gmail.com"
          className="group/link inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-[13px] tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
        >
          get in touch
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
        </a>
        <Link
          href="/#work"
          className="group/link inline-flex items-center gap-2 border-b-2 border-ink/40 pb-0.5 font-mono text-[13px] tracking-wide text-pencil transition-colors hover:border-accent hover:text-accent"
        >
          see my work
          <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">→</span>
        </Link>
      </section>
    </main>
  );
}
