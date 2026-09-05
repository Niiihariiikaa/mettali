"use client";

import Image from "next/image";
import Link from "next/link";
import { shelves, vases, wineHolders, organisers, shoeRacks } from "@/lib/products";

const categories = [
  { name: "Organizers",   src: "/images2/categories/organisers.webp", href: "/organisers",       count: organisers.length },
  { name: "Flower Vases", src: "/images2/categories/vases.webp",      href: "/vases",             count: vases.length,     zoom: true },
  { name: "Wine Holders", src: "/images2/categories/wine-racks.webp", href: "/wine-holders",      count: wineHolders.length },
  { name: "Shoe Display Racks",   src: "/images2/categories/shoe-racks.webp", href: "/shoe-display-racks", count: shoeRacks.length },
  { name: "Bookshelves",  src: "/images2/categories/shelves.webp",    href: "/shelves",           count: shelves.length },
];

export function CategoriesSection({
  showViewAll = true,
  heading = "Browse the Range",
}: {
  showViewAll?: boolean;
  heading?: string;
}) {
  return (
    <section className="bg-background px-6 py-10 md:px-12 md:py-20 lg:px-20 lg:py-24">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between md:mb-12">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-sandcast font-space-mono">
            Shop by Category
          </p>
          <h2 className="text-xl text-mulled-iron tracking-wide md:text-2xl font-horizon uppercase">
            {heading}
          </h2>
        </div>
        {showViewAll && (
          <Link
            href="/products"
            className="hidden text-xs uppercase tracking-widest text-slate-moss underline-offset-4 hover:opacity-60 transition-opacity md:block"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            View All
          </Link>
        )}
      </div>

      {/* Mobile: swipeable horizontal slider */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group w-[42vw] shrink-0 snap-start cursor-pointer"
          >
            <div className="relative mb-3 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 active:shadow-md" style={{ aspectRatio: "3/4" }}>
              <Image
                src={cat.src}
                alt={cat.name}
                fill
                className={`object-cover transition-transform duration-500 ease-out ${
                  cat.zoom ? "scale-110 -translate-y-4" : ""
                }`}
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 active:bg-foreground/8" />
            </div>
            <p className="text-center text-sm font-medium text-smoked-bronze" style={{ letterSpacing: "0.04em" }}>
              {cat.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="group cursor-pointer">
            <div className="relative mb-3 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 group-hover:shadow-lg" style={{ aspectRatio: "3/4" }}>
              <Image
                src={cat.src}
                alt={cat.name}
                fill
                className={`object-cover transition-transform duration-500 ease-out ${
                  cat.zoom
                    ? "scale-125 -translate-y-8 group-hover:scale-[1.31]"
                    : "group-hover:scale-[1.05]"
                }`}
              />
              {/* subtle hover veil */}
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/8" />
            </div>
            <p
              className="text-center text-sm font-medium text-smoked-bronze"
              style={{ letterSpacing: "0.04em" }}
            >
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
