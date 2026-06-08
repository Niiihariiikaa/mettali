"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Organizers",   src: "/images/categories/organisers.png", href: "/organisers" },
  { name: "Flower Vases", src: "/images/categories/vases.png",      href: "/vases"      },
  { name: "Wine Holders", src: "/images/categories/wine-racks.png", href: "/shoe-racks" },
  { name: "Bookshelves",  src: "/images/categories/shelves.png",    href: "/shelves"    },
  { name: "Shoe Racks",   src: "/images/categories/shoe-racks.png", href: "/shoe-racks" },
];

export function CategoriesSection() {
  return (
    <section className="bg-background px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-sandcast font-space-mono">
            Shop by Category
          </p>
          <h2 className="text-xl text-mulled-iron tracking-wide md:text-2xl font-horizon uppercase">
            Browse the Range
          </h2>
        </div>
        <a
          href="#"
          className="hidden text-xs uppercase tracking-widest text-slate-moss underline-offset-4 hover:opacity-60 transition-opacity md:block"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          View All
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="group cursor-pointer">
            <div className="relative mb-3 overflow-hidden rounded-xl" style={{ aspectRatio: "3/4" }}>
              <Image
                src={cat.src}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
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
