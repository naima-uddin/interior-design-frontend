// ─────────────────────────────────────────────────────────────────────────
// Static storefront content.
// This is intentionally the single source of truth for the homepage so the UI
// can be built and reviewed without a backend. When the Express/Mongo API is
// wired up later, these shapes map 1:1 onto the API responses (Banner /
// Product / Spaces models), so swapping fetch() in is a drop-in change.
// ─────────────────────────────────────────────────────────────────────────

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

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
    buttonLink: "/new",
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

export type Product = {
  _id: string;
  title: string;
  tagline: string;
  price: number;
  image: { url: string };
  href: string;
};

export const FEATURED: Product[] = [
  {
    _id: "p1",
    title: "Vera Lounge Chair",
    tagline: "Sculptural comfort",
    price: 1890,
    image: { url: U("photo-1567016432779-094069958ea5", 1200) },
    href: "/product/vera-lounge-chair",
  },
  {
    _id: "p2",
    title: "Linden Sofa",
    tagline: "Inviting by design",
    price: 3450,
    image: { url: U("photo-1493663284031-b7e3aefcae8e", 1200) },
    href: "/product/linden-sofa",
  },
  {
    _id: "p3",
    title: "Alden Sideboard",
    tagline: "Natural character",
    price: 2950,
    image: { url: U("photo-1595428774223-ef52624120d2", 1200) },
    href: "/product/alden-sideboard",
  },
];

export const SPACES_IMAGE = { url: U("photo-1617806118233-18e1de247200") };
