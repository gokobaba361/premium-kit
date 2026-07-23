import Image from "next/image";
import { Container } from "@/components/primitives/layout";
import { RevealItem } from "@/components/primitives/reveal";
import { cn } from "@/lib/cn";

export type GalleryItem = {
  src: string;
  alt: string;
  /** Optional one line caption. Rendered under the image, never on top of it. */
  caption?: string;
  /** Portrait cells break the row rhythm. Use one per strip at most. */
  tall?: boolean;
};

/**
 * Three image strip. Carries atmosphere between two text heavy sections.
 * No labels or pills over the images, no photo credit decoration.
 */
export function GalleryStrip({
  items,
  bleed = false,
}: {
  items: GalleryItem[];
  /** Full bleed drops the container and runs edge to edge. */
  bleed?: boolean;
}) {
  const grid = (
    <div className="grid gap-3 md:grid-cols-3 md:gap-4">
      {items.map((item, i) => (
        <RevealItem key={item.src} index={i}>
          <figure className="flex flex-col gap-2.5">
            <div
              className={cn(
                "relative w-full overflow-hidden bg-subtle",
                bleed ? "rounded-none" : "rounded-pk",
                item.tall ? "aspect-[3/4]" : "aspect-[4/3]",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            {item.caption ? (
              <figcaption className="text-sm text-muted">{item.caption}</figcaption>
            ) : null}
          </figure>
        </RevealItem>
      ))}
    </div>
  );

  return (
    <section className="py-section">
      {bleed ? <div className="px-3 md:px-4">{grid}</div> : <Container>{grid}</Container>}
    </section>
  );
}
