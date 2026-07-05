import { ProductSliderCard } from "@/components/product-slider-card";
import { slugify, type Product } from "@/lib/products";

export function ProductGrid({
  products,
  basePath,
  className,
}: {
  products: Product[];
  basePath: string;
  className: string;
}) {
  return (
    <div className={className}>
      {products.map((p) => (
        <ProductSliderCard key={p.name} {...p} href={`${basePath}/${slugify(p.name)}`} />
      ))}
    </div>
  );
}
