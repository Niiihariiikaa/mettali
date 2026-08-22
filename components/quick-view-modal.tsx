"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ShoppingBag, Check, Heart, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/lib/wishlist";
import { slugify, type Product } from "@/lib/products";
import { createCheckoutUrl } from "@/lib/shopify";

const CATEGORY_BASE_PATHS: Record<string, string> = {
  Shelves: "/shelves",
  Vases: "/vases",
  "Wine Holders": "/wine-holders",
  Organisers: "/organisers",
  "Shoe Display Racks": "/shoe-display-racks",
};

export function QuickViewModal({
  product,
  initialColor,
  onClose,
}: {
  product: Product | null;
  initialColor?: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const { addItem } = useCart();
  const { wishlisted, toggle: toggleWishlist } = useWishlist(product?.name ?? "");

  useEffect(() => setMounted(true), []);

  // Reset local selection state whenever a different product opens
  useEffect(() => {
    if (!product) return;
    setCurrent(0);
    setSizeIndex(0);
    setQty(1);
    setAdded(false);
    setCheckoutError("");
    const idx = initialColor ? (product.colors?.findIndex((c) => c.name === initialColor) ?? -1) : -1;
    setColorIndex(idx >= 0 ? idx : 0);
  }, [product, initialColor]);

  // Keep the page from scrolling behind the open modal
  useEffect(() => {
    if (!product) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [product]);

  if (!mounted || !product) return null;

  const selectedSize = product.sizes?.[sizeIndex];
  const selectedColor = product.colors?.[colorIndex];
  const effectivePrice = selectedSize?.price ?? product.price;
  const effectiveShopify = selectedSize?.shopify ?? product.shopify;
  const effectiveImages = selectedSize?.images ?? product.images;
  const effectiveName = selectedSize ? `${product.name} (${selectedSize.label})` : product.name;
  const href = `${CATEGORY_BASE_PATHS[product.category] ?? ""}/${slugify(product.name)}`;

  const handleAddToCart = () => {
    addItem(
      {
        name: effectiveName,
        category: product.category,
        price: effectivePrice,
        image: effectiveImages[0],
        href,
        variantId: effectiveShopify?.variantId,
        color: selectedColor?.name,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = async () => {
    if (!effectiveShopify?.variantId) return;
    setCheckoutError("");
    setCheckingOut(true);
    try {
      const url = await createCheckoutUrl([
        {
          variantId: effectiveShopify.variantId,
          quantity: qty,
          attributes: selectedColor ? [{ key: "Color", value: selectedColor.name }] : undefined,
        },
      ]);
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
      setCheckingOut(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-80">
      <style>{`
        .qv-sheet { animation: slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* Mobile: bottom sheet / Desktop: centered modal */}
      <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-6">
        <div className="qv-sheet relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-background shadow-2xl sm:max-h-[85vh] sm:w-full sm:max-w-3xl sm:animate-scale-in sm:rounded-2xl">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-smoked-bronze shadow-sm hover:bg-white"
          >
            <X size={16} />
          </button>

          {/* Mobile drag handle */}
          <div className="flex justify-center pt-3 sm:hidden">
            <div className="h-1 w-10 rounded-full bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 sm:gap-8 sm:p-8">
            {/* Image */}
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                <Image src={effectiveImages[current]} alt={product.name} fill className="object-contain" />
                {effectiveImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrent((c) => (c - 1 + effectiveImages.length) % effectiveImages.length)}
                      className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white sm:block"
                    >
                      <ChevronLeft size={16} className="text-smoked-bronze" />
                    </button>
                    <button
                      onClick={() => setCurrent((c) => (c + 1) % effectiveImages.length)}
                      className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow-sm hover:bg-white sm:block"
                    >
                      <ChevronRight size={16} className="text-smoked-bronze" />
                    </button>
                  </>
                )}
              </div>
              {effectiveImages.length > 1 && (
                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                  {effectiveImages.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setCurrent(i)}
                      className={`relative shrink-0 overflow-hidden rounded-xl bg-white transition-all ${
                        i === current ? "h-14 w-14 border-2 border-mulled-iron" : "h-12 w-12 border border-border hover:border-sandcast"
                      }`}
                    >
                      <Image src={src} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono">{product.category}</p>
              <h2 className="mt-2 text-2xl text-mulled-iron font-horizon uppercase tracking-wide">{product.name}</h2>
              <p className="mt-4 text-xl font-semibold text-smoked-bronze font-space-mono">
                ₹{effectivePrice.toLocaleString("en-IN")}
              </p>
              {product.description && (
                <p className="mt-4 text-sm leading-relaxed text-slate-moss font-space-mono line-clamp-3">
                  {product.description}
                </p>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <h5 className="mb-2 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">Size</h5>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s, i) => (
                      <button
                        key={s.label}
                        onClick={() => {
                          setSizeIndex(i);
                          setCurrent(0);
                        }}
                        className={`px-3 py-1.5 text-xs uppercase tracking-widest font-space-mono border transition-colors ${
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

              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <h5 className="mb-2 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">
                    Color {selectedColor ? `: ${selectedColor.name}` : ""}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.name}
                        title={c.name}
                        aria-label={`Select color ${c.name}`}
                        onClick={() => setColorIndex(i)}
                        className={`h-6 w-6 rounded-full border transition-shadow ${
                          i === colorIndex ? "ring-2 ring-mulled-iron ring-offset-1" : "border-border/60"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-stretch gap-3">
                <div className="flex shrink-0 items-center rounded-full border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-11 w-9 items-center justify-center text-slate-moss hover:text-foreground"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-6 text-center text-sm font-space-mono text-foreground">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="flex h-11 w-9 items-center justify-center text-slate-moss hover:text-foreground"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-xs uppercase tracking-widest text-white font-space-mono transition-opacity duration-200 hover:opacity-85 ${
                    added ? "bg-slate-moss" : "bg-mulled-iron"
                  }`}
                >
                  {added ? <Check size={13} /> : <ShoppingBag size={13} />}
                  {added ? "Added" : "Add to Cart"}
                </button>
              </div>

              {effectiveShopify?.variantId && (
                <button
                  onClick={handleBuyNow}
                  disabled={checkingOut}
                  className="mt-3 w-full rounded-full border border-mulled-iron px-4 py-3 text-center text-xs uppercase tracking-widest text-mulled-iron font-space-mono transition-colors hover:bg-mulled-iron hover:text-white disabled:opacity-60"
                >
                  {checkingOut ? "Redirecting…" : "Buy It Now"}
                </button>
              )}
              {checkoutError && <p className="mt-2 text-xs text-destructive font-space-mono">{checkoutError}</p>}

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={toggleWishlist}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-moss font-space-mono transition-colors hover:text-mulled-iron"
                >
                  <Heart size={13} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-mulled-iron" : ""} />
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </button>
                <Link
                  href={href}
                  onClick={onClose}
                  className="text-xs text-smoked-bronze underline underline-offset-2 font-space-mono"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
