import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const vases = [
  {
    name: "Sculptural Vase I",
    category: "Vases",
    images: [`${B}/vase3.jpg`, `${B}/vase2.JPG`, `${B}/vase1.JPG`],
  },
  {
    name: "Sculptural Vase II",
    category: "Vases",
    images: [`${B}/vaseb3.JPG`, `${B}/vaseb1.JPG`],
  },
  {
    name: "Sculptural Vase III",
    category: "Vases",
    images: [`${B}/vasec2.JPG`, `${B}/vasec1.JPG`],
  },
  {
    name: "Sculptural Vase IV",
    category: "Vases",
    images: [`${B}/vased2.JPG`, `${B}/vased1.JPG`],
  },
];

export default function VasesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">
          Mettali Collection
        </p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">
          Vases
        </h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Sculptural aluminium vases — where function meets artistry.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-4 lg:px-20">
        {vases.map((product) => (
          <ProductSliderCard key={product.name} {...product} />
        ))}
      </div>

      <FooterSection />
    </main>
  );
}
