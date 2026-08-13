"use client";

import { useEffect, useRef, useState } from "react";

// ── Brand tokens ─────────────────────────────────────
const RL = "#fffefc";   // Raw Linen
const SC = "#ad9e89";   // Sandcast
const SB = "#584738";   // Smoked Bronze
const SM = "#716f57";   // Slate Moss
const SPACE_MONO = "'Space Mono', monospace";

const descriptionText =
  "At Mettali, raw aluminium is the starting point — not the shortcut. Every piece passes through precision forming, expert powder coating, and careful hand-finishing before it earns its place in your home. Durable enough to outlast trends, refined enough to define them.";

// ── Word-by-word scroll reveal ───────────────────────
function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect  = ref.current.getBoundingClientRect();
      const vh    = window.innerHeight;
      const start = vh * 0.9;
      const end   = vh * 0.1;
      setProgress(Math.max(0, Math.min(1, (start - rect.top) / (start - end))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} style={{
      fontFamily: SPACE_MONO,
      fontSize: "clamp(16px, 2.2vw, 26px)",
      lineHeight: 1.7,
      margin: 0,
    }}>
      {words.map((word, i) => (
        <span key={i} style={{
          color: progress > i / words.length ? SB : SC,
          transition: "color 0.15s",
        }}>
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

export function Hero2Section() {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const hasScrolled = useRef(false);
  const [scrollP, setScrollP] = useState(0);
  const [textOp,  setTextOp]  = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const p  = Math.max(0, Math.min(1, window.scrollY / vh));
      setScrollP(p);
      setTextOp(Math.max(0, 1 - p / 0.25));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const videoScale  = 1 - scrollP * 0.13;
  const videoRadius = scrollP * 28;
  const videoTransY = -scrollP * 52;
  const videoShadow = `0 ${scrollP * 48}px ${scrollP * 96}px rgba(0,0,0,${scrollP * 0.55})`;
  const headerBg    = Math.min(0.94, scrollP * 5);
  const navColor    = scrollP > 0.15 ? SB : "rgba(255,255,255,0.82)";

  return (
    <>
      <style>{`
        @keyframes h2s-up   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:none; } }
        @keyframes h2s-fade { from { opacity:0; } to { opacity:1; } }
        @keyframes h2s-line { from { height:0; } to { height:44px; } }

        .h2s-label { animation: h2s-up   0.65s cubic-bezier(0.16,1,0.3,1) 0.2s  both; }
        .h2s-title { animation: h2s-up   0.9s  cubic-bezier(0.16,1,0.3,1) 0.38s both; }
        .h2s-sub   { animation: h2s-up   0.7s  cubic-bezier(0.16,1,0.3,1) 0.72s both; }
        .h2s-scr   { animation: h2s-fade 1.1s  ease 1.1s  both; }
        .h2s-line  { animation: h2s-line 1.2s  ease 1.5s  both; width:1px; background:rgba(255,255,255,0.45); }

        .h2s-nav-link { position:relative; transition: color 0.3s; }
        .h2s-nav-link::after {
          content:''; position:absolute; left:0; bottom:-2px;
          width:0; height:1px; background:currentColor; transition:width 0.25s;
        }
        .h2s-nav-link:hover::after { width:100%; }

        .h2s-cta {
          transition: background 0.3s, color 0.3s, border-color 0.3s,
                      transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .h2s-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }

        /* Zoom in slightly and anchor to the top-left on mobile so the crop comes off the bottom and right */
        @media (max-width: 767px) {
          .h2s-video { transform: scale(1.15); transform-origin: top left; }
        }
      `}</style>

      

      {/* ── HERO — VIDEO CARD ZOOM-OUT ───────────────── */}
      <div style={{ height: "100vh", position: "relative" }}>
        <div style={{
          position: "sticky", top: 0,
          height: "100vh", overflow: "hidden",
          background: RL,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Animated video card */}
          <div style={{
            position: "absolute", inset: 0,
            transform: `scale(${videoScale}) translateY(${videoTransY}px)`,
            borderRadius: `${videoRadius}px`,
            overflow: "hidden",
            boxShadow: videoShadow,
            willChange: "transform, border-radius, box-shadow",
          }}>
            <video
              ref={videoRef}
              className="h2s-video"
              autoPlay muted loop playsInline
              onEnded={() => {
                if (!hasScrolled.current) {
                  hasScrolled.current = true;
                  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
                }
              }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/images/hero3.mp4" type="video/mp4" />
              <source src="/images/heronew.mp4" type="video/mp4" />
              <source src="/images/hero2.mp4" type="video/mp4" />
              <source src="/images/strengthmeetsbeauty.mp4" type="video/mp4" />
            </video>

            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 35%, rgba(0,0,0,0.60) 100%)",
            }} />

            {/* Hero copy — fades out on scroll */}
            <div style={{
              position: "absolute", left: 0, right: 0, top: "clamp(72px, 14vw, 128px)", bottom: 0,
              display: "flex", flexDirection: "column", justifyContent: "flex-start",
              padding: "0 clamp(20px, 6vw, 60px)",
              opacity: textOp,
              pointerEvents: textOp < 0.05 ? "none" : "auto",
              transition: "opacity 0.05s linear",
            }}>
              <p className="h2s-label" style={{
                fontSize: 10, textTransform: "uppercase", letterSpacing: "0.38em",
                color: SC, marginBottom: 18, fontFamily: SPACE_MONO,
              }}>
                — Premium Aluminium
              </p>

              <h1 className="h2s-title" style={{
                fontFamily: SPACE_MONO,
                fontSize: "clamp(34px, 9vw, 66px)",
                lineHeight: 0.98,
                letterSpacing: "0.02em",
                color: RL,
                margin: "0 clamp(16px, 5vw, 50px) 28px clamp(8px, 3vw, 32px)",
                fontWeight: 400,
              }}>
                Metal<br />
                Crafted for<br />
                the Home.
              </h1>

              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingRight: "clamp(12px, 4vw, 32px)", gap: 12 }}>
                <p className="h2s-sub" style={{
                  fontSize: "clamp(10px, 2.6vw, 12px)", lineHeight: 1.85,
                  color: "rgba(255,255,255,0.58)",
                  maxWidth: "min(270px, 60vw)", fontFamily: SPACE_MONO,
                }}>
                  Aluminium decor that brings calm,<br />
                  balance and character to your space.
                </p>

                <div className="h2s-scr" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.42)", fontFamily: SPACE_MONO,
                  }}>
                    Scroll
                  </span>
                  <div className="h2s-line" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL REVEAL TEXT ───────────────────────── */}
     
    </>
  );
}
