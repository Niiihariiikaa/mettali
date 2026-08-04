"use client";

import { useMemo, useState } from "react";
import { ProductSliderCard } from "@/components/product-slider-card";
import { slugify, type Product } from "@/lib/products";

type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: Record<SortKey, string> = {
  default: "Sort: Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A to Z",
};

export function ProductFilterBar({
  products,
  className,
  basePath,
  categoryBasePaths,
}: {
  products: Product[];
  className: string;
  basePath?: string;
  categoryBasePaths?: Record<string, string>;
}) {
  // On the all-products page we filter by category; on a single category
  // page we filter by the finer-grained `type` field (Wall-mounted, etc.)
  // when present — otherwise there's nothing meaningful to filter by.
  const filterKey: "category" | "type" = categoryBasePaths ? "category" : "type";

  const filterOptions = useMemo(() => {
    const values = new Set<string>();
    for (const p of products) {
      const v = filterKey === "category" ? p.category : p.type;
      if (v) values.add(v);
    }
    return Array.from(values).sort();
  }, [products, filterKey]);

  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const visible = useMemo(() => {
    let list = products;
    if (filter !== "all") {
      list = list.filter((p) => (filterKey === "category" ? p.category : p.type) === filter);
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, filter, sort, filterKey]);

  const getHref = (p: Product) => {
    const base = categoryBasePaths ? categoryBasePaths[p.category] : basePath;
    return `${base ?? ""}/${slugify(p.name)}`;
  };

  return (
    <div>
      {filterOptions.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 px-6 pb-10 md:px-12 lg:px-20">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-border bg-background px-3 py-2 text-xs uppercase tracking-widest text-slate-moss font-space-mono focus:outline-none"
          >
            <option value="all">All {filterKey === "category" ? "Categories" : "Types"}</option>
            {filterOptions.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-border bg-background px-3 py-2 text-xs uppercase tracking-widest text-slate-moss font-space-mono focus:outline-none"
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <option key={key} value={key}>{SORT_LABELS[key]}</option>
            ))}
          </select>
        </div>
      )}

      {filterOptions.length <= 1 && (
        <div className="flex items-center justify-center px-6 pb-10 md:px-12 lg:px-20">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-border bg-background px-3 py-2 text-xs uppercase tracking-widest text-slate-moss font-space-mono focus:outline-none"
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <option key={key} value={key}>{SORT_LABELS[key]}</option>
            ))}
          </select>
        </div>
      )}

      <div className={className}>
        {visible.map((p) => (
          <ProductSliderCard key={p.name} {...p} href={getHref(p)} />
        ))}
      </div>
    </div>
  );
}
