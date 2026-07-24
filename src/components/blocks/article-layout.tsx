import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/layout";
import { Avatar } from "@/components/primitives/data";

export type ArticleLayoutProps = {
  category?: string;
  title: string;
  standfirst?: string;
  author: { name: string; role?: string; avatar?: string };
  /** Machine-readable ISO date; rendered in the page locale. */
  date: string;
  readingTime?: string;
  locale?: string;
  cover?: { src: string; alt: string };
  /** The article body. Wrap prose in it; the block applies reading typography. */
  children: React.ReactNode;
  tags?: { label: string; href: string }[];
};

/**
 * Long-form article reading layout.
 *
 * A single measured column, real author attribution and a cover with a job.
 * The body is styled by the shared .pk-prose rules, so Markdown-rendered content
 * and hand-written JSX read the same. Server component: an article does not need
 * client JavaScript.
 */
export function ArticleLayout({
  category,
  title,
  standfirst,
  author,
  date,
  readingTime,
  locale = "en-GB",
  cover,
  children,
  tags,
}: ArticleLayoutProps) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <article className="py-section">
      <Container className="max-w-3xl">
        <header className="flex flex-col gap-5">
          {category ? <p className="text-sm font-medium text-accent">{category}</p> : null}
          <h1 className="display-1 text-balance">{title}</h1>
          {standfirst ? (
            <p className="text-lg leading-relaxed text-muted">{standfirst}</p>
          ) : null}

          <div className="mt-2 flex items-center gap-3">
            <Avatar name={author.name} src={author.avatar} size={44} />
            <div className="flex flex-col">
              <span className="text-[0.9375rem] font-medium">{author.name}</span>
              <span className="text-sm text-muted">
                {author.role ? `${author.role} · ` : ""}
                <time dateTime={date}>{formattedDate}</time>
                {readingTime ? ` · ${readingTime}` : ""}
              </span>
            </div>
          </div>
        </header>

        {cover ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-pk bg-subtle">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="pk-prose mx-auto mt-10">{children}</div>

        {tags && tags.length > 0 ? (
          <footer className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
            {tags.map((tag) => (
              <Link
                /* Several tags legitimately point at one destination, so the
                   href alone is not a unique key. */
                key={`${tag.href}-${tag.label}`}
                href={tag.href}
                className="rounded-pk-pill border border-line px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-strong hover:text-fg"
              >
                {tag.label}
              </Link>
            ))}
          </footer>
        ) : null}
      </Container>
    </article>
  );
}
