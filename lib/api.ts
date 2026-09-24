// ─────────────────────────────────────────────────────────────────────────
// API layer — fetches all storefront content from the Velor backend.
// Every fetch falls back to the static data in lib/data.ts if the API is
// unreachable, so the site never renders blank during local dev or an outage.
// Called from Server Components (pages/layout), which pass data to the client
// components as props.
// ─────────────────────────────────────────────────────────────────────────

import {
  SLIDES,
  PRODUCTS,
  CATEGORIES,
  PROJECTS,
  SERVICES,
  POSTS,
  PAGES,
  TESTIMONIALS,
  FAQS,
  ROOMS,
  SPACES,
  SPACES_IMAGE,
  HOTSPOT_SCENE,
  BEFORE_AFTER,
  WHY_CHOOSE,
  PROCESS,
  COMPANY,
  FOOTER,
  SITE_INFO,
  BRANDING,
  PROJECT_CATEGORIES,
  projectCategoriesWithCounts,
  type Slide,
  type Product,
  type Project,
  type Service,
  type Post,
  type Page,
  type Testimonial,
  type Room,
  type Space,
  type Category,
  type FooterConfig,
  type SiteInfo,
  type Branding,
} from "./data";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const REVALIDATE = 60; // seconds — ISR-style caching for server fetches

async function getJSON<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

/* ── Types the pages consume ───────────────────────────────────────────── */

export type ProjectCategoryCount = Category & { count: number };

export type HomeData = {
  banners: Slide[];
  services: Service[];
  featured: Product[];
  rooms: Room[];
  hotspot: typeof HOTSPOT_SCENE | null;
  projects: Project[];
  whyChoose: { title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  testimonials: Testimonial[];
  company: typeof COMPANY | null;
  spacesImage: { url: string } | null;
  beforeAfter: typeof BEFORE_AFTER | null;
};

export type NavData = {
  projectCategories: ProjectCategoryCount[];
  services: Service[];
};

/* ── Fetchers ──────────────────────────────────────────────────────────── */

export function getHomepage(): Promise<HomeData> {
  return getJSON<HomeData>("/api/homepage", {
    banners: SLIDES,
    services: SERVICES.slice(0, 6),
    featured: PRODUCTS.slice(0, 6),
    rooms: ROOMS,
    hotspot: HOTSPOT_SCENE,
    projects: PROJECTS.slice(0, 8),
    whyChoose: WHY_CHOOSE,
    process: PROCESS,
    testimonials: TESTIMONIALS,
    company: COMPANY,
    spacesImage: SPACES_IMAGE,
    beforeAfter: BEFORE_AFTER,
  });
}

export function getNavData(): Promise<NavData> {
  return getJSON<{ items: Project[]; categories: ProjectCategoryCount[] }>(
    "/api/projects",
    { items: PROJECTS, categories: projectCategoriesWithCounts() },
  )
    .then(async (proj) => ({
      projectCategories: proj.categories?.length
        ? proj.categories
        : projectCategoriesWithCounts(),
      services: (await getServices()) || SERVICES,
    }))
    .catch(() => ({
      projectCategories: projectCategoriesWithCounts(),
      services: SERVICES,
    }));
}

export async function getProducts(
  category?: string,
): Promise<{ items: Product[]; categories: Category[] }> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return getJSON("/api/products" + q, {
    items: category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS,
    categories: CATEGORIES,
  });
}

export async function getProduct(slug: string): Promise<Product | null> {
  const data = await getJSON<{ item: Product | null }>(
    `/api/products/${slug}`,
    { item: PRODUCTS.find((p) => p.slug === slug) || null },
  );
  return data.item;
}

export async function getProjects(
  category?: string,
): Promise<{ items: Project[]; categories: ProjectCategoryCount[] }> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return getJSON("/api/projects" + q, {
    items: category ? PROJECTS.filter((p) => p.category === category) : PROJECTS,
    categories: projectCategoriesWithCounts(),
  });
}

