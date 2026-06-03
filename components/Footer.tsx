import { site } from "@/content/site";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-32 pt-16 sm:px-10"
    >
      <p className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
        Let&rsquo;s make something.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="border-b-2 border-ink pb-0.5 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {s.label} ↗
          </a>
        ))}
      </div>

      <div className="mt-12 font-mono text-[11px] uppercase tracking-wide text-pencil">
        <span>© {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  );
}
