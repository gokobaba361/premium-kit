import Link from "next/link";
import { Container } from "@/components/primitives/layout";
import { cn } from "@/lib/cn";

export type DashboardNavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export function DashboardShell({
  brand,
  title,
  items,
  utility,
  children,
}: {
  brand: string;
  title: string;
  items: DashboardNavItem[];
  utility?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[42rem] bg-bg">
      <Container className="grid min-h-[42rem] gap-0 lg:grid-cols-[14rem_1fr]">
        <aside className="border-b border-line py-5 lg:border-r lg:border-b-0 lg:pr-6">
          <p className="font-display text-sm font-semibold">{brand}</p>
          <nav className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-pk-sm px-3 py-2 text-sm transition-colors",
                  item.active ? "bg-accent text-accent-fg" : "text-muted hover:bg-subtle",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 py-6 lg:pl-8">
          <header className="flex min-h-11 items-center justify-between gap-5 border-b border-line pb-5">
            <h1 className="text-xl font-medium">{title}</h1>
            {utility}
          </header>
          <main className="py-6">{children}</main>
        </div>
      </Container>
    </div>
  );
}
