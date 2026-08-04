"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { Check } from "lucide-react";

const fieldClass =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-smoked-bronze font-space-mono";
const labelClass = "block mb-2 text-[10px] uppercase tracking-widest text-mulled-iron font-space-mono";

export default function BulkOrderPage() {
  const [inquiryType, setInquiryType] = useState<"bulk" | "gifting">("bulk");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("inquiryType", inquiryType);

    try {
      const res = await fetch("/api/bulk-order-request", { method: "POST", body: data });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-24 px-6 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Get in touch</p>
        <h1 className="text-3xl sm:text-4xl text-mulled-iron font-horizon uppercase tracking-wide mb-4">
          Bulk Order &amp; Gifting
        </h1>
        <p className="text-sm leading-relaxed text-slate-moss font-space-mono mb-10">
          Outfitting a space, planning corporate gifts, or ordering in volume? Tell us what
          you&apos;re looking for and our team will get back to you with options and pricing.
        </p>

        {submitted ? (
          <div className="border border-border bg-card px-8 py-16 text-center">
            <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-mulled-iron text-white">
              <Check size={18} />
            </div>
            <h2 className="text-xl text-mulled-iron font-horizon uppercase tracking-wide mb-3">
              Inquiry Received
            </h2>
            <p className="text-sm text-slate-moss font-space-mono mb-8">
              Thank you — our team will review your inquiry and be in touch shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="bg-foreground px-6 py-3 text-xs uppercase tracking-widest text-background font-space-mono"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <p className={labelClass}>Inquiry Type *</p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { v: "bulk", label: "Bulk Order" },
                  { v: "gifting", label: "Corporate Gifting" },
                ] as const).map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setInquiryType(o.v)}
                    className={`border px-4 py-3 text-xs uppercase tracking-widest font-space-mono transition-colors ${
                      inquiryType === o.v
                        ? "bg-smoked-bronze text-white border-smoked-bronze"
                        : "border-border text-slate-moss hover:border-smoked-bronze"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="fullName">Full Name *</label>
                <input id="fullName" name="fullName" required className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="company">Company (Optional)</label>
                <input id="company" name="company" className={fieldClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="quantity">Approx. Quantity</label>
                <input id="quantity" name="quantity" placeholder="e.g. 50 units" className={fieldClass} />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="requirements">Tell Us What You Need *</label>
              <textarea
                id="requirements"
                name="requirements"
                required
                rows={5}
                placeholder="Products of interest, quantities, timeline, budget, delivery location…"
                className={`${fieldClass} resize-none`}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-space-mono text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-foreground px-6 py-4 text-xs uppercase tracking-widest text-background font-space-mono disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit Inquiry"}
            </button>
          </form>
        )}
      </div>
      <FooterSection />
    </main>
  );
}
