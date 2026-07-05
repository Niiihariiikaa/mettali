export interface Product {
  name: string;
  category: string;
  price: number;
  dimensions: string;
  description: string;
  images: string[];
  type?: string;
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const B = "/images/WHITE%20BACKGROUND-20260529T063507Z-3-001/WHITE%20BACKGROUND";

export const shelves: Product[] = [
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

export const vases: Product[] = [
  {
    name: "Luna Vase",
    category: "Vases",
    price: 1500,
    dimensions: "13×10×31 cm",
    description: "Modern rectangular frame with a built-in metal vase. Perfect for single stems, dried flowers, or minimal arrangements.",
    images: [`${B}/Lunavase1.JPG`, `${B}/Lunavase2.JPG`, `${B}/Lunavase3.jpg`, `${B}/lunavaseb1.JPG`, `${B}/lunavaseb3.JPG`],
  },
  {
    name: "Maya Vase",
    category: "Vases",
    price: 1600,
    dimensions: "20×20×24 cm",
    description: "A minimalist sculptural vase that doubles as a work of art. Ideal for single stems or delicate arrangements.",
    images: [`${B}/mayavasec1.JPG`, `${B}/mayavasec2.JPG`, `${B}/mayavased1.JPG`, `${B}/mayavased2.JPG`],
  },
  {
    name: "Terra Vase",
    category: "Vases",
    price: 1600,
    dimensions: "11×11×30 cm",
    description: "Striking hexagonal silhouette with clean, precise lines. A sophisticated statement piece that stands alone or holds botanicals.",
    images: [
      `${B}/Terra-vase-1.JPG`, `${B}/Terra-vase-2.JPG`, `${B}/Terra-vase3.JPG`,
      `${B}/Terra-vase-peach-1.JPG`, `${B}/Terra-vase-peach2.JPG`, `${B}/Terra-vase-peach3.JPG`,
      `${B}/Terra-vase-silver-1.JPG`, `${B}/Terra-vase-silver-2.JPG`, `${B}/Terra-vase-silver-3.JPG`,
    ],
  },
  {
    name: "Cala Vase",
    category: "Vases",
    price: 1300,
    dimensions: "10.5×10.5×20 cm",
    description: "Flowing form with elegant curved panels and a soft, scalloped rim. A versatile accent for any shelf, desk, or tabletop.",
    images: [
      `${B}/Cala-vase-black1.JPG`, `${B}/Cala-vase-black2.JPG`, `${B}/Cala-vase-black3.JPG`,
      `${B}/Cala-vase-green-1.JPG`, `${B}/Cala-vase-green2.JPG`, `${B}/Cala-vase-green-3.JPG`,
    ],
  },
  {
    name: "Aura Vase (S)",
    category: "Vases",
    price: 1500,
    dimensions: "16×16×15 cm",
    description: "Innovative 3-in-1 modular set with playful wavy rims. Use together as a layered centrepiece or separately as individual accents.",
    images: [
      `${B}/Aura-vase-8.JPG`,`${B}/Aura-vase-1.JPG`, `${B}/Aura-vase-2.JPG`, `${B}/Aura-vase-3.JPG`, `${B}/Aura-vase-4.JPG`,
      `${B}/Aura-vase-5.JPG`,
    ],
  },
  {
    name: "Aura Vase (M)",
    category: "Vases",
    price: 1700,
    dimensions: "15×15×22 cm",
    description: "Innovative 3-in-1 modular set with playful wavy rims. Use together as a layered centrepiece or separately as individual accents.",
    images: [
      `${B}/Aura-vase-7.JPG`,`${B}/Aura-vase-1.JPG`, `${B}/Aura-vase-2.JPG`, `${B}/Aura-vase-3.JPG`, `${B}/Aura-vase-4.JPG`,
      `${B}/Aura-vase-5.JPG`,
    ],
  },
  {
    name: "Aura Vase (L)",
    category: "Vases",
    price: 1900,
    dimensions: "14×14×30 cm",
    description: "Innovative 3-in-1 modular set with playful wavy rims. Use together as a layered centrepiece or separately as individual accents.",
    images: [
      `${B}/Aura-vase-6.JPG`, `${B}/Aura-vase-1.JPG`, `${B}/Aura-vase-2.JPG`, `${B}/Aura-vase-3.JPG`, `${B}/Aura-vase-4.JPG`,
      `${B}/Aura-vase-5.JPG`,
    ],
  },
];

export const wineHolders: Product[] = [
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

export const organisers: Product[] = [
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

export const shoeRacks: Product[] = [
  {
    name: "Step",
    category: "Shoe Display Racks",
    price: 900,
    dimensions: "28×10×24 cm",
    description: "Wall-mounted cantilevered shelves presenting each shoe as a gallery object. Fully modular — arrange units into any creative configuration.",
    images: [`${B}/step-shoerack1.JPG`, `${B}/step-shoerack2.JPG`, `${B}/stepshoerack3.JPG`, `${B}/stepshoerackb2.JPG`],
  },
  {
    name: "Vault",
    category: "Shoe Display Racks",
    price: 6500,
    dimensions: "31×27×61 cm",
    description: "Space-saving design with a hidden front profile. Wall-mounted or freestanding, with customisable layers of 4, 6, or 8.",
    images: [`${B}/Vaultshoerack1.JPG`, `${B}/Vaultshoerack2.JPG`, `${B}/vaultshoerack3.JPG`],
  },
  {
    name: "Orbit",
    category: "Shoe Display Racks",
    price: 5500,
    dimensions: "44×37.5×84 cm",
    description: "Circular pods create a gallery-style wall showcase for your collection. Turns any wall into a striking piece of contemporary design.",
    images: [`${B}/Orbit-shoerack1.JPG`, `${B}/Orbitshoerack2.JPG`, `${B}/Orbitshoerack3.JPG`],
  },
  {
    name: "Align",
    category: "Shoe Display Racks",
    price: 3600,
    dimensions: "82.5×26×271 cm",
    description: "A continuous zig-zag form forged from a single piece of premium aluminium. Bold graphic wall art that doubles as a sophisticated shoe display.",
    images: [`${B}/Alignshoerack.JPG`, `${B}/Alignshoerack2.JPG`, `${B}/alignshoerack3.JPG`],
  },
  {
    name: "Penta",
    category: "Shoe Display Racks",
    price: 3800,
    dimensions: "106.5×26×33 cm",
    description: "Uniquely versatile floating wall shelf with five planes — holds shoes, books, small plants, and décor. A dynamic all-in-one display solution.",
    images: [`${B}/pentashoerack.JPG`, `${B}/pentashoerack2.JPG`],
  },
];
