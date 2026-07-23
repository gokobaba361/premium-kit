import type { Metadata } from "next";
import { ComponentDetailPage } from "@/components/site/component-detail-page";
import { itemBySlug, registry } from "@/registry/registry";

export function generateStaticParams() {
  return registry.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = itemBySlug(slug);
  if (!item) return { title: "Not found" };
  return { title: item.name, description: item.description };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ComponentDetailPage slug={slug} language="en" />;
}
