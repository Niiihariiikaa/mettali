import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
<<<<<<< HEAD:app/shoe-display-racks/page.tsx
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const racks = [
  {
    name: "Step",
    category: "Shoe Display Racks",
    price: 900,
    dimensions: "28Ã—10Ã—24 cm",
    description: "Wall-mounted cantilevered shelves presenting each shoe as a gallery object. Fully modular â€” arrange units into any creative configuration.",
    images: [`${B}/step-shoerack1.JPG`, `${B}/step-shoerack2.JPG`, `${B}/stepshoerack3.JPG`, `${B}/stepshoerackb2.JPG`],
  },
  {
    name: "Vault",
    category: "Shoe Display Racks",
    price: 6500,
    dimensions: "31Ã—27Ã—61 cm",
    description: "Space-saving design with a hidden front profile. Wall-mounted or freestanding, with customisable layers of 4, 6, or 8.",
    images: [`${B}/Vaultshoerack1.JPG`, `${B}/Vaultshoerack2.JPG`, `${B}/vaultshoerack3.JPG`],
  },
  {
    name: "Orbit",
    category: "Shoe Display Racks",
    price: 5500,
    dimensions: "44Ã—37.5Ã—84 cm",
    description: "Circular pods create a gallery-style wall showcase for your collection. Turns any wall into a striking piece of contemporary design.",
    images: [`${B}/Orbit-shoerack1.JPG`, `${B}/Orbitshoerack2.JPG`, `${B}/Orbitshoerack3.JPG`],
  },
  {
    name: "Align",
    category: "Shoe Display Racks",
    price: 3600,
    dimensions: "82.5Ã—26Ã—271 cm",
    description: "A continuous zig-zag form forged from a single piece of premium aluminium. Bold graphic wall art that doubles as a sophisticated shoe display.",
    images: [`${B}/Alignshoerack.JPG`, `${B}/Alignshoerack2.JPG`, `${B}/alignshoerack3.JPG`],
  },
  {
    name: "Penta",
    category: "Shoe Display Racks",
    price: 3800,
    dimensions: "106.5Ã—26Ã—33 cm",
    description: "Uniquely versatile floating wall shelf with five planes â€” holds shoes, books, small plants, and dÃ©cor. A dynamic all-in-one display solution.",
    images: [`${B}/pentashoerack.JPG`, `${B}/pentashoerack2.JPG`],
  },
];
=======
import { ProductGrid } from "@/components/product-grid";
import { shoeRacks } from "@/lib/products";
>>>>>>> 0cb8637990ab5792902a5b6928294c294db0e2d5:app/shoe-racks/page.tsx

export default function ShoeDisplayRacksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Mettali Collection</p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">Shoe Display Racks</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">Slim and sturdy entryway racks â€” built to organise and elevate your space.</p>
      </div>
      <ProductGrid
        products={shoeRacks}
        basePath="/shoe-racks"
        className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-3 lg:px-20"
      />
      <FooterSection />
    </main>
  );
}
