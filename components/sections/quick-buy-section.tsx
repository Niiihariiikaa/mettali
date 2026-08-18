"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { vases, wineHolders, organisers, type Product } from "@/lib/products";
import { createCheckoutUrl } from "@/lib/shopify";

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
  // activeKey = "panelIdx-dotIdx" or null
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const toggle = (key: string) => setActiveKey(prev => prev === key ? null : key);

  const handleQuickshop = async (product: Product, color: string) => {
    if (!product.shopify?.variantId) return;
    setCheckoutError("");
    setCheckingOut(true);
    try {
      const url = await createCheckoutUrl([
        {
          variantId: product.shopify.variantId,
          quantity: 1,
          attributes: [{ key: "Color", value: color }],
        },
      ]);
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
      setCheckingOut(false);
    }
  };

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
                    className={`qb-pos absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-smoked-bronze flex items-center justify-center shadow-lg transition-transform duration-200 z-10 hover:scale-110 ${
                      isOpen ? "" : "animate-pulse-ring"
                    }`}
                    aria-label={`Quick view ${dot.label}`}
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                  </button>

                  {/* Popup card — anchored to the same point as the dot, centered directly above it */}
                  {isOpen && (
                    <div
                      style={posStyle(dot.dot)}
                      className="qb-pos absolute -translate-x-1/2 -translate-y-[calc(100%+16px)] bg-white rounded-2xl p-4 shadow-2xl w-56 max-w-[80vw] sm:w-64 z-20 animate-scale-in"
                    >
                      {/* Tail connecting the card down toward the pin */}
                      <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />

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
                            src={dot.product.images[0]}
                            alt={dot.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-smoked-bronze font-space-mono leading-tight">
                            {dot.label}
                          </p>
                          <p className="text-[11px] text-sandcast font-space-mono mt-1">
                            From ₹{dot.product.price.toLocaleString("en-IN")}
                          </p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span
                              className="h-3 w-3 shrink-0 rounded-full border border-border/60"
                              style={{ backgroundColor: dot.product.colors?.find((c) => c.name === dot.color)?.hex }}
                            />
                            <span className="text-[10px] text-slate-moss font-space-mono">{dot.color}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleQuickshop(dot.product, dot.color)}
                            disabled={checkingOut}
                            className="text-[11px] text-smoked-bronze underline underline-offset-2 hover:text-mulled-iron transition-colors mt-1.5 inline-block font-space-mono disabled:opacity-60"
                          >
                            {checkingOut ? "Redirecting…" : "Quickshop"}
                          </button>
                        </div>
                      </div>
                      {checkoutError && (
                        <p className="mt-2 text-[10px] text-destructive font-space-mono">{checkoutError}</p>
                      )}
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
