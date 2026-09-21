// ─────────────────────────────────────────────────────────────────────────
// Static storefront content — single source of truth for the whole site.
// Shapes map 1:1 onto the future Express/Mongo API (Banner / Product / Space
// models), so swapping fetch() in later is a drop-in change.
// All Unsplash IDs below are verified-reachable.
// ─────────────────────────────────────────────────────────────────────────

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ── Hero slides ───────────────────────────────────────────────────────── */

export type Slide = {
  _id: string;
  image: { url: string };
  badge?: string;
  /** words wrapped in *asterisks* render as a serif italic accent */
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
};

export const SLIDES: Slide[] = [
  {
    _id: "s1",
    image: { url: U("photo-1618221195710-dd6b41faaea6") },
    badge: "Timeless · Natural · Considered",
    title: "Room for better *living.*",
    subtitle:
      "Furniture for a calmer tomorrow — sculptural forms, honest materials and quiet detail, made to belong in your home.",
    buttonText: "Explore the collection",
    buttonLink: "/collection",
  },
  {
    _id: "s2",
    image: { url: U("photo-1616486338812-3dadae4b4ace") },
    badge: "The Autumn Edit",
    title: "Warmth, *considered.*",
    subtitle:
      "Soft bouclé, oiled walnut and honed stone. A palette built to age beautifully alongside you.",
    buttonText: "Shop new arrivals",
    buttonLink: "/collection",
  },
  {
    _id: "s3",
    image: { url: U("photo-1524758631624-e2822e304c36") },
    badge: "Made to Belong",
    title: "Spaces for *real life.*",
    subtitle:
      "Designed to feel effortless, enduring and entirely yours — from the first coffee to the last light of day.",
    buttonText: "Discover spaces",
    buttonLink: "/spaces",
  },
];

/* ── Categories ────────────────────────────────────────────────────────── */

export type Category = { slug: string; name: string };

export const CATEGORIES: Category[] = [
  { slug: "seating", name: "Seating" },
  { slug: "sofas", name: "Sofas" },
  { slug: "tables", name: "Tables" },
  { slug: "storage", name: "Storage" },
  { slug: "lighting", name: "Lighting" },
  { slug: "accents", name: "Accents" },
];

/* ── Products ──────────────────────────────────────────────────────────── */

export type Product = {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string; // category slug
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  images: { url: string }[];
  colours: string[]; // hex swatches
  materials: string;
  dimensions: string;
  description: string;
};

const img = (...ids: string[]) => ids.map((id) => ({ url: U(id, 1400) }));

