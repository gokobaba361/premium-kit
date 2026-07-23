import Link from "next/link";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type MegaNavItem =
  | {
      label: string;
      href: string;
      description?: never;
      items?: never;
    }
  | {
      label: string;
      href?: never;
      description?: string;
      items: {
        title: string;
        description: string;
        href: string;
        eyebrow?: string;
      }[];
    };

export function MegaNav({
  brand,
  items,
  action,
  navigationLabel = "Primary",
  className,
}: {
  /** Home destination and accessible brand label. */
  brand: { name: string; href: string };
  /** Keep the top level to six destinations or fewer. */
  items: MegaNavItem[];
  /** One primary action. Account links belong in `items`. */
  action?: { label: string; href: string };
  navigationLabel?: string;
  className?: string;
}) {
  return (
    <header className={cn("relative z-40 border-b border-line bg-bg", className)}>
      <Container className="flex min-h-16 flex-wrap items-center gap-x-6 gap-y-3 py-3">
        <Link href={brand.href} className="shrink-0 font-display text-lg font-semibold tracking-tight">
          {brand.name}
        </Link>

        <nav aria-label={navigationLabel} className="order-3 w-full md:order-none md:w-auto md:flex-1">
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {items.slice(0, 6).map((item) => (
              <li key={item.label} className="relative">
                {item.items ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-1 rounded-pk-sm px-3 py-2 text-sm text-muted transition-colors hover:bg-subtle hover:text-fg [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <CaretDown
                        size={13}
                        weight="bold"
                        aria-hidden
                        className="transition-transform group-open:rotate-180"
                      />
                    </summary>

                    <div className="absolute left-0 top-[calc(100%+0.5rem)] w-[min(38rem,calc(100vw-2.5rem))] rounded-pk border border-line bg-elevated p-2 shadow-pk-lift">
                      {item.description ? (
                        <p className="border-b border-line px-3 py-2 text-xs leading-relaxed text-faint">
                          {item.description}
                        </p>
                      ) : null}
                      <ul className="grid gap-1 p-1 sm:grid-cols-2">
                        {item.items.slice(0, 8).map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="group/item flex h-full items-start justify-between gap-4 rounded-pk-sm p-3 transition-colors hover:bg-subtle"
                            >
                              <span>
                                {child.eyebrow ? (
                                  <span className="block font-mono text-[0.6875rem] text-accent">
                                    {child.eyebrow}
                                  </span>
                                ) : null}
                                <span className="mt-0.5 block text-sm font-medium">{child.title}</span>
                                <span className="mt-1 block text-xs leading-relaxed text-muted">
                                  {child.description}
                                </span>
                              </span>
                              <ArrowUpRight
                                size={14}
                                weight="bold"
                                aria-hidden
                                className="mt-1 shrink-0 text-faint transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-pk-sm px-3 py-2 text-sm text-muted transition-colors hover:bg-subtle hover:text-fg"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {action ? (
          <ButtonLink href={action.href} size="sm" className="ml-auto md:ml-0">
            {action.label}
          </ButtonLink>
        ) : null}
      </Container>
    </header>
  );
}
