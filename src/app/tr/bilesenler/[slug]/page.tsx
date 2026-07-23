import type { Metadata } from "next";
import { ComponentDetailPage } from "@/components/site/component-detail-page";
import { itemBySlugTr, registryTr } from "@/registry/registry-tr";

export function generateStaticParams() {
  return registryTr.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = itemBySlugTr(slug);
  if (!item) return { title: "Bulunamadı" };
  return { title: item.name, description: item.description };
}

export default async function TurkishComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ComponentDetailPage slug={slug} language="tr" />;
}
