import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import type { ImageRef } from "@/content/types";
import { imageProps } from "@/lib/image";
import { DrawingCarousel } from "./DrawingCarousel";

const pinguTags = ["MECHANICAL", "CAD", "MACHINING", "FABRICATION"];

const hero: ImageRef = {
  src: "/images/projects/pingu/thumbnail.JPG",
  alt: "Finished Pingu machined character object",
  width: 4000,
  height: 3545,
};

const conceptImages = [
  {
    src: "/images/projects/pingu/concepts.png",
    alt: "Pingu concept ideation sketches and reference images",
    width: 1468,
    height: 1012,
  },
];

const drawingSheets = [
  {
    src: "/images/projects/pingu/pingu_drawing_front.png",
    alt: "Pingu front piece technical drawing",
    width: 2212,
    height: 1698,
    label: "front body",
  },
  {
    src: "/images/projects/pingu/pingu_drawing_back.png",
    alt: "Pingu back piece technical drawing",
    width: 2212,
    height: 1698,
    label: "back body",
  },
  {
    src: "/images/projects/pingu/pingu_drawing_assembly.png",
    alt: "Pingu assembly technical drawing",
    width: 2200,
    height: 1700,
    label: "assembly",
  },
  {
    src: "/images/projects/pingu/pingu_drawing_stock.png",
    alt: "Pingu stock setup technical drawing",
    width: 2212,
    height: 1698,
    label: "stock setup",
  },
  {
    src: "/images/projects/pingu/pingu_drawing_acrylic_fixture.png",
    alt: "Pingu acrylic fixture technical drawing",
    width: 2212,
    height: 1698,
    label: "fixture",
  },
];

const manufacturingSteps = [
  {
    title: "Stock setup",
    body: "The body was split along its midplane so each half could be milled separately without a flip. The stock holes and acrylic fixture handled repeatable positioning.",
    image: {
      src: "/images/projects/pingu/pingu_manufacturing_stock.png",
      alt: "Pingu machining stock setup",
      width: 1660,
      height: 1222,
    },
  },
  {
    title: "Probe and align",
    body: "Mark checking the probe position after the stock was installed so the orientation and hole locations stayed consistent across the CAM setups.",
    image: {
      src: "/images/projects/pingu/pingu_manufacturing_mill_0_probe.png",
      alt: "Pingu stock probing on the Mini Mill",
      width: 1262,
      height: 1510,
    },
  },
  {
    title: "Rough and finish",
    body: "The curves were adjusted around the available tools. Switching from a 1/8 inch ball end mill to a 1/4 inch ball end mill saved time while keeping the surface close enough.",
    image: {
      src: "/images/projects/pingu/pingu_manufacturing_mill_1.png",
      alt: "Pingu body being milled",
      width: 2940,
      height: 1066,
    },
  },
  {
    title: "Machine the second half",
    body: "Each half needed its own CAM and careful tool numbering. The goal was getting both halves to meet cleanly.",
    image: {
      src: "/images/projects/pingu/pingu_manufacturing_mill_2.png",
      alt: "Pingu second body half machining process",
      width: 1934,
      height: 1066,
    },
  },
];

const finishingImages = [
  {
    src: "/images/projects/pingu/pingu_post_deburring.png",
    alt: "Pingu after deburring and polishing",
    width: 854,
    height: 1066,
    label: "deburring and polish",
    body: "The front belly was polished to keep a bright contrast against the softer blasted surfaces.",
  },
  {
    src: "/images/projects/pingu/pingu_post_sandblasting.png",
    alt: "Pingu after sandblasting",
    width: 854,
    height: 1066,
    label: "sandblasting",
    body: "Masked the belly and sandblasted the body and head helping hide the tool marks and create a more uniform surface finish.",
  },
];

