import Link from "next/link";
import { Container } from "@/components/primitives/layout";

export type FooterGroup = { heading: string; links: { label: string; href: string }[] };

export function SiteFooter({
  brand,
  blurb,
  groups,
}: {
  brand: string;
  blurb: string;
  groups: FooterGroup[];
}) {
  return (
    <footer className="border-t border-line py-14">
      <Container className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-[0.95rem] font-semibold tracking-tight">{brand}</p>
          <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-muted">{blurb}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 md:col-span-8">
          {groups.map((group) => (
            <nav key={group.heading} className="flex flex-col gap-3">
              <p className="text-xs font-medium text-faint">{group.heading}</p>
              {group.links.map((link) => (
                <Link
                  key={`${group.heading}-${link.label}`}
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-[var(--pk-dur-fast)] hover:text-fg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </Container>
    </footer>
  );
}
