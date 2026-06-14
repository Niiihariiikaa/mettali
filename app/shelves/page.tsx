import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function ShelvesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">
          Mettali Collection
        </p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">
          Shelves
        </h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Coming soon.
        </p>
      </div>

      <FooterSection />
    </main>
  );
}
