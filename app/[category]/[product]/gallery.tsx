"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative bg-white border border-[#e2ddd8]" style={{ aspectRatio: "1/1" }}>
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-contain p-10"
          priority
        />
        {images.length > 1 && (
          <span className="absolute top-3 right-4 text-[9px] tracking-widest"
            style={{ fontFamily: "'Space Mono', monospace", color: "#ad9e89" }}>
            {active + 1}/{images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative shrink-0 w-16 h-16 border transition-colors"
              style={{ borderColor: i === active ? "#584738" : "#e2ddd8", background: "#fff" }}
            >
              <Image src={img} alt={`${name} view ${i + 1}`} fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
