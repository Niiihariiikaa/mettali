"use client";

import { useEffect, useRef, useState } from "react";

const SB = "#584738"; // Smoked Bronze (revealed)
const SM = "#c4b8a8"; // dim start

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect  = ref.current.getBoundingClientRect();
      const vh    = window.innerHeight;
      const start = vh * 0.85;
      const end   = vh * 0.1;
      setProgress(Math.max(0, Math.min(1, (start - rect.top) / (start - end))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className="mt-6 leading-relaxed text-lg md:text-xl text-center max-w-3xl mx-auto font-space-mono">
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            color: progress > i / words.length ? SB : SM,
            transition: "color 0.18s ease",
          }}
        >
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

const philosophyText =
  "Every Mettali piece is precision-cast from aircraft-grade aluminium and hand-finished to perfection — furniture built to outlast every trend and elevate every room it enters.";

export function PhilosophySection() {
  return (
    <section id="products" className="bg-background">
      <div className="px-6 py-6 md:px-12 md:py-10 lg:px-20 lg:py-12 lg:pb-32">
        <div className="text-center">
          
          <ScrollRevealText text={philosophyText} />
        </div>
      </div>
    </section>
  );
}