export const PRODUCTS: Product[] = [
  {
    _id: "p1",
    slug: "vera-lounge-chair",
    title: "Vera Lounge Chair",
    tagline: "Sculptural comfort",
    category: "seating",
    price: 1890,
    isNew: true,
    images: img(
      "photo-1567016432779-094069958ea5",
      "photo-1567016376408-0226e4d0c1ea",
      "photo-1616627561950-9f746e330187",
    ),
    colours: ["#e8e2d6", "#8f8574", "#3f4130"],
    materials: "Bouclé wool, solid oiled walnut frame",
    dimensions: "W 78 · D 82 · H 74 cm",
    description:
      "A quiet statement piece. Vera pairs a deep bouclé shell with a hand-finished walnut frame that curves to meet the body — sculptural from every angle, yet built for the long, slow evenings.",
  },
  {
    _id: "p2",
    slug: "linden-sofa",
    title: "Linden Sofa",
    tagline: "Inviting by design",
    category: "sofas",
    price: 3450,
    images: img(
      "photo-1493663284031-b7e3aefcae8e",
      "photo-1503602642458-232111445657",
      "photo-1555041469-a586c61ea9bc",
    ),
    colours: ["#ded7c8", "#c2b6a1", "#6f675c"],
    materials: "Feather-down cushions, kiln-dried hardwood",
    dimensions: "W 232 · D 98 · H 82 cm",
    description:
      "Generous, low and endlessly sink-in-able. Linden's rounded arms and feather-wrapped cushions make it the natural centre of a room — the place everyone drifts back to.",
  },
  {
    _id: "p3",
    slug: "alden-sideboard",
    title: "Alden Sideboard",
    tagline: "Natural character",
    category: "storage",
    price: 2950,
    images: img(
      "photo-1595428774223-ef52624120d2",
      "photo-1524758631624-e2822e304c36",
      "photo-1616137466211-f939a420be84",
    ),
    colours: ["#8a6a49", "#c9bda6"],
    materials: "Solid walnut, brushed-brass hardware",
    dimensions: "W 180 · D 45 · H 72 cm",
    description:
      "Storage with presence. Alden's fluted walnut doors and slim brass pulls hide generous space within — grain matched by hand so each piece carries its own signature.",
  },
  {
    _id: "p4",
    slug: "noa-armchair",
    title: "Noa Armchair",
    tagline: "Softly grounded",
    category: "seating",
    price: 1650,
    isNew: true,
    images: img(
      "photo-1584622650111-993a426fbf0a",
      "photo-1615874959474-d609969a20ed",
    ),
    colours: ["#e8e2d6", "#a89a84"],
    materials: "Brushed cotton weave, powder-coated steel",
    dimensions: "W 72 · D 76 · H 78 cm",
    description:
      "A rounded, welcoming form on a fine tapered base. Noa is light enough to move with the seasons, substantial enough to anchor a reading corner for years.",
  },
  {
    _id: "p5",
    slug: "sol-dining-table",
    title: "Sol Dining Table",
    tagline: "Gather, slowly",
    category: "tables",
    price: 2780,
    images: img(
      "photo-1617806118233-18e1de247200",
      "photo-1600210492486-724fe5c67fb0",
    ),
    colours: ["#b79a76", "#e5ddcd"],
    materials: "Solid oak, hand-oiled finish",
    dimensions: "L 220 · W 100 · H 75 cm",
    description:
      "Built around long lunches and longer conversations. A single plank-matched oak top rests on soft cylindrical legs — honest, tactile and made to be marked by a life well lived.",
  },
  {
    _id: "p6",
    slug: "mira-floor-lamp",
    title: "Mira Floor Lamp",
    tagline: "Warm, low light",
    category: "lighting",
    price: 640,
    images: img(
      "photo-1524758870432-af57e54afa26",
      "photo-1567538096630-e0c55bd6374c",
    ),
    colours: ["#d9cdb6", "#3f4130"],
    materials: "Linen shade, oak stem, cast base",
    dimensions: "Ø 40 · H 150 cm",
    description:
      "A pool of soft, diffuse light to close the day by. Mira's hand-rolled linen shade warms every room it stands in — the last light you turn off at night.",
  },
  {
    _id: "p7",
    slug: "elin-coffee-table",
    title: "Elin Coffee Table",
    tagline: "Quiet centrepiece",
    category: "tables",
    price: 980,
    images: img(
      "photo-1533090161767-e6ffed986c88",
      "photo-1594026112284-02bb6f3352fe",
    ),
    colours: ["#c9bda6", "#8f8574"],
    materials: "Honed travertine, oak plinth",
    dimensions: "Ø 90 · H 32 cm",
    description:
      "A rounded travertine top on a low oak plinth. Elin grounds a seating group without ever asking for attention — stone that softens the more you live with it.",
  },
  {
    _id: "p8",
    slug: "faro-bookshelf",
    title: "Faro Bookshelf",
    tagline: "Considered storage",
    category: "storage",
    price: 2200,
    images: img(
      "photo-1616594039964-ae9021a400a0",
      "photo-1522708323590-d24dbb6b0267",
    ),
    colours: ["#b79a76", "#e5ddcd"],
    materials: "Solid ash, adjustable shelving",
    dimensions: "W 120 · D 38 · H 190 cm",
    description:
      "An open ash frame for the things you return to. Faro's adjustable shelves keep books, objects and quiet spaces in easy balance.",
  },
  {
    _id: "p9",
    slug: "otto-pouf",
    title: "Otto Pouf",
    tagline: "Softly versatile",
    category: "accents",
    price: 420,
    images: img(
      "photo-1583847268964-b28dc8f51f92",
      "photo-1560448204-e02f11c3d0e2",
    ),
    colours: ["#e8e2d6", "#a6795a", "#6f675c"],
    materials: "Wool-blend upholstery, feather fill",
    dimensions: "Ø 55 · H 40 cm",
    description:
      "Extra seat, footrest, or side perch — Otto goes wherever the evening needs it. A tactile wool shell over a soft, resilient fill.",
  },
  {
    _id: "p10",
    slug: "luna-pendant",
    title: "Luna Pendant",
    tagline: "Sculptural glow",
    category: "lighting",
    price: 780,
    isNew: true,
    images: img(
      "photo-1513694203232-719a280e022f",
      "photo-1531835551805-16d864c8d311",
    ),
    colours: ["#f0ead9", "#d9cdb6"],
    materials: "Rice-paper shade, brass fitting",
    dimensions: "Ø 55 · H 40 cm",
    description:
      "A softly glowing paper moon for above the table. Luna casts a warm, even light and a gentle shadow — quiet drama, gently done.",
  },
  {
    _id: "p11",
    slug: "elmwood-bench",
    title: "Elmwood Bench",
    tagline: "Honest simplicity",
    category: "seating",
    price: 890,
    images: img(
      "photo-1598300042247-d088f8ab3a91",
      "photo-1631049307264-da0ec9d70304",
    ),
    colours: ["#b79a76", "#8a6a49"],
    materials: "Solid elm, mortise-and-tenon joinery",
    dimensions: "L 140 · W 35 · H 45 cm",
    description:
      "A single, beautiful plank on hand-cut joinery. Elmwood works at the foot of a bed, along a hallway, or wherever a room needs a calm horizontal line.",
  },
  {
    _id: "p12",
    slug: "terra-vase",
    title: "Terra Vase",
    tagline: "Handmade warmth",
    category: "accents",
    price: 180,
    images: img(
      "photo-1631049035182-249067d7618e",
      "photo-1615529182904-14819c35db37",
    ),
    colours: ["#a6795a", "#c9bda6"],
    materials: "Hand-thrown stoneware, matte glaze",
    dimensions: "Ø 22 · H 34 cm",
    description:
      "Thrown by hand and finished in a soft matte glaze, Terra brings a quiet, earthen warmth to a shelf or table — beautiful full, empty, or holding a single branch.",
  },
];

