import Link from "next/link";
import { Container } from "@/components/primitives/layout";

export type DocsGroup = {
  title: string;
  items: { label: string; href: string; active?: boolean }[];
};

function DocsLinks({ groups }: { groups: DocsGroup[] }) {
  return (
    <nav className="flex flex-col gap-7">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="text-xs font-medium text-faint">{group.title}</p>
          <div className="mt-2 flex flex-col">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={[
                  "border-l px-3 py-1.5 text-sm transition-colors",
                  item.active
                    ? "border-accent text-fg"
                    : "border-line text-muted hover:text-fg",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar({
  groups,
  children,
}: {
  groups: DocsGroup[];
  children: React.ReactNode;
}) {
  return (
    <Container className="py-10">
      <details className="mb-8 rounded-pk border border-line p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium">Documentation navigation</summary>
        <div className="mt-5">
          <DocsLinks groups={groups} />
        </div>
      </details>
      <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <DocsLinks groups={groups} />
          </div>
        </aside>
        <article className="min-w-0">{children}</article>
      </div>
    </Container>
  );
}
