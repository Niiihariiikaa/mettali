import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductFilterBar } from "@/components/product-filter-bar";
import { vases } from "@/lib/products";
import { withLivePrices } from "@/lib/shopify";

export default async function VasesPage() {
  const items = await withLivePrices(vases);
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Mettali Collection</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">Vases</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">Sculptural aluminium vases — where function meets artistry.</p>
      </div>
      <ProductFilterBar products={items} basePath="/vases" />
      <FooterSection />
    </main>
  );
}
