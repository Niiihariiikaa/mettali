import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const wineHolders = [
  {
    name: "Clink",
    category: "Wine Holders",
    images: [
      `${B}/clink1.JPG`,
      `${B}/clink2.JPG`,
      `${B}/clink3.JPG`,
      `${B}/clink4.JPG`,
    ],
  },
  {
    name: "Perch",
    category: "Wine Holders",
    images: [
      `${B}/Perch-wineholder1.JPG`,
      `${B}/Perchwineholder2.JPG`,
      `${B}/Perchwineholder3.JPG`,
    ],
  },
  {
    name: "Maison",
    category: "Wine Holders",
    images: [
      `${B}/Maison-wineholder-1..JPG`,
      `${B}/Maison-wine-holder2.JPG`,
      `${B}/Maison-wine-holder3.JPG`,
      `${B}/Maison-wine-holder-b1.JPG`,
      `${B}/Maison-wine-holderb2.JPG`,
      `${B}/Maison-wine-holderb3.JPG`,
    ],
  },
  {
    name: "Opera",
    category: "Wine Holders",
    images: [
      `${B}/Opera1-wine-holder-1.JPG`,
      `${B}/Opera-wine-holder-2.JPG`,
      `${B}/Opera-wine-holder-3.JPG`,
    ],
  },
  {
    name: "Nest",
    category: "Wine Holders",
    images: [
      `${B}/Nest-wineholder1.JPG`,
      `${B}/Nestwineholder2.JPG`,
      `${B}/Nestwineholder3.JPG`,
      `${B}/Nest-black1.JPG`,
      `${B}/Nestblack2.JPG`,
    ],
  },
];

export default function WineHoldersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">
          Mettali Collection
        </p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">
          Wine Holders
        </h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Elegant aluminium wine holders — designed to display, not just store.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-3 lg:px-20">
        {wineHolders.map((product) => (
          <ProductSliderCard key={product.name} {...product} />
        ))}
      </div>

      <FooterSection />
    </main>
  );
}
