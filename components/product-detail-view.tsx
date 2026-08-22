"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ShoppingBag, Check, Heart, Minus, Plus, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/lib/wishlist";
import { slugify, type Product } from "@/lib/products";
import { createCheckoutUrl } from "@/lib/shopify";

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
  // Matches the main image box to each photo's real proportions (our product
  // shots range from portrait ~2:3 to landscape ~5:4), so object-contain has
  // no letterboxing to fill instead of leaving empty space around the image.
  const [imgRatio, setImgRatio] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [openInfo, setOpenInfo] = useState<"delivery" | "care" | null>(null);
  const { addItem } = useCart();
  const { wishlisted, toggle: toggleWishlist } = useWishlist(product.name);
  const touchStartX = useRef<number | null>(null);

  const selectedSize = product.sizes?.[sizeIndex];
  const selectedColor = product.colors?.[colorIndex];
  const effectivePrice = selectedSize?.price ?? product.price;
  const effectiveDimensions = selectedSize?.dimensions ?? product.dimensions;
  const effectiveWeight = selectedSize?.weight ?? product.weight;
  const effectiveShopify = selectedSize?.shopify ?? product.shopify;
  const effectiveImages = selectedSize?.images ?? product.images;
  const effectiveName = selectedSize ? `${product.name} (${selectedSize.label})` : product.name;

  const dimValues = effectiveDimensions.replace(/\s*cm$/i, "").split("×").map((d) => d.trim());
  const dimLabels = ["Width", "Depth", "Height"];

  const handleAddToCart = () => {
    addItem(
      {
        name: effectiveName,
        category: product.category,
        price: effectivePrice,
        image: effectiveImages[0],
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

  const selectSize = (i: number) => {
    setSizeIndex(i);
    setCurrent(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || effectiveImages.length < 2) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    setCurrent((c) =>
      deltaX < 0 ? (c + 1) % effectiveImages.length : (c - 1 + effectiveImages.length) % effectiveImages.length
    );
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
        {/* Media — image fills the frame fully (object-contain, no crop) */}
        <div className="md:sticky md:top-32 md:self-start">
          <div
            className="relative w-full overflow-hidden bg-white"
            style={{ aspectRatio: imgRatio }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={effectiveImages[current]}
              alt={product.name}
              fill
              className="object-contain"
              priority
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth && naturalHeight) setImgRatio(naturalWidth / naturalHeight);
              }}
            />

            {effectiveImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrent((c) => (c - 1 + effectiveImages.length) % effectiveImages.length)}
                  className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white md:block"
                >
                  <ChevronLeft size={18} className="text-smoked-bronze" />
                </button>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % effectiveImages.length)}
                  className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm hover:bg-white md:block"
                >
                  <ChevronRight size={18} className="text-smoked-bronze" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {effectiveImages.length > 1 && (
            <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
              {effectiveImages.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setCurrent(i)}
                  className={`relative shrink-0 overflow-hidden rounded-2xl bg-white transition-all ${
                    i === current
                      ? "h-20 w-20 border-2 border-mulled-iron sm:h-24 sm:w-24"
                      : "h-16 w-16 border border-border hover:border-sandcast sm:h-20 sm:w-20"
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
                    className={`h-7 w-7 rounded-full border transition-shadow ${
                      i === colorIndex ? "ring-2 ring-mulled-iron ring-offset-1" : "border-border/60"
                    }`}
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

          {/* Quantity + Add to cart */}
          <div className="mt-8 flex max-w-md items-stretch gap-3">
            <div className="flex shrink-0 items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-13 w-10 items-center justify-center text-slate-moss hover:text-foreground"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-space-mono text-foreground">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-13 w-10 items-center justify-center text-slate-moss hover:text-foreground"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-xs uppercase tracking-widest text-white font-space-mono transition-opacity duration-200 hover:opacity-85 ${
                added ? "bg-slate-moss" : "bg-mulled-iron"
              }`}
            >
              {added ? <Check size={14} /> : <ShoppingBag size={14} />}
              {added ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>

          {effectiveShopify?.variantId && (
            <button
              onClick={handleBuyNow}
              disabled={checkingOut}
              className="mt-3 w-full max-w-md rounded-full border border-mulled-iron px-8 py-4 text-center text-xs uppercase tracking-widest text-mulled-iron font-space-mono transition-colors hover:bg-mulled-iron hover:text-white disabled:opacity-60"
            >
              {checkingOut ? "Redirecting…" : "Buy It Now"}
            </button>
          )}
          {checkoutError && (
            <p className="mt-2 text-xs text-destructive font-space-mono">{checkoutError}</p>
          )}

          <button
            onClick={toggleWishlist}
            className="mt-4 flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-slate-moss font-space-mono transition-colors hover:text-mulled-iron"
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-mulled-iron" : ""} />
            {wishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

          {/* Trust badges — sourced from the real /delivery and /returns policies */}
          <div className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-border pt-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck size={20} className="text-sandcast" />
              <p className="text-[10px] leading-tight text-slate-moss font-space-mono">Dispatched in<br />7–10 Days</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck size={20} className="text-sandcast" />
              <p className="text-[10px] leading-tight text-slate-moss font-space-mono">Secure<br />Checkout</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RotateCcw size={20} className="text-sandcast" />
              <p className="text-[10px] leading-tight text-slate-moss font-space-mono">7-Day<br />Returns</p>
            </div>
          </div>

          {/* Delivery / Care — collapsible, summarised from the full policy pages */}
          <div className="mt-2 max-w-md divide-y divide-border border-b border-border">
            <div>
              <button
                onClick={() => setOpenInfo((v) => (v === "delivery" ? null : "delivery"))}
                className="flex w-full items-center justify-between py-4 text-left text-xs uppercase tracking-widest text-mulled-iron font-space-mono"
              >
                Delivery Information
                <ChevronDown size={15} className={`transition-transform duration-200 ${openInfo === "delivery" ? "rotate-180" : ""}`} />
              </button>
              {openInfo === "delivery" && (
                <p className="pb-4 text-xs leading-relaxed text-slate-moss font-space-mono">
                  Every piece is made to order and hand-finished — please allow 7–10 business days
                  to be crafted, quality-checked and dispatched, with a tracking link sent by email.{" "}
                  <Link href="/delivery" className="text-smoked-bronze underline underline-offset-2">Full policy</Link>
                </p>
              )}
            </div>
            <div>
              <button
                onClick={() => setOpenInfo((v) => (v === "care" ? null : "care"))}
                className="flex w-full items-center justify-between py-4 text-left text-xs uppercase tracking-widest text-mulled-iron font-space-mono"
              >
                Care Guide
                <ChevronDown size={15} className={`transition-transform duration-200 ${openInfo === "care" ? "rotate-180" : ""}`} />
              </button>
              {openInfo === "care" && (
                <p className="pb-4 text-xs leading-relaxed text-slate-moss font-space-mono">
                  Wipe clean with a soft, dry or slightly damp cloth — avoid abrasive scrubbers and
                  harsh chemical cleaners, which can dull the powder-coated finish.{" "}
                  <Link href="/care-guide" className="text-smoked-bronze underline underline-offset-2">Full guide</Link>
                </p>
              )}
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-moss font-space-mono">
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
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
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
