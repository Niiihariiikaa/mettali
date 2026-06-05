"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const B = "/images/products-home";

const products = [
  {
    name: "Wine Stand",
    category: "Kitchen & Bar",
    images: [`${B}/winestand1.png`, `${B}/winestand2.png`],
  },
  {
    name: "Minimal Vase",
    category: "Décor",
    images: [`${B}/vase1.png`, `${B}/vase2.png`, `${B}/vase3.png`],
  },
  {
    name: "Wine Vase",
    category: "Décor",
    images: [`${B}/wine-vase1.png`, `${B}/wine-vase2.png`, `${B}/wine-vase3.png`],
  },
  {
    name: "Triple Vase Set",
    category: "Décor",
    images: [`${B}/3vase1.png`, `${B}/3vase2.png`, `${B}/3vase3.png`],
  },
  {
    name: "Signature Vase",
    category: "Décor",
    images: [`${B}/signvase1.png`, `${B}/signvase2.png`, `${B}/signvase3.png`],
  },
  {
    name: "Duo Vase",
    category: "Décor",
    images: [`${B}/2vase1.png`, `${B}/2vase2.png`],
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
  const [currentIdx, setCurrentIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = () => {
    if (images.length <= 1) return;
    let idx = 1;
    setCurrentIdx(idx);
    intervalRef.current = setInterval(() => {
      idx = idx >= images.length - 1 ? 1 : idx + 1;
      setCurrentIdx(idx);
    }, 1200);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIdx(0);
  };

  return (
    <div
      className="group bg-card cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative aspect-3/4 bg-white overflow-hidden">
        <div className="absolute inset-6">
          <div className="relative w-full h-full">
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`${name} view ${i + 1}`}
                fill
                className={`object-contain transition-opacity duration-500 ${
                  i === currentIdx ? "opacity-100" : "opacity-0"
                } ${i > 0 ? "scale-[1.45]" : "scale-100"}`}
              />
            ))}
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
          Our Products
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
