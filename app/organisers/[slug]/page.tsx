import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { organisers, slugify } from "@/lib/products";

export function generateStaticParams() {
  return organisers.map((p) => ({ slug: slugify(p.name) }));
}

export default async function OrganiserDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = organisers.find((p) => slugify(p.name) === slug);
  if (!product) notFound();

  const related = organisers.filter((p) => p.name !== product.name).slice(0, 3);

  return <ProductDetailView product={product} related={related} backHref="/organisers" backLabel="Organisers" />;
}