export const FEATURED = PRODUCTS.filter((p) =>
  ["p1", "p2", "p3"].includes(p._id),
);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, count = 3): Product[] {
  const same = PRODUCTS.filter(
    (p) => p.category === product.category && p._id !== product._id,
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== product.category && p._id !== product._id,
  );
  return [...same, ...others].slice(0, count);
}

/* ── Rooms (homepage "Shop by Room") ───────────────────────────────────── */

export type Room = { name: string; image: { url: string }; href: string };

export const ROOMS: Room[] = [
  {
    name: "Living",
    image: { url: U("photo-1550581190-9c1c48d21d6c", 1000) },
    href: "/collection?room=living",
  },
  {
    name: "Dining",
    image: { url: U("photo-1617806118233-18e1de247200", 1000) },
    href: "/collection?room=dining",
  },
  {
    name: "Bedroom",
    image: { url: U("photo-1540574163026-643ea20ade25", 1000) },
    href: "/collection?room=bedroom",
  },
  {
    name: "Workspace",
    image: { url: U("photo-1524758870432-af57e54afa26", 1000) },
    href: "/collection?room=workspace",
  },
];

/* ── Spaces (lookbook) ─────────────────────────────────────────────────── */

export type Space = {
  _id: string;
  title: string;
  location: string;
  blurb: string;
  image: { url: string };
  tall?: boolean;
};

