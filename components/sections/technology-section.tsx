"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

const B = "/images/products-home";

const products = [
  { name: "Maison",     category: "Wine holder", fit: "contain", images: [`${B}/winestand1.png`, `${B}/winestand2.png`] },
  { name: "Cala",      category: "Vase",         fit: "contain", images: [`${B}/wine-vase1.png`, `${B}/wine-vase2.png`, `${B}/wine-vase3.png`] },
  { name: "Aura",category: "Vase",         fit: "contain", images: [`${B}/3vase1.png`, `${B}/3vase2.png`, `${B}/3vase3.png`] },
  { name: "Align",      category: "Shoe rack",       fit: "contain", images: [`${B}/shoerack1.png`, `${B}/shoerack2.png`, `${B}/shoerack3.png`] },
];

function HoverProductCard({ name, category, images, fit }: { name: string; category: string; images: string[]; fit: string }) {
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
    <div className="group bg-card cursor-pointer overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="relative aspect-3/4 bg-white overflow-hidden isolate">
        {fit === "cover" ? (
          images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${name} view ${i + 1}`}
              fill
              className={`transition-opacity duration-500 object-cover ${i === currentIdx ? "opacity-100" : "opacity-0"}`}
            />
          ))
        ) : (
          images.map((src, i) => (
            <div key={src} className={`absolute inset-3 transition-opacity duration-500 ${i === currentIdx ? "opacity-100" : "opacity-0"}`}>
              <div className="relative w-full h-full">
                <Image src={src} alt={`${name} view ${i + 1}`} fill className="object-contain" />
              </div>
            </div>
          ))
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
  const descriptionText =
    "At Mettali, raw aluminium is the starting point — not the shortcut. Every piece passes through precision forming, expert powder coating, and careful hand-finishing before it earns its place in your home. Durable enough to outlast trends, refined enough to define them.";

  return (
    <section>
      {/* 1. Video panel */}
      <div className="relative h-screen overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/images/strengthmeetsbeauty.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "rgba(88,71,56,0.35)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="font-horizon text-5xl uppercase text-white md:text-7xl">10% Off</h2>
          <p className="mt-5 text-sm uppercase tracking-[0.25em] text-white/75 font-space-mono">
            On Your First Purchase
          </p>
          <Link
            href="#reserve"
            className="mt-10 border border-white/60 px-8 py-3 text-xs uppercase tracking-widest text-white font-space-mono hover:bg-white hover:text-smoked-bronze transition-colors duration-200"
          >
            Shop Now
          </Link>
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
