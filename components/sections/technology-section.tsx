"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart-context";

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

// ─── Hover product card ───────────────────────────────────────────────────────

const B = "/images2/products-home";

const products = [
  { name: "Maison",     category: "Wine holder", fit: "contain", images: [`${B}/winestand1.webp`, `${B}/winestand2.webp`] },
  { name: "Cala",      category: "Vase",         fit: "contain", images: [`${B}/wine-vase1.webp`, `${B}/wine-vase2.webp`, `${B}/wine-vase3.webp`] },
  { name: "Aura",category: "Vase",         fit: "contain", images: [`${B}/3vase1.webp`, `${B}/3vase2.webp`, `${B}/3vase3.webp`] },
  { name: "Align",      category: "Shoe display rack",       fit: "contain", images: [`${B}/alighnshoerack-4.png`, `${B}/shoerack2.webp`] },
];

function HoverProductCard({ name, category, images, fit }: { name: string; category: string; images: string[]; fit: string }) {
  const [hovered, setHovered] = useState(false);

  // Exactly one photo is rendered at a time: the second one while
  // hovering, the first otherwise — no cycling, no stacked images.
  const showAlt = hovered && images.length > 1;
  const src = showAlt ? images[1] : images[0];

  return (
    <div
      className="group bg-card cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-3/4 bg-white overflow-hidden isolate">
        {fit === "cover" ? (
          <Image key={src} src={src} alt={name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-3">
            <div className="relative w-full h-full">
              <Image key={src} src={src} alt={name} fill className="object-contain" />
            </div>
          </div>
        )}
      </div>
      <div className="px-5 py-5">
        <p className="mb-1 text-xs uppercase tracking-widest text-sandcast font-space-mono">{category}</p>
        <h3 className="text-smoked-bronze text-sm font-space-mono uppercase tracking-wide">{name}</h3>
      </div>
    </div>
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
      <div className="relative aspect-video overflow-hidden md:aspect-auto md:h-screen">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/images/strengthmeetsbeauty.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "rgba(88,71,56,0.35)" }} />
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
        <div className="grid grid-cols-2 gap-6 px-6 pb-6 md:grid-cols-4 md:px-12 lg:px-20">
          {products.map((product) => (
            <HoverProductCard key={product.name} name={product.name} category={product.category} images={product.images} fit={product.fit} />
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
