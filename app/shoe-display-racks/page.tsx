import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductGrid } from "@/components/product-grid";
import { shoeRacks } from "@/lib/products";

export default function ShoeDisplayRacksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Mettali Collection</p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">Shoe Display Racks</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">Slim and sturdy entryway racks — built to organise and elevate your space.</p>
      </div>
      <ProductGrid
        products={shoeRacks}
        basePath="/shoe-display-racks"
        className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-3 lg:px-20"
      />
      <FooterSection />
    </main>
  );
}
