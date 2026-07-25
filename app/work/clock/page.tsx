import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { existsSync } from "node:fs";
import path from "node:path";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import { projects } from "@/content/projects";
import type { ImageRef } from "@/content/types";
import { imageFill, imageProps } from "@/lib/image";
import styles from "./clock.module.css";

export const metadata: Metadata = {
  title: "Mechanical Cuckoo Clock — Shreyas Kulkarni",
  description:
    "A fully mechanical cuckoo clock with laser-cut gears, CNC-routed wood, brass details, and a handmade kalimba chime.",
};

const project = projects.find(
  (item) => item.slug === "mechanical-cuckoo-clock",
);

const clockImages = {
  hero: {
    src: "/images/projects/clock/0.jpg",
    alt: "Finished mechanical cuckoo clock",
    width: 3411,
    height: 5116,
  },
  cad: {
    src: "/images/projects/clock/cad.png",
    alt: "CAD render of the cuckoo clock assembly",
    width: 1202,
    height: 2032,
  },
  exploded: {
    src: "/images/projects/clock/exploded-view.png",
    alt: "Exploded view of the clock assembly",
    width: 4096,
    height: 2560,
  },
  sketch: {
    src: "/images/projects/clock/sketch.png",
    alt: "Clock mechanism sketches and process notes",
    width: 1280,
    height: 1027,
  },
  front: {
    src: "/images/projects/clock/2.jpg",
    alt: "Front view of the mechanical cuckoo clock",
    width: 1280,
    height: 803,
  },
  frontFull: {
    src: "/images/projects/clock/front-full.png",
    alt: "Full front view of the mechanical cuckoo clock",
    width: 1569,
    height: 3576,
  },
  sideProfile: {
    src: "/images/projects/clock/side-profile.png",
    alt: "Side profile of the mechanical cuckoo clock",
    width: 616,
    height: 1024,
  },
  cuckoo: {
    src: "/images/projects/clock/cuckoo.jpg",
    alt: "Cuckoo bird and spring mechanism close-up",
    width: 1280,
    height: 812,
  },
  kalimba: {
    src: "/images/projects/clock/kalimba-closeup.png",
    alt: "Kalimba module close-up",
    width: 2272,
    height: 2080,
  },
  pendulum: {
    src: "/images/projects/clock/5.jpg",
    alt: "Brass weights and pendulum",
    width: 1280,
    height: 1690,
  },
  base: {
    src: "/images/projects/clock/base-feet.jpg",
    alt: "Wood base and machined feet",
    width: 1280,
    height: 1173,
  },
  face: {
    src: "/images/projects/clock/8.jpg",
    alt: "Clock face and hands close-up",
    width: 1280,
    height: 1672,
  },
  connectors: {
    src: "/images/projects/clock/gear-connectors.png",
    alt: "Clock connectors and shafts close-up",
    width: 2152,
    height: 1920,
  },
  gearParts: {
    src: "/images/projects/clock/gears-parts.png",
    alt: "Fabricated clock gear parts",
    width: 936,
    height: 628,
  },
  planetaryGears: {
    src: "/images/projects/clock/gears-planetery.png",
    alt: "Planetary gear detail",
    width: 516,
    height: 376,
  },
  tubeFrame: {
    src: "/images/projects/clock/tube-frames.png",
    alt: "Aluminum tube frame fabrication",
    width: 1080,
    height: 744,
  },
  finishedWide: {
    src: "/images/projects/clock/11.png",
    alt: "Finished clock photographed from the front",
    width: 1280,
    height: 850,
  },
} satisfies Record<string, ImageRef>;

const topModules = [
  {
    title: "Cuckoo bird",
    body: "CNC-milled aluminum, sandblasted and finished; lifted by a spring-scissor mechanism.",
    image: clockImages.cuckoo,
    hotspot: { x: 50, y: 9 },
    connectorClass: styles.hotspotCuckoo,
  },
  {
    title: "Kalimba",
    body: "Laser-cut wood enclosure, tuned metal tines, and a rotating brass pin wheel that plucks the notes.",
    image: clockImages.kalimba,
    hotspot: { x: 84, y: 32 },
    connectorClass: styles.hotspotKalimba,
  },
  {
    title: "Weights & pendulum",
    body: "Turned brass weights, tapped hooks, and a pendulum tuned through test runs rather than electronics.",
    image: clockImages.pendulum,
    hotspot: { x: 72, y: 62 },
    connectorClass: styles.hotspotWeights,
  },
  {
    title: "Feet & base",
    body: "CNC-routed wood, machined aluminum feet, and hand finishing to keep the structure stable.",
    image: clockImages.base,
    hotspot: { x: 78, y: 92 },
    connectorClass: styles.hotspotBase,
  },
];

