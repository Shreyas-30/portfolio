import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProjectPageTracker } from "@/components/projects/ProjectPageTracker";
import { projects } from "@/content/projects";
import type { ImageRef } from "@/content/types";
import { imageProps } from "@/lib/image";
import { SpaceChessCarousel } from "./SpaceChessCarousel";

const project = projects.find((item) => item.slug === "space-chess");

function getProject() {
  if (!project) {
    throw new Error("Space Chess project data is missing.");
  }

  return project;
}

const conceptImages: ImageRef[] = [
  {
    src: "/images/projects/spacechess/chess_concept_1.png",
    alt: "Space Chess concept direction board 1",
    width: 1900,
    height: 1040,
  },
  {
    src: "/images/projects/spacechess/chess_concept_2.png",
    alt: "Space Chess concept direction board 2",
    width: 1900,
    height: 1040,
  },
  {
    src: "/images/projects/spacechess/chess_concept_3.png",
    alt: "Space Chess concept direction board 3",
    width: 1900,
    height: 1040,
  },
  {
    src: "/images/projects/spacechess/chess_concept_4.png",
    alt: "Space Chess concept direction board 4",
    width: 1900,
    height: 1040,
  },
];

const finalDesignImages = {
  render: {
    src: "/images/projects/spacechess/chess_render.png",
    alt: "Space Chess final space-themed render",
    width: 1600,
    height: 900,
  },
  drawing: {
    src: "/images/projects/spacechess/chess_pieces_drawing.png",
    alt: "Space Chess chess piece engineering drawing",
    width: 1860,
    height: 1416,
  },
  explodedDrawing: {
    src: "/images/projects/spacechess/chess_pieces_drawing_exploded.png",
    alt: "Space Chess exploded chess piece engineering drawing",
    width: 1860,
    height: 1416,
  },
  bom: {
    src: "/images/projects/spacechess/chess_bill_of_materials.png",
    alt: "Space Chess bill of materials",
    width: 1670,
    height: 652,
  },
} satisfies Record<string, ImageRef>;

const boardImages = {
  cam: {
    src: "/images/projects/spacechess/board_cam_aspirecnc.png",
    alt: "Aspire CNC toolpath simulation for the Space Chess board",
    width: 1365,
    height: 767,
  },
  process: [
    {
      src: "/images/projects/spacechess/board_1.png",
      alt: "Space Chess board CNC routing process 1",
      width: 1400,
      height: 1400,
    },
    {
      src: "/images/projects/spacechess/board_2.png",
      alt: "Space Chess board CNC routing process 2",
      width: 1400,
      height: 1400,
    },
    {
      src: "/images/projects/spacechess/board_3.png",
      alt: "Space Chess board CNC routing process 3",
      width: 1400,
      height: 1400,
    },
    {
      src: "/images/projects/spacechess/board_4.png",
      alt: "Space Chess board CNC routing process 4",
      width: 1400,
      height: 1400,
    },
  ],
};

const pieceImages = {
  video: "/images/projects/spacechess/pieces_lathe.mp4",
  process: [
    {
      src: "/images/projects/spacechess/pieces_base.png",
      alt: "Turned brass bottom piece for Space Chess",
      width: 1300,
      height: 1300,
    },
    {
      src: "/images/projects/spacechess/pieces_rook.png",
      alt: "Turned rook rocket piece for Space Chess",
      width: 1400,
      height: 1400,
    },
    {
      src: "/images/projects/spacechess/pieces_rook_toolpaths.png",
      alt: "Rook rocket lathe toolpaths for Space Chess",
      width: 1190,
      height: 989,
    },
  ],
};

const finishingImages: ImageRef[] = [
  {
    src: "/images/projects/spacechess/finishing_1.png",
    alt: "Space Chess board finishing and aluminum insert integration",
    width: 1564,
    height: 1542,
  },
  {
    src: "/images/projects/spacechess/finishing_2.png",
    alt: "Space Chess board with stained wood and fitted inserts",
    width: 1564,
    height: 1542,
  },
  {
    src: "/images/projects/spacechess/finishing_3.png",
    alt: "Space Chess pieces after deburring and assembly",
    width: 1300,
    height: 1300,
  },
];

const lessonsImage: ImageRef = {
  src: "/images/projects/spacechess/chess_lessons.png",
  alt: "Space Chess board after routing and edge cleanup",
  width: 764,
  height: 1212,
};

const pieceMapping = [
  ["King", "Jupiter"],
  ["Queen", "Saturn"],
  ["Pawn", "Asteroid"],
  ["Rook", "Rocket"],
  ["Knight", "Satellite"],
  ["Bishop", "Neptune"],
];

export const metadata: Metadata = {
  title: "Space Chess — Shreyas Kulkarni",
  description: getProject().description,
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

function ProcessNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-ink/12 px-4 py-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink/75">{body}</p>
    </div>
  );
}

