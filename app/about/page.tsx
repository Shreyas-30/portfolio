import type { Metadata } from "next";
import Image from "next/image";
import { AboutCTAs, ResumeLink } from "@/components/about/AboutCTAs";

export const metadata: Metadata = {
  title: "About — Shreyas Kulkarni",
  description:
    "Engineer, designer, builder. M.S. Integrated Product Design from Penn.",
};

type Entry = { role: string; org: string; period: string; note?: string };

const experience: Entry[] = [
  {
    role: "Product Manager Intern",
    org: "Kiro — AI Financial Coaching App",
    period: "Jun 2025 – Aug 2025",
  },
  {
    role: "Teaching Assistant",
    org: "Wharton School of Business · UPenn GSE",
    period: "Jun 2025 – Aug 2025",
  },
  {
    role: "Technical Analyst",
    org: "Citi Corp — Institutional Client Group",
    period: "Aug 2020 – Oct 2022",
  },
];

const education: Entry[] = [
  {
    role: "M.S. Integrated Product Design",
    org: "University of Pennsylvania",
    period: "Aug 2024 – May 2026",
    note: "Penn Engineering · Wharton · Weitzman",
  },
  {
    role: "B.Tech Information Technology",
    org: "COEP Technological University",
    period: "Aug 2016 – May 2020",
    note: "Minors in Financial Engineering",
  },
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
    <main className="relative z-[2] mx-auto w-full max-w-5xl px-6 pb-32 pt-32 sm:px-10 sm:pt-36">
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-end">
        <div>
          <p className="kicker">About</p>
          <h1 className="mt-2 font-display text-5xl font-semibold leading-tight sm:text-6xl">
            Shreyas
            <br />
            Kulkarni<span className="text-accent">.</span>
          </h1>

          {/* Bio */}
          <div className="mt-10 max-w-prose space-y-5 text-base leading-relaxed text-ink/80">
            <p>
              I&rsquo;m a generalist who sits at the intersection of
              engineering, design, and business. I recently graduated with a
              Master&rsquo;s in Integrated Product Design from the University of
              Pennsylvania, a joint program across Penn Engineering, Wharton,
              and the Weitzman School of Design.
            </p>
            <p>
              Before Penn, I spent two years as a Technical Analyst at Citi and
              a year consulting on digital solutions for small businesses. I
              studied Information Technology at COEP Technological University,
              Pune before that. Born and raised in Amravati, Maharashtra.
            </p>
            <p>
              I&rsquo;m drawn to problems that sit in the gap between
              disciplines, where the mechanical meets the digital, or where a
              sharp product idea meets the messy reality of getting it built and
              into people&rsquo;s hands.
            </p>
            <p>
              Building a life with room for travel, good people, and the kind
              of work that keeps me curious. I don&rsquo;t really want the work
              to feel separate from the rest of life. Ideally it all feeds into
              the same thing: learning a lot, making useful things, and staying
              close to problems that feel real.
            </p>
          </div>
        </div>

        <figure className="relative w-full max-w-[420px] justify-self-start lg:justify-self-end">
          <div className="absolute -inset-3 rounded-[18px] bg-paper-2/60" />
          <div className="relative overflow-hidden rounded-[14px] border border-ink/10 bg-paper-2 shadow-[0_18px_45px_rgba(23,22,20,0.12)]">
            <Image
              src="/images/about/shreyas.jpg"
              alt="Shreyas Kulkarni"
              width={1400}
              height={1399}
              priority
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 420px, calc(100vw - 48px)"
              className="aspect-[4/5] w-full object-cover object-[50%_42%] saturate-[0.94]"
            />
          </div>
        </figure>
      </section>

      {/* Experience */}
      <section className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="kicker">Experience &amp; Education</p>
          <ResumeLink />
        </div>
        <ul className="divide-y divide-ink/10">
          {[...experience, ...education].map((e) => (
            <li
              key={e.role}
              className="flex flex-col gap-0.5 py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div>
                <p className="font-semibold text-ink">{e.role}</p>
                <p className="text-sm text-pencil">{e.org}</p>
                {e.note && (
                  <p className="mt-0.5 font-mono text-[11px] text-pencil/60">
                    {e.note}
                  </p>
                )}
              </div>
              <p className="font-mono text-[12px] text-pencil sm:shrink-0 sm:pl-6 sm:text-right">
                {e.period}
              </p>
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
      <AboutCTAs />
    </main>
  );
}
