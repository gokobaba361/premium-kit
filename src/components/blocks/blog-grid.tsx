import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";

export type Post = {
  title: string;
  excerpt: string;
  href: string;
  category: string;
  /** Machine readable date, for example 2026-03-14 */
  date: string;
  readingTime: string;
  cover?: { src: string; alt: string };
};

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Article cards. Category and date sit under the title as plain text, never as
 * a pill floating over the cover image.
 */
export function BlogGrid({
  title,
  body,
  posts,
  tone = "base",
}: {
  title: string;
  body?: string;
  posts: Post[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <RevealItem key={post.href} index={i}>
              <li className="h-full">
                <Link href={post.href} className="group flex h-full flex-col gap-4">
                  {post.cover ? (
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-pk bg-subtle">
                      <Image
                        src={post.cover.src}
                        alt={post.cover.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[var(--pk-dur)] ease-pk group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-faint">
                      {post.category}
                      {", "}
                      <time dateTime={post.date}>{formatter.format(new Date(post.date))}</time>
                    </p>
                    <h3 className="display-3 text-balance transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>
                    <p className="mt-1 text-sm text-faint">{post.readingTime}</p>
                  </div>
                </Link>
              </li>
            </RevealItem>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