export async function getProject(slug: string): Promise<Project | null> {
  const data = await getJSON<{ item: Project | null }>(
    `/api/projects/${slug}`,
    { item: PROJECTS.find((p) => p.slug === slug) || null },
  );
  return data.item;
}

export async function getServices(): Promise<Service[]> {
  const data = await getJSON<{ items: Service[] }>("/api/services", {
    items: SERVICES,
  });
  return data.items;
}

export async function getService(slug: string): Promise<Service | null> {
  const data = await getJSON<{ item: Service | null }>(
    `/api/services/${slug}`,
    { item: SERVICES.find((s) => s.slug === slug) || null },
  );
  return data.item;
}

export async function getPosts(): Promise<Post[]> {
  const data = await getJSON<{ items: Post[] }>("/api/posts", { items: POSTS });
  return data.items;
}

export async function getPost(slug: string): Promise<Post | null> {
  const data = await getJSON<{ item: Post | null }>(`/api/posts/${slug}`, {
    item: POSTS.find((p) => p.slug === slug) || null,
  });
  return data.item;
}

export async function getPages(): Promise<Page[]> {
  const data = await getJSON<{ items: Page[] }>("/api/pages", { items: PAGES });
  return data.items;
}

export async function getPage(slug: string): Promise<Page | null> {
  const data = await getJSON<{ item: Page | null }>(`/api/pages/${slug}`, {
    item: PAGES.find((p) => p.slug === slug) || null,
  });
  return data.item;
}

export async function getFaqs(): Promise<{ q: string; a: string }[]> {
  const data = await getJSON<{ items: { q: string; a: string }[] }>(
    "/api/faqs",
    { items: FAQS },
  );
  return data.items;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await getJSON<{ items: Testimonial[] }>("/api/testimonials", {
    items: TESTIMONIALS,
  });
  return data.items;
}

export async function getSpaces(): Promise<{
  items: Space[];
  spacesImage: { url: string } | null;
}> {
  return getJSON("/api/spaces", { items: SPACES, spacesImage: SPACES_IMAGE });
}

export async function getSettings(): Promise<{
  company: typeof COMPANY;
  projectCategories: Category[];
  siteInfo: SiteInfo;
  footer: FooterConfig;
  branding: Branding;
}> {
  const data = await getJSON<{
    company?: typeof COMPANY;
    projectCategories?: Category[];
    siteInfo?: Partial<SiteInfo>;
    footer?: Partial<FooterConfig>;
    branding?: Partial<Branding>;
  }>("/api/settings", {
    company: COMPANY,
    projectCategories: PROJECT_CATEGORIES,
    siteInfo: SITE_INFO,
    footer: FOOTER,
    branding: BRANDING,
  });
  const f = data.footer ?? {};
  const site = { ...SITE_INFO, ...(data.siteInfo ?? {}) };
  const b = data.branding ?? {};
  return {
    company: data.company ?? COMPANY,
    projectCategories: data.projectCategories ?? PROJECT_CATEGORIES,
    siteInfo: site,
    // A stored asset with an empty url counts as "not set" → keep the fallback.
    branding: {
      logo: b.logo?.url ? b.logo : BRANDING.logo,
      favicon: b.favicon?.url ? b.favicon : BRANDING.favicon,
    },
    // Merge stored footer over defaults so partial/empty backend data still
    // renders a complete footer (empty link arrays fall back to defaults;
    // the wordmark defaults to the site name).
    footer: {
      ...FOOTER,
      ...f,
      brand: f.brand || site.name,
      navLinks: f.navLinks?.length ? f.navLinks : FOOTER.navLinks,
      socials: f.socials?.length ? f.socials : FOOTER.socials,
      legalLinks: f.legalLinks?.length ? f.legalLinks : FOOTER.legalLinks,
    },
  };
}
