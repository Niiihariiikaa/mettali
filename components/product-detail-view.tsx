"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";
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

  const dimValues = product.dimensions.replace(/\s*cm$/i, "").split("×").map((d) => d.trim());
  const dimLabels = ["Width", "Depth", "Height"];

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
                <Image src={product.images[current]} alt={product.name} fill className="object-contain" priority />
              </div>
            </div>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent((c) => (c - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
                >
                  <ChevronLeft size={18} className="text-smoked-bronze" />
                </button>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white"
                >
                  <ChevronRight size={18} className="text-smoked-bronze" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((src, i) => (
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
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-moss font-space-mono">
            {product.description}
          </p>

          {/* Specs */}
          <div className="mt-8 grid grid-cols-3 divide-x divide-border border border-border">
            {dimValues.map((d, i) => (
              <div key={i} className="px-4 py-4 text-center">
                <p className="mb-1 text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
                  {dimLabels[i] ?? ""}
                </p>
                <p className="text-sm text-mulled-iron font-space-mono">{d} cm</p>
              </div>
            ))}
          </div>

          <a
            href="#reserve"
            className="mt-8 inline-flex w-fit items-center gap-2 bg-mulled-iron px-8 py-4 text-center text-xs uppercase tracking-widest text-white font-space-mono transition-opacity duration-200 hover:opacity-85"
          >
            Enquire / Shop Now
          </a>
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
