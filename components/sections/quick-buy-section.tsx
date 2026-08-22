"use client";

import Image from "next/image";
import { useState } from "react";
import { vases, wineHolders, organisers, type Product } from "@/lib/products";
import { QuickViewModal } from "@/components/quick-view-modal";

function findProduct(list: Product[], name: string): Product {
  const p = list.find((x) => x.name === name);
  if (!p) throw new Error(`Quick-buy product not found in catalog: ${name}`);
  return p;
}

type Point = { left: string; top: string };

type Dot = {
  label: string;
  product: Product;
  color: string;
  dot: { mobile: Point; desktop: Point };
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
        label: "LINEA",
        product: findProduct(organisers, "Linea Organiser"),
        color: "Moss Green",
        dot: { mobile: { left: "42%", top: "60%" }, desktop: { left: "30%", top: "50%" } },
      },
      {
        label: "CALA",
        product: findProduct(vases, "Cala Vase"),
        color: "Moss Green",
        dot: { mobile: { left: "80%", top: "75%" }, desktop: { left: "75%", top: "72%" } },
      },
    ],
  },
  {
    image: "/images/quick2.png",
    alt: "Mettali vase in a styled living room",
    ratio: "1024 / 1536",
    dots: [
      {
        label: "MAYA VASE",
        product: findProduct(vases, "Maya Vase"),
        color: "Ash Champagne",
        dot: { mobile: { left: "21%", top: "50%" }, desktop: { left: "21%", top: "72%" } },
      },
    ],
  },
  {
    image: "/images/quick3.png",
    alt: "Mettali wine holder in a styled living room",
    ratio: "1023 / 1537",
    dots: [
      {
        label: "CLINK",
        product: findProduct(wineHolders, "Clink"),
        color: "Black Onyx",
        dot: { mobile: { left: "53%", top: "50%" }, desktop: { left: "53%", top: "58%" } },
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
  const [quickView, setQuickView] = useState<{ product: Product; color: string } | null>(null);

  return (
    <section id="gallery" className="flex flex-col gap-3 bg-background p-3 md:flex-row md:gap-6 md:p-8">
      <style>{`
        @media (min-width: 768px) {
          .qb-pos { left: var(--pos-left-desktop) !important; top: var(--pos-top-desktop) !important; }
          .qb-panel-inner { aspect-ratio: 4 / 5 !important; }
        }
        @keyframes qb-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(88, 71, 56, 0.45); }
          100% { box-shadow: 0 0 0 10px rgba(88, 71, 56, 0); }
        }
        .animate-pulse-ring { animation: qb-pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite; }
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

            {/* Dots — each opens the quick-view modal for its product */}
            {panel.dots.map((dot, di) => (
              <button
                key={di}
                onClick={() => setQuickView({ product: dot.product, color: dot.color })}
                style={posStyle(dot.dot)}
                className="qb-pos animate-pulse-ring absolute -translate-x-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-smoked-bronze shadow-lg transition-transform duration-200 hover:scale-110"
                aria-label={`Quick view ${dot.label}`}
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <QuickViewModal
        product={quickView?.product ?? null}
        initialColor={quickView?.color}
        onClose={() => setQuickView(null)}
      />
    </section>
  );
}
