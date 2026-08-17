"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag, Check, X } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { useCart } from "@/components/cart-context";
import { useWishlistNames } from "@/lib/wishlist";
import { shelves, vases, wineHolders, organisers, shoeRacks, slugify, type Product } from "@/lib/products";

const CATEGORY_BASE_PATHS: Record<string, string> = {
  Shelves: "/shelves",
  Vases: "/vases",
  "Wine Holders": "/wine-holders",
  Organisers: "/organisers",
  "Shoe Display Racks": "/shoe-display-racks",
};

const ALL_PRODUCTS: Product[] = [...shelves, ...vases, ...wineHolders, ...organisers, ...shoeRacks];

function WishlistCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { remove } = useWishlistNames();

  const href = `${CATEGORY_BASE_PATHS[product.category]}/${slugify(product.name)}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.images[0],
      href,
      variantId: product.shopify?.variantId,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    remove(product.name);
  };

  return (
    <Link href={href} className="group block cursor-pointer overflow-hidden bg-card">
      <div className="relative aspect-3/4 overflow-hidden bg-white">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-smoked-bronze shadow-md transition-colors duration-200 hover:bg-mulled-iron hover:text-white"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex flex-col gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
        <div className="min-w-0">
          <p className="mb-1 truncate text-[10px] uppercase tracking-widest text-sandcast font-space-mono sm:text-xs">{product.category}</p>
          <h3 className="truncate text-smoked-bronze text-xs font-space-mono uppercase tracking-wide sm:text-sm">{product.name}</h3>
          <p className="mt-1 text-xs text-mulled-iron font-space-mono sm:text-sm">₹{product.price.toLocaleString("en-IN")}</p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className={`flex shrink-0 items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-widest font-space-mono transition-colors ${
            added ? "bg-slate-moss text-white" : "bg-mulled-iron text-white hover:bg-smoked-bronze"
          }`}
        >
          {added ? <Check size={13} /> : <ShoppingBag size={13} />}
          {added ? "Added" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}

export default function WishlistPage() {
  const { names } = useWishlistNames();
  const products = names
    .map((name) => ALL_PRODUCTS.find((p) => p.name === name))
    .filter((p): p is Product => Boolean(p));

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Your Selection</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">Wishlist</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Pieces you&apos;ve saved for later, all in one place.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-5 px-6 pb-28 text-center">
          <Heart size={32} className="text-sandcast" />
          <p className="text-sm text-slate-moss font-space-mono">Your wishlist is empty.</p>
          <Link
            href="/products"
            className="bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-6 pb-28 sm:grid-cols-3 md:gap-6 md:px-12 lg:grid-cols-4 lg:px-20">
          {products.map((product) => (
            <WishlistCard key={product.name} product={product} />
          ))}
        </div>
      )}

      <FooterSection />
    </main>
  );
}
