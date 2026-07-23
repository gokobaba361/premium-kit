import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHead } from "@/components/primitives/layout";

export type ProductCard = {
  name: string;
  price: string;
  href: string;
  image: { src: string; alt: string };
  note?: string;
};

export function ProductGrid({
  title,
  body,
  products,
  tone = "base",
}: {
  title: string;
  body?: string;
  products: ProductCard[];
  tone?: "base" | "subtle";
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead title={title} body={body} />
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {products.slice(0, 8).map((product) => (
            <li key={product.href}>
              <Link href={product.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-pk bg-subtle">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    {product.note ? (
                      <p className="mt-1 text-xs text-faint">{product.note}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-mono text-sm">{product.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
