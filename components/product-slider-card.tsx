"use client";

import Image from "next/image";
import Link from "next/link";
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
  href?: string;
}

<<<<<<< HEAD
function parseDims(dim?: string) {
  if (!dim) return null;
  const parts = dim.replace(/\s*cm\s*/i, "").split("×");
  if (parts.length !== 3) return null;
  return { w: parts[0].trim(), d: parts[1].trim(), h: parts[2].trim() };
}

export function ProductSliderCard({
  name, category, images, description, price, dimensions,
}: ProductSliderCardProps) {
=======
export function ProductSliderCard({ name, category, images, description, price, dimensions, type, href }: ProductSliderCardProps) {
>>>>>>> 0cb8637990ab5792902a5b6928294c294db0e2d5
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const dims = parseDims(dimensions);
  const href = `/${toSlug(category)}/${toSlug(name)}`;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

<<<<<<< HEAD
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
=======
  const dimValues = dimensions?.replace(/\s*cm$/i, "").split("×").map((d) => d.trim());
  const dimLabels = ["W", "D", "H"];

  const cardContent = (
    <div className="overflow-hidden border border-border bg-card divide-y divide-border shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 group">
      {/* Name row */}
      <div className="px-4 py-3">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-sandcast font-space-mono">
          {type ?? category}
        </p>
        <h3 className="text-smoked-bronze text-sm font-space-mono uppercase tracking-wide">{name}</h3>
      </div>

      {/* Image area */}
      <div className="relative aspect-square bg-white overflow-hidden">
        <div className="absolute inset-6">
          <div className="relative h-full w-full">
            <Image
              src={images[current]}
              alt={name}
              fill
              className="object-contain transition-opacity duration-300"
            />
          </div>
>>>>>>> 0cb8637990ab5792902a5b6928294c294db0e2d5
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
<<<<<<< HEAD
              <button key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-[3px] rounded-full transition-all duration-200 ${
                  i === current ? "w-5 bg-[#584738]" : "w-[5px] bg-[#584738]/25"
=======
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? "w-4 bg-smoked-bronze" : "w-1.5 bg-smoked-bronze/30"
>>>>>>> 0cb8637990ab5792902a5b6928294c294db0e2d5
                }`}
              />
            ))}
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* ── About + Measurements ── */}
      <div className="flex flex-1 border-t border-[#e2ddd8]">
        {/* About */}
        <div className="flex-1 px-4 py-4 border-r border-[#e2ddd8]">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#ad9e89] mb-2">About</p>
          {description && (
            <p className="text-[10px] text-[#716f57] leading-[1.75] line-clamp-4">
=======
      {/* About / Measurements row */}
      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="px-4 py-4">
          <h5 className="mb-1.5 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">About</h5>
          {description && (
            <p className="text-[11px] leading-relaxed text-slate-moss font-space-mono line-clamp-3">
>>>>>>> 0cb8637990ab5792902a5b6928294c294db0e2d5
              {description}
            </p>
          )}
        </div>
<<<<<<< HEAD

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
=======
        <div className="px-4 py-4">
          <h5 className="mb-1.5 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono">Measurements</h5>
          {dimValues && (
            <div className="space-y-0.5">
              {dimValues.map((d, i) => (
                <p key={i} className="flex max-w-[100px] justify-between text-[11px] text-slate-moss font-space-mono">
                  <span>{dimLabels[i] ?? ""}</span>
                  <span>{d} cm</span>
                </p>
              ))}
            </div>
          )}
        </div>
>>>>>>> 0cb8637990ab5792902a5b6928294c294db0e2d5
      </div>

      {/* Price strip */}
      {price !== undefined && (
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-base font-semibold text-smoked-bronze font-space-mono">
            ₹{price.toLocaleString("en-IN")}
          </p>
          <p className="text-[9px] uppercase tracking-widest text-sandcast font-space-mono">Mettali.com</p>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