const buildDetails = [
  {
    title: "Clock face",
    body: "Brass inner ring, 3D-printed outer face, laser-cut acrylic markers, and handmade clock hands.",
    image: clockImages.face,
    hotspot: { x: 50, y: 29 },
    connectorClass: styles.hotspotFace,
  },
  {
    title: "Connectors",
    body: "Lathe-machined arbors, posts, and shafts, with sheet-metal connectors where precision mattered.",
    image: clockImages.connectors,
    hotspot: { x: 47, y: 39 },
    connectorClass: styles.hotspotConnectors,
  },
  {
    title: "Gear system",
    body: "A weight-driven gear train with standardized bearings, fabricated across laser cutting and machining.",
    image: clockImages.gearParts,
    hotspot: { x: 57, y: 34 },
    connectorClass: styles.hotspotGears,
  },
  {
    title: "Tube frame",
    body: "Aluminum tubing was bent and drilled by hand to hold the mechanism without hiding it.",
    image: clockImages.tubeFrame,
    hotspot: { x: 23, y: 57 },
    connectorClass: styles.hotspotTube,
  },
];

const videoSlots = [
  {
    title: "Final clock motion",
    src: "/images/projects/clock/tik-tik.mp4",
    frame: "portrait",
  },
  {
    title: "Kalimba actuation",
    src: "/images/projects/clock/kalimba-sound.mp4",
    frame: "landscape",
  },
  {
    title: "Gear train test",
    src: "/images/projects/clock/gear-movements.mp4",
    frame: "natural",
  },
];

const publicAssetExists = (src: string) =>
  existsSync(path.join(process.cwd(), "public", src));

const availableVideos = videoSlots.filter((video) =>
  publicAssetExists(video.src),
);

