import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-24 px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Service</p>
        <h1 className="text-3xl sm:text-4xl text-mulled-iron font-horizon uppercase tracking-wide mb-8">Delivery</h1>

        <div className="space-y-6 text-sm leading-relaxed text-slate-moss font-space-mono">
          <p>
            Every Mettali piece is made to order and hand-finished, so please allow{" "}
            <span className="text-smoked-bronze">7–10 business days</span> for your order to be
            crafted, quality-checked, and dispatched.
          </p>
          <p>
            Once shipped, you&apos;ll receive a tracking link by email. Delivery timelines may vary
            slightly for bulk orders, custom pieces, or remote locations.
          </p>
          <p>
            For any questions about an existing order, reach out via our{" "}
            <a href="/contact" className="text-smoked-bronze underline underline-offset-2">Contact</a> page.
          </p>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
