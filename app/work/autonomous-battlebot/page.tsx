import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import { projects } from "@/content/projects";
import type { ImageRef } from "@/content/types";
import { imageProps } from "@/lib/image";

const project = projects.find((item) => item.slug === "autonomous-battlebot");

function getProject() {
  if (!project) {
    throw new Error("Autonomous Battlebot project data is missing.");
  }

  return project;
}

const assets = {
  thumbnail: {
    src: "/images/projects/mechatronics/thumbnail.png",
    alt: "Finished autonomous battlebot",
    width: 828,
    height: 892,
  },
  sketchOne: {
    src: "/images/projects/mechatronics/drawing_1.png",
    alt: "Autonomous Battlebot first concept sketch",
    width: 1684,
    height: 1192,
  },
  sketchTwo: {
    src: "/images/projects/mechatronics/drawing_2.png",
    alt: "Autonomous Battlebot V1 side and front sketch",
    width: 1687,
    height: 1191,
  },
  v1: {
    src: "/images/projects/mechatronics/v1.png",
    alt: "Autonomous Battlebot V1 test platform with motors and caster",
    width: 942,
    height: 707,
  },
  roba: {
    src: "/images/projects/mechatronics/ROBA.png",
    alt: "Robot Battle Arena gameplay overview",
    width: 812,
    height: 516,
  },
  v3Schematic: {
    src: "/images/projects/mechatronics/v3_schematic.png",
    alt: "Autonomous Battlebot V3 time-of-flight sensor alignment schematic",
    width: 2904,
    height: 2000,
  },
  finalIntegration: {
    src: "/images/projects/mechatronics/final.png",
    alt: "Autonomous Battlebot final electronics integration with Top Hat circuit",
    width: 1148,
    height: 1216,
  },
} satisfies Record<string, ImageRef>;

export const metadata: Metadata = {
  title: "Autonomous Battlebot — Shreyas Kulkarni",
  description:
    "A mechatronics battlebot built around ESP32 control, mechanical iteration, and autonomous competition strategy.",
};

function SectionHeader({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-7 grid gap-3 border-t border-ink/15 pt-8 md:grid-cols-[13rem_1fr] md:gap-10">
      <p className="kicker text-accent">{kicker}</p>
      <div>
        <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h2>
        {body && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/75">
            {body}
          </p>
        )}
      </div>
    </div>
  );
}

