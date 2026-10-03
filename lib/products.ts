export interface ProductSizeOption {
  label: string;
  price: number;
  dimensions: string;
  weight?: string;
  images?: string[];
  shopify?: { productId: string; variantId: string; handle: string };
}

export interface ProductColor {
  name: string;
  hex: string;
  /** Finish-specific gallery. When set, picking this swatch swaps the images. */
  images?: string[];
}

export interface Product {
  name: string;
  shopify?: { productId: string; variantId: string; handle: string };
  category: string;
  price: number;
  dimensions: string;
  description: string;
  images: string[];
  /** Index of the photo the shop card fades to on hover. Defaults to the last photo. */
  hoverIndex?: number;
  type?: string;
  weight?: string;
  sizes?: ProductSizeOption[];
  /** Heading shown above the `sizes` buttons. Defaults to "Size" — set it when the options are a finish or similar. */
  optionLabel?: string;
  colors?: ProductColor[];
}

// Named finishes from the Mettali catalog's "Colors & Finishes" page.
const PALETTE: Record<string, string> = {
  "Black Onyx": "#2C2B2F",
  "Crimson Red": "#782229",
  "Moss Green": "#304034",
  "Ash Champagne": "#BBAD9F",
  "Pearl White": "#F0EDEF",
  "Copper Flame": "#B57265",
  "Shadow Silver": "#CAC7C3",
  Sage: "#B1B991",
  Espresso: "#3B2B24",
  "Sunset Gold": "#E6B174",
};

// A swatch is just a palette name, or that name plus its own set of photos.
type ColorSpec = string | { name: string; images: string[] };

