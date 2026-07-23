import { Container } from "@/components/primitives/layout";
import { Breadcrumb } from "@/components/primitives/data";

/**
 * Header for inner pages: breadcrumb, title, one paragraph. Inner pages do not
 * get a hero, they get orientation.
 */
export function PageHeader({
  title,
  intro,
  trail,
}: {
  title: string;
  intro?: string;
  trail?: { label: string; href: string }[];
}) {
  return (
    <header className="border-b border-line py-14 md:py-20">
      <Container className="flex flex-col gap-5">
        {trail ? <Breadcrumb trail={trail} /> : null}
        <h1 className="display-2 max-w-[20ch] text-balance">{title}</h1>
        {intro ? <p className="measure text-lg leading-relaxed text-muted">{intro}</p> : null}
      </Container>
    </header>
  );
}
