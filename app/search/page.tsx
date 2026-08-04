import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  const all = [...shelves, ...vases, ...wineHolders, ...organisers, ...shoeRacks];
  const matches = query
    ? all.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.type ?? "").toLowerCase().includes(query)
      )
    : [];
  const items = await withLivePrices(matches);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Search Results</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">
          {query ? `“${q}”` : "Search"}
        </h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          {query
            ? `${items.length} result${items.length === 1 ? "" : "s"} found`
            : "Enter a search term to find products."}
        </p>
      </div>
      {items.length > 0 ? (
        <ProductFilterBar
          products={items}
          categoryBasePaths={CATEGORY_BASE_PATHS}
          className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-4 lg:px-20"
        />
      ) : query ? (
        <p className="pb-28 text-center text-sm text-muted-foreground font-space-mono">
          No products matched your search. Try a different term or browse{" "}
          <a href="/products" className="text-smoked-bronze underline underline-offset-2">all products</a>.
        </p>
      ) : null}
      <FooterSection />
    </main>
  );
}
