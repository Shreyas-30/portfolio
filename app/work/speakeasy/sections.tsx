import Image from "next/image";
import {
  BookOpenText,
  BookText,
  Glasses,
  Mic,
  Smartphone,
  Volume2,
} from "lucide-react";
import { speakeasyContent as C } from "@/content/speakeasy";
import { projects } from "@/content/projects";
import { imageProps } from "@/lib/image";
import { MediaSlot } from "./MediaSlot";
import { PrototypeCaseFiles } from "./PrototypeCaseFiles";
import { ProofPhoneShowcase } from "./ProofPhoneShowcase";

const project = projects.find((p) => p.slug === "speakeasy")!;

const RESEARCH_APPS = [
  { name: "Duolingo", slug: "duolingo" },
  { name: "Babbel", slug: "babbel" },
  { name: "Rosetta Stone", slug: "rosetta-stone" },
  { name: "Memrise", slug: "memrise" },
  { name: "Pimsleur", slug: "pimsleur" },
  { name: "Busuu", slug: "busuu" },
  { name: "HelloTalk", slug: "hellotalk" },
  { name: "Mondly", slug: "mondly" },
  { name: "Lingopie", slug: "lingopie" },
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

const PIVOT_LEARNING_ICONS = [BookOpenText, Smartphone, Glasses, Mic];

const PRODUCT_FEATURE_ICONS = [BookText, Volume2, Mic];

const PRODUCT_FEATURES = [
  {
    label: "Content feed",
    title: "Interests shape the feed.",
    body: "Learners start with topics they care about, so every article has context before the lesson begins.",
    filename: "interest-screen.png",
    dimensions: { width: 1092, height: 1195 },
  },
  {
    label: "Vocabulary support",
    title: "Help stays in the moment.",
    body: "A tap brings up pronunciation and native-language meaning without leaving the article.",
    filename: "article-page.png",
    dimensions: { width: 1682, height: 1197 },
  },
  {
    label: "Voice discussion",
    title: "Reading turns into speaking.",
    body: "The AI buddy turns the article into one focused, low-stakes conversation.",
    filename: "feature-voice-discussion.png",
    dimensions: { width: 1451, height: 1792 },
  },
];



/* 01 · The wide problem ------------------------------------------------ */
export function Section01() {
  const insights = [
    ...C.insights,
    {
      t: "Immersion, not lessons",
      b: C.works.join(" · "),
    },
  ];

  return (
    <>
      <p className="mb-8 max-w-[68ch] text-lg leading-relaxed text-ink/75">
        More than two billion people are learning a second or third language,
        but many still struggle to use it confidently in real moments.
      </p>

      <div className="space-y-7 py-5 min-[860px]:px-8">
        {[C.quotes[0], C.quotes[2]].map((q, i) => {
          const lines = i === 1 ? q.split(" When ") : [q];

          return (
            <figure
              key={q}
              className={`max-w-[690px] ${
                i === 1 ? "ml-auto text-right min-[860px]:mr-12" : ""
              }`}
            >
              <blockquote className="text-[clamp(20px,2.2vw,27px)] font-medium italic leading-[1.28] text-[#354531]">
                <span className="bg-[linear-gradient(transparent_58%,rgba(215,232,76,0.42)_58%,rgba(215,232,76,0.42)_88%,transparent_88%)] bg-[length:100%_1.18em] bg-repeat-y px-1 [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                  “
                  {lines.map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {lineIndex > 0 ? `When ${line}` : line}
                      {lineIndex < lines.length - 1 && <br />}
                    </span>
                  ))}
                  ”
                </span>
              </blockquote>
            </figure>
          );
        })}
      </div>

      <div className="mt-14 grid grid-cols-1 items-center gap-12 min-[860px]:grid-cols-[360px_1fr] min-[860px]:gap-18">
        <div className="min-[860px]:pt-8">
          <div className="mx-auto grid max-w-[305px] grid-cols-3 gap-5">
            {RESEARCH_APPS.map((app) => (
              <MediaSlot
                key={app.slug}
                filename={`logo-${app.slug}.png`}
                alt={`${app.name} app icon`}
                caption={app.name}
                aspect="aspect-square"
                fit="contain"
                rounded="rounded-[10px]"
                className="shadow-[0_8px_18px_rgba(26,26,23,0.08)]"
              />
            ))}
          </div>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.13em] text-pencil">
            Popular apps studied
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[12px] uppercase tracking-[0.16em] text-pencil">
            Insights
          </h4>
          <div className="mt-6 grid gap-5">
            {insights.map((ins, i) => (
              <article
                key={ins.t}
                className="grid grid-cols-[3rem_1fr] gap-4 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:translate-x-3 focus-within:translate-x-3"
              >
                <div className="pt-1">
                  <span className="block h-8 w-8 rounded-full border border-accent/40 text-center font-mono text-[11px] leading-8 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h5 className="font-display text-[clamp(24px,2.35vw,30px)] font-semibold leading-[1.08]">
                    {ins.t}
                  </h5>
                  <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-ink/70">
                    {ins.b}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* 02 · The idea space ---------------------------------------------------- */
export function Section02() {
  return (
    <div className="space-y-10">
      <p className="max-w-[66ch] text-lg leading-relaxed text-ink/75">
        The research gave us three bets to test: practice should come from real
        context, content should be personally meaningful, and speaking should
        feel safe before it feels polished.
      </p>

      <div className="space-y-7">
        {C.hmws.map((h, i) => (
          <article
            key={h.n}
            className="grid items-start gap-3 min-[860px]:grid-cols-[150px_1fr] min-[860px]:gap-10"
          >
            <div className="pt-1.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Direction {String(i + 1).padStart(2, "0")}
              </p>
            </div>

            <div>
              <h4 className="max-w-[780px] font-display text-[clamp(25px,2.8vw,34px)] font-semibold leading-[1.08]">
                {h.t}
              </h4>
              <p className="mt-3 max-w-[66ch] text-[15px] leading-relaxed text-ink/70">
                {h.why}
              </p>

              <div className="mt-6 grid gap-3">
                {h.ideas.map((idea, ideaIndex) => (
                  <div
                    key={idea.n}
                    className="grid gap-2 rounded-lg bg-white/30 px-4 py-3 transition-colors duration-300 hover:bg-white/45 min-[640px]:grid-cols-[2.2rem_170px_1fr] min-[640px]:items-baseline min-[640px]:gap-4"
                  >
                    <span className="font-mono text-[10px] text-accent">
                      {String(ideaIndex + 1).padStart(2, "0")}
                    </span>
                    <h5 className="font-display text-[18px] font-semibold leading-tight">
                      {idea.n.replace(/[“”]/g, "")}
                    </h5>
                    <p className="text-[14px] leading-relaxed text-ink/70">
                      {idea.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
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
      <p className="max-w-[72ch] text-lg leading-relaxed text-ink/76">
        {C.pivotIntro}
      </p>

      <div className="mt-9 grid gap-10 min-[860px]:grid-cols-[1.05fr_0.95fr] min-[860px]:gap-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
            What the prototypes taught us
          </p>
          <div className="mt-6 grid gap-5">
            {C.prototypeLearnings.map((learning, i) => {
              const Icon = PIVOT_LEARNING_ICONS[i];

              return (
                <article
                  key={learning.t}
                  className="grid grid-cols-[3.4rem_1fr] gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4d5e3d]/10 text-[#4d5e3d]">
                    <Icon aria-hidden="true" size={21} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h4 className="font-display text-[clamp(21px,2vw,26px)] font-semibold leading-tight">
                      {learning.t}
                    </h4>
                    <p className="mt-1.5 max-w-[48ch] text-[14.5px] leading-relaxed text-ink/68">
                      {learning.b}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="rounded-lg bg-white/20 p-5 min-[860px]:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
            The audience came into focus
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
            {C.pivotAudience}
          </p>

          <div className="mt-7 rounded-lg bg-paper/45 p-5">
            <p className="font-display text-[clamp(34px,3.8vw,46px)] font-semibold leading-none tracking-tight">
              {C.pivotStats[0].b}
            </p>
            <p className="mt-3 max-w-[28ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-pencil">
              {C.pivotStats[0].s}
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {C.pivotStats.slice(1).map((stat) => (
              <div
                key={stat.s}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-t border-ink/10 pt-4"
              >
                <p className="font-display text-[clamp(23px,2.3vw,29px)] font-semibold leading-none tracking-tight">
                  {stat.b}
                </p>
                <p className="font-mono text-[10px] leading-relaxed text-pencil">
                  {stat.s}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-9 rounded-lg bg-[#4d5e3d] px-5 py-5 text-paper min-[760px]:px-6">
        <div className="grid gap-5 min-[760px]:grid-cols-[0.75fr_1.25fr] min-[760px]:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/65">
              Pivot
            </p>
            <p className="mt-2 font-display text-[clamp(23px,2.35vw,30px)] font-semibold leading-[1.02]">
              <span className="block">A smaller,</span>
              <span className="block">more believable</span>
              <span className="relative inline-block">
                habit.
                <svg
                  viewBox="0 0 108 16"
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-3 w-full overflow-visible text-[#d7e84c]"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9 C18 5, 31 12, 45 8 S77 5, 104 10"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="5"
                    opacity="0.82"
                  />
                  <path
                    d="M5 12 C24 9, 37 14, 54 10 S83 8, 103 12"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                    opacity="0.55"
                  />
                </svg>
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.09em] text-paper/85 min-[980px]:gap-2 min-[980px]:text-[11px]">
              <span className="shrink-0 rounded-full border border-paper/25 px-2.5 py-1.5 min-[980px]:px-3">
                real content
              </span>
              <span className="shrink-0 text-paper/45">+</span>
              <span className="shrink-0 rounded-full border border-paper/25 px-2.5 py-1.5 min-[980px]:px-3">
                mobile feed
              </span>
              <span className="shrink-0 text-paper/45">+</span>
              <span className="shrink-0 rounded-full border border-paper/25 px-2.5 py-1.5 min-[980px]:px-3">
                voice buddy
              </span>
            </div>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-paper/76">
              {C.tiktok}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* 05 · The product --------------------------------------------------------- */
export function Section05() {
  return (
    <>
      <p className="max-w-[68ch] text-lg leading-relaxed text-ink/76">
        {C.productIntro}
      </p>

      <div className="mt-8">
        <ProofPhoneShowcase />
      </div>

      <div className="mt-10 space-y-14">
        {PRODUCT_FEATURES.map((feature, i) => {
          const Icon = PRODUCT_FEATURE_ICONS[i];

          return (
            <article
              key={feature.label}
              className={`grid gap-7 min-[860px]:grid-cols-[0.78fr_1.22fr] min-[860px]:items-center ${
                i === 1 ? "min-[860px]:grid-cols-[1.14fr_0.86fr]" : ""
              }`}
            >
              <div className={i === 1 ? "min-[860px]:order-2" : ""}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4d5e3d]/10 text-[#4d5e3d]">
                    <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {feature.label}
                  </p>
                </div>
                <h4 className="mt-4 max-w-[14em] font-display text-[clamp(25px,2.7vw,34px)] font-semibold leading-[1.06]">
                  {feature.title}
                </h4>
                <p className="mt-3 max-w-[45ch] text-[15px] leading-relaxed text-ink/70">
                  {feature.body}
                </p>
              </div>

              <div className={i === 1 ? "min-[860px]:order-1" : ""}>
                <div className="flex items-center justify-center overflow-visible py-2">
                  {feature.dimensions ? (
                    <Image
                      src={`/images/projects/speakeasy/${feature.filename}`}
                      alt={`${feature.label} feature annotation`}
                      width={feature.dimensions.width}
                      height={feature.dimensions.height}
                      sizes="(max-width: 860px) 100vw, 560px"
                      className={`w-auto max-w-full object-contain ${
                        i === 1
                          ? "max-h-[430px] min-[860px]:max-h-[540px]"
                          : "max-h-[340px] min-[860px]:max-h-[390px]"
                      }`}
                    />
                  ) : (
                    <MediaSlot
                      filename={feature.filename}
                      alt={`${feature.label} feature screen`}
                      caption={`${feature.label} feature screen`}
                      aspect="aspect-[4/3]"
                      fit="contain"
                      rounded="rounded-md"
                      transparent
                    />
                  )}
                </div>
              </div>
            </article>
          );
        })}
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

export const SECTION_BODIES = [
  Section01,
  Section02,
  Section03,
  Section04,
  Section05,
];
