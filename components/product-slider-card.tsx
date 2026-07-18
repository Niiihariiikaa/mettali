"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/cart-context";

interface ProductSliderCardProps {
  name: string;
  category: string;
  images: string[];
  description?: string;
  price?: number;
  dimensions?: string;
  type?: string;
  href?: string;
}

export function ProductSliderCard({ name, category, images, description, price, dimensions, type, href }: ProductSliderCardProps) {
  const [current, setCurrent] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (price === undefined) return;
    addItem({ name, category, price, image: images[0], href });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  const dimValues = dimensions?.replace(/\s*cm$/i, "").split("×").map((d) => d.trim());
  const dimLabels = ["W", "D", "H"];

  const cardContent = (
    <div className="overflow-hidden border border-border bg-white divide-y divide-border shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 group">
      {/* Name row */}
      <div className="px-4 py-3">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
          {type ?? category}
        </p>
        <h3 className="text-smoked-bronze text-sm font-space-mono uppercase tracking-wide">{name}</h3>
      </div>

      {/* Image area */}
      <div className="relative aspect-square bg-white overflow-hidden">
        <div className="absolute inset-6">
          <div className="relative h-full w-full">
            <Image
              src={images[current]}
              alt={name}
              fill
              className="object-contain transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-white/80 rounded-full px-2 py-0.5 text-[10px] text-slate-moss font-space-mono">
            {current + 1}/{images.length}
          </div>
        )}

        {/* Arrows */}
        {images.length > 1 && (
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
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
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
      {price !== undefined && (
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-base font-semibold text-smoked-bronze font-space-mono">
            ₹{price.toLocaleString("en-IN")}
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
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
