import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-24 px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Service</p>
        <h1 className="text-3xl sm:text-4xl text-mulled-iron font-horizon uppercase tracking-wide mb-8">Returns</h1>

        <div className="space-y-6 text-sm leading-relaxed text-slate-moss font-space-mono">
          <p>
            If a piece arrives damaged or isn&apos;t what you expected, let us know within{" "}
            <span className="text-smoked-bronze">7 days</span> of delivery and we&apos;ll arrange a
            replacement.
          </p>
          <p>
            Because most Mettali pieces are made and finished to order, custom or bespoke
            commissions are not eligible for return unless there is a manufacturing defect.
          </p>
          <p>
            To start a return, email us with your order number and photos of the item via our{" "}
            <a href="/contact" className="text-smoked-bronze underline underline-offset-2">Contact</a> page.
          </p>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