function ImageCard({
  image,
  className = "",
  imageClassName = "",
  priority = false,
  framed = true,
}: {
  image: ImageRef;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  framed?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-lg ${framed ? "bg-paper-2" : ""} ${className}`}
    >
      <Image
        {...imageProps(image)}
        sizes="(max-width: 768px) 100vw, 720px"
        className={`h-full w-full ${imageClassName}`}
        priority={priority}
      />
    </figure>
  );
}

function NoteList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-paper-2 p-6 sm:p-7">
      <p className="kicker text-accent">{title}</p>
      <ul className="mt-4 space-y-3 text-base leading-relaxed text-ink/78">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[0.72em] size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AutonomousBattlebotPage() {
  const battlebot = getProject();

  return (
    <main className="relative z-[2] mx-auto w-full max-w-6xl px-6 pb-32 pt-32 sm:px-10 sm:pt-40">
      <ProjectPageTracker
        slug={battlebot.slug}
        title={battlebot.title}
        tags={battlebot.tags}
      />

      <Link
        href="/work"
        className="font-mono text-[13px] text-pencil hover:text-accent"
      >
        ← back to work
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="kicker">{battlebot.tags.join(" · ")}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">
          {battlebot.title}
        </h1>
        <p className="mt-3 text-lg text-ink/80">{battlebot.subtitle}</p>
      </header>

      <section className="mt-9 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <ImageCard
          image={assets.thumbnail}
          className="aspect-[4/3]"
          imageClassName="object-contain"
          priority
          framed={false}
        />

        <div className="flex flex-col justify-center gap-6 py-2 lg:py-4">
          <div>
            <p className="text-lg leading-relaxed text-ink/80">
              This came out of the MEAM510 mechatronics course at Penn which I
              audited, where the final project was a battlebot competition on a
              game arena. The bot had to navigate autonomously and
              semi-autonomously, capture towers, score points, and survive
              against other teams’ robots.
            </p>
          </div>

          <dl className="grid gap-x-8 gap-y-5 border-t border-ink/15 pt-5 sm:grid-cols-3">
            {[
              [
                "Electronics",
                "ESP32 · motor encoders · ToF sensors · whisker switch · Top Hat",
              ],
              ["Role", "Software integration"],
              ["Fabrication", "3D print · laser cut · wiring"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-pencil">
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/85">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-xl border border-ink/12 bg-paper-2/45 p-5 sm:p-7">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="kicker text-accent">ROBA Gameplay</p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/78 sm:text-lg">
              <p>
                The Robot Battle Arena game is inspired by Multiplayer Online
                Battle Arena games. The goal is to destroy the opposing team’s
                nexus while defending your own.
              </p>
              <p>
                For the first 30 seconds, robots navigate autonomously using
                wall-following and localization through the HTC Vive Lighthouse
                system. After that, teams can send Wi-Fi packets to their bot,
                but every command costs robot health.
              </p>
            </div>
          </div>

          <ImageCard
            image={assets.roba}
            className="aspect-[812/516]"
            imageClassName="object-contain"
            framed={false}
          />
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          kicker="01 · V1"
          title="Starting with the simplest thing that could drive"
          body="The game mechanics and terrain constraints such as ramp, wall heights to work around, and home base size limit is what drove our design decisions. Our first pass was about making something that moved reliably withing these constraints before getting clever."
        />

        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="rounded-lg bg-paper-2 p-6 sm:p-7">
            <p className="kicker text-accent">First test platform</p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink/78">
              <p>
                We chose differential drive over skid steer because it was
                easier to implement quickly and matched what had worked in
                previous year's successful builds. We used a front caster for
                steering.
              </p>
              <p>
                I programmed a basic ESP32 remote-control setup first. It let us
                confirm the motor drivers, wiring, and drive controls before
                added any sensors and autonomy.
              </p>
              <p>
                At this stage we were using Adafruit TT gearbox motors with
                external TT encoders from the lab. I also started tuning a PID
                closed-loop for dead reckoning.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <ImageCard
                image={assets.sketchOne}
                className="aspect-[1684/1192]"
                imageClassName="object-cover"
              />
              <ImageCard
                image={assets.sketchTwo}
                className="aspect-[1687/1191]"
                imageClassName="object-cover"
              />
            </div>
            <ImageCard
              image={assets.v1}
              imageClassName="object-cover"
              className="aspect-[942/707]"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Motor mounting height",
              body: "The caster made the front sit too high, so the bot wanted to tip backward when it tried to climb the ramp.",
            },
            {
              title: "Caster behavior",
              body: "Wheel caster was hard to maneuver and sometimes locked up at the wrong angle blocking the movement.",
            },
            {
              title: "Wheel skids",
              body: "The external encoders were inconsistent across surfaces. Wheel skidding made the PID loop much less useful than expected.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-lg bg-paper-2 p-5">
              <h3 className="font-display text-2xl font-semibold leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/72">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          kicker="02 · V2"
          title="Follow the wall, avoid the obstacles"
          body="Wall following was one of the subtasks in the game, so we added a side-facing time-of-flight sensor for that, and tuned the PID loop to keep the bot moving straight."
        />

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-lg bg-paper-2 p-6 shadow-[0_1px_0_rgba(26,24,20,0.05)]">
                <p className="kicker text-accent">Sensing</p>
                <p className="mt-3 text-base leading-relaxed text-ink/76">
                  We added two VL53L1X ToF sensors: one side-facing for wall
                  following, one forward-facing for obstacle avoidance. I wired
                  both into the ESP32 over I2C.
                </p>
              </div>

              <div className="rounded-lg bg-paper-2 p-6 shadow-[0_1px_0_rgba(26,24,20,0.05)]">
                <p className="kicker text-accent">Drive</p>
                <p className="mt-3 text-base leading-relaxed text-ink/76">
                  The front caster became a ball caster, and we replaced motors
                  with integrated encoders. The base was easier to turn and the
                  feedback was cleaner.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-paper-2 p-6 shadow-[0_1px_0_rgba(26,24,20,0.05)] sm:p-7">
              <p className="kicker text-accent">What testing showed</p>
              <p className="mt-3 text-base leading-relaxed text-ink/78">
                A single side sensor was not enough for reliable wall following
                as the bot veered off course struggling to maintain
                straight-line motion. Dead reckoning with PID also drifted when
                the wheels slipped on the ramp - we tried adding rubber bands to
                the wheels to increase traction.
              </p>
            </div>
          </div>

          <figure className="flex min-h-[28rem] items-stretch justify-center overflow-hidden rounded-lg">
            <video
              className="h-full max-h-[38rem] w-auto max-w-full rounded-lg object-contain"
              src="/images/projects/mechatronics/v2_wall_following.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </figure>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          kicker="03 · V3"
          title="Final competition build"
          body="The final version moved from proving pieces in isolation to making the bot work inside the actual competition rules."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="grid gap-4">
            <ImageCard
              image={assets.v3Schematic}
              className="aspect-[16/9]"
              imageClassName="object-cover"
              framed={false}
            />
            <ImageCard
              image={assets.finalIntegration}
              className="aspect-[4/3]"
              imageClassName="object-contain"
              framed={false}
            />
          </div>

          <NoteList
            title="Final integration"
            items={[
              "Used two side-facing ToF sensors to get accurate heading by measuring the difference in readings for more stable wall following, plus one front sensor for obstacle avoidance.",
              "Integrated the provided Top Hat circuit with the ESP32 so game commands, scoring, and bot health stayed in sync.",
              "Added the required whisker switch, which let other bots physically register hits and deplete our health during the match.",
              "We ended up leaving out the servo based attack mechanism becuase of time constraints.",
            ]}
          />
        </div>
      </section>

      {battlebot.youtubeId && (
        <section className="mt-20">
          <SectionHeader
            kicker="Video"
            title="Final match"
            body="After all the iteration, our bot ended up winning the final competition against 11 other bots."
          />
          <div
            className="overflow-hidden rounded-lg bg-paper-2"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${battlebot.youtubeId}`}
              title={`${battlebot.title} — video`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </main>
  );
}
