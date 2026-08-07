"use client";

import { Layers, Sparkles, Truck, ShieldCheck } from "lucide-react";

const specs = [
  { label: "Material", value: "Aluminium", icon: Layers },
  { label: "Craftsmanship", value: "Precision engineered", icon: Sparkles },
  { label: "Delivery", value: "7-10 days", icon: Truck },
  { label: "Quality", value: "Built to Last", icon: ShieldCheck },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Specs — icon list on mobile */}
      <div className="flex flex-col gap-14 border-t border-border px-8 py-16 md:hidden">
        {specs.map((spec) => (
          <div key={spec.label} className="flex items-start gap-6">
            <spec.icon size={32} className="mt-1 shrink-0 text-mulled-iron" strokeWidth={1.25} />
            <div>
              <p className="mb-2 text-base font-bold uppercase tracking-widest text-mulled-iron font-space-mono">
                {spec.label}
              </p>
              <p className="text-base leading-relaxed text-slate-moss font-space-mono">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Specs — centered grid on desktop */}
      <div className="hidden border-t border-border md:grid md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-r border-border p-8 text-center last:border-r-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-sandcast font-space-mono">
              {spec.label}
            </p>
            <p className="wrap-break-word text-xl text-mulled-iron font-horizon uppercase">
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
