import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-24 px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Get in touch</p>
        <h1 className="text-3xl sm:text-4xl text-mulled-iron font-horizon uppercase tracking-wide mb-8">Contact</h1>

        <div className="space-y-6 text-sm leading-relaxed text-slate-moss font-space-mono">
          <p>
            Have a question about an order, a piece, or want to know more about Mettali? We&apos;d
            love to hear from you.
          </p>
          <div className="space-y-2">
            <p>
              Email:{" "}
              <a href="mailto:info@mettali.com" className="text-smoked-bronze underline underline-offset-2">
                info@mettali.com
              </a>
            </p>
          </div>
          <p>
            Looking to order in bulk or arrange corporate gifting? Visit our{" "}
            <a href="/bulk-order" className="text-smoked-bronze underline underline-offset-2">
              Bulk Order &amp; Gifting
            </a>{" "}
            page instead.
          </p>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
