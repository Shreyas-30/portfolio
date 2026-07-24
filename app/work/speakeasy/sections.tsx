import Image from "next/image";
import { speakeasyContent as C } from "@/content/speakeasy";
import { projects } from "@/content/projects";
import { imageProps } from "@/lib/image";
import { MediaSlot } from "./MediaSlot";
import { PrototypeCaseFiles } from "./PrototypeCaseFiles";
import { ProofPhoneShowcase } from "./ProofPhoneShowcase";

const project = projects.find((p) => p.slug === "speakeasy")!;

const SIGN_COLOR: Record<string, string> = {
  "+": "text-[#3c6e4f]",
  "−": "text-[#a4432e]",
  "#": "text-pencil",
};

const RESEARCH_APPS = [
  { name: "Duolingo", slug: "duolingo" },
  { name: "Babbel", slug: "babbel" },
  { name: "Rosetta Stone", slug: "rosetta-stone" },
  { name: "Memrise", slug: "memrise" },
  { name: "Pimsleur", slug: "pimsleur" },
  { name: "Busuu", slug: "busuu" },
  { name: "HelloTalk", slug: "hellotalk" },
  { name: "Mondly", slug: "mondly" },
];

// Mockup versions shown beside each decision, keyed by decision index — not
// every decision has (or needs) a visual, per the alternating layout.
// Drop matching files into /public/images/projects/speakeasy/ and they'll
// replace these placeholders automatically.
const DECISION_MOCKUPS: Record<number, { label: string; filename: string }[]> = {
  0: [
    { label: "V1", filename: "decision-1-v1.png" },
    { label: "V2", filename: "decision-1-v2.png" },
    { label: "FINAL", filename: "decision-1-final.png" },
  ],
  1: [
    { label: "V1", filename: "decision-2-v1.png" },
    { label: "FINAL", filename: "decision-2-final.png" },
  ],
  3: [{ label: "FINAL", filename: "decision-4-final.png" }],
};