export default function SpaceChessPage() {
  const spaceChess = getProject();

  return (
    <main className="relative z-[2] mx-auto w-full max-w-6xl px-6 pb-32 pt-32 sm:px-10 sm:pt-36">
      <ProjectPageTracker
        slug={spaceChess.slug}
        title={spaceChess.title}
        tags={spaceChess.tags}
      />

      <Link
        href="/work"
        className="font-mono text-[13px] text-pencil hover:text-accent"
      >
        ← back to work
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="kicker">{spaceChess.tags.join(" · ")}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">
          Space Chess<span className="text-accent">.</span>
        </h1>
        <p className="mt-3 text-lg text-ink/80">{spaceChess.subtitle}</p>
      </header>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <figure className="overflow-hidden rounded-lg bg-paper-2">
          <Image
            {...imageProps(spaceChess.thumbnail)}
            priority
            sizes="(max-width: 1024px) calc(100vw - 3rem), 620px"
            className="h-auto w-full"
          />
        </figure>

        <div>
          <p className="text-base leading-relaxed text-ink/80">
            {spaceChess.body}
          </p>

          {spaceChess.details && (
            <dl className="mt-8 grid overflow-hidden rounded-lg border border-ink/15 sm:grid-cols-2">
              {spaceChess.details.map((detail) => (
                <div
                  key={detail.label}
                  className="border-b border-ink/15 px-4 py-4 sm:border-r sm:even:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink/85">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          kicker="01 · concepts"
          title="Exploring four themes"
          body="Each of us came up with a concept. The four directions were: a space-themed set, a vertical hanging set with magnetic pieces, a stepped box with easy to store pieces, and my own concept was a transforming set inspired by connect-4 that could be played horizontally or vertically."
        />
        <SpaceChessCarousel
          images={conceptImages}
          label="Space Chess concept boards"
          framed={false}
        />
      </section>

      <section className="mt-20">
        <SectionHeader
          kicker="02 · final design"
          title="Who doesn't love a space-themed chess set?"
          body="We moved ahead with the space-themed set because that seemed to be coolest of the four ideas and every one liked it. We decided that we would add the step concept to the board and make the pieces as planets or space related objects."
        />

        <figure className="overflow-hidden rounded-lg bg-paper-2">
          <Image
            {...imageProps(finalDesignImages.render)}
            sizes="(max-width: 768px) calc(100vw - 3rem), 1120px"
            className="h-auto w-full"
          />
        </figure>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <figure className="overflow-hidden rounded-lg bg-white">
            <Image
              {...imageProps(finalDesignImages.drawing)}
              sizes="(max-width: 1024px) calc(100vw - 3rem), 548px"
              className="h-auto w-full"
            />
          </figure>
          <figure className="overflow-hidden rounded-lg bg-white">
            <Image
              {...imageProps(finalDesignImages.explodedDrawing)}
              sizes="(max-width: 1024px) calc(100vw - 3rem), 548px"
              className="h-auto w-full"
            />
          </figure>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="kicker">pieces as space objects</p>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink/12 bg-ink/12 sm:grid-cols-3">
              {pieceMapping.map(([piece, object]) => (
                <div key={piece} className="bg-paper px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
                    {piece}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold leading-none">
                    {object}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ProcessNote
              title="Pieces"
              body="Each piece was planned as a two- or three-part assembly: a turned aluminum body, threaded connection, anodized head or detail, and a base that gave the set its weight."
            />
            <ProcessNote
              title="Board"
              body="The board combined ordered aluminum inserts, laser-cut acrylic, and a CNC-routed wooden base that we would machine and finish ourselves."
            />
            <ProcessNote
              title="Manufacturing"
              body="The design had to work across the tools available to us: lathe-turned pieces, routed wood, laser-cut acrylic, anodized parts, and a lot of hand fitting."
            />
            <ProcessNote
              title="Material contrast"
              body="Walnut kept the board warm, while aluminum, brass, acrylic, and anodizing gave the pieces a more space-object feel."
            />
          </div>
        </div>

        <figure className="mt-8 overflow-hidden rounded-lg bg-white">
          <Image
            {...imageProps(finalDesignImages.bom)}
            sizes="(max-width: 768px) calc(100vw - 3rem), 1120px"
            className="h-auto w-full"
          />
        </figure>
      </section>

      <section className="mt-20">
        <SectionHeader
          kicker="03 · manufacturing"
          title="Making the board and pieces"
          body="The final set came together across a few different processes: CNC routing for the board, lathe work for the pieces, ordered metal inserts, laser-cut acrylic, anodizing, and hand finishing."
        />

        <div>
          <figure className="overflow-hidden rounded-lg bg-paper-2">
            <Image
              {...imageProps(boardImages.cam)}
              sizes="(max-width: 768px) calc(100vw - 3rem), 1120px"
              className="h-auto w-full"
            />
          </figure>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex flex-col justify-between rounded-lg bg-paper-2 px-5 py-5 sm:px-7 sm:py-6">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-pencil">
                  Board
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Toolpaths first, then a slow cut.
                </h3>
              </div>
              <div className="mt-6 space-y-3 text-base leading-relaxed text-ink/75">
                <p>
                  I created the toolpaths in Aspire CNC before we committed the
                  walnut board to the router.
                </p>
                <p>
                  We cut the board with a 1/8 inch ball nose bit. The full job
                  took about nine hours, then the aluminum insert pockets needed
                  hand chiselling so the SendCutSend parts could sit cleanly.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {boardImages.process.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-lg bg-paper-2"
                >
                  <Image
                    {...imageProps(image)}
                    sizes="(max-width: 768px) 50vw, 270px"
                    className="h-full w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            <div className="grid gap-3 sm:grid-cols-3">
              <figure className="overflow-hidden rounded-lg bg-paper-2 sm:col-span-3">
                <video
                  className="aspect-video h-full w-full object-cover"
                  src={pieceImages.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </figure>
              {pieceImages.process.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-lg bg-paper-2"
                >
                  <Image
                    {...imageProps(image)}
                    sizes="(max-width: 768px) 33vw, 240px"
                    className="aspect-square h-full w-full object-cover"
                  />
                </figure>
              ))}
            </div>

            <div className="flex flex-col justify-between rounded-lg bg-paper-2 px-5 py-5 sm:px-7 sm:py-6">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-pencil">
                  Pieces
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Each piece became its own little lathe job.
                </h3>
              </div>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/75">
                <p>
                  We made the chess pieces on the TL-1 lathe, mostly as small
                  turned assemblies: aluminum bodies and heads with brass
                  bottoms for weight.
                </p>
                <p>
                  A lot of the work repeated, but not perfectly. Most parts
                  needed roughing and finishing passes. Some needed drill and
                  tap operations with a 1/4-20 tap, while the brass bottoms were
                  threaded with a die.
                </p>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pencil">
                    Tools used
                  </p>
                  <p className="mt-2">
                    55 degree carbide tool, 27.5 degree neutral tool, Hartel
                    cutoff tool, grooving tool, 1/4-20 tap, drill, and die.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex flex-col justify-between rounded-lg bg-paper-2 px-5 py-5 sm:px-7 sm:py-6">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-pencil">
                  Finishing + integration
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                  Putting everything together
                </h3>
              </div>
              <div className="mt-6 space-y-3 text-base leading-relaxed text-ink/75">
                <p>
                  For the board, I stained the wood and integrated the aluminum
                  inserts after the CNC routing and hand chiselling were done.
                </p>
                <p>
                  For the pieces, we deburred the turned parts and threaded each
                  base and body together so the set felt solid in hand.
                </p>
              </div>
            </div>

            <div className="grid min-h-[24rem] gap-3 sm:grid-cols-[0.72fr_1fr]">
              <div className="grid gap-3">
                {[finishingImages[0], finishingImages[2]].map((image) => (
                  <figure
                    key={image.src}
                    className="overflow-hidden rounded-lg bg-paper-2"
                  >
                    <Image
                      {...imageProps(image)}
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  </figure>
                ))}
              </div>

              <figure className="overflow-hidden rounded-lg bg-paper-2">
                <Image
                  {...imageProps(finishingImages[1])}
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          kicker="04 · lessons"
          title="Challenges and lessons"
          body="A few things only became clear once we moved from CAD into CAM, machining, and hand fitting."
        />

        <div className="grid gap-8 lg:grid-cols-[0.58fr_0.42fr] lg:items-start">
          <div className="pt-2">
            <ul className="list-disc space-y-4 pl-5 text-lg leading-relaxed text-ink/78 marker:text-accent">
              <li>
                Routing with the 1/8 inch ball nose end mill took a while.
              </li>
              <li>The board took about 12 hours of machining in total.</li>
              <li>CAM for the router was a good learning curve.</li>
              <li>
                We had to chisel the insert edges by hand so the aluminum sheets
                fit.
              </li>
              <li>
                Added height to the pieces where we needed more thread length.
              </li>
              <li>
                Increased the cutoff diameter to stop parts from shearing.
              </li>
              <li>
                Split roughing into sections so thinner areas were not stressed.
              </li>
              <li>Made small design changes around tap and die limitations.</li>
            </ul>
          </div>

          <figure>
            <Image
              {...imageProps(lessonsImage)}
              sizes="(max-width: 1024px) calc(100vw - 3rem), 380px"
              className="mx-auto max-h-[26rem] w-auto object-contain"
            />
          </figure>
        </div>
      </section>

      {spaceChess.images && spaceChess.images.length > 0 && (
        <section className="mt-20">
          <SectionHeader
            kicker="05 · gallery"
            title="Some other pictures along the way"
          />
          <SpaceChessCarousel
            images={spaceChess.images}
            label="Space Chess build and final image gallery"
            framed={false}
            size="large"
          />
        </section>
      )}
    </main>
  );
}
