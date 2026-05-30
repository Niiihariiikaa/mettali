"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSliderCardProps {
  name: string;
  category: string;
  images: string[];
}

export function ProductSliderCard({ name, category, images }: ProductSliderCardProps) {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  return (
    <div className="group rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300 bg-card">
      {/* Image area */}
      <div className="relative aspect-[3/4] bg-white overflow-hidden">
        {/* Padded image container */}
        <div className="absolute inset-6">
          <div className="relative w-full h-full">
            <Image
              src={images[current]}
              alt={name}
              fill
              className="object-contain transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 bg-white/80 rounded-full px-2 py-0.5 text-[10px] text-slate-moss font-space-mono">
            {current + 1}/{images.length}
          </div>
        )}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm z-10"
            >
              <ChevronLeft size={16} className="text-smoked-bronze" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm z-10"
            >
              <ChevronRight size={16} className="text-smoked-bronze" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? "w-4 bg-smoked-bronze" : "w-1.5 bg-smoked-bronze/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="px-5 py-5">
        <p className="mb-1 text-xs uppercase tracking-widest text-sandcast font-space-mono">
          {category}
        </p>
        <h3 className="text-smoked-bronze text-sm font-space-mono uppercase tracking-wide">
          {name}
        </h3>
      </div>
    </div>
  );
}
