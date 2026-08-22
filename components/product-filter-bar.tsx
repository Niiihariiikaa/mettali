"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { ProductSliderCard } from "@/components/product-slider-card";
import { slugify, type Product } from "@/lib/products";

type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: Record<SortKey, string> = {
  default: "Sort: Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A to Z",
};

const GRID_COLS = [2, 3, 4] as const;
type GridCols = (typeof GRID_COLS)[number];

const GRID_COLS_CLASS: Record<GridCols, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

function GridIcon({ bars }: { bars: number }) {
  return (
    <span className="flex h-3.5 items-stretch gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} className="w-[3px] bg-current" />
      ))}
    </span>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border py-5 first:pt-0 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-xs uppercase tracking-widest text-mulled-iron font-space-mono"
      >
        {title}
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function ProductFilterBar({
  products,
  basePath,
  categoryBasePaths,
}: {
  products: Product[];
  basePath?: string;
  categoryBasePaths?: Record<string, string>;
}) {
  // On the all-products page we filter by category; on a single category
  // page we filter by the finer-grained `type` field (Wall-mounted, etc.)
  // when present — otherwise there's nothing meaningful to filter by.
  const filterKey: "category" | "type" = categoryBasePaths ? "category" : "type";

  const filterOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const v = filterKey === "category" ? p.category : p.type;
      if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [products, filterKey]);

  const colorOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of products) {
      for (const c of p.colors ?? []) map.set(c.name, c.hex);
    }
    return Array.from(map.entries());
  }, [products]);

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices, 0), max: Math.max(...prices, 0) };
  }, [products]);

  const [types, setTypes] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [priceMin, setPriceMin] = useState(priceBounds.min);
  const [priceMax, setPriceMax] = useState(priceBounds.max);
  const [sort, setSort] = useState<SortKey>("default");
  const [gridCols, setGridCols] = useState<GridCols>(3);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleSet = (set: Set<string>, setter: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      const typeVal = filterKey === "category" ? p.category : p.type;
      if (types.size > 0 && (!typeVal || !types.has(typeVal))) return false;
      if (p.price < priceMin || p.price > priceMax) return false;
      if (selectedColors.size > 0 && !(p.colors ?? []).some((c) => selectedColors.has(c.name))) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, types, priceMin, priceMax, selectedColors, sort, filterKey]);

  const getHref = (p: Product) => {
    const base = categoryBasePaths ? categoryBasePaths[p.category] : basePath;
    return `${base ?? ""}/${slugify(p.name)}`;
  };

  const filterPanel = (
    <>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm uppercase tracking-widest text-mulled-iron font-space-mono">Filter:</p>
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(false)}
          className="text-muted-foreground lg:hidden"
          aria-label="Close filters"
        >
          <X size={18} />
        </button>
      </div>

      {filterOptions.length > 1 && (
        <FilterSection title={filterKey === "category" ? "Categories" : "Types"}>
          <div className="flex flex-col gap-2.5">
            {filterOptions.map(([value, count]) => (
              <label key={value} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-moss font-space-mono">
                <input
                  type="checkbox"
                  checked={types.has(value)}
                  onChange={() => toggleSet(types, setTypes, value)}
                  className="h-4 w-4 accent-mulled-iron"
                />
                {value} <span className="text-xs text-sandcast">({count})</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {priceBounds.max > priceBounds.min && (
        <FilterSection title="Price">
          <div className="px-1">
            <div className="relative h-1 w-full">
              <div className="absolute inset-0 rounded-full bg-border" />
              <div
                className="absolute h-full rounded-full bg-mulled-iron"
                style={{
                  left: `${((priceMin - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                  right: `${100 - ((priceMax - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceMin}
                onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax))}
                className="qb-range pointer-events-none absolute inset-x-0 top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent"
              />
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceMax}
                onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))}
                className="qb-range pointer-events-none absolute inset-x-0 top-1/2 w-full -translate-y-1/2 appearance-none bg-transparent"
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex flex-1 items-center border border-border px-2.5 py-1.5">
                <span className="text-xs text-slate-moss font-space-mono">₹</span>
                <input
                  type="number"
                  value={priceMin}
                  min={priceBounds.min}
                  max={priceMax}
                  onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax))}
                  className="w-full bg-transparent px-1.5 py-0.5 text-xs text-foreground font-space-mono outline-none"
                />
              </div>
              <div className="flex flex-1 items-center border border-border px-2.5 py-1.5">
                <span className="text-xs text-slate-moss font-space-mono">₹</span>
                <input
                  type="number"
                  value={priceMax}
                  min={priceMin}
                  max={priceBounds.max}
                  onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))}
                  className="w-full bg-transparent px-1.5 py-0.5 text-xs text-foreground font-space-mono outline-none"
                />
              </div>
            </div>
          </div>
        </FilterSection>
      )}

      {colorOptions.length > 0 && (
        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2.5">
            {colorOptions.map(([name, hex]) => (
              <button
                key={name}
                type="button"
                title={name}
                aria-label={`Filter by ${name}`}
                onClick={() => toggleSet(selectedColors, setSelectedColors, name)}
                className={`h-7 w-7 shrink-0 rounded-full border transition-shadow ${
                  selectedColors.has(name) ? "ring-2 ring-mulled-iron ring-offset-2" : "border-border/60"
                }`}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </FilterSection>
      )}
    </>
  );

  return (
    <div>
      <style>{`
        .qb-range::-webkit-slider-thumb { -webkit-appearance: none; pointer-events: auto; height: 16px; width: 16px; border-radius: 9999px; background: var(--mulled-iron); border: 2px solid var(--raw-linen); box-shadow: 0 1px 4px rgba(0,0,0,0.3); cursor: pointer; }
        .qb-range::-moz-range-thumb { pointer-events: auto; height: 16px; width: 16px; border-radius: 9999px; background: var(--mulled-iron); border: 2px solid var(--raw-linen); box-shadow: 0 1px 4px rgba(0,0,0,0.3); cursor: pointer; }
        .qb-range::-webkit-slider-runnable-track { background: transparent; }
        .qb-range::-moz-range-track { background: transparent; }
      `}</style>

      <div className="flex flex-col gap-8 px-6 pb-28 md:px-12 lg:flex-row lg:px-20">
        {/* Mobile filter toggle */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 self-start border border-border px-4 py-2 text-xs uppercase tracking-widest text-slate-moss font-space-mono lg:hidden"
        >
          <SlidersHorizontal size={14} /> Filter
        </button>

        {/* Sidebar — desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">{filterPanel}</aside>

        {/* Sidebar — mobile drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-70 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs overflow-y-auto bg-background p-6 shadow-2xl">
              {filterPanel}
            </div>
          </div>
        )}

        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="hidden items-center gap-2 text-muted-foreground lg:flex">
              {GRID_COLS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setGridCols(n)}
                  aria-label={`Show ${n} columns`}
                  className={`flex h-8 w-8 items-center justify-center border transition-colors ${
                    gridCols === n ? "border-mulled-iron text-mulled-iron" : "border-border text-slate-moss hover:border-sandcast"
                  }`}
                >
                  <GridIcon bars={n} />
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-border bg-background px-3 py-2 text-xs uppercase tracking-widest text-slate-moss font-space-mono focus:outline-none"
              >
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <option key={key} value={key}>{SORT_LABELS[key]}</option>
                ))}
              </select>
              <p className="whitespace-nowrap text-xs uppercase tracking-widest text-slate-moss font-space-mono">
                {visible.length} Product{visible.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-3 md:gap-6 ${GRID_COLS_CLASS[gridCols]}`}>
            {visible.map((p) => (
              <ProductSliderCard key={p.name} {...p} href={getHref(p)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