export const SPACES: Space[] = [
  {
    _id: "sp1",
    title: "The Quiet Apartment",
    location: "Copenhagen, DK",
    blurb:
      "A pared-back city home where every object earns its place — warm neutrals, honest oak and light that moves through the day.",
    image: { url: U("photo-1586023492125-27b2c045efd7") },
    tall: true,
  },
  {
    _id: "sp2",
    title: "Slow Mornings",
    location: "Lisbon, PT",
    blurb: "A sunlit breakfast nook built around bouclé and stone.",
    image: { url: U("photo-1493809842364-78817add7ffb") },
  },
  {
    _id: "sp3",
    title: "The Long Table",
    location: "Provence, FR",
    blurb: "A dining room made for lingering — solid oak, soft linen, low light.",
    image: { url: U("photo-1449247709967-d4461a6a6103") },
  },
  {
    _id: "sp4",
    title: "Reading Corner",
    location: "London, UK",
    blurb:
      "A single armchair, a floor lamp and a view — proof that a room needs very little to feel complete.",
    image: { url: U("photo-1519710164239-da123dc03ef4") },
    tall: true,
  },
  {
    _id: "sp5",
    title: "Coastal Calm",
    location: "Byron Bay, AU",
    blurb: "Bleached timber and off-white linen, opened to the sea air.",
    image: { url: U("photo-1512212621149-107ffe572d2f") },
  },
  {
    _id: "sp6",
    title: "The Warm Studio",
    location: "Kyoto, JP",
    blurb: "A maker's space where craft and calm live side by side.",
    image: { url: U("photo-1554995207-c18c203602cb") },
  },
];

export const SPACES_IMAGE = { url: U("photo-1617806118233-18e1de247200") };

/* ── Studio (about) ────────────────────────────────────────────────────── */

export const STUDIO = {
  hero: { url: U("photo-1567538096630-e0c55bd6374c") },
  portrait: { url: U("photo-1556228453-efd6c1ff04f6") },
  workshop: { url: U("photo-1600607687939-ce8a6c25118c") },
  values: [
    {
      title: "Materials",
      body: "We work only with materials that age well — solid timber, natural wool, honed stone. Things that earn their patina instead of wearing out.",
    },
    {
      title: "People",
      body: "Every piece is made by a small circle of makers we know by name, paid fairly and given the time good work needs.",
    },
    {
      title: "Places",
      body: "We design for real homes and real life — furniture that settles in quietly and stays for the long run.",
    },
  ],
  stats: [
    { value: "2014", label: "Founded" },
    { value: "40+", label: "Makers & partners" },
    { value: "12", label: "Countries shipped" },
    { value: "100%", label: "FSC-certified timber" },
  ],
};

/* ── Projects (completed interior work / portfolio) ────────────────────── */

export type ProjectCategory = { slug: string; name: string };

// Master list of project types (mirrors the "Projects" nav dropdown).
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { slug: "living-room", name: "Living Room" },
  { slug: "bedroom", name: "Bedroom" },
  { slug: "dining-room", name: "Dining Room" },
  { slug: "kitchen", name: "Kitchen" },
  { slug: "common-area", name: "Common Area" },
  { slug: "closet", name: "Closet & Wardrobe" },
  { slug: "luxury", name: "Luxury Interior" },
  { slug: "modern", name: "Modern Interior" },
];

export type Project = {
  _id: string;
  slug: string;
  title: string;
  category: string; // category slug
  area: string; // e.g. "2100 ft²"
  location: string;
  year: string;
  duration: string;
  cover: { url: string };
  gallery: { url: string }[];
  overview: string;
  scope: string[];
};

const gal = (...ids: string[]) => ids.map((id) => ({ url: U(id, 1400) }));

