"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toSlug } from "@/lib/products";

interface ProductSliderCardProps {
  name: string;
  category: string;
  images: string[];
  description?: string;
  price?: number;
  dimensions?: string;
  type?: string;
}

function parseDims(dim?: string) {
  if (!dim) return null;
  const parts = dim.replace(/\s*cm\s*/i, "").split("×");
  if (parts.length !== 3) return null;
  return { w: parts[0].trim(), d: parts[1].trim(), h: parts[2].trim() };
}

export function ProductSliderCard({
  name, category, images, description, price, dimensions,
}: ProductSliderCardProps) {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const dims = parseDims(dimensions);
  const href = `/${toSlug(category)}/${toSlug(name)}`;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  return (
    <div className="group flex flex-col bg-white border border-[#e2ddd8] cursor-pointer"
      onClick={() => router.push(href)}
      style={{ fontFamily: "'Space Mono', monospace" }}>

      {/* ── Header — category + name ── */}
      <div className="px-4 pt-4 pb-3 border-b border-[#e2ddd8]">
        <p className="text-[9px] uppercase tracking-[0.28em] text-[#ad9e89] mb-1">
          {category}
        </p>
        <p className="text-sm font-bold uppercase tracking-wide text-[#2e1f14]">
          {name}
        </p>
      </div>

      {/* ── Image ── */}
      <div className="relative bg-white" style={{ aspectRatio: "4/3" }}>
        <div className="absolute inset-8">
          <Image
            src={images[current]}
            alt={name}
            fill
            className="object-contain transition-opacity duration-300"
          />
        </div>

        {/* Counter */}
        {images.length > 1 && (
          <span className="absolute top-3 right-3 text-[9px] text-[#ad9e89] tracking-widest">
            {current + 1}/{images.length}
          </span>
        )}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-white/90 hover:bg-white border border-[#e2ddd8] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <ChevronLeft size={14} className="text-[#584738]" />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-white/90 hover:bg-white border border-[#e2ddd8] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <ChevronRight size={14} className="text-[#584738]" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-[3px] rounded-full transition-all duration-200 ${
                  i === current ? "w-5 bg-[#584738]" : "w-[5px] bg-[#584738]/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── About + Measurements ── */}
      <div className="flex flex-1 border-t border-[#e2ddd8]">
        {/* About */}
        <div className="flex-1 px-4 py-4 border-r border-[#e2ddd8]">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#ad9e89] mb-2">About</p>
          {description && (
            <p className="text-[10px] text-[#716f57] leading-[1.75] line-clamp-4">
              {description}
            </p>
          )}
        </div>

        {/* Measurements */}
        <div className="w-[42%] px-4 py-4 shrink-0">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#ad9e89] mb-2">Measurements</p>
          {dims ? (
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <tbody>
                {[["W", dims.w], ["D", dims.d], ["H", dims.h]].map(([label, val]) => (
                  <tr key={label}>
                    <td className="text-[9px] text-[#ad9e89] uppercase tracking-widest pr-3 py-[2px]">{label}</td>
                    <td className="text-[10px] text-[#584738] text-right">{val} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-[10px] text-[#716f57]">{dimensions}</p>
          )}
        </div>
      </div>

      {/* ── Price bar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#e2ddd8]">
        {price ? (
          <p className="text-sm font-bold text-[#2e1f14]">
            ₹{price.toLocaleString("en-IN")}
          </p>
        ) : <span />}
        <p className="text-[9px] uppercase tracking-[0.28em] text-[#ad9e89]">Mettali.com</p>
      </div>
    </div>
  );
}
