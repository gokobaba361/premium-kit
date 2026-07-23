import type { Metadata } from "next";
import { Container } from "@/components/primitives/layout";
import { ButtonLink } from "@/components/primitives/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70dvh] items-center py-20">
      <Container>
        <p className="font-mono text-sm text-faint">404</p>
        <h1 className="display-1 mt-4 max-w-[18ch] text-balance">
          That page moved, or never existed.
        </h1>
        <p className="measure mt-5 text-lg leading-relaxed text-muted">
          The link may be old. The preset gallery lists every template and the component guide
          lists every part they are built from.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to the gallery
          </ButtonLink>
          <ButtonLink href="/kit" size="lg" variant="secondary">
            Component guide
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
