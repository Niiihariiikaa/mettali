"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sideImages = [
  {
    src: "/images/heroa.png",
    alt: "Mettali aluminium furniture in a modern space",
    position: "left",
    span: 1,
  },
  {
    src: "/images/herob.png",
    alt: "Mettali product showcase",
    position: "left",
    span: 1,
  },
  {
    src: "/images/heroc.png",
    alt: "Mettali aluminium home decor",
    position: "right",
    span: 1,
  },
  {
    src: "/images/herod.png",
    alt: "Mettali aluminium collection",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = taglineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTaglineVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations
  const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
  const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
  const sideWidth = imageProgress * 22; // 0% to 22%
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24; // 0px to 24px
  const gap = imageProgress * 16; // 0px to 16px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/Heromain5.png"
                alt="Mettali aluminium furniture in a sleek modern living space"
                fill
                className="object-cover"
                style={{ objectPosition: `${50 + imageProgress * 15}% 60%` }}
                priority
              />
            </div>

            {/* Full-screen text + grid overlay — fades out on scroll */}
            <div
              className="absolute inset-0 z-10 flex flex-col justify-between px-12 md:px-16 pt-28 pb-16 pointer-events-none"
              style={{
                opacity: textOpacity,
                background: "linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 15%, transparent 100%)",
              }}
            >
              {/* Left text block */}
              <div className="flex flex-col justify-center flex-1">
                <h1
                  className="font-space-mono text-white leading-none text-[clamp(2.8rem,5vw,4rem)] mb-8 animate-[slideUp_0.65s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: "0.12s" }}
                >
                  Metal<br />Crafted for<br />the Home.
                </h1>

                <p
                  className="text-sm text-white/55 font-space-mono leading-[1.9] mb-10 max-w-[280px] animate-[slideUp_0.72s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: "0.26s" }}
                >
                  Aluminium decor that brings<br />
                  calm, balance and character<br />
                  to your space.
                </p>

                <a
                  href="#products"
                  className="pointer-events-auto flex items-center gap-4 w-fit text-[11px] uppercase tracking-[0.35em] text-white font-space-mono border-b border-white/35 pb-1.5 hover:border-white transition-colors duration-200 group animate-[slideUp_0.78s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: "0.4s" }}
                >
                  Explore Collection
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>

              {/* Bottom spec grid */}
              <div className="border-t border-white/80 grid grid-cols-3">
                <div className="border-r border-white/80 py-5 pr-10">
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/35 font-space-mono mb-2">
                    Material
                  </p>
                  <p className="text-[11px] uppercase text-white/85 font-space-mono leading-[1.75]">
                    Premium Aluminium.<br />100% Recyclable.
                  </p>
                </div>

                <div className="border-r border-white/80 py-5 px-10">
                  <p className="text-[11px] uppercase tracking-widest text-white/35 font-space-mono mb-2">
                    Thoughtful Design
                  </p>
                  <p className="text-[10px] text-white/85 font-space-mono leading-[1.75]">
                    Clean forms.<br />Purposeful details.
                  </p>
                </div>

                <div className="py-5 pl-10">
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/35 font-space-mono mb-2">
                    Finish
                  </p>
                  <p className="text-[11px] uppercase text-white/85 font-space-mono leading-[1.75]">
                    Powder Coated for<br />Durability & Elegance.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Scroll space to enable animation */}
      <div className="h-screen" />

      {/* Tagline — slides up when it enters the viewport */}
      <div
        ref={taglineRef}
        className={`px-6 pb-8 pt-2 text-center transition-all duration-700 ease-out ${
          taglineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="mx-auto max-w-2xl text-xl leading-tight text-slate-moss md:text-2xl lg:text-3xl font-horizon uppercase tracking-wide">
          Metal that belongs
          <br />
          in every home.
        </p>
      </div>
    </section>
  );
}
