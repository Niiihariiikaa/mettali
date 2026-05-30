import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const racks = [
  {
    name: "Shoe Rack I",
    category: "Shoe Racks",
    images: [`${B}/shoerack3.JPG`, `${B}/shoerack2.JPG`, `${B}/shoerack1.JPG`],
  },
  {
    name: "Shoe Rack II",
    category: "Shoe Racks",
    images: [`${B}/shoerackb2.JPG`, `${B}/shoerackb1.JPG`],
  },
  {
    name: "Wire Rack",
    category: "Shoe Racks",
    images: [`${B}/rack2.png`, `${B}/rack1.png`],
  },
];

export default function ShoeRacksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">
          Mettali Collection
        </p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">
          Shoe Racks
        </h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Slim and sturdy entryway racks — built to organise and elevate your space.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:px-20">
        {racks.map((product) => (
          <ProductSliderCard key={product.name} {...product} />
        ))}
      </div>

      <FooterSection />
    </main>
  );
}
