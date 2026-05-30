import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const shelves = [
  {
    name: "Display Shelf I",
    category: "Shelves",
    images: [`${B}/shelf2.png`, `${B}/shelf1.png`],
  },
  {
    name: "Display Shelf II",
    category: "Shelves",
    images: [`${B}/shelfb3.png`, `${B}/shelfb2.png`, `${B}/shelfb1.png`],
  },
  {
    name: "Display Shelf III",
    category: "Shelves",
    images: [`${B}/shelfc3.JPG`, `${B}/shelfc2.JPG`, `${B}/shelfc1.JPG`],
  },
  {
    name: "Display Shelf IV",
    category: "Shelves",
    images: [`${B}/shelfd2.JPG`, `${B}/shelfd1.JPG`],
  },
  {
    name: "Display Shelf V",
    category: "Shelves",
    images: [`${B}/shelfe3.JPG`, `${B}/shelfe2.JPG`, `${B}/shelfe1.JPG`],
  },
  {
    name: "Display Shelf VI",
    category: "Shelves",
    images: [
      `${B}/shelff6.JPG`,
      `${B}/shelff5.JPG`,
      `${B}/shelff4.JPG`,
      `${B}/shelff3.JPG`,
      `${B}/shelff2.JPG`,
      `${B}/shelff1.JPG`,
    ],
  },
  {
    name: "Display Shelf VII",
    category: "Shelves",
    images: [`${B}/shelfg3.JPG`, `${B}/shelfg2.JPG`, `${B}/shelfg1.JPG`],
  },
  {
    name: "Display Shelf VIII",
    category: "Shelves",
    images: [`${B}/shelfh1.JPG`],
  },
];

export default function ShelvesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">
          Mettali Collection
        </p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">
          Shelves
        </h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Wall-mounted and freestanding display shelves — precision formed in aluminium.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-4 lg:px-20">
        {shelves.map((product) => (
          <ProductSliderCard key={product.name} {...product} />
        ))}
      </div>

      <FooterSection />
    </main>
  );
}
