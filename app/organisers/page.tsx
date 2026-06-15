import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const organisers = [
  {
    name: "Linea Organiser",
    category: "Organisers",
    price: 2100,
    dimensions: "15.5×10×45 cm",
    description: "Minimalist tabletop organiser with a stunning continuous silhouette. Ideal as a vanity tray, desk accessory, or countertop shelf.",
    images: [
      `${B}/Linea-organiser-green.JPG`, `${B}/Linea%20organiser-green2.JPG`,
      `${B}/Linea%20organiser%20light%20green%20.JPG`, `${B}/Linea-organiser-white.JPG`,
      `${B}/Linea-organiser-white-2.JPG`, `${B}/Linea-organiser-white3.JPG`,
    ],
  },
  {
    name: "Perch Organiser",
    category: "Organisers",
    price: 8000,
    dimensions: "73×15×40 cm",
    description: "Multi-faceted organiser with staggered compartments. Works freestanding or wall-mounted — perfect for mugs, perfumes, or collectibles.",
    images: [`${B}/Perch-wineholder1.JPG`, `${B}/Perchwineholder2.JPG`, `${B}/Perchwineholder3.JPG`],
  },
  {
    name: "Nest Organiser",
    category: "Organisers",
    price: 4500,
    dimensions: "61×13×61 cm",
    description: "Clean geometric grid with unique nesting cradles. A versatile display for coffee mugs, perfumes, or small decorative pieces.",
    images: [`${B}/Nest-wineholder1.JPG`, `${B}/Nestwineholder2.JPG`, `${B}/Nestwineholder3.JPG`, `${B}/Nest-black1.JPG`, `${B}/Nestblack2.JPG`],
  },
];

export default function OrganisersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Mettali Collection</p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">Organisers</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">Functional organisers crafted from powder-coated aluminium — where storage meets design.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:px-20">
        {organisers.map((p) => <ProductSliderCard key={p.name} {...p} />)}
      </div>
      <FooterSection />
    </main>
  );
}
