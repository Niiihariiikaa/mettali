import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { wineHolders, slugify } from "@/lib/products";

export function generateStaticParams() {
  return wineHolders.map((p) => ({ slug: slugify(p.name) }));
}

export default async function WineHolderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = wineHolders.find((p) => slugify(p.name) === slug);
  if (!product) notFound();

  const related = wineHolders.filter((p) => p.name !== product.name).slice(0, 3);

  return <ProductDetailView product={product} related={related} backHref="/wine-holders" backLabel="Wine Holders" />;
}