function colors(...specs: ColorSpec[]): ProductColor[] {
  return specs.map((spec) =>
    typeof spec === "string"
      ? { name: spec, hex: PALETTE[spec] }
      : { name: spec.name, hex: PALETTE[spec.name], images: spec.images }
  );
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const B = "/products1_webp/products1";
const B2 = "/products2";

export const shelves: Product[] = [
  {
    name: "Verse", shopify: { productId: "gid://shopify/Product/8824406704281", variantId: "gid://shopify/ProductVariant/48361779626137", handle: "verse" },
    type: "Wall-mounted",
    price: 2500,
    dimensions: "36×14×59 cm",
    weight: "1 kg",
    description: "A harmonious blend of form and function, inspired by the fluidity of poetry. Its sleek, flat surface meets a striking triangular silhouette, creating a dynamic visual rhythm.",
    images: [`${B2}/shelf1.webp`],
  },
  {
    name: "Narrative", shopify: { productId: "gid://shopify/Product/8824406737049", variantId: "gid://shopify/ProductVariant/48361779658905", handle: "narrative-big" },
    type: "Free Standing",
    price: 22000,
    dimensions: "72×22×150 cm",
    weight: "14 kg",
    description: "Embodies the intricate journey of storytelling, with a design that blends bold straight lines and graceful curves.",
    images: [`${B}/Narrative-bookshelf1.webp`, `${B}/Narrative-bookshelf2.webp`, `${B}/Narrative-bookshelf3.webp`, "/images/lifestyle%20images/narrative.png"],
    colors: colors("Black Onyx", "Sage", "Moss Green"),
    sizes: [
      {
        label: "Big",
        price: 22000,
        dimensions: "72×22×150 cm",
        weight: "14 kg",
        shopify: { productId: "gid://shopify/Product/8824406737049", variantId: "gid://shopify/ProductVariant/48361779658905", handle: "narrative-big" },
      },
      {
        label: "Small",
        price: 14000,
        dimensions: "56×22×106 cm",
        weight: "7 kg",
        shopify: { productId: "gid://shopify/Product/8824406769817", variantId: "gid://shopify/ProductVariant/48361779724441", handle: "narrative-small" },
      },
    ],
  },
  {
    name: "Index", shopify: { productId: "gid://shopify/Product/8824406900889", variantId: "gid://shopify/ProductVariant/48361779888281", handle: "index" },
    type: "Wall-mounted",
    price: 4000,
    dimensions: "32×14×76 cm",
    weight: "1.5 kg",
    description: "A clever fusion of form and function, featuring a two-way design with invisible folds.",
    images: ["/images/index1.jpeg", `${B}/index-1.webp`, `${B}/index-2.webp`],
    colors: colors("Crimson Red", "Black Onyx", "Pearl White", "Ash Champagne"),
  },
  {
    name: "Preface (Big)", shopify: { productId: "gid://shopify/Product/8824407195801", variantId: "gid://shopify/ProductVariant/48361780052121", handle: "preface-big" },
    type: "Free Standing",
    price: 15500,
    dimensions: "30×25×133 cm",
    weight: "10 kg",
    description: "Grid-like sections designed to display books and decorative pieces. A striking, complex bend at the top adds architectural drama.",
    images: ["/mettali%20products/preface-bookshelf-0-transparent.png", `${B}/preface-big-1.webp`, "/images/lifestyle%20images/preface.png"],
    colors: colors("Black Onyx", "Pearl White", "Ash Champagne"),
  },
  {
    name: "Preface (Small)", shopify: { productId: "gid://shopify/Product/8824407949465", variantId: "gid://shopify/ProductVariant/48361780969625", handle: "preface-small" },
    type: "Table Top",
    price: 8500,
    dimensions: "21×21×100 cm",
    weight: "5 kg",
    description: "Grid-like sections designed to display books and decorative pieces. A striking, complex bend at the top adds architectural drama.",
    images: [`${B2}/shelf1.webp`],
    colors: colors("Black Onyx", "Pearl White", "Ash Champagne"),
  },
  {
    name: "Prologue", shopify: { productId: "gid://shopify/Product/8824407982233", variantId: "gid://shopify/ProductVariant/48361781002393", handle: "prologue" },
    type: "Free Standing",
    price: 14000,
    dimensions: "35×25×127 cm",
    weight: "8 kg",
    description: "A bold statement of design, featuring four long, alternating boxes that extend inward and outward.",
    images: [`${B2}/shelf1.webp`],
  },
  {
    name: "Chapter", shopify: { productId: "gid://shopify/Product/8824408080537", variantId: "gid://shopify/ProductVariant/48361781100697", handle: "chapter" },
    type: "Table Top",
    price: 5500,
    dimensions: "44×25×80 cm",
    weight: "4 kg",
    description: "Combines functionality with soft, rounded edges for a modern, inviting look.",
    images: [`${B}/Chapter-bookshelf2.webp`, `${B}/Chapter-bookshelf1.webp`, "/images/lifestyle%20images/chapter.png"],
    colors: colors("Black Onyx", "Pearl White", "Shadow Silver"),
  },
  {
    name: "Tale", shopify: { productId: "gid://shopify/Product/8824408211609", variantId: "gid://shopify/ProductVariant/48361781231769", handle: "tale" },
    type: "Wall-mounted",
    price: 5500,
    dimensions: "59×11×82 cm",
    weight: "2 kg",
    description: "Features a striking, tapered ladder design with three angled compartments.",
    images: [`${B}/tale-0.webp`, `${B}/tale-1.webp`, "/images/lifestyle%20images/tale.png"],
    colors: colors("Black Onyx", "Pearl White", "Ash Champagne"),
  },
  {
    name: "Ink (Set of 3)", shopify: { productId: "gid://shopify/Product/8824408277145", variantId: "gid://shopify/ProductVariant/48361781330073", handle: "ink-set-of-3" },
    type: "Wall-mounted",
    price: 1500,
    dimensions: "15×10×10 cm",
    weight: "0.5 kg",
    description: "Compact and minimalist design, offering an invisible display for your books.",
    images: [`${B}/ink-3.webp`, `${B}/ink-1.webp`, "/images/lifestyle%20images/ink.png"],
  },
  {
    name: "Drama", shopify: { productId: "gid://shopify/Product/8824408309913", variantId: "gid://shopify/ProductVariant/48361781362841", handle: "drama" },
    type: "Free Standing",
    price: 9500,
    dimensions: "108×25×118 cm",
    weight: "5 kg",
    description: "Two inverted ladders joining at the top in a dramatic, floor-mounted structure.",
    images: [`${B2}/shelf1.webp`],
  },
  {
    name: "Volume 1", shopify: { productId: "gid://shopify/Product/8824408342681", variantId: "gid://shopify/ProductVariant/48361781428377", handle: "volume-1" },
    type: "Free Standing",
    price: 4200,
    dimensions: "30×30×36 cm",
    weight: "2 kg",
    description: "Stackable cubes with a minimalist design — use alone or layer for a modular display.",
    images: [`${B}/volume1-0.webp`, `${B}/volume1-1.webp`, "/images/lifestyle%20images/volume1.png"],
    colors: colors("Black Onyx", "Pearl White", "Ash Champagne"),
  },
  {
    name: "Volume 2", shopify: { productId: "gid://shopify/Product/8824408375449", variantId: "gid://shopify/ProductVariant/48361781461145", handle: "volume-2" },
    type: "Free Standing",
    price: 7500,
    dimensions: "30×30×75 cm",
    weight: "4 kg",
    description: "Stackable cubes with a minimalist design — use alone or layer for a modular display.",
    images: [`${B}/volume2-1.webp`, "/images/lifestyle%20images/volume2.png"],
  },
  {
    name: "Fiction", shopify: { productId: "gid://shopify/Product/8824408408217", variantId: "gid://shopify/ProductVariant/48361781493913", handle: "fiction" },
    type: "Wall-mounted",
    price: 5000,
    dimensions: "24×160×25 cm",
    weight: "3 kg",
    description: "Asymmetric, hanging design, creating a sense of intrigue and movement.",
    images: [`${B2}/shelf1.webp`],
  },
  {
    name: "Genre", shopify: { productId: "gid://shopify/Product/8824408440985", variantId: "gid://shopify/ProductVariant/48361781526681", handle: "genre" },
    type: "Wall-mounted",
    price: 4000,
    dimensions: "35×9.5×40 cm",
    weight: "2 kg",
    description: "A hanging side holder that's perfect for magazines or books. Its curved top doubles as a compact table.",
    images: ["/images2/categories/genre shelf signature product.PNG", "/images2/categories/genre shelf- signature product hover.PNG", "/images/lifestyle%20images/genre.png"],
    colors: colors("Ash Champagne", "Black Onyx", "Shadow Silver"),
  },
  {
    name: "Quill", shopify: { productId: "gid://shopify/Product/8824408473753", variantId: "gid://shopify/ProductVariant/48361781559449", handle: "quill" },
    type: "Wall-mounted",
    price: 2700,
    dimensions: "72×14×20 cm",
    weight: "1 kg",
    description: "Bold triangular center, flanked by wing-like extensions on both sides.",
    images: [`${B}/quill-0.webp`, `${B}/quill-1.webp`, "/images/lifestyle%20images/quill.png"],
    colors: colors("Black Onyx", "Pearl White", "Crimson Red", "Ash Champagne"),
  },
  {
    name: "Prose (Set of 2)", shopify: { productId: "gid://shopify/Product/8824408539289", variantId: "gid://shopify/ProductVariant/48361781657753", handle: "prose-set-of-2" },
    type: "Wall-mounted",
    price: 2000,
    dimensions: "43×14×9.5 cm",
    weight: "0.7 kg",
    description: "Straightforward and clean design, mirrors the simplicity and flow of a well-crafted prose.",
    images: [`${B}/prose-0.webp`, `${B}/prose-1.webp`, "/images/lifestyle%20images/prose.png"],
    colors: colors("Black Onyx", "Pearl White", "Crimson Red", "Sage"),
  },
  {
    name: "Ballad", shopify: { productId: "gid://shopify/Product/8824408604825", variantId: "gid://shopify/ProductVariant/48361781788825", handle: "ballad" },
    type: "Wall-mounted",
    price: 8500,
    dimensions: "40×15.5×70 cm",
    weight: "7 kg",
    description: "Four unique shelves that come together in a harmonious display with complex bends and fluid lines.",
    images: ["/mettali%20products/ballad-0-transparent.png", `${B}/ballad-1.webp`, "/images/lifestyle%20images/ballad.png"],
    colors: colors("Black Onyx", "Pearl White", "Ash Champagne"),
  },
  {
    name: "Epic", shopify: { productId: "gid://shopify/Product/8824408637593", variantId: "gid://shopify/ProductVariant/48361781854361", handle: "epic" },
    type: "Wall-mounted",
    price: 5500,
    dimensions: "23×22×70 cm",
    weight: "3 kg",
    description: "Bold double-Z shape, with four spacious compartments.",
    images: [`${B2}/shelf1.webp`],
  },
  {
    name: "Stanza", shopify: { productId: "gid://shopify/Product/8824408670361", variantId: "gid://shopify/ProductVariant/48361781887129", handle: "stanza" },
    type: "Wall-mounted",
    price: 2200,
    dimensions: "25.5×14×52 cm",
    weight: "1 kg",
    description: "Double-sided design that allows for a dynamic display with seamless invisible folds at the ends.",
    images: [`${B2}/shelf1.webp`],
  },
  {
    name: "Chronicle", shopify: { productId: "gid://shopify/Product/8824408703129", variantId: "gid://shopify/ProductVariant/48361781919897", handle: "chronicle" },
    type: "Free Standing",
    price: 8500,
    dimensions: "30×30×150 cm",
    weight: "5.5 kg",
    description: "Long, floor-mounted design featuring simple, precise folds.",
    images: [`${B}/chronicle-1.webp`, "/images/Chronicle.jpeg", `${B2}/chronicle-2.webp`, "/images/lifestyle%20images/chronicle.png"],
    colors: colors("Black Onyx", "Pearl White", "Sage", "Crimson Red"),
  },
  {
    name: "Binding", shopify: { productId: "gid://shopify/Product/8824408735897", variantId: "gid://shopify/ProductVariant/48361781952665", handle: "binding" },
    type: "Free Standing",
    price: 17500,
    dimensions: "62×21×200 cm",
    weight: "10 kg",
    description: "Sleek, modern design with a long pipe that elegantly connects three triangles on opposite sides.",
    images: ["/mettali%20products/binding-freestanding-bookshelf-0-transparent.png", `${B}/binding-1.webp`, "/images/lifestyle%20images/binding.png"],
    colors: colors("Black Onyx"),
  },
  {
    name: "Draft", shopify: { productId: "gid://shopify/Product/8824408768665", variantId: "gid://shopify/ProductVariant/48361781985433", handle: "draft" },
    type: "Wall-mounted",
    price: 4500,
    dimensions: "25×20×75 cm",
    weight: "3 kg",
    description: "Bold zig-zag design, symbolizing the creative process in motion.",
    images: [`${B2}/shelf1.webp`],
  },
  {
    name: "Parable", shopify: { productId: "gid://shopify/Product/8824408801433", variantId: "gid://shopify/ProductVariant/48361782050969", handle: "parable" },
    type: "Table Top",
    price: 3500,
    dimensions: "71×28×31 cm",
    weight: "2.5 kg",
    description: "Long, tabletop design that offers ample capacity for books. Functional and versatile.",
    images: ["/mettali%20products/parabel-tabletop-bookshelf.png", `${B}/parable-1.webp`, "/images/lifestyle%20images/parabel.png"],
    colors: colors("Black Onyx", "Pearl White", "Crimson Red", "Sage"),
  },
]
  .map((s) => ({ ...s, category: "Shelves" }))
  .filter((p) => !(p.images.length === 1 && p.images[0] === `${B2}/shelf1.webp`));

export const vases: Product[] = [
  {
    name: "Luna Vase", shopify: { productId: "gid://shopify/Product/8824408899737", variantId: "gid://shopify/ProductVariant/48361782247577", handle: "luna-vase" },
    category: "Vases",
    price: 1500,
    dimensions: "13×10×31 cm",
    weight: "1 kg",
    description: "Modern rectangular frame with a built-in metal vase. Perfect for single stems, dried flowers, or minimal arrangements.",
    images: [`${B2}/luna-copper-0.webp`, `${B2}/luna-copper-1.webp`, `${B2}/luna-copper-2.webp`, `${B2}/luna-copper-3.webp`, `${B2}/luna-copper-4.webp`, `${B2}/luna-copper-5.webp`, `${B2}/luna-copper-6.webp`],
    hoverIndex: 2,
    colors: colors(
      { name: "Copper Flame", images: [`${B2}/luna-copper-0.webp`, `${B2}/luna-copper-1.webp`, `${B2}/luna-copper-2.webp`, `${B2}/luna-copper-3.webp`, `${B2}/luna-copper-4.webp`, `${B2}/luna-copper-5.webp`, `${B2}/luna-copper-6.webp`] },
      // TODO: no Shopify variant for the gold finish yet — it checks out as the base variant.
      { name: "Sunset Gold", images: [`${B2}/luna-vase-gold-0.webp`, "/images/lifestyle%20images/luna-gold.png"] },
      "Shadow Silver",
      "Ash Champagne"
    ),
  },
  {
    name: "Maya Vase", shopify: { productId: "gid://shopify/Product/8824408998041", variantId: "gid://shopify/ProductVariant/48361782476953", handle: "maya-vase" },
    category: "Vases",
    price: 1600,
    dimensions: "20×20×24 cm",
    weight: "1 kg",
    description: "A minimalist sculptural vase that doubles as a work of art. Ideal for single stems or delicate arrangements.",
    images: [`${B2}/maya-champagne-0.webp`, `${B2}/maya-champagne-1.webp`, "/images/lifestyle%20images/maya-champagne.png", `${B}/mayavasec1.webp`, "/images/lifestyle%20images/Maya.png", `${B}/mayavasec2.webp`],
    hoverIndex: 2,
    // Champagne leads so the opening swatch matches the default photos.
    colors: colors(
      { name: "Ash Champagne", images: [`${B2}/maya-champagne-0.webp`, `${B2}/maya-champagne-1.webp`, "/images/lifestyle%20images/maya-champagne.png", `${B}/mayavasec1.webp`, "/images/lifestyle%20images/Maya.png", `${B}/mayavasec2.webp`] },
      { name: "Shadow Silver", images: [`${B}/mayavasec1.webp`, `${B}/mayavasec2.webp`, "/images/lifestyle%20images/Maya.png"] },
      "Copper Flame",
      "Sunset Gold"
    ),
  },
  {
    name: "Terra Vase", shopify: { productId: "gid://shopify/Product/8824409030809", variantId: "gid://shopify/ProductVariant/48361782542489", handle: "terra-vase" },
    category: "Vases",
    price: 1600,
    dimensions: "11×11×30 cm",
    weight: "1 kg",
    description: "Striking hexagonal silhouette with clean, precise lines. A sophisticated statement piece that stands alone or holds botanicals.",
    images: [`${B2}/Terra-vase-0.webp`, "/images/lifestyle%20images/terra.png", `${B2}/terra-vase-2.webp`, "/images/lifestyle%20images/terra-silver.png", `${B2}/terra-vase-5.webp`, `${B2}/terra-vase-6.webp`],
    hoverIndex: 1,
    colors: colors(
      { name: "Crimson Red", images: [`${B2}/Terra-vase-0.webp`, "/images/lifestyle%20images/terra.png", `${B2}/terra-vase-2.webp`, "/images/lifestyle%20images/terra-silver.png", `${B2}/terra-vase-5.webp`, `${B2}/terra-vase-6.webp`] },
      "Copper Flame",
      "Sunset Gold",
      // TODO: no Shopify variant for the silver finish yet — it checks out as the base variant.
      { name: "Shadow Silver", images: [`${B2}/Terra-vase-silver-0.webp`, "/images/lifestyle%20images/terra-silver.png"] },
      "Black Onyx"
    ),
  },
  {
    name: "Cala Vase", shopify: { productId: "gid://shopify/Product/8824409096345", variantId: "gid://shopify/ProductVariant/48361782640793", handle: "cala-vase" },
    category: "Vases",
    price: 1300,
    dimensions: "10.5×10.5×20 cm",
    weight: "0.5 kg",
    description: "Flowing form with elegant curved panels and a soft, scalloped rim. A versatile accent for any shelf, desk, or tabletop.",
    images: [`${B2}/cala-vase-0.webp`, `${B2}/cala-vase-1.webp`, `${B2}/cala-vase-2.webp`, `${B2}/cala-vase-3.webp`, `${B2}/cala-vase-4.webp`],
    hoverIndex: 1,
    colors: colors("Moss Green", "Crimson Red", "Black Onyx"),
  },
];

export const wineHolders: Product[] = [
  {
    name: "Riva", shopify: { productId: "gid://shopify/Product/8824409325721", variantId: "gid://shopify/ProductVariant/48361783001241", handle: "riva" },
    category: "Wine Holders",
    price: 2900,
    dimensions: "41.5×41.5×14 cm",
    weight: "1.5 kg",
    description: "Architectural wave design holding up to 4 bottles. A sculptural countertop centrepiece that transforms wine storage into functional art.",
    images: [`${B}/Riva.webp`, "/images/lifestyle%20images/RIVA.png", `${B}/Riva2.webp`, `${B2}/riva-3.webp`],
    hoverIndex: 1,
    colors: colors("Black Onyx", "Sunset Gold", "Shadow Silver", "Ash Champagne"),
  },
  {
    name: "Maison", shopify: { productId: "gid://shopify/Product/8824409358489", variantId: "gid://shopify/ProductVariant/48361783034009", handle: "maison" },
    category: "Wine Holders",
    price: 3200,
    dimensions: "40×22×25 cm",
    weight: "2 kg",
    description: "Striking honeycomb structure holding 6 bottles. Contemporary geometric precision meets premium freestanding wine storage.",
    images: [`${B2}/Shelf%20art-2570.webp`, `${B2}/maison-onyx-1.webp`, `${B2}/Shelf%20art-2573.webp`, `${B2}/Shelf%20art-2568.webp`, "/images/lifestyle%20images/maison.png", `${B2}/Shelf%20art-2567.webp`],
    hoverIndex: 1,
    colors: colors(
      { name: "Black Onyx", images: [`${B2}/Shelf%20art-2570.webp`, `${B2}/maison-onyx-1.webp`, `${B2}/Shelf%20art-2573.webp`, `${B2}/Shelf%20art-2568.webp`, "/images/lifestyle%20images/maison.png", `${B2}/Shelf%20art-2567.webp`] },
      // TODO: no Shopify variant for the gold finish yet — it checks out as the base variant.
      { name: "Sunset Gold", images: [`${B2}/Shelf%20art-2568.webp`, `${B2}/Shelf%20art-2567.webp`, "/images/lifestyle%20images/maison.png"] },
      "Shadow Silver",
      "Ash Champagne"
    ),
  },
  {
    name: "Clink", shopify: { productId: "gid://shopify/Product/8824409391257", variantId: "gid://shopify/ProductVariant/48361783066777", handle: "clink" },
    category: "Wine Holders",
    price: 3200,
    dimensions: "19×14.5×60 cm",
    weight: "2 kg",
    description: "Sleek vertical wall-mounted rack presenting your collection as a floating display. Modular — install one unit or build an entire wine wall.",
    images: [`${B}/clink0.webp`, "/images/lifestyle%20images/clink.png", `${B}/clink1.webp`, `${B2}/clink-3.webp`],
    hoverIndex: 1,
    colors: colors("Black Onyx", "Sunset Gold", "Shadow Silver", "Ash Champagne"),
  },
  {
    name: "Opera", shopify: { productId: "gid://shopify/Product/8824409489561", variantId: "gid://shopify/ProductVariant/48361783230617", handle: "opera" },
    category: "Wine Holders",
    price: 2800,
    dimensions: "40×14.5×39 cm",
    weight: "1.5 kg",
    description: "Wheel-shaped design with artistic cut-outs holding 6 bottles. A dramatic countertop centrepiece inspired by grand performance.",
    images: [`${B2}/Shelf%20art-2559.webp`, "/images/lifestyle%20images/opera.png", `${B2}/Shelf%20art-2560.webp`],
    hoverIndex: 1,
    colors: colors("Black Onyx", "Sunset Gold", "Shadow Silver", "Ash Champagne"),
  },
];

export const organisers: Product[] = [
  {
    name: "Linea Organiser", shopify: { productId: "gid://shopify/Product/8824409555097", variantId: "gid://shopify/ProductVariant/48361783328921", handle: "linea-organiser" },
    category: "Organisers",
    price: 2100,
    dimensions: "15.5×10×45 cm",
    weight: "1 kg",
    description: "Minimalist tabletop organiser with a stunning continuous silhouette. Ideal as a vanity tray, desk accessory, or countertop shelf.",
    images: [`${B2}/Shelf%20art-2534.webp`, "/images/lifestyle%20images/linea.png", `${B}/Linea%20organiser-green2.webp`, `${B}/Linea-organiser-green.webp`, `${B2}/linea-4.webp`],
    hoverIndex: 1,
    colors: colors("Copper Flame", "Black Onyx", "Sunset Gold", "Sage", "Moss Green"),
  },
  {
    name: "Perch Organiser", shopify: { productId: "gid://shopify/Product/8824409587865", variantId: "gid://shopify/ProductVariant/48361783361689", handle: "perch-organiser" },
    category: "Organisers",
    price: 8000,
    dimensions: "73×15×40 cm",
    weight: "7 kg",
    description: "Multi-faceted organiser with staggered compartments. Works freestanding or wall-mounted — perfect for mugs, perfumes, or collectibles.",
    images: ["/images/perch-organisser.png", "/images/lifestyle%20images/perch.png", `${B2}/perch-silver-2.webp`, `${B2}/perch-silver-3.webp`, `${B2}/perch-silver-4.webp`],
    hoverIndex: 1,
    // Silver leads so the opening swatch matches the default photos.
    colors: colors(
      { name: "Shadow Silver", images: ["/images/perch-organisser.png", "/images/lifestyle%20images/perch.png", `${B2}/perch-silver-2.webp`, `${B2}/perch-silver-3.webp`, `${B2}/perch-silver-4.webp`] },
      // TODO: black has only the one studio shot so far, and no Shopify variant.
      { name: "Black Onyx", images: [`${B2}/perch-onyx-0.webp`] },
      "Ash Champagne"
    ),
  },
  {
    name: "Nest Organiser", shopify: { productId: "gid://shopify/Product/8824409620633", variantId: "gid://shopify/ProductVariant/48361783394457", handle: "nest-organiser" },
    category: "Organisers",
    price: 4500,
    dimensions: "61×13×61 cm",
    weight: "3 kg",
    description: "Clean geometric grid with unique nesting cradles. A versatile display for coffee mugs, perfumes, or small decorative pieces.",
    images: ["/images/nest-organiser-1.png", "/images/lifestyle%20images/nest.png", `${B2}/nest-champagne-2.webp`, `${B2}/nest-champagne-3.webp`, `${B2}/nest-champagne-4.webp`],
    hoverIndex: 1,
    // Champagne leads so the opening swatch matches the default photos.
    colors: colors(
      { name: "Ash Champagne", images: ["/images/nest-organiser-1.png", "/images/lifestyle%20images/nest.png", `${B2}/nest-champagne-2.webp`, `${B2}/nest-champagne-3.webp`, `${B2}/nest-champagne-4.webp`] },
      // TODO: no Shopify variant for the black finish yet — it checks out as the base variant.
      { name: "Black Onyx", images: [`${B2}/nest-onyx-0.webp`, `${B2}/nest-onyx-1.webp`, "/images/lifestyle%20images/nest-onyx.png"] },
      "Espresso"
    ),
  },
  {
    name: "Brew Organiser",
    category: "Organisers",
    price: 5500,
    dimensions: "60×15×60 cm",
    description: "Bold cylindrical form with a sculptural silhouette. A statement display for mugs, bottles, or curated collectibles.",
    images: ["/images2/products/brew1.jpeg", "/images/lifestyle%20images/brew.jpeg"],
    hoverIndex: 1,
    colors: colors("Copper Flame", "Black Onyx", "Sunset Gold", "Sage", "Moss Green"),
  },
];

export const shoeRacks: Product[] = [
  {
    name: "Step", shopify: { productId: "gid://shopify/Product/8824409653401", variantId: "gid://shopify/ProductVariant/48361783492761", handle: "step" },
    category: "Shoe Display Racks",
    price: 900,
    dimensions: "28×10×24 cm",
    weight: "0.5 kg",
    description: "Wall-mounted cantilevered shelves presenting each shoe as a gallery object. Fully modular — arrange units into any creative configuration.",
    images: [`${B2}/step-shoerack1.webp`, "/images/lifestyle%20images/step.png", `${B2}/step-shoerack2.webp`],
    hoverIndex: 1,
    colors: colors("Shadow Silver", "Black Onyx"),
  },
  {
    name: "Vault", shopify: { productId: "gid://shopify/Product/8824409686169", variantId: "gid://shopify/ProductVariant/48361783656601", handle: "vault" },
    category: "Shoe Display Racks",
    price: 6500,
    dimensions: "31×27×61 cm",
    weight: "6 kg",
    description: "Space-saving design with a hidden front profile. Wall-mounted or freestanding, with customisable layers of 4, 6, or 8.",
    images: [`${B2}/Vaultshoerack0.webp`, "/images/lifestyle%20images/vault.png", `${B2}/Vaultshoerack1.webp`],
    hoverIndex: 1,
    colors: colors("Black Onyx", "Shadow Silver", "Ash Champagne"),
  },
  {
    name: "Orbit", shopify: { productId: "gid://shopify/Product/8824410734745", variantId: "gid://shopify/ProductVariant/48361784705177", handle: "orbit" },
    category: "Shoe Display Racks",
    price: 5500,
    dimensions: "44×37.5×84 cm",
    weight: "4 kg",
    description: "Circular pods create a gallery-style wall showcase for your collection. Turns any wall into a striking piece of contemporary design.",
    images: [`${B}/Orbitshoerack0.webp`, "/images/lifestyle%20images/orbit.png", `${B}/Orbit-shoerack1.webp`, `${B2}/orbit-3.webp`],
    hoverIndex: 1,
    colors: colors("Black Onyx", "Shadow Silver", "Crimson Red", "Moss Green"),
  },
  {
    name: "Align", shopify: { productId: "gid://shopify/Product/8824411226265", variantId: "gid://shopify/ProductVariant/48361785786521", handle: "align" },
    category: "Shoe Display Racks",
    price: 3600,
    dimensions: "82.5×26×271 cm",
    weight: "3.5 kg",
    description: "A continuous zig-zag form forged from a single piece of premium aluminium. Bold graphic wall art that doubles as a sophisticated shoe display.",
    images: [`${B}/Alignshoerack0.webp`, "/images/lifestyle%20images/align.png", `${B}/Alignshoerack.webp`],
    hoverIndex: 1,
    colors: colors("Black Onyx", "Pearl White"),
  },
];
