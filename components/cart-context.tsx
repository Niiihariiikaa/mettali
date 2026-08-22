"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  name: string;
  category: string;
  price: number;
  image: string;
  href?: string;
  variantId?: string;
  color?: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (name: string, color?: string) => void;
  setQty: (name: string, qty: number, color?: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  discountCode: string | null;
}

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "mettali-cart";
const DISCOUNT_STORAGE_KEY = "mettali-discount-code";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // corrupted storage — start with an empty cart
    }
    setLoaded(true);
  }, []);

  // Picks up a ?discount=CODE link (e.g. the homepage "10% Off" promo) and
  // remembers it in localStorage so it's still applied whenever the visitor
  // eventually checks out, even after browsing away from that link.
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("discount");
      if (fromUrl) {
        localStorage.setItem(DISCOUNT_STORAGE_KEY, fromUrl);
        setDiscountCode(fromUrl);
        const url = new URL(window.location.href);
        url.searchParams.delete("discount");
        window.history.replaceState({}, "", url.toString());
      } else {
        const stored = localStorage.getItem(DISCOUNT_STORAGE_KEY);
        if (stored) setDiscountCode(stored);
      }
    } catch {
      // storage/URL unavailable — no discount code carried over
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private mode / quota) — cart stays in memory
    }
  }, [items, loaded]);

  // Same product in a different color is a distinct line, so lines are
  // matched on name + color together rather than name alone.
  const sameLine = (a: { name: string; color?: string }, b: { name: string; color?: string }) =>
    a.name === b.name && (a.color ?? null) === (b.color ?? null);

  const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, item));
      if (existing) {
        return prev.map((i) =>
          sameLine(i, item) ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (name: string, color?: string) =>
    setItems((prev) => prev.filter((i) => !sameLine(i, { name, color })));

  const setQty = (name: string, qty: number, color?: string) => {
    if (qty < 1) return removeItem(name, color);
    setItems((prev) => prev.map((i) => (sameLine(i, { name, color }) ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
    }),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        setQty,
        clearCart,
        count,
        subtotal,
        discountCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
