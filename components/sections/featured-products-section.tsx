"use client";

import { FadeImage } from "@/components/fade-image";

const BASE = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const products = [
  {
    name: "Wall-Mounted Book Shelf",
    category: "Storage & Display",
    image: `${BASE}/Shelf%20art-2444.JPG`,
  },
  {
    name: "Slim Bottle Stand",
    category: "Kitchen & Bar",
    image: `${BASE}/Shelf%20art-2455.JPG`,
  },
  {
    name: "Rounded Bottle Stand",
    category: "Kitchen & Bar",
    image: `${BASE}/Shelf%20art-2466.JPG`,
  },
  {
    name: "Metal Flower Vase",
    category: "Décor",
    image: `${BASE}/Shelf%20art-2474.JPG`,
  },
  {
    name: "Modular Shoe Rack",
    category: "Entryway",
    image: `${BASE}/Shelf%20art-2479%20copy%202.jpg`,
  },
  {
    name: "Sculptural Vase",
    category: "Décor",
    image: `${BASE}/Shelf%20art-2442.JPG`,
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-xl tracking-wide text-mulled-iron md:text-2xl lg:text-3xl font-horizon uppercase">
          The Mettali Standard.
          <br />
          Built for Every Room.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-xs uppercase tracking-widest text-slate-moss font-space-mono">
          Our Products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {products.map((product) => (
          <div
            key={product.name}
            className="group rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 bg-card"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] bg-white">
              <div className="absolute inset-6">
                <div className="relative w-full h-full">
                  <FadeImage
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-5 py-5">
              <p className="mb-1 text-xs uppercase tracking-widest text-sandcast font-space-mono">
                {product.category}
              </p>
              <h3 className="text-smoked-bronze text-sm font-space-mono uppercase tracking-wide">
                {product.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20" />
    </section>
  );
}