function MediaFrame({
  image,
  className = "",
  sizes = "(max-width: 900px) calc(100vw - 3rem), 520px",
  priority = false,
  fit = "cover",
}: {
  image?: ImageRef;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  if (!image) {
    return (
      <div
        className={`grid min-h-56 place-items-center rounded-lg border border-dashed border-ink/20 bg-paper-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-pencil ${className}`}
      >
        Asset coming soon
      </div>
    );
  }

  return (
    <figure
      className={`relative overflow-hidden rounded-lg bg-paper-2 ${className}`}
    >
      <Image
        {...imageProps(image)}
        sizes={sizes}
        className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        priority={priority}
      />
    </figure>
  );
}

function Callout({
  title,
  body,
  image,
  reverse = false,
}: {
  title: string;
  body: string;
  image?: ImageRef;
  reverse?: boolean;
}) {
  return (
    <article
      className={`${styles.callout} ${reverse ? styles.calloutReverse : ""}`}
    >
      <MediaFrame image={image} className={styles.calloutThumb} />
      <div>
        <h3 className="font-display text-xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
          {body}
        </p>
      </div>
    </article>
  );
}

function ArchitectureCallout({
  title,
  body,
  image,
}: {
  title: string;
  body: string;
  image: ImageRef;
}) {
  return (
    <article className={styles.architectureCallout}>
      <div className={styles.architectureCopy}>
        <h3 className="font-display text-2xl font-semibold italic leading-tight">
          {title}
        </h3>
        <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/70">
          {body}
        </p>
      </div>
      <MediaFrame
        image={image}
        className={styles.architectureThumb}
        sizes="(max-width: 900px) calc(100vw - 3rem), 330px"
      />
    </article>
  );
}

function DetailMechanismCallout({
  title,
  body,
  image,
}: {
  title: string;
  body: string;
  image: ImageRef;
}) {
  return (
    <article className={styles.detailCallout}>
      <MediaFrame
        image={image}
        className={styles.detailThumb}
        sizes="(max-width: 900px) calc(42vw - 2rem), 270px"
      />
      <div className={styles.detailCopy}>
        <h3 className="font-display text-2xl font-semibold italic leading-tight">
          {title}
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70">
          {body}
        </p>
      </div>
    </article>
  );
}

function VideoSlot({
  title,
  src,
  frame,
}: {
  title: string;
  src: string;
  frame: string;
}) {
  const frameClass =
    frame === "portrait"
      ? "mx-auto aspect-[9/16] w-full max-w-[18rem]"
      : frame === "landscape"
        ? "aspect-video w-full"
        : `w-full ${styles.naturalVideo}`;

  return (
    <figure className={styles.videoSlot}>
      <div className={`overflow-hidden rounded-lg bg-ink/5 ${frameClass}`}>
        <video
          className={`w-full ${frame === "natural" ? "h-auto" : "h-full object-cover"}`}
          src={src}
          controls
          playsInline
          muted
          preload="metadata"
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
        {title}
      </figcaption>
    </figure>
  );
}

export default function MechanicalCuckooClockPage() {
  if (!project) notFound();

  return (
    <main className="relative z-[2] mx-auto w-full max-w-6xl px-6 pb-32 pt-20 sm:px-10">
      <ProjectPageTracker
        slug={project.slug}
        title={project.title}
        tags={project.tags}
      />

      <Link
        href="/work"
        className="font-mono text-[13px] text-pencil hover:text-accent"
      >
        ← back to work
      </Link>

      <header className="mt-8">
        <p className="kicker">{project.tags.join(" · ")}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-ink/80">{project.subtitle}</p>
      </header>

      <section className={`${styles.clockHero} mt-14`}>
        <div className={styles.heroText}>
          <p className="font-display text-4xl font-semibold italic leading-[0.95] sm:text-6xl">
            The
            <br />
            Cuckoo Clock
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75">
            A fully mechanical timepiece built from falling weights, laser-cut
            gears, CNC-routed wood, machined brass, aluminum tubing, acrylic,
            and a handmade kalimba chime.
          </p>
        </div>

        <div className={styles.heroImage}>
          <figure className={styles.heroPhoto}>
            <Image
              {...imageFill(clockImages.hero)}
              fill
              sizes="(max-width: 900px) calc(100vw - 3rem), 610px"
              className="object-cover"
              priority
            />
          </figure>
        </div>
      </section>

      <section className={`${styles.assemblyGrid} mt-28`}>
        <figure className={styles.assemblyCad}>
          <Image
            {...imageProps(clockImages.cad)}
            sizes="(max-width: 900px) calc(100vw - 3rem), 440px"
            className="h-full w-full object-contain"
          />
        </figure>
        <div>
          <div className={styles.assemblyExplodedWrap}>
            <figure className={styles.assemblySketch}>
              <Image
                {...imageProps(clockImages.sketch)}
                sizes="(max-width: 640px) calc(100vw - 3rem), 360px"
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className={styles.assemblyExploded}>
              <Image
                {...imageProps(clockImages.exploded)}
                sizes="(max-width: 900px) calc(100vw - 3rem), 680px"
                className="h-full w-full object-contain"
              />
            </figure>
          </div>
          <p
            className={`${styles.assemblyCopy} font-display text-xl italic leading-relaxed text-ink/75`}
          >
            The clock came together as a system of modules: timekeeping gears,
            the kalimba actuation, a weight-and-pendulum drive, and a visible
            frame. The final assembly has 170+ parts, most made through CNC,
            laser cutting, lathe work, 3D printing, and hand finishing.
          </p>
        </div>
      </section>

      <section className="mt-28">
        <h2 className="font-display text-3xl font-semibold italic sm:text-4xl">
          Architecture & Manufacturing
        </h2>
        <div className={`${styles.architectureGrid} mt-10`}>
          <figure className={styles.architectureFigure}>
            <Image
              {...imageProps(clockImages.frontFull)}
              sizes="(max-width: 900px) calc(100vw - 3rem), 520px"
              className="h-full w-full object-contain"
            />
            {topModules.map((item) => (
              <span
                key={item.title}
                className={`${styles.hotspot} ${item.connectorClass}`}
                style={{
                  left: `${item.hotspot.x}%`,
                  top: `${item.hotspot.y}%`,
                }}
                aria-hidden="true"
              />
            ))}
          </figure>
          <div className={styles.architectureCallouts}>
            {topModules.map((item) => (
              <ArchitectureCallout key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {availableVideos.length > 0 && (
        <section className={`${styles.videoGrid} mt-24`}>
          {availableVideos.slice(0, 2).map((video) => (
            <VideoSlot key={video.src} {...video} />
          ))}
        </section>
      )}

      <section className="mt-28">
        <h2 className="font-display text-3xl font-semibold italic sm:text-4xl">
          Details & Mechanisms
        </h2>
        <div
          className={`${styles.architectureGrid} ${styles.detailsGrid} mt-10`}
        >
          <div className={styles.detailsCallouts}>
            {buildDetails.map((item) => (
              <DetailMechanismCallout key={item.title} {...item} />
            ))}
          </div>
          <figure
            className={`${styles.architectureFigure} ${styles.detailsFigure}`}
          >
            <Image
              {...imageProps(clockImages.sideProfile)}
              sizes="(max-width: 900px) calc(100vw - 3rem), 520px"
              className="h-full w-full object-contain"
            />
            {buildDetails.map((item) => (
              <span
                key={item.title}
                className={`${styles.hotspot} ${item.connectorClass}`}
                style={{
                  left: `${item.hotspot.x}%`,
                  top: `${item.hotspot.y}%`,
                }}
                aria-hidden="true"
              />
            ))}
          </figure>
        </div>
      </section>

      {availableVideos[2] && (
        <section className="mt-24">
          <VideoSlot {...availableVideos[2]} />
        </section>
      )}
    </main>
  );
}
