import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const organisers = [
  {
    name: "Linea Organiser",
    category: "Organisers",
    images: [
      `${B}/Linea-organiser-green.JPG`,
      `${B}/Linea%20organiser-green2.JPG`,
      `${B}/Linea%20organiser%20light%20green%20.JPG`,
      `${B}/Linea-organiser-white.JPG`,
      `${B}/Linea-organiser-white-2.JPG`,
      `${B}/Linea-organiser-white3.JPG`,
    ],
  },
  {
    name: "Perch",
    category: "Organisers",
    images: [
      `${B}/Perch-wineholder1.JPG`,
      `${B}/Perchwineholder2.JPG`,
      `${B}/Perchwineholder3.JPG`,
    ],
  },
];

export default function OrganisersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">
          Mettali Collection
        </p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">
          Organisers
        </h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Functional desk and counter organisers crafted from powder-coated aluminium.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:px-20">
        {organisers.map((product) => (
          <ProductSliderCard key={product.name} {...product} />
        ))}
      </div>

      <FooterSection />
    </main>
  );
}
