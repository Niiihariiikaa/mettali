"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { CustomisationStyles, CustomisationIntro, CustomisationForm } from "@/pages/customisation";

const HERO_VIDEO = "/images/Generate_video_for_aluminium_decor_202607202314.mp4";

const RL = "#fffefc"; // raw linen
const SC = "#ad9e89"; // sandcast
const TP = "#6a5d51"; // taupe brown — matches CustomisationIntro's bg
const SPACE = "'Space Mono', monospace";
const HORIZON_OUTLINED = "'Horizon Outlined', sans-serif";

export default function CustomiseStudioPage() {
  return (
    <main style={{ background: TP, minHeight: "100vh" }}>
      <Header variant="dark" />
      <CustomisationStyles />

      {/* ── Hero video with overlaid text ─────────────── */}
      <section className="relative flex h-[62vh] min-h-105 items-center justify-center overflow-hidden">
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* readability tint over the whole video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,13,8,0.5) 0%, rgba(20,13,8,0.22) 40%, rgba(20,13,8,0.55) 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <p
            className="mb-5 text-xs uppercase tracking-[0.42em]"
            style={{ fontFamily: SPACE, color: SC }}
          >
            — Made For You
          </p>
          <h1
            className="uppercase leading-[1.02]"
            style={{ fontFamily: HORIZON_OUTLINED, fontSize: "clamp(2.4rem, 6vw, 5rem)", color: RL }}
          >
            Customize Your
            <br />
            Mettali Piece
          </h1>
          <p
            className="mt-6 max-w-md text-sm"
            style={{ fontFamily: SPACE, color: "rgba(255,255,255,0.65)" }}
          >
            Choose your piece, size, color, finish and material below.
          </p>
        </div>
      </section>

      <CustomisationIntro />
      <CustomisationForm />

      <FooterSection />
    </main>
  );
}
