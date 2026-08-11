import Image from "next/image";
import Link from "next/link";
import type { NowLinkPreview, NowMedia, NowPost } from "@/content/types";
import { imageFill, imageProps } from "@/lib/image";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T12:00:00`));
}

function MediaCarousel({ media }: { media: NowMedia[] }) {
  if (media.length === 0) return null;

  if (media.length === 1) {
    const image = media[0];

    return (
      <figure className="mt-5 overflow-hidden rounded-xl bg-paper-2">
        <Image
          {...imageProps(image)}
          sizes="(max-width: 768px) 100vw, 680px"
          className="h-auto max-h-[72vh] w-full object-contain"
          priority
        />
      </figure>
    );
  }

  return (
    <div
      aria-label="Post photos"
      className="mt-5 flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {media.map((image, index) => {
        const aspect = image.width / image.height;
        const isPortrait = aspect < 0.85;

        return (
          <figure
            key={image.id}
            className={`relative shrink-0 snap-start overflow-hidden rounded-xl bg-paper-2 ${
              isPortrait
                ? "h-[21rem] w-[16rem] sm:h-[24rem] sm:w-[18rem]"
                : "h-[21rem] w-[25rem] sm:h-[24rem] sm:w-[30rem]"
            }`}
          >
            <Image
              {...imageFill(image)}
              fill
              sizes={
                isPortrait
                  ? "(max-width: 768px) 70vw, 288px"
                  : "(max-width: 768px) 88vw, 480px"
              }
              className="object-cover"
              priority={index === 0}
            />
          </figure>
        );
      })}
    </div>
  );
}

function LinkPreviewCard({ preview }: { preview: NowLinkPreview }) {
  const domain = (() => {
    try {
      return new URL(preview.url).hostname.replace(/^www\./, "");
    } catch {
      return preview.url;
    }
  })();
  const title = preview.title ?? domain;
  const description = preview.description ?? preview.url;
  const imageUrl = preview.imageUrl;

  return (
    <a
      href={preview.url}
      target="_blank"
      rel="noreferrer"
      className="mt-5 grid overflow-hidden rounded-xl border border-ink/10 bg-paper-2/45 transition duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:border-accent/35 hover:bg-paper-2/70 sm:grid-cols-[11rem_1fr]"
    >
      {preview.image ? (
        <div className="relative min-h-36 bg-paper-2">
          <Image
            {...imageFill(preview.image)}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover"
          />
        </div>
      ) : imageUrl ? (
        <div className="min-h-36 bg-paper-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="h-full min-h-36 w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="hidden min-h-36 place-items-center bg-[repeating-linear-gradient(135deg,rgb(23_22_20/0.04),rgb(23_22_20/0.04)_10px,transparent_10px,transparent_20px)] sm:grid">
          <span className="rounded-full border border-ink/10 bg-paper/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-pencil">
            Link
          </span>
        </div>
      )}
      <div className="p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pencil">
          {preview.siteName ?? domain}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/70">
          {description}
        </p>
      </div>
    </a>
  );
}

function CollectionPreview({ post }: { post: Extract<NowPost, { type: "collection" }> }) {
  return (
    <div>
      <MediaCarousel media={post.mediaPreview} />
      <Link
        href={post.href}
        className="mt-4 inline-block font-mono text-sm uppercase tracking-[0.18em] text-accent underline decoration-2 underline-offset-8"
      >
        view full set ↗
      </Link>
    </div>
  );
}

export function NowFeed({ posts }: { posts: NowPost[] }) {
  return (
    <div className="mt-8 divide-y divide-ink/10 border-t border-ink/15 sm:mt-9">
      {posts.map((post) => (
        <article
          key={post.id}
          className="grid gap-4 py-7 sm:grid-cols-[8.5rem_1fr] sm:gap-6 sm:py-8"
        >
          <time
            dateTime={post.date}
            className="pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-pencil"
          >
            {formatDate(post.date)}
          </time>

          <div className="min-w-0">
            <p
              className={`max-w-2xl text-ink/90 ${
                post.body.length > 150
                  ? "text-lg leading-relaxed sm:text-xl"
                  : "text-[1.35rem] leading-snug sm:text-[1.65rem]"
              }`}
            >
              {post.body}
            </p>

            {post.type === "post" && post.media && <MediaCarousel media={post.media} />}
            {post.type === "post" &&
              post.links?.map((preview) => (
                <LinkPreviewCard key={preview.url} preview={preview} />
              ))}
            {post.type === "collection" && <CollectionPreview post={post} />}
          </div>
        </article>
      ))}
    </div>
  );
}