/* 01 · The wide problem ------------------------------------------------ */
export function Section01() {
  return (
    <>
      <div className="grid grid-cols-1 gap-7 min-[860px]:grid-cols-3">
        {C.stats.map((stat) => (
          <div key={stat.s}>
            <p className="font-display text-[40px] font-semibold leading-none tracking-tight">
              {stat.b}
            </p>
            <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-pencil">
              {stat.s}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 min-[860px]:grid-cols-3">
        {C.quotes.map((q) => (
          <div
            key={q}
            className="border-l-2 border-accent pl-4 font-display text-base italic leading-snug text-ink/80"
          >
            “{q}”
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="font-mono text-[10.5px] uppercase tracking-wide text-pencil">
          Apps in the research set
        </p>
        <div className="mt-3 grid grid-cols-4 gap-3 min-[860px]:grid-cols-8">
          {RESEARCH_APPS.map((app) => (
            <div key={app.slug} className="flex flex-col items-center gap-1.5">
              <MediaSlot
                filename={`logo-${app.slug}.png`}
                alt={`${app.name} app icon`}
                caption={app.name}
                aspect="aspect-square"
              />
              <p className="text-center font-mono text-[9px] text-pencil">
                {app.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 min-[860px]:grid-cols-4">
        {C.insights.map((ins) => (
          <div key={ins.t} className="border-t-2 border-ink pt-3">
            <p className="font-mono text-[10.5px] uppercase tracking-wide text-pencil">
              Insight
            </p>
            <h5 className="mt-1.5 mb-1.5 font-display text-lg font-semibold leading-snug">
              {ins.t}
            </h5>
            <p className="text-[13.5px] leading-relaxed text-ink/70">{ins.b}</p>
          </div>
        ))}
        <div className="border-t-2 border-ink pt-3">
          <p className="font-mono text-[10.5px] uppercase tracking-wide text-pencil">
            What actually works
          </p>
          <h5 className="mt-1.5 mb-1.5 font-display text-lg font-semibold leading-snug">
            Immersion, not lessons
          </h5>
          <p className="text-[13.5px] leading-relaxed text-ink/70">
            {C.works.join(" · ")}
          </p>
        </div>
      </div>
    </>
  );
}

/* 02 · The idea space ---------------------------------------------------- */
export function Section02() {
  return (
    <div className="grid grid-cols-1 gap-5 min-[860px]:grid-cols-3">
      {C.hmws.map((h) => (
        <div key={h.n} className="rounded-xl border border-ink/15 bg-white/40 p-5">
          <p className="font-mono text-[10.5px] uppercase tracking-wide text-pencil">
            {h.n}
          </p>
          <h4 className="mt-2 mb-3 font-display text-lg font-semibold leading-snug">
            {h.t}
          </h4>
          <p className="text-[13.5px] leading-relaxed text-ink/70">{h.why}</p>
          <div className="mt-3.5 flex flex-col gap-2">
            {h.ideas.map((idea) => (
              <span
                key={idea.n}
                className="rounded-md border border-dashed border-ink/15 px-2.5 py-1.5 font-mono text-[10.5px] leading-relaxed text-pencil"
              >
                <b className="font-semibold text-ink">{idea.n}</b> · {idea.d}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 03 · Two prototypes ---------------------------------------------------- */
export function Section03() {
  return <PrototypeCaseFiles />;
}

/* 04 · The pivot ---------------------------------------------------------- */
export function Section04() {
  return (
    <>
      <p className="max-w-[68ch] text-base leading-relaxed text-ink/80">
        {C.pivotIntro}
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 min-[860px]:grid-cols-4">
        {C.pivotStats.map((stat) => (
          <div key={stat.s}>
            <p className="font-display text-[40px] font-semibold leading-none tracking-tight">
              {stat.b}
            </p>
            <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-pencil">
              {stat.s}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-7 max-w-[68ch] text-base leading-relaxed text-ink/80">
        {C.tiktok}
      </p>
      <MediaSlot
        filename="pivot-barriers-chart.png"
        alt="Barriers chart (NCES) and TikTok usage by age (Pew)"
        caption="barriers chart (NCES) + TikTok usage by age (Pew)"
        aspect="aspect-video"
        className="mt-6"
      />
      <div className="mt-6 rounded-xl border border-ink/15 bg-white/40 p-5">
        <p className="font-mono text-[10.5px] uppercase tracking-wide text-pencil">
          What works for this audience
        </p>
        <ul className="mt-2.5 list-disc pl-5 text-[13.5px] leading-loose text-ink/80">
          {C.audienceWorks.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* 05 · The product --------------------------------------------------------- */
export function Section05() {
  return (
    <>
      <p className="max-w-[68ch] text-base leading-relaxed text-ink/80">
        {C.productIntro}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 min-[860px]:grid-cols-2">
        {C.decisions.map((d, i) => {
          const mockups = DECISION_MOCKUPS[i];
          return (
            <div
              key={d.q}
              className="rounded-xl border border-ink/15 bg-white/40 p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
                Call 0{i + 1}
              </p>
              <h4 className="mt-2 font-display text-xl font-semibold leading-snug">
                {d.q}
              </h4>

              <div className="mt-4">
                <span className="inline-block rounded-full bg-[#a4432e]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#a4432e]">
                  Rejected
                </span>
                <p className="mt-2 font-display text-[15px] font-semibold leading-snug">
                  {d.rejT}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/60">
                  {d.rejB}
                </p>
              </div>

              <div className="mt-4">
                <span className="inline-block rounded-full bg-[#3c6e4f]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#3c6e4f]">
                  Chosen
                </span>
                <p className="mt-2 font-display text-[15px] font-semibold leading-snug">
                  {d.winT}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/60">
                  {d.winB}
                </p>
              </div>

              {mockups && (
                <div className="mt-5 flex gap-3 border-t border-dashed border-ink/15 pt-4">
                  {mockups.map((m) => (
                    <div key={m.label} className="w-[84px] shrink-0">
                      <MediaSlot
                        filename={m.filename}
                        alt={`${d.winT} — ${m.label} mockup`}
                        caption={`${m.label} mockup`}
                        aspect="aspect-[9/17]"
                        fit="contain"
                        rounded="rounded-md"
                        transparent
                      />
                      <p
                        className={`mt-1.5 text-center font-mono text-[9px] uppercase tracking-wide ${
                          m.label === "FINAL"
                            ? "font-semibold text-accent"
                            : "text-pencil"
                        }`}
                      >
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 min-[860px]:grid-cols-2">
        {C.versions.map((v) => (
          <div key={v.v} className="rounded-xl border border-ink/15 bg-white/40 p-5">
            <span className="mr-2 rounded bg-ink px-2 py-0.5 font-mono text-[11px] font-semibold text-paper">
              {v.v}
            </span>
            <b className="font-display text-[16.5px] font-semibold">{v.t}</b>
            <div className="mt-2.5 font-mono text-[10.5px] leading-loose text-ink/80">
              {v.c.map(([sign, text], i) => (
                <div key={i}>
                  <span className={`font-semibold ${SIGN_COLOR[sign]}`}>
                    {sign}{" "}
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
          Product flow
        </p>
        <div className="mt-4">
          <ProofPhoneShowcase />
        </div>
      </div>

      <div className="my-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
          Brand
        </p>
        <p className="mt-2 mb-3.5 text-[13.5px] leading-relaxed text-ink/70">
          {C.brand}
        </p>
        <MediaSlot
          filename="brand-board.png"
          alt="Palette, type, and logo (mic + wine glass)"
          caption="palette · type · logo (mic + wine glass)"
          aspect="aspect-[1800/2024]"
          fit="cover"
        />
      </div>

      {project.systemDesign && (
        <div className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
            System design
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-ink/10 bg-paper-2">
            <Image
              {...imageProps(project.systemDesign)}
              sizes="(max-width: 860px) 100vw, 740px"
              className="h-auto w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}

/* 06 · Proof ---------------------------------------------------------------- */
export function Section06() {
  return (
    <div className="mx-auto max-w-[680px] text-center">
      <p className="text-base leading-relaxed text-ink/80">
        {C.validation.cohort}
      </p>
      <MediaSlot
        filename="validation-scores.png"
        alt="Validation scores, N=16"
        caption="validation scores (N=16)"
        aspect="aspect-video"
        className="mt-6"
      />
      <p className="mt-4 text-[13.5px] leading-relaxed text-ink/70">
        <b className="font-semibold text-ink">Expert review:</b> {C.validation.expert}
      </p>
    </div>
  );
}

export const SECTION_BODIES = [
  Section01,
  Section02,
  Section03,
  Section04,
  Section05,
  Section06,
];
