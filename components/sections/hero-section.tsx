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
                src="/images/Heromain3.png"
                alt="Mettali aluminium furniture in a sleek modern living space"
                fill
                className="object-cover"
                style={{ objectPosition: '50% 60%' }}
                priority
              />
              
              {/* Overlay Text - Fades out first */}
              <div
                className="absolute inset-0 flex items-end justify-between overflow-hidden px-10 pb-32"
                style={{ opacity: textOpacity }}
              >
                {/* Left — big headline */}
                <p
                  className="font-horizon uppercase text-white leading-[1.05] text-4xl md:text-5xl animate-[slideUp_0.65s_ease-out_forwards] opacity-0 max-w-[45%]"
                  style={{ animationDelay: '0.15s' }}
                >
                  Metal That<br />Belongs in<br />Every Home.
                </p>

                {/* Right — description + button */}
                <div
                  className="flex flex-col items-end text-right max-w-[40%] animate-[slideUp_0.75s_ease-out_forwards] opacity-0"
                  style={{ animationDelay: '0.3s' }}
                >
                  <p className="text-2xl text-white/75 font-space-mono tracking-wide mb-7 mr-4">
                    Discover premium aluminium décor,<br />furniture, and organizers crafted<br />for modern living.
                  </p>
                  <a
                    href="#products"
                    className="border border-white/70 px-8 py-3 text-xxl uppercase tracking-widest text-white font-space-mono hover:bg-white hover:text-smoked-bronze transition-colors duration-200 mr-7"
                  >
                    Shop Collection
                  </a>
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
