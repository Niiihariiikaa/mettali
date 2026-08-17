"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { createCheckoutUrl } from "@/lib/shopify";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQty, subtotal, count, discountCode } =
    useCart();
  const [mounted, setMounted] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const checkoutItems = items.filter((i) => i.variantId);
  const hasFullCheckout = checkoutItems.length === items.length && items.length > 0;

  const handleCheckout = async () => {
    setCheckoutError("");
    setCheckingOut(true);
    try {
      const url = await createCheckoutUrl(
        checkoutItems.map((i) => ({
          variantId: i.variantId!,
          quantity: i.qty,
          attributes: i.color ? [{ key: "Color", value: i.color }] : undefined,
        })),
        discountCode ?? undefined
      );
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed. Please try again.");
      setCheckingOut(false);
    }
  };

  useEffect(() => setMounted(true), []);

  // Keep the page from scrolling behind the open drawer
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Portal to <body>: the header has a CSS transform, which would otherwise
  // make this fixed-position drawer render inside the header's box.
  return createPortal(
    <div className="fixed inset-0 z-[70]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={closeCart}
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background border-l border-border shadow-2xl">
        {/* Head */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-sm uppercase tracking-widest text-mulled-iron font-space-mono">
            Your Cart {count > 0 && `(${count})`}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-slate-moss transition-colors hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={32} className="text-sandcast" />
            <p className="text-sm text-slate-moss font-space-mono">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {items.map((item) => (
              <div key={`${item.name}-${item.color ?? ""}`} className="flex gap-4 px-6 py-5">
                <div className="relative h-20 w-20 shrink-0 border border-border bg-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
                        {item.category}
                      </p>
                      <h3 className="text-sm uppercase tracking-wide text-smoked-bronze font-space-mono">
                        {item.name}
                      </h3>
                      {item.color && (
                        <p className="mt-0.5 text-[10px] text-slate-moss font-space-mono">
                          Color: {item.color}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.name, item.color)}
                      aria-label={`Remove ${item.name}`}
                      className="text-slate-moss/60 transition-colors hover:text-destructive"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQty(item.name, item.qty - 1, item.color)}
                        aria-label="Decrease quantity"
                        className="px-2 py-1 text-slate-moss hover:text-foreground"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-7 text-center text-xs font-space-mono text-foreground">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.name, item.qty + 1, item.color)}
                        aria-label="Increase quantity"
                        className="px-2 py-1 text-slate-moss hover:text-foreground"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-smoked-bronze font-space-mono">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Foot */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-moss font-space-mono">
                Subtotal
              </span>
              <span className="text-base font-semibold text-smoked-bronze font-space-mono">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mb-4 text-center text-[11px] text-slate-moss font-space-mono">
              {discountCode ? (
                <>Code <span className="font-semibold text-smoked-bronze">{discountCode}</span> will be applied at checkout.</>
              ) : (
                <>Use code <span className="font-semibold text-smoked-bronze">WELCOME10</span> at checkout for 10% off your first order.</>
              )}
            </p>
            {checkoutError && (
              <p className="mb-2 text-center text-xs text-destructive font-space-mono">
                {checkoutError}
              </p>
            )}
            {checkoutItems.length > 0 ? (
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="block w-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-60"
              >
                {checkingOut ? "Redirecting…" : "Checkout →"}
              </button>
            ) : (
              <a
                href={`mailto:customise@mettali.in?subject=Order enquiry&body=${encodeURIComponent(
                  items
                    .map((i) => `${i.qty} × ${i.name} — ₹${i.price * i.qty}`)
                    .join("\n") + `\n\nSubtotal: ₹${subtotal}`
                )}`}
                className="block w-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                Enquire to Order
              </a>
            )}
            {!hasFullCheckout && checkoutItems.length > 0 && (
              <p className="mt-2 text-center text-[10px] text-slate-moss/70 font-space-mono">
                Some items aren&apos;t available for instant checkout yet — you can complete the rest and we&apos;ll follow up on those separately.
              </p>
            )}
          </div>
        )}
      </aside>
    </div>,
    document.body
  );
}
