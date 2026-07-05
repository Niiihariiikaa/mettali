"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

// ── Brand tokens ──────────────────────────────────────
const RL = "#fffefc";   // Raw Linen
const SC = "#ad9e89";   // Sandcast
const SB = "#584738";   // Smoked Bronze
const SM = "#716f57";   // Slate Moss
const DK = "#2e1f14";   // Deep bronze-black
const TP = "#6a5d51";   // Taupe brown — intro section bg
const SPACE = "'Space Mono', monospace";
const HORIZON = "Horizon, sans-serif";

const CUSTOMIZE_OPTIONS = [
  { key: "dimensions", label: "Dimensions / Size" },
  { key: "color",      label: "Color" },
  { key: "finish",     label: "Finish" },
  { key: "material",   label: "Material" },
  { key: "other",      label: "Other" },
];

/* ══════════════════════════════════════════════════════
   Burst — one-shot particle explosion (on submit)
   ══════════════════════════════════════════════════════ */
function Burst({ trigger }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const COLORS = ["#ad9e89", "#584738", "#c9b8a0", "#fffefc", "#716f57"];
    const parts = [];
    for (let i = 0; i < 160; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = Math.random() * 7 + 2;
      parts.push({
        x: W / 2, y: H / 2,
        vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2,
        r: Math.random() * 3 + 1,
        life: 1,
        decay: Math.random() * 0.012 + 0.006,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      });
    }

    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of parts) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.12;          // gravity
        p.vx *= 0.985; p.vy *= 0.985;
        p.life -= p.decay;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (alive) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}
    />
  );
}

/* ══════════════════════════════════════════════════════
   Reveal — fade-up on scroll into view
   ══════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(36px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   WordReveal — word-by-word color reveal on scroll
   ══════════════════════════════════════════════════════ */
