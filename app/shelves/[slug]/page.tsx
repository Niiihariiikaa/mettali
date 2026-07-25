import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { shelves, slugify } from "@/lib/products";
import { withLivePrices } from "@/lib/shopify";

export function generateStaticParams() {
  return shelves.map((p) => ({ slug: slugify(p.name) }));
}

export default async function ShelfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = shelves.find((p) => slugify(p.name) === slug);
  if (!product) notFound();

  const related = shelves.filter((p) => p.name !== product.name).slice(0, 3);

  const [liveProduct] = await withLivePrices([product]);
  const liveRelated = await withLivePrices(related);

  return <ProductDetailView product={liveProduct} related={liveRelated} backHref="/shelves" backLabel="Shelves" />;
}
