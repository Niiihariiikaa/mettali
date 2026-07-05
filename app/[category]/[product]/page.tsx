import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";
import { getProductBySlug, getProductsByCategory, toSlug } from "@/lib/products";
import { ProductGallery } from "./gallery";

function parseDims(dim?: string) {
  if (!dim) return null;
  const parts = dim.replace(/\s*cm\s*/i, "").split("×");
  if (parts.length !== 3) return null;
  return { w: parts[0].trim(), d: parts[1].trim(), h: parts[2].trim() };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: catSlug, product: prodSlug } = await params;
  const product = getProductBySlug(catSlug, prodSlug);
  if (!product) notFound();

  const dims = parseDims(product.dimensions);
  const related = getProductsByCategory(catSlug)
    .filter((p) => toSlug(p.name) !== prodSlug)
    .slice(0, 3);

  return (
    <main className="min-h-screen" style={{ background: "#fffefc" }}>
      <Header />

      {/* Breadcrumb */}
      <div className="pt-28 pb-6 px-8 md:px-16" style={{ fontFamily: "'Space Mono', monospace" }}>
        <nav className="flex gap-2 items-center text-[10px] uppercase tracking-[0.25em]">
          <Link href="/" className="text-[#ad9e89] hover:text-[#584738] transition-colors">Home</Link>
          <span className="text-[#ad9e89]">/</span>
          <Link href={`/${catSlug}`} className="text-[#ad9e89] hover:text-[#584738] transition-colors capitalize">
            {product.category}
          </Link>
          <span className="text-[#ad9e89]">/</span>
          <span className="text-[#2e1f14]">{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <section className="px-8 pb-20 md:px-16">
        <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto md:grid-cols-2">

          {/* Left — image gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Right — product info */}
          <div style={{ fontFamily: "'Space Mono', monospace" }}>
            <p className="text-[10px] uppercase tracking-[0.35em] mb-4" style={{ color: "#ad9e89" }}>
              {product.category}
            </p>

            <h1
              className="text-4xl md:text-5xl uppercase leading-tight mb-5"
              style={{ fontFamily: "Horizon, sans-serif", color: "#2e1f14" }}
            >
              {product.name}
            </h1>

            <p className="text-2xl font-bold mb-7" style={{ color: "#584738" }}>
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p className="text-[11px] leading-relaxed mb-8 max-w-sm" style={{ color: "#716f57" }}>
              {product.description}
            </p>

            {/* Dimensions */}
            {dims && (
              <div className="mb-8 border" style={{ borderColor: "#e2ddd8" }}>
                <div className="px-4 py-2 border-b" style={{ borderColor: "#e2ddd8" }}>
                  <p className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#ad9e89" }}>
                    Dimensions
                  </p>
                </div>
                <div className="grid grid-cols-3 divide-x" style={{ borderColor: "#e2ddd8" }}>
                  {([["W", dims.w], ["D", dims.d], ["H", dims.h]] as const).map(([lbl, val]) => (
                    <div key={lbl} className="px-4 py-4 text-center">
                      <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#ad9e89" }}>
                        {lbl}
                      </p>
                      <p className="text-sm font-bold" style={{ color: "#584738" }}>
                        {val} cm
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <button
              className="w-full py-4 text-xs uppercase tracking-[0.3em] font-bold text-white transition-opacity hover:opacity-85 mb-6"
              style={{ background: "#2e1f14" }}
            >
              Enquire / Shop Now
            </button>

            <p
              className="text-[10px] text-center uppercase tracking-[0.2em]"
              style={{ color: "#ad9e89" }}
            >
              Crafted in-house, from first sketch to final finish.
            </p>
          </div>
        </div>
      </section>

      {/* You may also like */}
      {related.length > 0 && (
        <section className="px-8 pb-24 md:px-16" style={{ borderTop: "1px solid #e2ddd8" }}>
          <div className="py-12 text-center" style={{ fontFamily: "'Space Mono', monospace" }}>
            <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#ad9e89" }}>
              You May Also Like
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto md:grid-cols-3">
            {related.map((p) => (
              <ProductSliderCard key={p.name} {...p} />
            ))}
          </div>
        </section>
      )}

      <FooterSection />
    </main>
  );
}