function WordReveal({ text, size = "clamp(15px, 1.7vw, 21px)", leading = 2, dim = "rgba(255,254,252,0.24)", lit = RL }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.25;
      setProgress(Math.max(0, Math.min(1, (start - rect.top) / (start - end))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} style={{ fontFamily: SPACE, fontSize: size, lineHeight: leading, margin: 0 }}>
      {words.map((word, i) => (
        <span key={i} style={{
          color: progress > i / words.length ? lit : dim,
          transition: "color 0.2s",
        }}>
          {word}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/* ══════════════════════════════════════════════════════
   Small form helpers
   ══════════════════════════════════════════════════════ */
function SectionLabel({ n, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
      <span style={{
        fontFamily: SPACE, fontSize: 10, color: SC,
        border: `1px solid ${SC}55`, borderRadius: "50%",
        width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
      }}>{n}</span>
      <p style={{
        fontFamily: SPACE, fontSize: 11, letterSpacing: "0.32em",
        textTransform: "uppercase", color: SB, margin: 0,
      }}>{children}</p>
      <div style={{ flex: 1, height: 1, background: "#e2ddd8" }} />
    </div>
  );
}

function Field({ label, required, type = "text", textarea, placeholder }) {
  const [focus, setFocus] = useState(false);
  const common = {
    width: "100%", background: "transparent", outline: "none",
    border: "none", borderBottom: `1px solid ${focus ? SB : "#d9d2c9"}`,
    padding: "10px 2px", fontFamily: SPACE, fontSize: 13, color: DK,
    transition: "border-color 0.3s",
    resize: "vertical",
  };
  return (
    <label style={{ display: "block", position: "relative" }}>
      <span style={{
        display: "block", fontFamily: SPACE, fontSize: 10,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: focus ? SB : SM, marginBottom: 2, transition: "color 0.3s",
      }}>
        {label}{required && <span style={{ color: SC }}> *</span>}
      </span>
      {textarea ? (
        <textarea rows={4} required={required} placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={common} />
      ) : (
        <input type={type} required={required} placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={common} />
      )}
      {/* animated underline */}
      <span style={{
        position: "absolute", left: 0, bottom: 0, height: 1,
        width: focus ? "100%" : "0%", background: SB,
        transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </label>
  );
}

/* ══════════════════════════════════════════════════════
   Page
   ══════════════════════════════════════════════════════ */
export function CustomisationContent() {
  const [requestType,    setRequestType]    = useState("customize");
  const [customizations, setCustomizations] = useState({
    dimensions: false, color: false, finish: false, material: false, other: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const toggle = (key) => setCustomizations((p) => ({ ...p, [key]: !p[key] }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div style={{ background: TP, minHeight: "100vh" }}>
      <style>{`
        @keyframes cz-up    { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:none; } }
        @keyframes cz-fade  { from { opacity:0; } to { opacity:1; } }
        @keyframes cz-float { 0%,100% { transform:translateY(0) rotate(0.4deg); } 50% { transform:translateY(-18px) rotate(-0.4deg); } }
        @keyframes cz-line  { from { height:0; } to { height:42px; } }
        @keyframes cz-glow  { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:0.9; transform:scale(1.12); } }
        @keyframes cz-pop   { 0% { transform:scale(0); } 70% { transform:scale(1.25); } 100% { transform:scale(1); } }

        .cz-label { animation: cz-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .cz-title { animation: cz-up 1s   cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .cz-sub   { animation: cz-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.85s both; }
        .cz-img   { animation: cz-fade 1.4s ease 0.6s both; }
        .cz-scr   { animation: cz-fade 1.2s ease 1.4s both; }
        .cz-line  { animation: cz-line 1.2s ease 1.7s both; width:1px; background:rgba(255,254,252,0.4); }

        .cz-float { animation: cz-float 7s ease-in-out infinite; }

        .cz-chip { transition: background 0.35s, color 0.35s, border-color 0.35s, transform 0.25s; }
        .cz-chip:hover { transform: translateY(-2px); }

        .cz-radio-card { transition: border-color 0.35s, background 0.35s, transform 0.3s; }
        .cz-radio-card:hover { transform: translateY(-2px); }

        .cz-submit { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, background 0.3s; }
        .cz-submit:hover { transform: translateY(-3px); box-shadow: 0 14px 34px rgba(46,31,20,0.28); }

        .cz-contact { transition: transform 0.3s, border-color 0.3s; }
        .cz-contact:hover { transform: translateY(-2px); border-color: ${SC} !important; }

        .cz-dot { animation: cz-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>

      {/* ══ HERO — full video (natural height), heading on left ══ */}
      <section style={{ position: "relative", background: DK }}>
        {/* video at natural aspect ratio — full height visible, no cropping */}
        <video
          autoPlay muted loop playsInline
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          <source src="/images/customise.mp4" type="video/mp4" />
        </video>

        {/* readability overlay — darker on the left where the heading sits */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to right, rgba(20,13,8,0.66) 0%, rgba(20,13,8,0.28) 45%, rgba(20,13,8,0.04) 100%)",
        }} />

        {/* merge gradient — video melts into the taupe section below */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: "16%", zIndex: 1,
          background: `linear-gradient(to bottom, transparent 0%, ${TP}38 60%, ${TP} 100%)`,
        }} />

        {/* Heading — left, vertically centred */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          display: "flex", alignItems: "center",
        }}>
          <div style={{ width: "100%", padding: "0 36px" }}>
            <p className="cz-label" style={{
              fontFamily: SPACE, fontSize: 10, letterSpacing: "0.42em",
              textTransform: "uppercase", color: SC, marginBottom: 26,
            }}>
              — Made For You
            </p>

            <h1 className="cz-title" style={{
              fontFamily: HORIZON,
              fontSize: "clamp(38px, 5.2vw, 72px)",
              lineHeight: 1.04, fontWeight: 400,
              color: RL, margin: 0,
              textTransform: "uppercase",
            }}>
              Customize<br />Your Mettali<br />Piece
            </h1>
          </div>
        </div>
      </section>

      {/* ══ INTRO — taupe, word-by-word scroll reveal ══ */}
      <section style={{ background: TP, marginTop: -1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 56px 110px" }}>
          <WordReveal
            text="Selected Mettali pieces can be customized to suit your space and preferences. Tell us what you'd like to change, and our team will review your request and get back to you with possibilities, pricing, and timelines."
            size="clamp(17px, 2vw, 25px)"
            leading={1.9}
          />

          <div style={{ marginTop: 80 }}>
            <Reveal>
              <p style={{
                fontFamily: SPACE, fontSize: 10, letterSpacing: "0.36em",
                textTransform: "uppercase", color: SC, marginBottom: 18,
              }}>
                — Bespoke Design Requests
              </p>
              <h2 style={{
                fontFamily: HORIZON, fontSize: "clamp(24px, 3vw, 40px)",
                textTransform: "uppercase", color: RL, lineHeight: 1.15,
                margin: "0 0 32px", maxWidth: 640,
              }}>
                Beyond the collection
              </h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <WordReveal
                text="In addition to customizing selected Mettali pieces, we also consider requests for entirely new designs. Whether you're looking for a unique furniture piece or a design tailored to a particular space, our team can explore bespoke solutions that align with Mettali's design language, craftsmanship standards, and production capabilities."
                size="13px"
              />
              <WordReveal
                text="All bespoke requests are reviewed individually for design compatibility, technical feasibility, and production requirements."
                size="13px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FORM — dark chocolate box ══ */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "40px 40px 128px" }}>
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2ddd8",
          padding: "clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px)",
          boxShadow: "0 32px 80px rgba(20,13,8,0.25)",
        }}>
        {submitted ? (
          <Reveal>
            <div style={{
              position: "relative", textAlign: "center",
              border: "1px solid #e2ddd8", background: "#faf8f5",
              padding: "96px 48px", overflow: "hidden",
            }}>
              <Burst trigger={submitted} />
              <p style={{
                fontFamily: SPACE, fontSize: 10, letterSpacing: "0.4em",
                textTransform: "uppercase", color: SC, marginBottom: 20,
              }}>
                — Request Received
              </p>
              <h3 style={{
                fontFamily: HORIZON, fontSize: "clamp(24px, 3vw, 38px)",
                textTransform: "uppercase", color: DK, margin: "0 0 22px",
              }}>
                Thank You
              </h3>
              <p style={{ fontFamily: SPACE, fontSize: 13, lineHeight: 2, color: SM, maxWidth: 440, margin: "0 auto 40px" }}>
                Our team will review your request and get back to you with
                possibilities, pricing, and timelines.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="cz-submit"
                style={{
                  fontFamily: SPACE, fontSize: 11, letterSpacing: "0.28em",
                  textTransform: "uppercase", color: RL, background: DK,
                  border: "none", padding: "16px 40px", cursor: "pointer",
                }}
              >
                Submit Another
              </button>
            </div>
          </Reveal>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* ── Request type ── */}
            <Reveal>
              <SectionLabel n="01">Request Type *</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 72 }}>
                {[
                  { v: "customize", t: "Customize an Existing Piece", d: "Adjust dimensions, colors or finishes of a Mettali design." },
                  { v: "bespoke",   t: "Bespoke / New Design Request", d: "Commission an entirely new piece, tailored to your space." },
                ].map((o) => {
                  const active = requestType === o.v;
                  return (
                    <button
                      key={o.v} type="button"
                      onClick={() => setRequestType(o.v)}
                      className="cz-radio-card"
                      style={{
                        textAlign: "left", cursor: "pointer",
                        background: active ? SB : "#faf8f5",
                        border: `1px solid ${active ? SB : "#e2ddd8"}`,
                        padding: "26px 26px 24px",
                      }}
                    >
                      <span style={{
                        display: "inline-flex", width: 16, height: 16, borderRadius: "50%",
                        border: `1px solid ${active ? SC : "#c9c2b8"}`,
                        alignItems: "center", justifyContent: "center", marginBottom: 16,
                      }}>
                        {active && <span className="cz-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: SC }} />}
                      </span>
                      <span style={{
                        display: "block", fontFamily: SPACE, fontSize: 13, fontWeight: 700,
                        color: active ? RL : DK, marginBottom: 8,
                      }}>{o.t}</span>
                      <span style={{
                        display: "block", fontFamily: SPACE, fontSize: 11, lineHeight: 1.8,
                        color: active ? "rgba(255,254,252,0.6)" : SM,
                      }}>{o.d}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* ── Your details ── */}
            <Reveal>
              <SectionLabel n="02">Your Details</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 40px", marginBottom: 72 }}>
                <Field label="Full Name" required />
                <Field label="Email Address" required type="email" />
                <Field label="Phone Number" type="tel" />
                <Field label="Company (Optional)" />
              </div>
            </Reveal>

            {/* ── Conditional section ── */}
            {requestType === "customize" ? (
              <Reveal>
                <SectionLabel n="03">Product Details</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 72 }}>
                  <Field label="Piece You Wish to Customize (Name)" required />
                  <Field label="Product Link (Optional)" placeholder="https://" />

                  <div>
                    <p style={{
                      fontFamily: SPACE, fontSize: 10, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: SM, marginBottom: 16,
                    }}>
                      What would you like to customize?
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                      {CUSTOMIZE_OPTIONS.map((o) => {
                        const on = customizations[o.key];
                        return (
                          <button
                            key={o.key} type="button"
                            onClick={() => toggle(o.key)}
                            className="cz-chip"
                            style={{
                              fontFamily: SPACE, fontSize: 11, letterSpacing: "0.08em",
                              padding: "11px 20px", cursor: "pointer",
                              background: on ? SB : "transparent",
                              color: on ? RL : SM,
                              border: `1px solid ${on ? SB : "#d9d2c9"}`,
                              borderRadius: 999,
                            }}
                          >
                            {on ? "✓ " : "+ "}{o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field label="Describe Your Requirements" required textarea />
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <SectionLabel n="03">Bespoke Design Request</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 72 }}>
                  <Field label="Describe the Piece You Would Like Us to Create" required textarea />

                  <div>
                    <p style={{
                      fontFamily: SPACE, fontSize: 10, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: SM, marginBottom: 14,
                    }}>
                      Reference Images / Sketches
                    </p>
                    <label style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      justifyContent: "center", gap: 10,
                      border: "1px dashed #c9c2b8", padding: "44px 20px",
                      cursor: "pointer", background: "#faf8f5",
                    }}>
                      <span style={{ fontFamily: SPACE, fontSize: 12, color: SB }}>Upload files</span>
                      <span style={{ fontFamily: SPACE, fontSize: 10, color: SM }}>
                        JPG, PNG or PDF — up to 10 MB each
                      </span>
                      <input type="file" multiple accept="image/*,.pdf" style={{ display: "none" }} />
                    </label>
                  </div>

                  {/* Direct contact */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <a
                      href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                      className="cz-contact"
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        border: "1px solid #e2ddd8", background: "#faf8f5",
                        padding: "18px 22px", textDecoration: "none",
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50" }} />
                      <span style={{ fontFamily: SPACE, fontSize: 12, color: DK }}>WhatsApp Us</span>
                    </a>
                    <a
                      href="mailto:customise@mettali.in"
                      className="cz-contact"
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        border: "1px solid #e2ddd8", background: "#faf8f5",
                        padding: "18px 22px", textDecoration: "none",
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: SC }} />
                      <span style={{ fontFamily: SPACE, fontSize: 12, color: DK }}>customise@mettali.in</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            )}

            {/* ── Submit ── */}
            <Reveal>
              <button
                type="submit"
                className="cz-submit"
                style={{
                  width: "100%",
                  fontFamily: SPACE, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.34em", textTransform: "uppercase",
                  color: RL, background: DK, border: "none",
                  padding: "22px 0", cursor: "pointer",
                }}
              >
                Submit Request →
              </button>
              <p style={{
                fontFamily: SPACE, fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase", color: SC,
                textAlign: "center", marginTop: 22,
              }}>
                Crafted in-house, from first sketch to final finish.
              </p>
            </Reveal>
          </form>
        )}
        </div>
      </section>
    </div>
  );
}

export default function CustomisationPage() {
  return (
    <main style={{ background: TP, minHeight: "100vh" }}>
      <Header />
      <CustomisationContent />
      <FooterSection />
    </main>
  );
}
