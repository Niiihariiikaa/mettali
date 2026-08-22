import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { ProductFilterBar } from "@/components/product-filter-bar";
import { shelves, vases, wineHolders, organisers, shoeRacks } from "@/lib/products";
import { withLivePrices } from "@/lib/shopify";

const CATEGORY_BASE_PATHS: Record<string, string> = {
  Shelves: "/shelves",
  Vases: "/vases",
  "Wine Holders": "/wine-holders",
  Organisers: "/organisers",
  "Shoe Display Racks": "/shoe-display-racks",
};

export default async function AllProductsPage() {
  const all = [...shelves, ...vases, ...wineHolders, ...organisers, ...shoeRacks];
  const items = await withLivePrices(all);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Mettali Collection</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">All Products</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">Every Mettali piece, in one place — precision-formed aluminium for every room.</p>
      </div>
      <CategoriesSection showViewAll={false} heading="Explore Categories" />
      <ProductFilterBar products={items} categoryBasePaths={CATEGORY_BASE_PATHS} />
      <FooterSection />
    </main>
  );
}
