"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

const RL = "#fffefc";
const SC = "#ad9e89";
const SB = "#584738";
const SM = "#716f57";
const DK = "#2e1f14";
const SPACE = "'Space Mono', monospace";

const story1 =
  "Mettali began with a simple idea — to see metal differently. What started as a passion project slowly turned into a journey of creating pieces that feel both functional and personal for everyday spaces.";

const story2 =
  "Over the last two years, we have explored aluminum in ways that feel lighter, softer, and more creative than people usually imagine. From flower vases and shelves to wine holders, shoe display racks, cup holders, and small organisers, every piece is designed to blend into real homes and real routines with ease.";

const story3 =
  "At its core, Mettali is about creating objects that are minimal, thoughtful, and made to last — designs that quietly become a part of your everyday life.";

const philosophy =
  "At Mettali, we like being involved in every step of the process. From the first design sketch to laser cutting, bending, assembling, finishing, painting, and packaging — everything is done in-house by our team. Working this way helps us pay attention to the small details, take our time with the process, and make sure every piece feels right before it reaches you. For us, it's not just about making products — it's about creating pieces that people genuinely enjoy living with.";

function ScrollReveal({ text, size = "clamp(13px, 1.3vw, 16px)", leading = 2 }: { text: string; size?: string; leading?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.12;
      setProgress(Math.max(0, Math.min(1, (start - rect.top) / (start - end))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} style={{ fontFamily: SPACE, lineHeight: leading, fontSize: size, margin: 0 }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            color: progress > i / words.length ? DK : SC,
            transition: "color 0.18s",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

const steps = [
  "Design Sketch",
  "Laser Cutting",
  "Bending",
  "Assembling",
  "Finishing",
  "Painting",
  "Packaging",
];

export default function AboutPage() {
  return (
    <main style={{ background: RL, minHeight: "100vh" }}>
      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "clamp(120px, 16vw, 180px)",
          paddingBottom: "clamp(64px, 8vw, 100px)",
          paddingLeft: "clamp(32px, 6vw, 96px)",
          paddingRight: "clamp(32px, 6vw, 96px)",
          borderBottom: `1px solid #e2ddd8`,
        }}
      >
        <p
          style={{
            fontFamily: SPACE,
            fontSize: 10,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: SC,
            marginBottom: 28,
          }}
        >
          — Our Story
        </p>

        <h1
          style={{
            fontFamily: "Horizon, sans-serif",
            fontSize: "clamp(56px, 10vw, 120px)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            color: DK,
            margin: 0,
          }}
        >
          About Us
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 40,
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: SPACE,
              fontSize: 11,
              color: SM,
              letterSpacing: "0.12em",
              margin: 0,
            }}
          >
            Aluminium — reimagined for the everyday.
          </p>
          <p
            style={{
              fontFamily: SPACE,
              fontSize: 10,
              color: SC,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Est. 2022 · Crafted in India
          </p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "clamp(40px, 6vw, 80px)",
          padding: "clamp(64px, 8vw, 112px) clamp(32px, 6vw, 96px)",
          borderBottom: `1px solid #e2ddd8`,
          alignItems: "start",
        }}
      >
        {/* Sidebar label */}
        <div style={{ paddingTop: 6 }}>
          <div
            style={{
              width: 1,
              height: 48,
              background: SC,
              marginBottom: 16,
            }}
          />
          <p
            style={{
              fontFamily: SPACE,
              fontSize: 9,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: SC,
              margin: 0,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            The Beginning
          </p>
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <ScrollReveal text={story1} size="clamp(15px, 1.6vw, 19px)" leading={1.9} />
          <ScrollReveal text={story2} size="clamp(13px, 1.3vw, 16px)" leading={2} />
          <ScrollReveal text={story3} size="clamp(13px, 1.3vw, 16px)" leading={2} />
        </div>
      </section>



      {/* ── DESIGN PHILOSOPHY ────────────────────────────── */}
      <section
        style={{
          background: SB,
          padding: "clamp(64px, 8vw, 112px) clamp(32px, 6vw, 96px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "clamp(48px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <p
              style={{
                fontFamily: SPACE,
                fontSize: 9,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: SC,
                marginBottom: 20,
              }}
            >
              — Our Process
            </p>
            <h2
              style={{
                fontFamily: "Horizon, sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: RL,
                margin: "0 0 48px",
              }}
            >
              Our Design Philosophy
            </h2>

            {/* Process steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {steps.map((step, i) => (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 0",
                    borderTop: i === 0 ? `1px solid rgba(255,254,252,0.12)` : undefined,
                    borderBottom: `1px solid rgba(255,254,252,0.12)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: SPACE,
                      fontSize: 9,
                      color: SC,
                      letterSpacing: "0.2em",
                      minWidth: 20,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: SPACE,
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: RL,
                    }}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — philosophy text */}
          <div style={{ paddingTop: 8 }}>
            <p
              style={{
                fontFamily: SPACE,
                fontSize: "clamp(13px, 1.35vw, 17px)",
                lineHeight: 2.1,
                color: `rgba(255,254,252,0.75)`,
                margin: 0,
              }}
            >
              {philosophy}
            </p>

            <div
              style={{
                marginTop: 56,
                paddingTop: 32,
                borderTop: `1px solid rgba(255,254,252,0.12)`,
              }}
            >
              <p
                style={{
                  fontFamily: "Horizon, sans-serif",
                  fontSize: "clamp(20px, 2.4vw, 30px)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: RL,
                  margin: 0,
                  opacity: 0.9,
                }}
              >
                "Every piece feels right before it reaches you."
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
