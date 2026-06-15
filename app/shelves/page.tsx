import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductSliderCard } from "@/components/product-slider-card";

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

const shelves = [
  {
    name: "Verse",
    type: "Wall-mounted",
    price: 3500,
    dimensions: "36×14×59 cm",
    description: "A harmonious blend of form and function, inspired by the fluidity of poetry. Its sleek, flat surface meets a striking triangular silhouette, creating a dynamic visual rhythm.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Narrative",
    type: "Free Standing",
    price: 39500,
    dimensions: "72×19×150 cm",
    description: "Embodies the intricate journey of storytelling, with a design that blends bold straight lines and graceful curves.",
    images: [`${B}/Narrative-bookshelf1.png`, `${B}/Narrative-bookshelf2.png`, `${B}/Narrative-bookshelf3.png`],
  },
  {
    name: "Sonnet",
    type: "Wall-mounted",
    price: 6500,
    dimensions: "14×11×96 cm",
    description: "A sleek, long bookshelf with a subtle, almost invisible design, creates the illusion of floating books.",
    images: [`${B}/sonnet-bookshelf.png`],
  },
  {
    name: "Scroll",
    type: "Wall-mounted",
    price: 8500,
    dimensions: "30×11×96 cm",
    description: "A sophisticated invisible bookshelf designed to blend functionality with modern elegance. Its long and sleek C-shaped display creates the illusion of floating books.",
    images: [`${B}/scroll-bookshelf1.png`, `${B}/scroll-bookshelf2.png`],
  },
  {
    name: "Saga",
    type: "Wall-mounted",
    price: 7500,
    dimensions: "64×11×87 cm",
    description: "A unique invisible bookshelf crafted to transform your book collection into a dynamic display. Its long diagonal design adds an eye-catching geometric flair.",
    images: [`${B}/Saga-bookshelf1.png`],
  },
  {
    name: "Index",
    type: "Wall-mounted",
    price: 9500,
    dimensions: "32×14×76 cm",
    description: "A clever fusion of form and function, featuring a two-way design with invisible folds.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Preface (Big)",
    type: "Free Standing",
    price: 16500,
    dimensions: "30×25×133 cm",
    description: "Grid-like sections designed to display books and decorative pieces. A striking, complex bend at the top adds architectural drama.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Preface (Small)",
    type: "Table Top",
    price: 11500,
    dimensions: "21×21×100 cm",
    description: "Grid-like sections designed to display books and decorative pieces. A striking, complex bend at the top adds architectural drama.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Prologue",
    type: "Free Standing",
    price: 17500,
    dimensions: "35×25×127 cm",
    description: "A bold statement of design, featuring four long, alternating boxes that extend inward and outward.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Chapter",
    type: "Table Top",
    price: 7000,
    dimensions: "44×25×80 cm",
    description: "Combines functionality with soft, rounded edges for a modern, inviting look.",
    images: [`${B}/Chapter-bookshelf1.png`, `${B}/Chapter-bookshelf2.png`],
  },
  {
    name: "Tale",
    type: "Wall-mounted",
    price: 8000,
    dimensions: "59×11×82 cm",
    description: "Features a striking, tapered ladder design with three angled compartments.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Ink (Set of 2)",
    type: "Wall-mounted",
    price: 1500,
    dimensions: "15×10×10 cm",
    description: "Compact and minimalist design, offering an invisible display for your books.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Drama",
    type: "Free Standing",
    price: 18500,
    dimensions: "108×25×118 cm",
    description: "Two inverted ladders joining at the top in a dramatic, floor-mounted structure.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Volume 1",
    type: "Free Standing",
    price: 4800,
    dimensions: "30×30×36 cm",
    description: "Stackable cubes with a minimalist design — use alone or layer for a modular display.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Volume 2",
    type: "Free Standing",
    price: 9500,
    dimensions: "30×30×75 cm",
    description: "Stackable cubes with a minimalist design — use alone or layer for a modular display.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Fiction (Set of 2)",
    type: "Wall-mounted",
    price: 6500,
    dimensions: "24×160×25 cm",
    description: "Asymmetric, hanging design, creating a sense of intrigue and movement.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Genre",
    type: "Wall-mounted",
    price: 5500,
    dimensions: "35×9.5×40 cm",
    description: "A hanging side holder that's perfect for magazines or books. Its curved top doubles as a compact table.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Quill",
    type: "Wall-mounted",
    price: 4000,
    dimensions: "72×14×20 cm",
    description: "Bold triangular center, flanked by wing-like extensions on both sides.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Prose",
    type: "Wall-mounted",
    price: 1800,
    dimensions: "43×14×9.5 cm",
    description: "Straightforward and clean design, mirrors the simplicity and flow of a well-crafted prose.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Ballad",
    type: "Wall-mounted",
    price: 13500,
    dimensions: "40×15.5×70 cm",
    description: "Four unique shelves that come together in a harmonious display with complex bends and fluid lines.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Epic",
    type: "Wall-mounted",
    price: 9500,
    dimensions: "23×22×70 cm",
    description: "Bold double-Z shape, with four spacious compartments.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Stanza",
    type: "Wall-mounted",
    price: 3800,
    dimensions: "25.5×14×52 cm",
    description: "Double-sided design that allows for a dynamic display with seamless invisible folds at the ends.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Chronicle",
    type: "Free Standing",
    price: 14500,
    dimensions: "30×30×150 cm",
    description: "Long, floor-mounted design featuring simple, precise folds.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Binding",
    type: "Free Standing",
    price: 41500,
    dimensions: "62×21×200 cm",
    description: "Sleek, modern design with a long pipe that elegantly connects three triangles on opposite sides.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Draft",
    type: "Wall-mounted",
    price: 8500,
    dimensions: "25×20×75 cm",
    description: "Bold zig-zag design, symbolizing the creative process in motion.",
    images: [`${B}/shelf1.png`],
  },
  {
    name: "Parable",
    type: "Table Top",
    price: 6000,
    dimensions: "71×28×31 cm",
    description: "Long, tabletop design that offers ample capacity for books. Functional and versatile.",
    images: [`${B}/shelf1.png`],
  },
].map((s) => ({ ...s, category: "Shelves" }));

export default function ShelvesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="text-xs uppercase tracking-widest text-sandcast font-space-mono mb-4">Mettali Collection</p>
        <h1 className="text-4xl md:text-5xl text-mulled-iron font-horizon uppercase tracking-wide">Shelves</h1>
        <p className="mt-4 text-sm text-slate-moss font-space-mono max-w-sm mx-auto">
          Wall-mounted and freestanding aluminium shelves — precision formed, built to last.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 px-6 pb-28 md:grid-cols-3 md:px-12 lg:grid-cols-4 lg:px-20">
        {shelves.map((p) => <ProductSliderCard key={p.name} {...p} />)}
      </div>
      <FooterSection />
    </main>
  );
}
