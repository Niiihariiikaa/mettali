import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const racks = [
  {
    name: "Align Shoe Rack",
    category: "Shoe Racks",
    images: [
      `${B}/Alignshoerack.JPG`,
      `${B}/Alignshoerack2.JPG`,
      `${B}/alignshoerack3.JPG`,
    ],
  },
  {
    name: "Penta Shoe Rack",
    category: "Shoe Racks",
    images: [
      `${B}/pentashoerack.JPG`,
      `${B}/pentashoerack2.JPG`,
    ],
  },
  {
    name: "Step Shoe Rack",
    category: "Shoe Racks",
    images: [
      `${B}/step-shoerack1.JPG`,
      `${B}/step-shoerack2.JPG`,
      `${B}/stepshoerack3.JPG`,
      `${B}/stepshoerackb2.JPG`,
    ],
  },
  {
    name: "Orbit Shoe Rack",
    category: "Shoe Racks",
    images: [
      `${B}/Orbit-shoerack1.JPG`,
      `${B}/Orbitshoerack2.JPG`,
      `${B}/Orbitshoerack3.JPG`,
    ],
  },
  {
    name: "Vault Shoe Rack",
    category: "Shoe Racks",
    images: [
      `${B}/Vaultshoerack1.JPG`,
      `${B}/Vaultshoerack2.JPG`,
      `${B}/vaultshoerack3.JPG`,
    ],
  },
];

export default function ShoeRacksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

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

      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-3 lg:px-20">
        {racks.map((product) => (
          <ProductSliderCard key={product.name} {...product} />
        ))}
      </div>

      <FooterSection />
    </main>
  );
}
