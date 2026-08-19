import Link from "next/link";

const MESSAGES = [
  "USE WELCOME10 ON YOUR FIRST ORDER OR GET 10% OFF",
];

export function AnnouncementBar() {
  // Repeated twice back-to-back so the marquee can loop seamlessly at -50%.
  const track = [...MESSAGES, ...MESSAGES];

  return (
    <div className="relative h-9 overflow-hidden bg-smoked-bronze">
      <style>{`
        @keyframes ann-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ann-track { animation: ann-marquee 26s linear infinite; }
      `}</style>
      <Link
        href="/products?discount=WELCOME10"
        className="ann-track flex h-full w-max items-center whitespace-nowrap"
      >
        {track.map((msg, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 pl-10 text-[11px] uppercase tracking-[0.2em] text-raw-linen font-space-mono"
          >
            {msg}
            <span className="text-sandcast">✦</span>
          </span>
        ))}
      </Link>
    </div>
  );
}
