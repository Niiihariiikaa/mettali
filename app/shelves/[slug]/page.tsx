import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { shelves, slugify } from "@/lib/products";

export function generateStaticParams() {
  return shelves.map((p) => ({ slug: slugify(p.name) }));
}

export default async function ShelfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = shelves.find((p) => slugify(p.name) === slug);
  if (!product) notFound();

  const related = shelves.filter((p) => p.name !== product.name).slice(0, 3);

  return <ProductDetailView product={product} related={related} backHref="/shelves" backLabel="Shelves" />;
}
