import { Container } from "@/components/primitives/layout";

/**
 * Social proof strip. Lives under the hero, never inside it.
 * Logos only: no category labels, no counts, no adjectives.
 *
 * Marks come from Simple Icons over CDN, tinted with the current theme's
 * muted foreground so the strip reads as one row in light and dark themes.
 */
export function LogoWall({
  title = "Trusted by",
  slugs,
  tint,
}: {
  title?: string;
  /** Simple Icons slugs, for example ["stripe", "linear", "vercel"] */
  slugs: string[];
  /** Hex without the hash. Match the theme's muted tone. */
  tint: string;
}) {
  return (
    <section className="border-y border-line py-10">
      <Container className="flex flex-col items-center gap-7">
        <p className="text-xs font-medium tracking-wide text-faint">{title}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {slugs.map((slug) => (
            <li key={slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${slug}/${tint}`}
                alt={slug}
                width={92}
                height={26}
                loading="lazy"
                className="h-6 w-auto opacity-70 transition-opacity duration-[var(--pk-dur-fast)] hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
