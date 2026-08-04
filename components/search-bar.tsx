"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { shelves, vases, wineHolders, organisers, shoeRacks, slugify } from "@/lib/products";

const CATEGORY_BASE_PATHS: Record<string, string> = {
  Shelves: "/shelves",
  Vases: "/vases",
  "Wine Holders": "/wine-holders",
  Organisers: "/organisers",
  "Shoe Display Racks": "/shoe-display-racks",
};

const SEARCH_INDEX = [...shelves, ...vases, ...wineHolders, ...organisers, ...shoeRacks].map((p) => ({
  name: p.name,
  category: p.category,
  type: p.type,
  price: p.price,
  image: p.images[0],
  href: `${CATEGORY_BASE_PATHS[p.category]}/${slugify(p.name)}`,
}));

export function SearchBar({
  open,
  onClose,
  onDark = false,
}: {
  open: boolean;
  onClose: () => void;
  onDark?: boolean;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // Wait for the slide-in transition so autofocus doesn't yank the
      // viewport (mobile keyboard) while the bar is still animating in.
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
    setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.type ?? "").toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  return (
    <div className="relative flex w-full items-center gap-3">
      <Search size={18} className={`shrink-0 ${onDark ? "text-white/70" : "text-muted-foreground"}`} />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products…"
        className={`w-full bg-transparent text-sm focus:outline-none font-space-mono ${
          onDark ? "text-white placeholder:text-white/50" : "text-foreground placeholder:text-muted-foreground"
        }`}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close search"
        className={`shrink-0 transition-colors ${onDark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
      >
        <X size={18} />
      </button>

      {open && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-3 max-h-[60vh] overflow-y-auto rounded-xl border border-border/40 bg-background shadow-lg z-50">
          {results.length === 0 ? (
            <p className="px-5 py-6 text-center text-sm text-muted-foreground font-space-mono">
              No products found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-widest text-sandcast font-space-mono">{p.category}</p>
                      <p className="truncate text-sm text-smoked-bronze font-space-mono">{p.name}</p>
                    </div>
                    <p className="shrink-0 text-sm text-mulled-iron font-space-mono">₹{p.price.toLocaleString("en-IN")}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-border px-5 py-3 text-center">
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={onClose}
              className="text-xs uppercase tracking-widest text-smoked-bronze underline underline-offset-2 font-space-mono"
            >
              View all results
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
