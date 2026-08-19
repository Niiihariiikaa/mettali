"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Check, Heart } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/lib/wishlist";

interface ProductSizeOption {
  label: string;
  price: number;
  dimensions: string;
  weight?: string;
  images?: string[];
  shopify?: { productId: string; variantId: string; handle: string };
}

interface ProductColor {
  name: string;
  hex: string;
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
  colors?: ProductColor[];
}

export function ProductSliderCard({ name, category, images, description, price, dimensions, type, href, shopify, sizes, colors }: ProductSliderCardProps) {
  const [added, setAdded] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const { addItem } = useCart();
  const { wishlisted, toggle: toggleWishlist } = useWishlist(name);

  const selectedSize = sizes?.[sizeIndex];
  const selectedColor = colors?.[colorIndex];
  const effectivePrice = selectedSize?.price ?? price;
  const effectiveDimensions = selectedSize?.dimensions ?? dimensions;
  const effectiveShopify = selectedSize?.shopify ?? shopify;
  const effectiveImages = selectedSize?.images ?? images;
  const effectiveName = selectedSize ? `${name} (${selectedSize.label})` : name;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (effectivePrice === undefined) return;
    addItem({
      name: effectiveName,
      category,
      price: effectivePrice,
      image: effectiveImages[0],
      href,
      variantId: effectiveShopify?.variantId,
      color: selectedColor?.name,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist();
  };

  const selectSize = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSizeIndex(i);
  };

  const selectColor = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    setColorIndex(i);
  };

  const dimValues = effectiveDimensions?.replace(/\s*cm$/i, "").split("×").map((d) => d.trim());
  const dimLabels = ["W", "D", "H"];

  const cardContent = (
    <div className="flex h-full flex-col overflow-hidden border border-border bg-white divide-y divide-border group">
      {/* Name row */}
      <div className="px-3 py-2 sm:px-4 sm:py-3">
        <p className="mb-1 text-[9px] uppercase tracking-widest text-sandcast font-space-mono sm:text-[10px]">
          {type ?? category}
        </p>
        <h3 className="truncate text-smoked-bronze text-xs font-space-mono uppercase tracking-wide sm:text-sm">{name}</h3>
      </div>

      {/* Image area — base photo crossfades to the lifestyle shot on hover */}
      <div className="relative bg-white overflow-hidden pb-4">
        <div className="relative aspect-4/5 w-full overflow-hidden">
          <Image
            src={effectiveImages[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {effectiveImages[1] && (
            <Image
              src={effectiveImages[1]}
              alt={`${name} in a styled room`}
              fill
              className="object-cover opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 group-hover:opacity-100"
            />
          )}

          {/* Wishlist — bottom-center overlay, hover-revealed on desktop */}
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-colors duration-200 ${
                wishlisted ? "bg-mulled-iron text-white" : "bg-white text-smoked-bronze hover:bg-mulled-iron hover:text-white"
              }`}
            >
              <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
            </button>
          </div>
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

      {/* Colors */}
      {colors && colors.length > 0 && (
        <div className="px-4 py-3">
          <h5 className="mb-1.5 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">
            Color{selectedColor ? `: ${selectedColor.name}` : ""}
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((c, i) => (
              <button
                key={c.name}
                title={c.name}
                aria-label={`Select color ${c.name}`}
                onClick={(e) => selectColor(e, i)}
                className={`h-5 w-5 rounded-full border transition-shadow ${
                  i === colorIndex ? "ring-2 ring-mulled-iron ring-offset-1" : "border-border/60"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* About / Measurements row */}
      <div className="hidden grid-cols-2 divide-x divide-border sm:grid">
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
        <div className="mt-auto flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">
          <p className="text-sm font-semibold text-smoked-bronze font-space-mono sm:text-base">
            ₹{effectivePrice.toLocaleString("en-IN")}
          </p>
          <button
            onClick={handleAddToCart}
            className={`flex shrink-0 items-center gap-1.5 px-2 py-1.5 text-[10px] uppercase tracking-widest font-space-mono transition-colors sm:px-3 ${
              added
                ? "bg-slate-moss text-white"
                : "bg-mulled-iron text-white hover:bg-smoked-bronze"
            }`}
          >
            {added ? <Check size={12} /> : <ShoppingBag size={12} />}
            <span className="hidden sm:inline">{added ? "Added" : "Add to Cart"}</span>
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
