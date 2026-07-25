import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { shoeRacks, slugify } from "@/lib/products";
import { withLivePrices } from "@/lib/shopify";

export function generateStaticParams() {
  return shoeRacks.map((p) => ({ slug: slugify(p.name) }));
}

export default async function ShoeRackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = shoeRacks.find((p) => slugify(p.name) === slug);
  if (!product) notFound();

  const related = shoeRacks.filter((p) => p.name !== product.name).slice(0, 3);

  const [liveProduct] = await withLivePrices([product]);
  const liveRelated = await withLivePrices(related);

  return <ProductDetailView product={liveProduct} related={liveRelated} backHref="/shoe-display-racks" backLabel="Shoe Display Racks" />;
}
