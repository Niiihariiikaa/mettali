import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product-detail-view";
import { vases, slugify } from "@/lib/products";

export function generateStaticParams() {
  return vases.map((p) => ({ slug: slugify(p.name) }));
}

export default async function VaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = vases.find((p) => slugify(p.name) === slug);
  if (!product) notFound();

  const related = vases.filter((p) => p.name !== product.name).slice(0, 3);

  return <ProductDetailView product={product} related={related} backHref="/vases" backLabel="Vases" />;
}
