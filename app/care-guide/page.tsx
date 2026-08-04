import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function CareGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-24 px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Service</p>
        <h1 className="text-3xl sm:text-4xl text-mulled-iron font-horizon uppercase tracking-wide mb-8">Care Guide</h1>

        <div className="space-y-6 text-sm leading-relaxed text-slate-moss font-space-mono">
          <p>
            Mettali pieces are crafted from powder-coated aluminium — built to last, but a little
            care keeps them looking their best.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Wipe clean with a soft, dry or slightly damp cloth. Avoid abrasive scrubbers.</li>
            <li>Steer clear of harsh chemical cleaners or solvents, which can dull the finish.</li>
            <li>Keep pieces away from prolonged direct moisture to preserve the coating.</li>
            <li>For vases holding fresh flowers, dry the interior promptly after use.</li>
          </ul>
          <p>
            Questions about caring for a specific piece? Reach out via our{" "}
            <a href="/contact" className="text-smoked-bronze underline underline-offset-2">Contact</a> page.
          </p>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
