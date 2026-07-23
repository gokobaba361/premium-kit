import Link from "next/link";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { MobileNav } from "./mobile-nav";
import type { NavItem } from "./nav-types";

/**
 * Floating navigation for launch pages with a visible page background.
 *
 * The bar remains inside the shared container and never touches the viewport
 * edges. Desktop links are capped at five, matching the standard site nav.
 */
export function FloatingNav({
  brand,
  items,
  cta,
}: {
  brand: string;
  items: NavItem[];
  cta?: { label: string; href: string };
}) {
  return (
    <header className="sticky top-4 z-40">
      <Container>
        <div className="flex h-14 items-center justify-between gap-7 rounded-pk-pill border border-line bg-elevated/90 px-4 shadow-pk backdrop-blur-md md:px-5">
          <Link href="/" className="font-display text-sm font-semibold tracking-tight">
            {brand}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {items.slice(0, 5).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-fg"
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
        </div>
      </Container>
    </header>
  );
}
