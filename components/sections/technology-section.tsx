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
    <p ref={containerRef} className="text-md leading-snug md:text-lg lg:text-2xl">
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
  { name: "Wine Stand",     category: "Kitchen & Bar", images: [`${B}/winestand1.png`, `${B}/winestand2.png`] },
  { name: "Minimal Vase",   category: "Décor",         images: [`${B}/vase1.png`, `${B}/vase2.png`, `${B}/vase3.png`] },
  { name: "Wine Vase",      category: "Décor",         images: [`${B}/wine-vase1.png`, `${B}/wine-vase2.png`, `${B}/wine-vase3.png`] },
  { name: "Triple Vase Set",category: "Décor",         images: [`${B}/3vase1.png`, `${B}/3vase2.png`, `${B}/3vase3.png`] },
  { name: "Signature Vase", category: "Décor",         images: [`${B}/signvase1.png`, `${B}/signvase2.png`, `${B}/signvase3.png`] },
  { name: "Duo Vase",       category: "Décor",         images: [`${B}/2vase1.png`, `${B}/2vase2.png`] },
];

function HoverProductCard({ name, category, images }: { name: string; category: string; images: string[] }) {
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
    <div className="group bg-card cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-white/70 font-space-mono">
            Limited Time Offer
          </p>
          <h2 className="font-horizon text-6xl uppercase text-white md:text-8xl">10% Off</h2>
          <p className="mt-4 text-sm uppercase tracking-widest text-white/70 font-space-mono">
            On All Signature Pieces
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
          <h2 className="text-xl tracking-wide text-mulled-iron md:text-2xl lg:text-3xl font-horizon uppercase">
            The Mettali Standard.
            <br />
            Built for Every Room.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-xs uppercase tracking-widest text-slate-moss font-space-mono">
            Signature Products
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
          {products.map((product) => (
            <HoverProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>

      {/* 3. At Mettali description */}
      <div className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
        <div className="mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
