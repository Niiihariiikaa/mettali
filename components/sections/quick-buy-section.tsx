"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

type Point = { left: string; top: string };

type Dot = {
  name: string;
  price: string;
  href: string;
  dot: { mobile: Point; desktop: Point };
  popup: { mobile: Point; desktop: Point };
};

type Panel = {
  image: string;
  alt: string;
  ratio: string;
  dots: Dot[];
};

const panels: Panel[] = [
  {
    image: "/products1_webp/products1/quick3.png",
    alt: "Mettali products in a styled scene",
    ratio: "1122 / 1402",
    dots: [
      {
        name: "LINEA",
        price: "From ₹2,100",
        href: "/organisers/linea-organiser",
        dot: { mobile: { left: "42%", top: "60%" }, desktop: { left: "30%", top: "50%" } },
        popup: { mobile: { left: "5%", top: "12%" }, desktop: { left: "5%", top: "22%" } },
      },
      {
        name: "CALA",
        price: "From ₹1,300",
        href: "/vases/cala-vase",
        dot: { mobile: { left: "80%", top: "75%" }, desktop: { left: "75%", top: "72%" } },
        popup: { mobile: { left: "38%", top: "12%" }, desktop: { left: "38%", top: "72%" } },
      },
    ],
  },
  {
    image: "/images/quick2.png",
    alt: "Mettali vase in a styled living room",
    ratio: "1024 / 1536",
    dots: [
      {
        name: "MAYA VASE",
        price: "From ₹1,600",
        href: "/vases/maya-vase",
        dot: { mobile: { left: "21%", top: "50%" }, desktop: { left: "21%", top: "72%" } },
        popup: { mobile: { left: "5%", top: "12%" }, desktop: { left: "5%", top: "38%" } },
      },
    ],
  },
  {
    image: "/images/quick3.png",
    alt: "Mettali wine holder in a styled living room",
    ratio: "1023 / 1537",
    dots: [
      {
        name: "CLINK",
        price: "From ₹3,499",
        href: "/wine-holders/clink",
        dot: { mobile: { left: "53%", top: "50%" }, desktop: { left: "53%", top: "58%" } },
        popup: { mobile: { left: "20%", top: "10%" }, desktop: { left: "20%", top: "10%" } },
      },
    ],
  },
];

// Renders a point as CSS custom properties; a small <style> block (below)
// switches --pos-left/--pos-top from the mobile values to the desktop
// values at the md breakpoint, so positioning needs no JS/media-query logic.
function posStyle(point: { mobile: Point; desktop: Point }): React.CSSProperties {
  return {
    left: point.mobile.left,
    top: point.mobile.top,
    ["--pos-left-desktop" as string]: point.desktop.left,
    ["--pos-top-desktop" as string]: point.desktop.top,
  };
}

export function QuickBuySection() {
  // activeKey = "panelIdx-dotIdx" or null
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const toggle = (key: string) => setActiveKey(prev => prev === key ? null : key);

  return (
    <section id="gallery" className="flex flex-col gap-3 bg-background p-3 md:flex-row md:gap-6 md:p-8">
      <style>{`
        @media (min-width: 768px) {
          .qb-pos { left: var(--pos-left-desktop) !important; top: var(--pos-top-desktop) !important; }
          .qb-panel-inner { aspect-ratio: 4 / 5 !important; }
        }
      `}</style>
      {panels.map((panel, pi) => (
        <div key={pi} className="rounded-2xl border border-smoked-bronze/15 bg-card p-2 md:flex-1 md:rounded-none md:border-0 md:bg-transparent md:p-0">
          <div
            className="qb-panel-inner relative overflow-hidden rounded-xl md:rounded-none"
            style={{ aspectRatio: panel.ratio }}
          >
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
                    style={posStyle(dot.dot)}
                    className="qb-pos absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-10"
                    aria-label={`Quick view ${dot.name}`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                  </button>

                  {/* Popup card */}
                  {isOpen && (
                    <div
                      style={posStyle(dot.popup)}
                      className="qb-pos absolute bg-white rounded-2xl p-4 shadow-2xl w-56 max-w-[80vw] sm:w-64 z-20 animate-scale-in"
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
        </div>
      ))}
    </section>
  );
}
