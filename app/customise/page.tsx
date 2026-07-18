"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Assets ────────────────────────────────────────────
const BG_IMAGE = "/images/customisation/image.png";
const FRONT_VIDEO = "/images/customisation/Generate_video_from_image_202607182343.mp4";

// ── Brand tokens ──────────────────────────────────────
const DK = "#2e1f14"; // deep bronze-black
const SC = "#ad9e89"; // Sandcast
const HORIZON = "'Horizon', sans-serif";
const HORIZON_OUTLINED = "'Horizon Outlined', sans-serif";

// Spotlight shape: narrower than tall — an elongated oval
const SPOT_W = 400;
const SPOT_H = 820;

const NAV_ITEMS = [
  { label: "Shelves", href: "/shelves" },
  { label: "Vases", href: "/vases" },
  { label: "Wine Holders", href: "/wine-holders" },
  { label: "Organisers", href: "/organisers" },
  { label: "About", href: "/about" },
];

export default function CustomisePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cursor spotlight reveal + grid parallax
  useEffect(() => {
    const section = sectionRef.current;
    const reveal = revealRef.current;
    const grid = gridRef.current;
    if (!section || !reveal || !grid) return;

    // Draw a circular reveal stamp once; mask-size stretches it into the
    // oval, and mask-position moves it with the cursor.
    const size = 520;
    const r = size / 2;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    // Large solid core with a tight feather so the reveal reads clearly
    // instead of blending into the background.
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.58, "rgba(255,255,255,1)");
    g.addColorStop(0.74, "rgba(255,255,255,0.8)");
    g.addColorStop(0.88, "rgba(255,255,255,0.3)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const maskUrl = `url(${canvas.toDataURL()})`;

    for (const prefix of ["-webkit-mask", "mask"]) {
      reveal.style.setProperty(`${prefix}-image`, maskUrl);
      reveal.style.setProperty(`${prefix}-repeat`, "no-repeat");
      reveal.style.setProperty(`${prefix}-size`, `${SPOT_W}px ${SPOT_H}px`);
    }

    // Start with the spotlight resting on the product so the effect
    // is visible before the first pointer move (and on touch devices).
    const target = {
      x: section.clientWidth * 0.5,
      y: section.clientHeight * 0.72,
    };
    const smooth = { ...target };
    const gridSmooth = { x: 0, y: 0 };

    const onMove = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      target.x = clientX - rect.left;
      target.y = clientY - rect.top;
    };
    const onMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });

    let raf = 0;
    const tick = () => {
      smooth.x += (target.x - smooth.x) * 0.1;
      smooth.y += (target.y - smooth.y) * 0.1;
      const pos = `${smooth.x - SPOT_W / 2}px ${smooth.y - SPOT_H / 2}px`;
      reveal.style.setProperty("-webkit-mask-position", pos);
      reveal.style.setProperty("mask-position", pos);

      const w = section.clientWidth || 1;
      const h = section.clientHeight || 1;
      const gx = ((target.x - w / 2) / w) * 16;
      const gy = ((target.y - h / 2) / h) * 16;
      gridSmooth.x += (gx - gridSmooth.x) * 0.06;
      gridSmooth.y += (gy - gridSmooth.y) * 0.06;
      grid.style.transform = `translate(${gridSmooth.x}px, ${gridSmooth.y}px)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden" style={{ background: DK }}>
      {/* ── Navigation (z-50) ─────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="flex items-center justify-between px-5 sm:px-8 py-5">
          <Link
            href="/"
            className="pointer-events-auto text-white text-lg sm:text-xl tracking-wide"
            style={{ fontFamily: HORIZON }}
          >
            METTALI
          </Link>

          {/* Desktop center pill nav */}
          <div className="pointer-events-auto liquid-glass hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full px-2 py-1.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/customization"
            className="pointer-events-auto liquid-glass hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: SC }} />
            Start Customising
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="pointer-events-auto liquid-glass flex flex-col items-end gap-1.5 rounded-full px-4 py-3.5 md:hidden"
          >
            <span className="h-[1.5px] w-5 bg-white" />
            <span className="h-[1.5px] w-3.5 bg-white" />
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu (z-55) ─────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col" style={{ background: DK }}>
          <div className="flex justify-end px-5 py-5">
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="liquid-glass menu-close-in relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span className="absolute h-[1.5px] w-5 rotate-45 bg-white" />
              <span className="absolute h-[1.5px] w-5 -rotate-45 bg-white" />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-7">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="menu-item-in text-3xl text-white/90 sm:text-4xl"
                style={{ fontFamily: HORIZON, animationDelay: `${100 + i * 60}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex justify-center pb-12">
            <Link
              href="/customization"
              onClick={() => setMenuOpen(false)}
              className="menu-item-in liquid-glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ animationDelay: `${100 + NAV_ITEMS.length * 60}ms` }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: SC }} />
              Start Customising
            </Link>
          </div>
        </div>
      )}

      {/* ── Hero (100vh) ──────────────────────────────── */}
      <section ref={sectionRef} className="grain-overlay relative h-screen w-full overflow-hidden">
        {/* Layer 2 — background image */}
        <div
          className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />

        {/* Layer 1(b) — parallax grid, blended over the image so it stays visible */}
        <div ref={gridRef} className="absolute -inset-10 z-[12] opacity-15 mix-blend-overlay pointer-events-none">
          <svg className="h-full w-full">
            <defs>
              <pattern id="customise-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke={SC} strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#customise-grid)" />
          </svg>
        </div>

        {/* Moody tint — darkens the scene toward the brand bronze-black */}
        <div
          className="pointer-events-none absolute inset-0 z-[15]"
          style={{
            background: `linear-gradient(to bottom,
              rgba(46,31,20,0.62) 0%,
              rgba(46,31,20,0.18) 38%,
              rgba(46,31,20,0.28) 70%,
              rgba(46,31,20,0.68) 100%)`,
          }}
        />

        {/* Hero text — above the spotlight so it stays fixed over the reveal */}
        <div className="pointer-events-none absolute inset-x-0 top-20 z-40 flex flex-col items-center px-4 sm:top-28 md:top-32">
          <h1
            className="whitespace-nowrap text-center uppercase leading-[0.9] text-white"
            style={{ fontFamily: HORIZON_OUTLINED, fontSize: "clamp(2.8rem, 10vw, 12rem)" }}
          >
            Customise
          </h1>
          <p
            className="mt-4 text-center uppercase text-white/80"
            style={{ fontFamily: HORIZON, fontSize: "clamp(0.9rem, 2.2vw, 1.6rem)", letterSpacing: "0.35em" }}
          >
            your Mettali
          </p>
        </div>

        {/* Edge vignette — above the reveal so the video blends into the
            scene's darkened corners instead of punching through them */}
        <div
          className="pointer-events-none absolute inset-0 z-[35]"
          style={{
            background: `radial-gradient(ellipse 90% 60% at 50% 42%,
              rgba(46,31,20,0) 0%,
              rgba(46,31,20,0) 62%,
              rgba(46,31,20,0.3) 100%)`,
          }}
        />

        {/* Layer 5 — cursor spotlight reveal */}
        <div ref={revealRef} className="pointer-events-none absolute inset-0 z-30">
          <video
            src={FRONT_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            style={{ filter: "brightness(1.09) contrast(1.07) saturate(1.05)" }}
          />
        </div>

        {/* Cursor hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-40 hidden justify-center md:flex">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            ( move your cursor )
          </span>
        </div>
      </section>

      <style>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        @keyframes menu-item-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .menu-item-in {
          opacity: 0;
          animation: menu-item-in 0.6s cubic-bezier(0.77, 0, 0.18, 1) forwards;
        }
        @keyframes menu-close-in {
          from { opacity: 0; transform: rotate(-90deg) scale(0.8); }
          to   { opacity: 1; transform: rotate(0deg) scale(1); }
        }
        .menu-close-in {
          animation: menu-close-in 0.5s cubic-bezier(0.77, 0, 0.18, 1) both;
        }
      `}</style>
    </main>
  );
}
