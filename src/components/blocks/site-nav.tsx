import Link from "next/link";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { MobileNav } from "./mobile-nav";

export type NavItem = { label: string; href: string };

/**
 * One line at desktop, 68px tall, collapses to a link row on mobile.
 * Max 5 items. If you need a sixth, the sixth belongs in the footer.
 */
export function SiteNav({
  brand,
  items,
  cta,
}: {
  brand: string;
  items: NavItem[];
  cta?: { label: string; href: string };
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between gap-8">
        <Link href="/" className="font-display text-[0.95rem] font-semibold tracking-tight">
          {brand}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {items.slice(0, 5).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted transition-colors duration-[var(--pk-dur-fast)] hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {cta ? (
            <ButtonLink href={cta.href} size="sm" className="hidden sm:inline-flex">
              {cta.label}
            </ButtonLink>
          ) : null}
          <MobileNav items={items} cta={cta} />
        </div>
      </Container>
    </header>
  );
}
