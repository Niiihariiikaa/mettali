"use client";

import Image from "next/image";

const specs = [
  { label: "Materials", value: "Aluminium Alloy" },
  { label: "Warranty", value: "10 Years" },
  { label: "Delivery", value: "6-10 Weeks" },
  { label: "Returns", value: "30 Days" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">
        
        
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-sandcast font-space-mono">
              {spec.label}
            </p>
            <p className="text-mulled-iron text-xl font-horizon uppercase">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Image */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src="/images/hero3.png"
          alt="Mettali aluminium — strength meets beauty"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 70%' }}
        />
      </div>
    </section>
  );
}
