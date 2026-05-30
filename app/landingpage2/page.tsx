"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Brand palette ──────────────────────────────
const RL = "#fffefc";  // Raw Linen
const SM = "#716f57";  // Slate Moss
const SC = "#ad9e89";  // Sandcast
const SB = "#584738";  // Smoked Bronze
const MI = "#49110b";  // Mulled Iron

// ── Font helpers ───────────────────────────────
const HORIZON         = "'Horizon', 'Arial Black', sans-serif";
const HORIZON_OUTLINE = "'Horizon Outlined', 'Arial Black', sans-serif";
const SPACE_MONO      = "'Space Mono', monospace";
const INTER      = "'Inter', sans-serif";

// ── Scroll-reveal hook ─────────────────────────
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const fadeUp = (v: boolean, delay = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
});
const fadeIn = (v: boolean, delay = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transition: `opacity 0.9s ease ${delay}s`,
});

export default function LandingPage2() {
  const about    = useReveal();
  const products = useReveal();
  const grid     = useReveal();
  const craft    = useReveal();
  const gallery  = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        @font-face {
          font-family: 'Horizon';
          src: url('/Horizon.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Horizon Outlined';
          src: url('/Horizon_Outlined.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .lp2-hide-scroll::-webkit-scrollbar { display: none; }
        .lp2-hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        a { text-decoration: none; }

        /* Hero entry animations */
        @keyframes lp2-up   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:none; } }
        @keyframes lp2-fade { from { opacity:0; } to { opacity:1; } }
        .lp2-h-label { animation: lp2-up   0.7s ease 0.2s  both; }
        .lp2-h-title { animation: lp2-up   1s   ease 0.35s both; }
        .lp2-h-sub   { animation: lp2-up   0.8s ease 0.85s both; }
        .lp2-h-img   { animation: lp2-fade 1.2s ease 0s    both; }

        /* Hover zoom on image wrappers */
        .lp2-zoom img { transition: transform 0.65s ease; }
        .lp2-zoom:hover img { transform: scale(1.04); }

        /* Hover underline link */
        .lp2-ul { border-bottom: 1px solid currentColor; padding-bottom: 2px; transition: opacity 0.2s; }
        .lp2-ul:hover { opacity: 0.5; }

        /* Nav link hover */
        .lp2-nav-a { transition: opacity 0.2s; }
        .lp2-nav-a:hover { opacity: 0.45; }

        /* Grid cell hover */
        .lp2-grid-cell { transition: background 0.3s ease; }
      `}</style>

      <main style={{ background: RL, color: SB, fontFamily: INTER, overflowX: "hidden" }}>

        {/* ─── HEADER ─────────────────────────────── */}
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 40px",
          background: `${RL}e6`, backdropFilter: "blur(12px)",
        }}>
          <Link href="/">
            <Image src="/images/logo.png" alt="Mettali" width={88} height={24}
              style={{ height: 22, width: "auto" }} />
          </Link>

          <nav style={{ display: "flex", gap: 36 }}>
            {["Home", "About", "Products", "Gallery", "Contact"].map(n => (
              <a key={n} href="#" className="lp2-nav-a"
                style={{ color: SB, fontSize: 10, textTransform: "uppercase",
                  letterSpacing: "0.18em", fontFamily: SPACE_MONO }}>
                {n}
              </a>
            ))}
          </nav>

          <a href="#" className="lp2-ul"
            style={{ color: SB, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em",
              fontFamily: SPACE_MONO, display: "flex", alignItems: "center", gap: 6 }}>
            Get Your Design &rsaquo;
          </a>
        </header>

        {/* ─── HERO ───────────────────────────────── */}
        <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

          {/* Full-bleed image */}
          <div className="lp2-h-img" style={{ position: "absolute", inset: 0 }}>
            <Image src="/images/lp2hero.png" alt="Mettali" fill
              style={{ objectFit: "cover", objectPosition: "55% 45%" }} priority />
            {/* subtle dark veil so white text reads */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
            {/* left edge fade to linen so text starts clean */}
            <div style={{ position: "absolute", inset: 0,
              background: `linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)` }} />
          </div>

          {/* Bottom-right: description + CTA */}
          <div className="lp2-h-sub" style={{
            position: "absolute", bottom: 52, right: 40,
            maxWidth: 210, textAlign: "right",
          }}>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 20 }}>
              Precision-crafted aluminium pieces that redefine every corner of your home.
            </p>
            <a href="#" style={{
              display: "inline-block", fontSize: 10, textTransform: "uppercase",
              letterSpacing: "0.18em", padding: "12px 28px", fontFamily: SPACE_MONO,
              background: "#ffffff", color: SB, fontWeight: 700,
              transition: "opacity 0.2s",
            }}>
              Get My Collection
            </a>
          </div>
        </section>

        {/* ─── AT METTALI ─────────────────────────── */}
        <section ref={about.ref as React.RefObject<HTMLElement>}
          style={{ padding: "100px 40px 80px", background: `${SC}14` }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

            {/* Left col */}
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 36 }}>
                <span style={{ ...fadeIn(about.visible, 0),
                  fontSize: 11, fontFamily: SPACE_MONO, color: SM,
                  textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 10 }}>
                  at
                </span>
                <h2 style={{ ...fadeUp(about.visible, 0.05),
                  fontSize: "clamp(44px, 7vw, 88px)", fontFamily: HORIZON,
                  lineHeight: 0.9, letterSpacing: "0.01em", textTransform: "uppercase",
                  color: SB, margin: 0, fontWeight: 400 }}>
                  METTALI,
                </h2>
              </div>

              <p style={{ ...fadeUp(about.visible, 0.15),
                fontSize: 13, lineHeight: 1.9, color: SC, maxWidth: 300, fontFamily: INTER }}>
                We believe aluminium is more than a material — it's a canvas.
                We precision-engineer each piece to inspire, function beautifully,
                and reflect the spaces people call home.
              </p>
            </div>

            {/* Right col — stats */}
            <div style={{ marginTop: 48 }}>
              {[
                { label: "years reimagining what aluminium can be in the home.", value: "4" },
                { label: "artisans who know their craft inside and out.", value: "20" },
                { label: "completed projects. Clients who trust our work.", value: "62" },
              ].map((s, i) => (
                <div key={i}
                  style={{ ...fadeUp(about.visible, 0.1 + i * 0.1),
                    display: "grid", gridTemplateColumns: "1fr auto",
                    gap: 24, alignItems: "flex-end",
                    paddingBottom: 24, marginBottom: 24,
                    borderBottom: `1px solid ${SC}40` }}>
                  <p style={{ fontSize: 11, lineHeight: 1.7, color: SM, maxWidth: 200,
                    fontFamily: SPACE_MONO }}>
                    {s.label}
                  </p>
                  <p style={{ fontSize: 60, fontWeight: 700, color: SB, lineHeight: 1,
                    letterSpacing: "-0.03em", fontFamily: HORIZON }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Two images side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginTop: 24 }}>
            <div className="lp2-zoom"
              style={{ ...fadeUp(about.visible, 0.3),
                position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              <Image src="/images/metalarcleft.png" alt="Mettali craft" fill
                style={{ objectFit: "cover" }} />
            </div>
            <div className="lp2-zoom"
              style={{ ...fadeUp(about.visible, 0.4),
                position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              <Image src="/images/metalarcright.png" alt="Mettali collection" fill
                style={{ objectFit: "cover" }} />
            </div>
          </div>
        </section>

        {/* ─── PRODUCTS ───────────────────────────── */}
        <section ref={products.ref as React.RefObject<HTMLElement>}
          style={{ padding: "60px 40px 80px", background: RL }}>

          <div style={{ display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", marginBottom: 40 }}>
            <div>
              <p style={{ fontSize: 10, textTransform: "uppercase",
                letterSpacing: "0.28em", color: SM, marginBottom: 10,
                fontFamily: SPACE_MONO }}>
                — Collection
              </p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontFamily: HORIZON_OUTLINE,
                textTransform: "uppercase", letterSpacing: "0.02em", color: SB,
                margin: 0, fontWeight: 400 }}>
                Featured Pieces
              </h2>
            </div>
            <a href="/" className="lp2-ul"
              style={{ fontSize: 10, textTransform: "uppercase",
                letterSpacing: "0.2em", color: SB, fontFamily: SPACE_MONO }}>
              View All
            </a>
          </div>

          {/* 4-col grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {[
              { src: "/images/product-flower-vase.png",          name: "Flower Vase Stand",    price: "$189"   },
              { src: "/images/product-vase.png",                 name: "Anodised Vase",         price: "$145"   },
              { src: "/images/product-bottle-stand.png",         name: "Bottle & Glass Stand",  price: "$215"   },
              { src: "/images/product-bottle-stand-rounded.png", name: "Curved Bottle Rack",    price: "$175"   },
            ].map((p, i) => (
              <div key={i} className="lp2-zoom" style={{ ...fadeUp(products.visible, i * 0.07) }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden",
                  background: `${SC}18`, marginBottom: 12 }}>
                  <Image src={p.src} alt={p.name} fill style={{ objectFit: "cover" }} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 500, color: SB, fontFamily: INTER }}>{p.name}</p>
                <p style={{ fontSize: 11, color: SC, marginTop: 4, fontFamily: SPACE_MONO }}>{p.price}</p>
              </div>
            ))}
          </div>

          {/* 3-col second row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 14 }}>
            {[
              { src: "/images/product-shoe-rack.png",  name: "Frame Shoe Rack",   price: "$1,299" },
              { src: "/images/product-book-shelf.png", name: "Arc Display Shelf", price: "$1,899" },
            ].map((p, i) => (
              <div key={i} className="lp2-zoom" style={{ ...fadeUp(products.visible, 0.3 + i * 0.07) }}>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden",
                  background: `${SC}18`, marginBottom: 12 }}>
                  <Image src={p.src} alt={p.name} fill style={{ objectFit: "cover" }} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 500, color: SB, fontFamily: INTER }}>{p.name}</p>
                <p style={{ fontSize: 11, color: SC, marginTop: 4, fontFamily: SPACE_MONO }}>{p.price}</p>
              </div>
            ))}

            {/* Blank slot — coming soon */}
            <div style={{ ...fadeUp(products.visible, 0.44) }}>
              <div style={{
                aspectRatio: "4/3", background: `${SC}22`,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 8, marginBottom: 12,
                border: `1px dashed ${SC}60`,
              }}>
                <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.3em",
                  color: SM, fontFamily: SPACE_MONO }}>Coming Soon</p>
              </div>
              <p style={{ fontSize: 12, fontWeight: 500, color: `${SB}44`, fontFamily: INTER }}>New Piece</p>
              <p style={{ fontSize: 11, color: `${SC}66`, marginTop: 4, fontFamily: SPACE_MONO }}>—</p>
            </div>
          </div>
        </section>

        {/* ─── MATERIAL GRID ──────────────────────── */}
        <section ref={grid.ref as React.RefObject<HTMLElement>}
          style={{ borderTop: `1px solid ${SC}40`, borderBottom: `1px solid ${SC}40` }}>

          {/* Top label bar */}
          <div style={{ background: SM, padding: "12px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 9, fontFamily: SPACE_MONO, textTransform: "uppercase",
              letterSpacing: "0.3em", color: `${RL}99`, margin: 0 }}>
              — Why Aluminium
            </p>
            <p style={{ fontSize: 9, fontFamily: SPACE_MONO, textTransform: "uppercase",
              letterSpacing: "0.3em", color: `${RL}66`, margin: 0 }}>
              Material Standards
            </p>
          </div>

          {/* 4-col attribute grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[
              { n: "01", title: "Aircraft-Grade Alloy", desc: "The same alloy used in aerospace — impossibly strong, weighing almost nothing.", bg: `${SC}28`, border: SC },
              { n: "02", title: "Powder-Coat Finish",   desc: "Electrostatic-applied finish that resists chips, scratches, and UV fade.", bg: SM,        border: SM, light: true },
              { n: "03", title: "Precision Cast Form",  desc: "Every curve is die-cast to tolerance — not fabricated, not approximate.", bg: `${SC}18`, border: SC },
              { n: "04", title: "Fully Recyclable",     desc: "100% recyclable at end of life. Aluminium is perpetually renewable.", bg: `${SM}cc`,    border: SM, light: true },
            ].map((cell, i) => (
              <div key={i} className="lp2-grid-cell"
                style={{ ...fadeUp(grid.visible, i * 0.08),
                  background: cell.bg,
                  borderRight: i < 3 ? `1px solid ${cell.border}55` : "none",
                  padding: "44px 32px 40px" }}>
                <p style={{ fontSize: 9, fontFamily: SPACE_MONO, letterSpacing: "0.25em",
                  color: cell.light ? `${RL}80` : `${SM}99`, marginBottom: 28 }}>
                  {cell.n}
                </p>
                <h3 style={{ fontSize: "clamp(15px, 1.4vw, 19px)", fontFamily: HORIZON,
                  textTransform: "uppercase", letterSpacing: "0.04em",
                  color: cell.light ? RL : SB,
                  fontWeight: 400, lineHeight: 1.15, marginBottom: 16 }}>
                  {cell.title}
                </h3>
                <p style={{ fontSize: 11, lineHeight: 1.8, fontFamily: INTER,
                  color: cell.light ? `${RL}bb` : SC }}>
                  {cell.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom specs strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: `1px solid ${SC}40`, background: `${SC}0d` }}>
            {[
              { label: "Material",  value: "Aluminium Alloy" },
              { label: "Warranty",  value: "10 Years"        },
              { label: "Delivery",  value: "6 – 10 Weeks"    },
              { label: "Returns",   value: "30 Days"         },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "20px 32px",
                borderRight: i < 3 ? `1px solid ${SC}40` : "none",
                display: "flex", alignItems: "center", gap: 16 }}>
                <p style={{ fontSize: 9, fontFamily: SPACE_MONO, textTransform: "uppercase",
                  letterSpacing: "0.2em", color: SM, flexShrink: 0 }}>
                  {s.label}
                </p>
                <p style={{ fontSize: 12, fontFamily: SPACE_MONO, color: SB, fontWeight: 700 }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── STRENGTH MEETS BEAUTY ──────────────── */}
        <section ref={craft.ref as React.RefObject<HTMLElement>}>
          <div style={{ position: "relative", height: "75vh", overflow: "hidden" }}>
            <Image src="/images/strengthmeetsbeauty.png" alt="Strength meets beauty"
              fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: `${MI}b0` }} />
            <div style={{ position: "absolute", inset: 0, display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "0 40px" }}>
              <p style={{ ...fadeIn(craft.visible, 0.1),
                fontSize: 9, textTransform: "uppercase", letterSpacing: "0.38em",
                color: SC, marginBottom: 22, fontFamily: SPACE_MONO }}>
                — The Mettali Process
              </p>
              <h2 style={{ ...fadeUp(craft.visible, 0.2),
                fontSize: "clamp(48px, 10vw, 128px)", fontFamily: HORIZON_OUTLINE,
                textTransform: "uppercase", lineHeight: 0.86,
                letterSpacing: "0.02em", color: RL, margin: 0, fontWeight: 400 }}>
                STRENGTH<br />MEETS<br />BEAUTY.
              </h2>
              <p style={{ ...fadeIn(craft.visible, 0.45),
                fontSize: 12, lineHeight: 1.85, color: `${RL}bb`,
                maxWidth: 360, marginTop: 32, fontFamily: INTER }}>
                Raw aluminium. Expert hands. Precision finishing. Every Mettali piece
                follows the same uncompromising process.
              </p>
            </div>
          </div>

          {/* 3-image craft strip with labels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: SC }}>
            {[
              { src: "/images/ourcraft1.png", label: "Raw Material" },
              { src: "/images/ourcraft2.png", label: "Expert Craft" },
              { src: "/images/ourcraft3.png", label: "Finished Form" },
            ].map((item, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div className="lp2-zoom"
                  style={{ position: "relative", height: 300, overflow: "hidden" }}>
                  <Image src={item.src} alt={item.label} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "14px 20px", background: i === 1 ? SM : `${SC}cc`,
                  display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 9, fontFamily: SPACE_MONO, textTransform: "uppercase",
                    letterSpacing: "0.22em", color: i === 1 ? `${RL}cc` : SB, margin: 0 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 9, fontFamily: SPACE_MONO, color: i === 1 ? `${RL}55` : `${SB}55`,
                    margin: 0 }}>
                    0{i + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── GALLERY ────────────────────────────── */}
        <section ref={gallery.ref as React.RefObject<HTMLElement>} style={{ padding: "80px 0", background: `${SM}12` }}>
          <div style={{ display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", padding: "0 40px", marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em",
                color: SM, marginBottom: 10, fontFamily: SPACE_MONO }}>
                — Portfolio
              </p>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontFamily: HORIZON,
                textTransform: "uppercase", letterSpacing: "0.02em", color: SB,
                margin: 0, fontWeight: 400 }}>
                Spaces We Love
              </h2>
            </div>
            <a href="/" className="lp2-ul"
              style={{ fontSize: 10, textTransform: "uppercase",
                letterSpacing: "0.2em", color: SB, fontFamily: SPACE_MONO }}>
              Full Portfolio →
            </a>
          </div>

          <div className="lp2-hide-scroll"
            style={{ display: "flex", gap: 10, padding: "0 40px", overflowX: "auto" }}>
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className="lp2-zoom"
                style={{ ...fadeIn(gallery.visible, (n - 1) * 0.06),
                  position: "relative", flexShrink: 0, width: 256, height: 340, overflow: "hidden" }}>
                <Image src={`/images/decor${n}.png`} alt={`Gallery ${n}`}
                  fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA BANNER ─────────────────────────── */}
        <section style={{
          margin: "0 40px 80px", background: SM,
          padding: "56px 48px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: 32,
        }}>
          <div>
            <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.32em",
              color: `${SC}cc`, marginBottom: 16, fontFamily: SPACE_MONO }}>
              — Start your space
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", fontFamily: HORIZON,
              textTransform: "uppercase", letterSpacing: "0.02em", color: RL,
              lineHeight: 0.92, margin: 0, fontWeight: 400 }}>
              BRING METTALI<br />HOME TODAY.
            </h2>
          </div>
          <a href="/" style={{
            display: "inline-block", fontSize: 10, textTransform: "uppercase",
            letterSpacing: "0.2em", padding: "15px 36px", fontFamily: SPACE_MONO,
            background: RL, color: SM, fontWeight: 700, transition: "opacity 0.2s",
          }}>
            Shop the Collection →
          </a>
        </section>

        {/* ─── FOOTER ─────────────────────────────── */}
        <footer style={{ padding: "48px 40px", borderTop: `1px solid ${SC}38` }}>
          <div style={{ display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", gap: 40, marginBottom: 40 }}>
            <div>
              <Image src="/images/logo.png" alt="Mettali" width={88} height={22}
                style={{ height: 22, width: "auto", display: "block", marginBottom: 16 }} />
              <p style={{ fontSize: 12, lineHeight: 1.75, color: SC, maxWidth: 240, fontFamily: INTER }}>
                Premium aluminium furniture and home decor for modern living.
                Where industrial strength meets refined elegance.
              </p>
            </div>
            <div style={{ display: "flex", gap: 56 }}>
              {[
                { heading: "Explore", links: ["Products", "About", "Gallery", "Process"] },
                { heading: "Follow",  links: ["Instagram", "Pinterest", "LinkedIn"]      },
              ].map(col => (
                <div key={col.heading}>
                  <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.22em",
                    color: SB, fontFamily: SPACE_MONO, marginBottom: 16 }}>{col.heading}</p>
                  {col.links.map(l => (
                    <a key={l} href="#" className="lp2-nav-a"
                      style={{ display: "block", fontSize: 11, color: SC,
                        marginBottom: 10, fontFamily: INTER }}>{l}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: 20, borderTop: `1px solid ${SC}38` }}>
            <p style={{ fontSize: 10, color: SC, fontFamily: SPACE_MONO }}>
              © 2026 Mettali. All rights reserved.
            </p>
            <Link href="/" className="lp2-nav-a"
              style={{ fontSize: 10, textTransform: "uppercase",
                letterSpacing: "0.15em", color: SB, fontFamily: SPACE_MONO }}>
              ← Back to Main Site
            </Link>
          </div>
        </footer>

      </main>
    </>
  );
}
