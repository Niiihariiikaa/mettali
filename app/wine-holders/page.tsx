import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const wineHolders = [
  {
    name: "Riva",
    category: "Wine Holders",
    price: 2900,
    dimensions: "41.5×41.5×14 cm",
    description: "Architectural wave design holding up to 4 bottles. A sculptural countertop centrepiece that transforms wine storage into functional art.",
    images: [`${B}/Riva.JPG`, `${B}/Riva2.JPG`, `${B}/Riva3.JPG`],
  },
  {
    name: "Maison",
    category: "Wine Holders",
    price: 3200,
    dimensions: "40×22×25 cm",
    description: "Striking honeycomb structure holding 6 bottles. Contemporary geometric precision meets premium freestanding wine storage.",
    images: [
      `${B}/Maison-wineholder-1..JPG`, `${B}/Maison-wine-holder2.JPG`, `${B}/Maison-wine-holder3.JPG`,
      `${B}/Maison-wine-holder-b1.JPG`, `${B}/Maison-wine-holderb2.JPG`, `${B}/Maison-wine-holderb3.JPG`,
    ],
  },
  {
    name: "Clink",
    category: "Wine Holders",
    price: 3200,
    dimensions: "19×14.5×60 cm",
    description: "Sleek vertical wall-mounted rack presenting your collection as a floating display. Modular — install one unit or build an entire wine wall.",
    images: [`${B}/clink1.JPG`, `${B}/clink2.JPG`, `${B}/clink3.JPG`, `${B}/clink4.JPG`],
  },
  {
    name: "Opera",
    category: "Wine Holders",
    price: 2800,
    dimensions: "40×14.5×39 cm",
    description: "Wheel-shaped design with artistic cut-outs holding 6 bottles. A dramatic countertop centrepiece inspired by grand performance.",
    images: [`${B}/Opera1-wine-holder-1.JPG`, `${B}/Opera-wine-holder-2.JPG`, `${B}/Opera-wine-holder-3.JPG`],
  },
];

export default function WineHoldersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Mettali Collection</p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">Wine Holders</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">Elegant aluminium wine holders — designed to display, not just store.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-2 md:px-12 lg:grid-cols-4 lg:px-20">
        {wineHolders.map((p) => <ProductSliderCard key={p.name} {...p} />)}
      </div>
      <FooterSection />
    </main>
  );
}
