import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const vases = [
  {
    name: "Aura Vase",
    category: "Vases",
    images: [
      `${B}/Aura-vase-1.JPG`,
      `${B}/Aura-vase-2.JPG`,
      `${B}/Aura-vase-3.JPG`,
      `${B}/Aura-vase-4.JPG`,
      `${B}/Aura-vase-5.JPG`,
      `${B}/Aura-vase-6.JPG`,
      `${B}/Aura-vase-7.JPG`,
      `${B}/Aura-vase-8.JPG`,
    ],
  },
  {
    name: "Cala Vase",
    category: "Vases",
    images: [
      `${B}/Cala-vase-black1.JPG`,
      `${B}/Cala-vase-black2.JPG`,
      `${B}/Cala-vase-black3.JPG`,
      `${B}/Cala-vase-green-1.JPG`,
      `${B}/Cala-vase-green2.JPG`,
      `${B}/Cala-vase-green-3.JPG`,
    ],
  },
  {
    name: "Terra Vase",
    category: "Vases",
    images: [
      `${B}/Terra-vase-1.JPG`,
      `${B}/Terra-vase-2.JPG`,
      `${B}/Terra-vase3.JPG`,
      `${B}/Terra-vase-peach-1.JPG`,
      `${B}/Terra-vase-peach2.JPG`,
      `${B}/Terra-vase-peach3.JPG`,
      `${B}/Terra-vase-silver-1.JPG`,
      `${B}/Terra-vase-silver-2.JPG`,
      `${B}/Terra-vase-silver-3.JPG`,
    ],
  },
  {
    name: "Luna Vase",
    category: "Vases",
    images: [
      `${B}/Lunavase1.JPG`,
      `${B}/Lunavase2.JPG`,
      `${B}/Lunavase3.jpg`,
      `${B}/lunavaseb1.JPG`,
      `${B}/lunavaseb3.JPG`,
    ],
  },
  {
    name: "Maya Vase",
    category: "Vases",
    images: [
      `${B}/mayavasec1.JPG`,
      `${B}/mayavasec2.JPG`,
      `${B}/mayavased1.JPG`,
      `${B}/mayavased2.JPG`,
    ],
  },
];

export default function VasesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

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

      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-4 lg:px-20">
        {vases.map((product) => (
          <ProductSliderCard key={product.name} {...product} />
        ))}
      </div>

      <FooterSection />
    </main>
  );
}