export const PROJECTS: Project[] = [
  {
    _id: "pr1",
    slug: "modern-living-room-bashundhara",
    title: "Modern Living Room Design in Bashundhara R/A, Dhaka",
    category: "living-room",
    area: "2100 ft²",
    location: "Bashundhara R/A, Dhaka",
    year: "2025",
    duration: "9 weeks",
    cover: { url: U("photo-1618221195710-dd6b41faaea6", 1200) },
    gallery: gal(
      "photo-1618221195710-dd6b41faaea6",
      "photo-1616486338812-3dadae4b4ace",
      "photo-1555041469-a586c61ea9bc",
      "photo-1550581190-9c1c48d21d6c",
    ),
    overview:
      "A calm, contemporary living room for a young family — warm neutrals, a full-height TV feature wall, cove lighting and a bespoke media unit that keeps everyday clutter out of sight.",
    scope: [
      "Full-height TV feature wall with fluted panelling",
      "False ceiling with cove & spot lighting",
      "Custom low media console in oak veneer",
      "Layered lighting scheme",
      "Soft furnishing & styling",
    ],
  },
  {
    _id: "pr2",
    slug: "luxury-master-bedroom-dhanmondi",
    title: "Luxury Master Bedroom Design in Dhanmondi-10A, Dhaka",
    category: "bedroom",
    area: "3600 ft²",
    location: "Dhanmondi-10A, Dhaka",
    year: "2025",
    duration: "12 weeks",
    cover: { url: U("photo-1540574163026-643ea20ade25", 1200) },
    gallery: gal(
      "photo-1540574163026-643ea20ade25",
      "photo-1586023492125-27b2c045efd7",
      "photo-1616627561950-9f746e330187",
      "photo-1584622650111-993a426fbf0a",
    ),
    overview:
      "An opulent master suite with an upholstered headboard wall, concealed wardrobe, and a soft gold-and-cream palette designed for rest and quiet luxury.",
    scope: [
      "Upholstered headboard feature wall",
      "Full wall-to-wall wardrobe with glass shutters",
      "Ambient & task lighting",
      "Dressing unit with backlit mirror",
      "Premium drapery & bedding",
    ],
  },
  {
    _id: "pr3",
    slug: "modern-dining-area-bashundhara",
    title: "Modern Dining Area Design in Bashundhara R/A, Dhaka",
    category: "dining-room",
    area: "2100 ft²",
    location: "Bashundhara R/A, Dhaka",
    year: "2024",
    duration: "7 weeks",
    cover: { url: U("photo-1617806118233-18e1de247200", 1200) },
    gallery: gal(
      "photo-1617806118233-18e1de247200",
      "photo-1449247709967-d4461a6a6103",
      "photo-1600210492486-724fe5c67fb0",
      "photo-1522708323590-d24dbb6b0267",
    ),
    overview:
      "A refined dining space anchored by a statement chandelier and a crockery display wall — built for long family dinners with easy, everyday elegance.",
    scope: [
      "Crockery & display cabinetry",
      "Statement pendant lighting",
      "Accent panelling with mirror inlay",
      "8-seat dining configuration",
      "Ceiling & cove detailing",
    ],
  },
  {
    _id: "pr4",
    slug: "modern-living-room-keraniganj",
    title: "Modern Living Room Design in Keraniganj, Dhaka",
    category: "living-room",
    area: "4500 ft²",
    location: "Keraniganj, Dhaka",
    year: "2024",
    duration: "10 weeks",
    cover: { url: U("photo-1616486338812-3dadae4b4ace", 1200) },
    gallery: gal(
      "photo-1616486338812-3dadae4b4ace",
      "photo-1615874959474-d609969a20ed",
      "photo-1503602642458-232111445657",
      "photo-1519710164239-da123dc03ef4",
    ),
    overview:
      "A spacious formal living room with a grand feature wall, sculptural chandelier and a warm grey-and-gold scheme — grand in scale, calm in character.",
    scope: [
      "Grid-panelled feature wall with sconces",
      "Sculptural chandelier",
      "Floating media & display unit",
      "Layered ceiling with gold trims",
      "Custom rug & seating layout",
    ],
  },
  {
    _id: "pr5",
    slug: "contemporary-kitchen-gulshan",
    title: "Contemporary Kitchen Design in Gulshan-2, Dhaka",
    category: "kitchen",
    area: "1800 ft²",
    location: "Gulshan-2, Dhaka",
    year: "2025",
    duration: "8 weeks",
    cover: { url: U("photo-1556228453-efd6c1ff04f6", 1200) },
    gallery: gal(
      "photo-1556228453-efd6c1ff04f6",
      "photo-1600607687939-ce8a6c25118c",
      "photo-1600585154340-be6161a56a0c",
      "photo-1616137466211-f939a420be84",
    ),
    overview:
      "A functional, handleless modular kitchen with a breakfast island, tall pantry units and quartz worktops — designed around real cooking and easy upkeep.",
    scope: [
      "Handleless modular cabinetry",
      "Breakfast island with seating",
      "Tall pantry & appliance towers",
      "Quartz worktop & backsplash",
      "Under-cabinet task lighting",
    ],
  },
  {
    _id: "pr6",
    slug: "serene-guest-bedroom-uttara",
    title: "Serene Guest Bedroom Design in Uttara Sector 7, Dhaka",
    category: "bedroom",
    area: "1600 ft²",
    location: "Uttara Sector 7, Dhaka",
    year: "2024",
    duration: "6 weeks",
    cover: { url: U("photo-1616627561950-9f746e330187", 1200) },
    gallery: gal(
      "photo-1616627561950-9f746e330187",
      "photo-1615529182904-14819c35db37",
      "photo-1584622650111-993a426fbf0a",
      "photo-1618220179428-22790b461013",
    ),
    overview:
      "A restful guest bedroom in soft earth tones with a slatted headboard wall, compact study nook and warm, low lighting.",
    scope: [
      "Slatted timber headboard wall",
      "Compact study & reading nook",
      "Two-door wardrobe",
      "Warm ambient lighting",
      "Textured soft furnishings",
    ],
  },
  {
    _id: "pr7",
    slug: "walk-in-closet-banani",
    title: "Walk-in Closet & Wardrobe Design in Banani, Dhaka",
    category: "closet",
    area: "1500 ft²",
    location: "Banani, Dhaka",
    year: "2025",
    duration: "5 weeks",
    cover: { url: U("photo-1616137466211-f939a420be84", 1200) },
    gallery: gal(
      "photo-1616137466211-f939a420be84",
      "photo-1616594039964-ae9021a400a0",
      "photo-1522708323590-d24dbb6b0267",
      "photo-1631049035182-249067d7618e",
    ),
    overview:
      "A boutique-style walk-in closet with open hanging, glass-front drawers, a central island and backlit shelving — luxury organisation, beautifully lit.",
    scope: [
      "Open & concealed hanging zones",
      "Glass-front drawer units",
      "Central dresser island",
      "Backlit display shelving",
      "Full-height mirror",
    ],
  },
  {
    _id: "pr8",
    slug: "family-common-area-mirpur",
    title: "Family Common Area Design in Mirpur DOHS, Dhaka",
    category: "common-area",
    area: "2800 ft²",
    location: "Mirpur DOHS, Dhaka",
    year: "2024",
    duration: "9 weeks",
    cover: { url: U("photo-1524758631624-e2822e304c36", 1200) },
    gallery: gal(
      "photo-1524758631624-e2822e304c36",
      "photo-1538688525198-9b88f6f53126",
      "photo-1567538096630-e0c55bd6374c",
      "photo-1594026112284-02bb6f3352fe",
    ),
    overview:
      "A multi-use family lounge connecting living and dining — flexible seating, a feature bookshelf and warm layered lighting for everyday togetherness.",
    scope: [
      "Feature bookshelf & storage wall",
      "Flexible lounge seating",
      "Connected living–dining layout",
      "Layered lighting design",
      "Custom joinery & styling",
    ],
  },
  {
    _id: "pr9",
    slug: "full-luxury-apartment-gulshan",
    title: "Full Luxury Apartment Interior in Gulshan-1, Dhaka",
    category: "luxury",
    area: "4200 ft²",
    location: "Gulshan-1, Dhaka",
    year: "2025",
    duration: "16 weeks",
    cover: { url: U("photo-1586023492125-27b2c045efd7", 1200) },
    gallery: gal(
      "photo-1586023492125-27b2c045efd7",
      "photo-1618221195710-dd6b41faaea6",
      "photo-1540574163026-643ea20ade25",
      "photo-1617806118233-18e1de247200",
    ),
    overview:
      "A complete turnkey interior across a 4,200 ft² apartment — a cohesive luxury language of marble, brass and warm oak carried from the foyer to every private room.",
    scope: [
      "Turnkey design across all rooms",
      "Marble & brass detailing",
      "Custom joinery throughout",
      "Integrated smart lighting",
      "Full furnishing & art curation",
    ],
  },
  {
    _id: "pr10",
    slug: "minimal-modern-studio-bashundhara",
    title: "Minimal Modern Studio Design in Bashundhara R/A, Dhaka",
    category: "modern",
    area: "1200 ft²",
    location: "Bashundhara R/A, Dhaka",
    year: "2024",
    duration: "5 weeks",
    cover: { url: U("photo-1493809842364-78817add7ffb", 1200) },
    gallery: gal(
      "photo-1493809842364-78817add7ffb",
      "photo-1533090161767-e6ffed986c88",
      "photo-1524758870432-af57e54afa26",
      "photo-1560448204-e02f11c3d0e2",
    ),
    overview:
      "A compact modern studio that does more with less — a multifunctional wall unit, hidden storage and a bright, uncluttered material palette.",
    scope: [
      "Multifunctional wall unit",
      "Concealed storage solutions",
      "Space-saving furniture layout",
      "Bright minimal palette",
      "Integrated lighting",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectCategoryName(slug: string): string {
  return PROJECT_CATEGORIES.find((c) => c.slug === slug)?.name ?? "Interior";
}

// Only categories that actually have projects (used by nav + filters), with counts.
export function projectCategoriesWithCounts(): (ProjectCategory & {
  count: number;
})[] {
  return PROJECT_CATEGORIES.map((c) => ({
    ...c,
    count: PROJECTS.filter((p) => p.category === c.slug).length,
  })).filter((c) => c.count > 0);
}

export function relatedProjects(project: Project, count = 3): Project[] {
  const same = PROJECTS.filter(
    (p) => p.category === project.category && p._id !== project._id,
  );
  const others = PROJECTS.filter(
    (p) => p.category !== project.category && p._id !== project._id,
  );
  return [...same, ...others].slice(0, count);
}

/* ── Interactive hotspot scene (homepage "Explore the space") ──────────── */

export type Hotspot = {
  x: number; // % from left
  y: number; // % from top
  title: string;
  body: string;
};

export const HOTSPOT_SCENE = {
  eyebrow: "Explore the space",
  title: "Every detail, thoughtfully placed.",
  intro:
    "Move across the room to see how each element comes together — the materials, the light and the pieces that make a space feel considered. Tap a point to explore.",
  image: { url: U("photo-1616486338812-3dadae4b4ace", 1800) },
  points: [
    {
      x: 50,
      y: 20,
      title: "Layered lighting",
      body: "Cove, spot and pendant lighting combined for a warm, adjustable glow at every hour of the day.",
    },
    {
      x: 26,
      y: 60,
      title: "Bouclé lounge seating",
      body: "Sculptural, deep-seated comfort in a soft, hard-wearing bouclé weave.",
    },
    {
      x: 74,
      y: 52,
      title: "Fluted feature wall",
      body: "Hand-finished oak fluting adds quiet texture and depth behind the seating.",
    },
    {
      x: 55,
      y: 84,
      title: "Warm oak flooring",
      body: "Wide-plank engineered oak, oiled by hand to age beautifully underfoot.",
    },
  ] as Hotspot[],
};
