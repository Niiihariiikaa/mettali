"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

type Dot = {
  name: string;
  price: string;
  href: string;
  dot: { left: string; top: string };
  popup: { left: string; top: string };
};

type Panel = {
  image: string;
  alt: string;
  dots: Dot[];
};

const panels: Panel[] = [
  {
    image: "/images/quickbuy1.png",
    alt: "Mettali products in a styled scene",
    dots: [
      {
        name: "Display Shelf",
        price: "From ₹4,999",
        href: "/shelves",
        dot: { left: "35%", top: "50%" },
        popup: { left: "5%", top: "22%" },
      },
      {
        name: "Sculptural Vase",
        price: "From ₹2,499",
        href: "/vases",
        dot: { left: "70%", top: "62%" },
        popup: { left: "38%", top: "22%" },
      },
    ],
  },
  {
    image: "/images/quickbuy2.png",
    alt: "Mettali wine vase",
    dots: [
      {
        name: "Wine Vase",
        price: "From ₹2,499",
        href: "/vases",
        dot: { left: "48%", top: "52%" },
        popup: { left: "5%", top: "20%" },
      },
    ],
  },
  {
    image: "/images/quickbuy3.png",
    alt: "Mettali vase collection",
    dots: [
      {
        name: "Minimal Vase",
        price: "From ₹1,999",
        href: "/vases",
        dot: { left: "38%", top: "50%" },
        popup: { left: "5%", top: "22%" },
      },
    ],
  },
];

export function QuickBuySection() {
  // activeKey = "panelIdx-dotIdx" or null
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const toggle = (key: string) => setActiveKey(prev => prev === key ? null : key);

  return (
    <section id="gallery" className="flex h-screen">
      {panels.map((panel, pi) => (
        <div key={pi} className="relative flex-1 overflow-hidden">
          {/* Background image */}
          <Image
            src={panel.image}
            alt={panel.alt}
            fill
            className="object-cover"
            priority={pi === 0}
          />

          {/* Dots */}
          {panel.dots.map((dot, di) => {
            const key = `${pi}-${di}`;
            const isOpen = activeKey === key;

            return (
              <div key={di}>
                {/* Dot button */}
                <button
                  onClick={() => toggle(key)}
                  style={{ left: dot.dot.left, top: dot.dot.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-10"
                  aria-label={`Quick view ${dot.name}`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                </button>

                {/* Popup card */}
                {isOpen && (
                  <div
                    style={{ left: dot.popup.left, top: dot.popup.top }}
                    className="absolute bg-white rounded-2xl p-4 shadow-2xl w-64 z-20 animate-scale-in"
                  >
                    <button
                      onClick={() => setActiveKey(null)}
                      className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Close"
                    >
                      <X size={14} />
                    </button>

                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                        <Image
                          src={panel.image}
                          alt={dot.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-smoked-bronze font-space-mono leading-tight">
                          {dot.name}
                        </p>
                        <p className="text-[11px] text-sandcast font-space-mono mt-1">
                          {dot.price}
                        </p>
                        <Link
                          href={dot.href}
                          className="text-[11px] text-smoked-bronze underline underline-offset-2 hover:text-mulled-iron transition-colors mt-1.5 inline-block font-space-mono"
                        >
                          Quickshop
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
}
