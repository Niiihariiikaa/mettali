"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/cart-context";

interface ProductSizeOption {
  label: string;
  price: number;
  dimensions: string;
  weight?: string;
  images?: string[];
  shopify?: { productId: string; variantId: string; handle: string };
}

interface ProductSliderCardProps {
  name: string;
  category: string;
  images: string[];
  description?: string;
  price?: number;
  dimensions?: string;
  type?: string;
  href?: string;
  shopify?: { productId: string; variantId: string; handle: string };
  sizes?: ProductSizeOption[];
}

export function ProductSliderCard({ name, category, images, description, price, dimensions, type, href, shopify, sizes }: ProductSliderCardProps) {
  const [current, setCurrent] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const { addItem } = useCart();

  const selectedSize = sizes?.[sizeIndex];
  const effectivePrice = selectedSize?.price ?? price;
  const effectiveDimensions = selectedSize?.dimensions ?? dimensions;
  const effectiveShopify = selectedSize?.shopify ?? shopify;
  const effectiveImages = selectedSize?.images ?? images;
  const effectiveName = selectedSize ? `${name} (${selectedSize.label})` : name;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (effectivePrice === undefined) return;
    addItem({ name: effectiveName, category, price: effectivePrice, image: effectiveImages[0], href, variantId: effectiveShopify?.variantId });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const selectSize = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSizeIndex(i);
    setCurrent(0);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c - 1 + effectiveImages.length) % effectiveImages.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c + 1) % effectiveImages.length);
  };

  const dimValues = effectiveDimensions?.replace(/\s*cm$/i, "").split("×").map((d) => d.trim());
  const dimLabels = ["W", "D", "H"];

  const cardContent = (
    <div className="flex h-full flex-col overflow-hidden border border-border bg-white divide-y divide-border shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 group">
      {/* Name row */}
      <div className="px-4 py-3">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
          {type ?? category}
        </p>
        <h3 className="text-smoked-bronze text-sm font-space-mono uppercase tracking-wide">{name}</h3>
      </div>

      {/* Image area */}
      <div className="relative bg-white overflow-hidden pb-4">
        <div className="relative aspect-4/5 w-full">
          <Image
            src={effectiveImages[current]}
            alt={name}
            fill
            className="object-cover transition-opacity duration-300"
          />

        {/* Counter */}
        {effectiveImages.length > 1 && (
          <div className="absolute top-3 right-3 bg-white/80 rounded-full px-2 py-0.5 text-[10px] text-slate-moss font-space-mono">
            {current + 1}/{effectiveImages.length}
          </div>
        )}

        {/* Arrows */}
        {effectiveImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm z-10"
            >
              <ChevronLeft size={16} className="text-smoked-bronze" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm z-10"
            >
              <ChevronRight size={16} className="text-smoked-bronze" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {effectiveImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {effectiveImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? "w-4 bg-smoked-bronze" : "w-1.5 bg-smoked-bronze/30"
                }`}
              />
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Size options */}
      {sizes && sizes.length > 0 && (
        <div className="px-4 py-3">
          <h5 className="mb-1.5 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">Size</h5>
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((s, i) => (
              <button
                key={s.label}
                onClick={(e) => selectSize(e, i)}
                className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-space-mono border transition-colors ${
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

      {/* About / Measurements row */}
      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="px-4 py-4">
          <h5 className="mb-1.5 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">About</h5>
          {description && (
            <p className="text-[11px] leading-relaxed text-slate-moss font-space-mono line-clamp-3">
              {description}
            </p>
          )}
        </div>
        <div className="px-4 py-4">
          <h5 className="mb-1.5 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">Measurements</h5>
          {dimValues && (
            <div className="space-y-0.5">
              {dimValues.map((d, i) => (
                <p key={i} className="flex max-w-[100px] justify-between text-[11px] text-slate-moss font-space-mono">
                  <span>{dimLabels[i] ?? ""}</span>
                  <span>{d} cm</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price strip */}
      {effectivePrice !== undefined && (
        <div className="mt-auto flex items-center justify-between px-4 py-3">
          <p className="text-base font-semibold text-smoked-bronze font-space-mono">
            ₹{effectivePrice.toLocaleString("en-IN")}
          </p>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-widest font-space-mono transition-colors ${
              added
                ? "bg-slate-moss text-white"
                : "bg-mulled-iron text-white hover:bg-smoked-bronze"
            }`}
          >
            {added ? <Check size={12} /> : <ShoppingBag size={12} />}
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
