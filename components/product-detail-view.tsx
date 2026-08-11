"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Check } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";
import { useCart } from "@/components/cart-context";
import { slugify, type Product } from "@/lib/products";

export function ProductDetailView({
  product,
  related,
  backHref,
  backLabel,
}: {
  product: Product;
  related: Product[];
  backHref: string;
  backLabel: string;
}) {
  const [current, setCurrent] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const { addItem } = useCart();

  const selectedSize = product.sizes?.[sizeIndex];
  const effectivePrice = selectedSize?.price ?? product.price;
  const effectiveDimensions = selectedSize?.dimensions ?? product.dimensions;
  const effectiveWeight = selectedSize?.weight ?? product.weight;
  const effectiveShopify = selectedSize?.shopify ?? product.shopify;
  const effectiveImages = selectedSize?.images ?? product.images;
  const effectiveName = selectedSize ? `${product.name} (${selectedSize.label})` : product.name;

  const dimValues = effectiveDimensions.replace(/\s*cm$/i, "").split("×").map((d) => d.trim());
  const dimLabels = ["Width", "Depth", "Height"];

  const handleAddToCart = () => {
    addItem({ name: effectiveName, category: product.category, price: effectivePrice, image: effectiveImages[0], variantId: effectiveShopify?.variantId });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const selectSize = (i: number) => {
    setSizeIndex(i);
    setCurrent(0);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-6 pt-32 pb-6 text-xs uppercase tracking-widest text-sandcast font-space-mono md:px-12 lg:px-20">
        <Link href="/" className="transition-colors hover:text-mulled-iron">Home</Link>
        <span>/</span>
        <Link href={backHref} className="transition-colors hover:text-mulled-iron">{backLabel}</Link>
        <span>/</span>
        <span className="text-smoked-bronze">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 px-6 pb-20 md:grid-cols-2 md:gap-16 md:px-12 lg:px-20">
        {/* Media */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="relative aspect-square overflow-hidden border border-border bg-white shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
            <div className="absolute inset-10">
              <div className="relative h-full w-full">
                <Image src={effectiveImages[current]} alt={product.name} fill className="object-contain" priority />
              </div>
            </div>

            {effectiveImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent((c) => (c - 1 + effectiveImages.length) % effectiveImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
                >
                  <ChevronLeft size={18} className="text-smoked-bronze" />
                </button>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % effectiveImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
                >
                  <ChevronRight size={18} className="text-smoked-bronze" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {effectiveImages.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {effectiveImages.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setCurrent(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden border bg-white transition-colors ${
                    i === current ? "border-mulled-iron" : "border-border hover:border-sandcast"
                  }`}
                >
                  <div className="absolute inset-2">
                    <div className="relative h-full w-full">
                      <Image src={src} alt={`${product.name} view ${i + 1}`} fill className="object-contain" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="mb-3 text-xs uppercase tracking-widest text-sandcast font-space-mono">{product.category}</p>
          <h1 className="text-4xl md:text-5xl leading-[1.05] text-mulled-iron font-horizon uppercase tracking-wide">
            {product.name}
          </h1>
          {product.type && (
            <span className="mt-4 inline-block w-fit rounded border border-sandcast/40 px-2.5 py-1 text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
              {product.type}
            </span>
          )}

          <p className="mt-6 text-2xl font-semibold text-smoked-bronze font-space-mono">
            ₹{effectivePrice.toLocaleString("en-IN")}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-moss font-space-mono">
            {product.description}
          </p>

          {/* Size options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <h5 className="mb-2 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">Size</h5>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => selectSize(i)}
                    className={`px-3.5 py-1.5 text-xs uppercase tracking-widest font-space-mono border transition-colors ${
                      i === sizeIndex
                        ? "border-mulled-iron bg-mulled-iron text-white"
                        : "border-border text-slate-moss hover:border-sandcast"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <h5 className="mb-2 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">Colors</h5>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <span
                    key={c.name}
                    title={c.name}
                    className="h-5 w-5 rounded-full border border-border/60"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          <div className={`mt-8 grid ${effectiveWeight ? "grid-cols-4" : "grid-cols-3"} divide-x divide-border border border-border`}>
            {dimValues.map((d, i) => (
              <div key={i} className="px-4 py-4 text-center">
                <p className="mb-1 text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
                  {dimLabels[i] ?? ""}
                </p>
                <p className="text-sm text-mulled-iron font-space-mono">{d} cm</p>
              </div>
            ))}
            {effectiveWeight && (
              <div className="px-4 py-4 text-center">
                <p className="mb-1 text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
                  Weight
                </p>
                <p className="text-sm text-mulled-iron font-space-mono">{effectiveWeight}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`mt-8 inline-flex w-fit items-center gap-2 px-8 py-4 text-center text-xs uppercase tracking-widest text-white font-space-mono transition-opacity duration-200 hover:opacity-85 ${
              added ? "bg-slate-moss" : "bg-mulled-iron"
            }`}
          >
            {added ? <Check size={14} /> : <ShoppingBag size={14} />}
            {added ? "Added to Cart" : "Add to Cart"}
          </button>
          <p className="mt-4 text-xs text-slate-moss font-space-mono">
            Crafted in-house, from first sketch to final finish.
          </p>
        </div>
      </div>

      {/* You may also like */}
      {related.length > 0 && (
        <div className="border-t border-border px-6 py-16 md:px-12 lg:px-20">
          <h2 className="mb-8 text-2xl md:text-3xl text-mulled-iron font-horizon uppercase tracking-wide">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductSliderCard key={p.name} {...p} href={`${backHref}/${slugify(p.name)}`} />
            ))}
          </div>
        </div>
      )}

      <FooterSection />
    </main>
  );
}
