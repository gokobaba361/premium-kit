import Link from "next/link";
import { Container } from "@/components/primitives/layout";

export function AuthSplit({
  brand,
  title,
  body,
  children,
  proof,
  back,
}: {
  brand: string;
  title: string;
  body?: string;
  children: React.ReactNode;
  proof?: { quote: string; name: string; role: string };
  back?: { label: string; href: string };
}) {
  return (
    <main className="min-h-[42rem] bg-bg py-8">
      <Container className="grid min-h-[38rem] overflow-hidden rounded-pk border border-line bg-elevated lg:grid-cols-2">
        <section className="flex flex-col p-7 md:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-sm font-semibold">{brand}</p>
            {back ? (
              <Link href={back.href} className="text-sm text-muted hover:text-fg">
                {back.label}
              </Link>
            ) : null}
          </div>
          <div className="my-auto w-full max-w-md py-12">
            <h1 className="display-2">{title}</h1>
            {body ? <p className="mt-3 text-[0.9375rem] text-muted">{body}</p> : null}
            <div className="mt-8">{children}</div>
          </div>
        </section>
        <aside className="hidden bg-subtle p-10 lg:flex lg:flex-col lg:justify-end">
          {proof ? (
            <figure>
              <blockquote className="display-3 max-w-[28ch]">
                &ldquo;{proof.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium">{proof.name}</span>
                <span className="mt-1 block text-muted">{proof.role}</span>
              </figcaption>
            </figure>
          ) : (
            <p className="display-3 max-w-[24ch] text-muted">
              A quiet second surface for product proof or onboarding context.
            </p>
          )}
        </aside>
      </Container>
    </main>
  );
}
