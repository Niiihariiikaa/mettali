"use client";

const PHRASE = "DEFINED BY DETAIL";
const track = Array(20).fill(PHRASE);

export function MarqueeSection() {
  return (
    <section className="overflow-hidden border-y border-border bg-background">
      <style>{`
        @keyframes marquee-run {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-run 190s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="py-7">
        <div className="marquee-track">
          {[...track, ...track].map((phrase, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0 32px",
                whiteSpace: "nowrap",
                fontSize: 18,
                letterSpacing: "0.22em",
                color: "var(--slate-moss)",
                fontFamily: "var(--font-horizon), monospace",
              }}
            >
              {phrase}
              <span style={{ marginLeft: 32, color: "var(--smoked-bronze)", fontSize: 7 }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
