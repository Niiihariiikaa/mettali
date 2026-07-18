"use client";

import Image from "next/image";
import { useState } from "react";

const B = "/images2/products-home";

const products = [
  {
    name: "Maison",
    category: "Wine holder",
    images: [`${B}/winestand1.webp`],
  },
  {
    name: "Minimal Vase",
    category: "Décor",
    images: [`${B}/vase1.webp`],
  },
  {
    name: "Wine Vase",
    category: "Décor",
    images: [`${B}/wine-vase1.webp`],
  },
  {
    name: "Triple Vase Set",
    category: "Décor",
    images: [`${B}/3vase1.webp`],
  },
  {
    name: "Signature Vase",
    category: "Décor",
    images: [`${B}/signvase1.webp`],
  },
  {
    name: "Duo Vase",
    category: "Décor",
    images: [`${B}/2vase1.webp`],
  },
];

function HoverProductCard({
  name,
  category,
  images,
}: {
  name: string;
  category: string;
  images: string[];
}) {
  const [hovered, setHovered] = useState(false);

  // Exactly one photo is rendered at a time: the second one while
  // hovering, the first otherwise — no crossfade, no stacked images.
  const showAlt = hovered && images.length > 1;
  const src = showAlt ? images[1] : images[0];

  return (
    <div
      className="group bg-card cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-3/4 bg-white overflow-hidden">
        <div className="absolute inset-6">
          <div className="relative w-full h-full">
            <Image
              key={src}
              src={src}
              alt={name}
              fill
              className={`object-contain ${showAlt ? "scale-[1.45]" : "scale-100"}`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5">
        <p className="mb-1 text-xs uppercase tracking-widest text-sandcast font-space-mono">
          {category}
        </p>
        <h3 className="text-smoked-bronze text-sm font-space-mono uppercase tracking-wide">
          {name}
        </h3>
      </div>
    </div>
  );
}

export function FeaturedProductsSection() {
  return (
    <section id="products-home" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-xl tracking-wide text-mulled-iron md:text-2xl lg:text-3xl font-horizon uppercase">
          The Mettali Standard.
          <br />
          Built for Every Room.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-xs uppercase tracking-widest text-slate-moss font-space-mono">
          Signature Products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {products.map((product) => (
          <HoverProductCard key={product.name} {...product} />
        ))}
      </div>

      <div className="pb-8" />
    </section>
  );
}
