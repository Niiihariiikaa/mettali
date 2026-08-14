"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/lib/wishlist";
import { shelves, vases, wineHolders, organisers, shoeRacks, slugify, type Product } from "@/lib/products";

// ─── Scroll-reveal text ──────────────────────────────────────────────────────

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      setProgress(Math.max(0, Math.min(1, currentPosition / totalDistance)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={containerRef} className="text-md leading-snug md:text-lg lg:text-2xl font-space-mono">
      {words.map((word, index) => (
        <span
          key={index}
          className="transition-colors duration-150"
          style={{ color: progress > index / words.length ? "var(--mulled-iron)" : "var(--sandcast)" }}
        >
          {word}{index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

// ─── Signature products ───────────────────────────────────────────────────────

const CATEGORY_BASE_PATHS: Record<string, string> = {
  Shelves: "/shelves",
  Vases: "/vases",
  "Wine Holders": "/wine-holders",
  Organisers: "/organisers",
  "Shoe Display Racks": "/shoe-display-racks",
};

function findProduct(list: Product[], name: string): Product {
  const p = list.find((x) => x.name === name);
  if (!p) throw new Error(`Signature product not found in catalog: ${name}`);
  return p;
}

const B = "/products1_webp/products1";
const HOME = "/images2/products-home";

const SIGNATURE_PRODUCTS: { label: string; product: Product; images: [string, string] }[] = [
  { label: "Maison", product: findProduct(wineHolders, "Maison"), images: [`${HOME}/winestand1.webp`, `${HOME}/winestand2.webp`] },
  { label: "Cala", product: findProduct(vases, "Cala Vase"), images: [`${HOME}/wine-vase1.webp`, `${HOME}/wine-vase2.webp`] },
  { label: "Aura", product: findProduct(vases, "Aura Vase"), images: [`${HOME}/3vase1.webp`, `${HOME}/3vase2.webp`] },
  { label: "Genre", product: findProduct(shelves, "Genre"), images: ["/images/genre-signature.png", "/images2/categories/genre shelf- signature product hover.PNG"] },
  { label: "Nest", product: findProduct(organisers, "Nest Organiser"), images: ["/images/nest-signature.png", "/products1_webp/nest-signature image - hover.png"] },
  { label: "Align", product: findProduct(shoeRacks, "Align"), images: [`${HOME}/alighnshoerack-4.png`, `${HOME}/shoerack2.webp`] },
];

function SignatureProductCard({ label, product, images }: { label: string; product: Product; images: [string, string] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { wishlisted, toggle } = useWishlist(product.name);

  const href = `${CATEGORY_BASE_PATHS[product.category]}/${slugify(product.name)}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ name: product.name, category: product.category, price: product.price, image: images[0], href, variantId: product.shopify?.variantId });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };

  return (
    <Link
      href={href}
      className="group block cursor-pointer overflow-hidden bg-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-white isolate">
        {/* Base: white product shot — same fixed rectangle as the hover photo, no padding */}
        <Image
          src={images[0]}
          alt={label}
          fill
          className="object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,transform]"
          style={{ opacity: hovered ? 0 : 1, transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />

        {/* Crossfade: mood / lifestyle photo */}
        <Image
          src={images[1]}
          alt={`${label} in a styled room`}
          fill
          className="object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,transform]"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(1.06)" }}
        />

        {/* Hover actions */}
        <div
          className="absolute right-3 top-3 flex flex-col gap-2 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-6px)" }}
        >
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-colors duration-200 ${
              wishlisted ? "bg-mulled-iron text-white" : "bg-white text-smoked-bronze hover:bg-mulled-iron hover:text-white"
            }`}
          >
            <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-colors duration-200 ${
              added ? "bg-slate-moss text-white" : "bg-white text-smoked-bronze hover:bg-mulled-iron hover:text-white"
            }`}
          >
            {added ? <Check size={15} /> : <ShoppingBag size={15} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
        <div className="min-w-0">
          <p className="mb-1 truncate text-[10px] uppercase tracking-widest text-sandcast font-space-mono sm:text-xs">{product.category}</p>
          <h3 className="truncate text-smoked-bronze text-xs font-space-mono uppercase tracking-wide sm:text-sm">{label}</h3>
        </div>
        <p className="shrink-0 text-xs text-mulled-iron font-space-mono sm:text-sm">₹{product.price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function TechnologySection() {
  const { openCart } = useCart();
  const descriptionText =
    "At Mettali, raw aluminium is the starting point — not the shortcut. Every piece passes through precision forming, expert powder coating, and careful hand-finishing before it earns its place in your home. Durable enough to outlast trends, refined enough to define them.";

  return (
    <section>
      {/* 1. Video panel */}
      <div className="relative aspect-video overflow-hidden md:aspect-auto md:h-[85vh]">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full origin-top scale-125 object-cover object-top md:scale-100">
          <source src="/products1_webp/products1/more_sharp_k_video_focus_sho.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="font-horizon text-2xl uppercase text-white sm:text-4xl md:text-7xl">10% Off</h2>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/75 font-space-mono sm:mt-4 sm:text-sm sm:tracking-[0.25em]">
            On Your First Purchase
          </p>
          <button
            type="button"
            onClick={openCart}
            className="mt-3 border border-white/60 px-5 py-2 text-[10px] uppercase tracking-widest text-white font-space-mono hover:bg-white hover:text-smoked-bronze transition-colors duration-200 sm:mt-10 sm:px-8 sm:py-3 sm:text-xs"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* 2. Signature products */}
      <div className="bg-background">
        <div className="px-6 py-16 text-center md:px-12 md:py-20 lg:px-20 lg:py-24 lg:pb-16">
          <p className="inline-block text-sm md:text-base uppercase tracking-[0.25em] text-smoked-bronze font-space-mono border-b-2 border-smoked-bronze/40 pb-1 mb-6">
            Signature Products
          </p>
          <h2 className="text-2xl tracking-wide text-mulled-iron md:text-3xl lg:text-4xl font-horizon uppercase">
            The Mettali Standard.
            <br />
            Built for Every Room.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 px-6 pb-6 sm:grid-cols-3 md:px-12 lg:px-20">
          {SIGNATURE_PRODUCTS.map((sp) => (
            <SignatureProductCard key={sp.label} label={sp.label} product={sp.product} images={sp.images} />
          ))}
        </div>
      </div>

      {/* 3. At Mettali description */}
      <div className="bg-background px-6 py-10 md:px-12 md:py-14 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