const learnings = [
  "Asymmetric forms are unforgiving: the body halves, holes, and fixtures all had to line up cleanly.",
  "Separate CAM files made tool numbering and setup discipline matter more than expected.",
  "Shallow fixture holes introduced chatter, especially when the acrylic plate did not register perfectly.",
  "Mini Mill stock orientation changed the whole setup strategy.",
  "Acrylic fixture holes should go through; tapped holes did not always match cleanly and created small gaps.",
];

export const metadata: Metadata = {
  title: "Pingu — Shreyas Kulkarni",
  description:
    "A CNC-machined Pingu tabletop eye-candy object made from 6061 aluminum with 3D printed details and mixed finishing.",
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
  label,
  className = "",
  imageClassName = "",
  framed = true,
}: {
  image: ImageRef;
  label?: string;
  className?: string;
  imageClassName?: string;
  framed?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-lg ${framed ? "bg-paper-2" : ""} ${className}`}
    >
      <Image
        {...imageProps(image)}
        sizes="(max-width: 768px) calc(100vw - 3rem), 50vw"
        className={`h-auto w-full ${imageClassName}`}
      />
      {label && (
        <figcaption className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export default function PinguPage() {
  return (
    <main className="relative z-[2] mx-auto w-full max-w-6xl px-6 pb-32 pt-32 sm:px-10 sm:pt-36">
      <ProjectPageTracker slug="pingu" title="Pingu" tags={pinguTags} />

      <Link
        href="/work"
        className="font-mono text-[13px] text-pencil hover:text-accent"
      >
        ← back to work
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="kicker">{pinguTags.join(" · ")}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">
          Pingu<span className="text-accent">.</span>
        </h1>
        <p className="mt-3 text-lg text-ink/80">
          A tabletop eye-candy object machined from aluminum.
        </p>
      </header>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div className="overflow-hidden rounded-lg">
          <Image
            {...imageProps(hero)}
            priority
            sizes="(max-width: 1024px) calc(100vw - 3rem), 620px"
            className="h-auto w-full"
          />
        </div>
        <div>
          <p className="max-w-prose text-base leading-relaxed text-ink/78">
            The brief was to make a small tabletop candy object from a 500 x 500
            x 250 block of 6061 aluminum using the Haas Mini Mill in three
            weeks.
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 sm:grid-cols-2">
            {[
              ["Course", "IPD 5010"],
              ["Team", "Mark & Shreyas"],
              ["Timeline", "3 weeks"],
              ["Process", "Mini Mill · CAD/CAM · 3D print"],
            ].map(([label, value]) => (
              <div key={label} className="bg-paper px-4 py-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-pencil">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          kicker="01 · concept"
          title="Fun and instantly recognizable"
          body="I like animated films and cartoons, so we started by sketching characters from a few favorites. After some quick ideation, Pingu felt like the right direction: playful, recognizable, and just challenging enough to make as a machined object."
        />
        <div className="overflow-hidden rounded-lg">
          <figure className="overflow-hidden">
            <Image
              src={conceptImages[0].src}
              alt={conceptImages[0].alt}
              width={conceptImages[0].width}
              height={conceptImages[0].height}
              sizes="(max-width: 1024px) calc(100vw - 3rem), 1120px"
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          kicker="02 · v1"
          title="The first CAD tried to mill the whole figure from one block"
          body="Version one assumed we could machine the full form by flipping the stock. It looked plausible on screen, but it was awkward in the Mini Mill vice, hard to mount cleanly, and the machining time was already pushing past what the project could support."
        />
        <div className="grid gap-4 md:grid-cols-2 md:items-center">
          <ImageCard
            image={{
              src: "/images/projects/pingu/solidworksv1.png",
              alt: "Pingu SolidWorks version one model",
              width: 1576,
              height: 1154,
            }}
            framed={false}
            className="h-full"
            imageClassName="h-[22rem] w-full rounded-lg object-contain sm:h-[24rem]"
          />
          <ImageCard
            image={{
              src: "/images/projects/pingu/pingu_render_0.png",
              alt: "Pingu CAD rendering",
              width: 1136,
              height: 1382,
            }}
            framed={false}
            className="h-full"
            imageClassName="h-[22rem] w-full rounded-lg object-contain sm:h-[24rem]"
          />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          kicker="03 · v2"
          title="Splitting the body made the object manufacturable"
          body="The second version became a front-and-back assembly. Each half could be milled separately with higher fidelity and less setup drama, then aligned and put together with dowel pins as one finished object."
        />
        <div className="mt-5">
          <div className="mb-3">
            <p className="kicker">two-part body drawings</p>
          </div>
          <DrawingCarousel drawings={drawingSheets} />
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_18rem] md:items-center lg:grid-cols-[1fr_20rem]">
          <div>
            <p className="kicker text-accent">scale prototype</p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/75">
              Before milling, we 3D printed a full-scale prototype to check the
              body proportions and stance.
            </p>
          </div>
          <figure className="overflow-hidden rounded-lg">
            <Image
              src="/images/projects/pingu/pingu_prototype_3dprint.png"
              alt="Pingu scale 3D printed prototype"
              width={864}
              height={1384}
              sizes="(max-width: 768px) 70vw, 320px"
              className="mx-auto max-h-[21rem] w-auto rounded-lg object-contain"
            />
          </figure>
        </div>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/75">
          We kept the beak and feet separate from the aluminum body and planned
          them as PLA press-fit parts. That made the main machining simpler and
          we could create different beak sizes and shapes to give Pingu a bit
          more character.
        </p>
        <div className="mt-5">
          <ImageCard
            image={{
              src: "/images/projects/pingu/pingu_feat.png",
              alt: "Pingu 3D printed beak and feet feature models",
              width: 2940,
              height: 804,
            }}
            framed={false}
            imageClassName="w-full rounded-lg object-cover"
          />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          kicker="04 · machining"
          title="Milling the two halves"
          body="Most of the work lived in the relationship between the split body, the fixture, and the Mini Mill. Each setup had to preserve the same reference logic or the two halves would never feel like one object."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {manufacturingSteps.map((step, index) => (
            <article
              key={step.title}
              className={
                index >= 2
                  ? "overflow-hidden rounded-lg bg-paper-2 md:col-span-2"
                  : "overflow-hidden rounded-lg bg-paper-2"
              }
            >
              <Image
                {...imageProps(step.image)}
                sizes={
                  index >= 2
                    ? "(max-width: 768px) calc(100vw - 3rem), 1040px"
                    : "(max-width: 768px) calc(100vw - 3rem), 520px"
                }
                className={
                  index < 2
                    ? "h-auto w-full md:h-[20rem] md:object-cover"
                    : "h-auto w-full"
                }
              />
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          kicker="05 · finishing"
          title="Polish, blast, assemble"
          body="We introduced contrast with two finishing processes"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {finishingImages.map((item) => (
            <figure
              key={item.src}
              className="overflow-hidden rounded-lg bg-paper-2"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 768px) calc(100vw - 3rem), 340px"
                className="h-auto w-full"
              />
              <figcaption className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {item.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 border-t border-ink/15 py-8 md:grid-cols-[13rem_1fr] md:gap-10">
        <p className="kicker text-accent">06 · learnings</p>
        <div>
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            What I would change next time
          </h2>
          <ul className="mt-6 space-y-4">
            {learnings.map((learning) => (
              <li
                key={learning}
                className="grid gap-3 border-t border-ink/10 pt-4 sm:grid-cols-[1.5rem_1fr]"
              >
                <span className="font-mono text-xs text-accent">·</span>
                <span className="text-base leading-relaxed text-ink/78">
                  {learning}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeader
          kicker="07 · final"
          title="Created a fun stop motion with the finished Pingu"
        />
        <div className="mx-auto max-w-[32rem] overflow-hidden rounded-lg">
          <video
            src="/images/projects/pingu/pingu_stopmotion.mp4"
            controls
            playsInline
            preload="metadata"
            className="block max-h-[70vh] w-full object-contain"
          />
        </div>
      </section>
    </main>
  );
}
