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

export function ProductSliderCard({ name, category, images, price, type, href, shopify, sizes, colors }: ProductSliderCardProps) {
  const [added, setAdded] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const { addItem } = useCart();
  const { wishlisted, toggle: toggleWishlist } = useWishlist(name);

  const selectedSize = sizes?.[sizeIndex];
  const selectedColor = colors?.[colorIndex];
  const effectivePrice = selectedSize?.price ?? price;
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

  const cardContent = (
    <div className="flex h-full flex-col group">
      {/* Image area — base photo fills the frame, crossfading to a full-bleed lifestyle shot on hover */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border/60 bg-white">
        <Image
          src={effectiveImages[0]}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {effectiveImages.length > 1 && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <Image
              src={effectiveImages[effectiveImages.length - 1]}
              alt={`${name} in a styled room`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}

        {/* Wishlist — top-right overlay, hover-revealed on desktop */}
        <div className="absolute right-3 top-3 z-10 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
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

      {/* Info — left-aligned, below the image */}
      <div className="flex flex-1 flex-col items-start gap-1 px-3 pb-3 pt-3.5 text-left">
        <p className="text-[9px] uppercase tracking-widest text-sandcast font-space-mono sm:text-[10px]">
          {type ?? category}
        </p>
        <h3 className="text-smoked-bronze text-xs font-space-mono uppercase tracking-wide sm:text-sm">{name}</h3>
        {effectivePrice !== undefined && (
          <div className="mt-0.5 flex w-full items-center justify-between gap-2">
            <p className="text-sm font-semibold text-mulled-iron font-space-mono sm:text-base">
              ₹{effectivePrice.toLocaleString("en-IN")}
            </p>
            <button
              onClick={handleAddToCart}
              aria-label={added ? "Added to cart" : "Add to cart"}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                added
                  ? "bg-slate-moss text-white"
                  : "bg-mulled-iron text-white hover:bg-smoked-bronze"
              }`}
            >
              {added ? <Check size={13} /> : <ShoppingBag size={13} />}
            </button>
          </div>
        )}

        {colors && colors.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
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
        )}

        {sizes && sizes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
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
        )}
      </div>
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
