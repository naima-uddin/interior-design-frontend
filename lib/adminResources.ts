// ─────────────────────────────────────────────────────────────────────────
// Declarative field configs for every admin-managed resource. ResourceForm and
// ResourceTable (components/admin/) read this to render generic CRUD UI
// without a hand-written page per content type. Field `type` drives which
// input control renders:
//   text | textarea | number | boolean | image | images | stringArray
// Every resource also implicitly gets `order` (number) and `isActive`
// (boolean) fields, appended by ResourceForm.
// ─────────────────────────────────────────────────────────────────────────

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "image"
  | "images"
  | "stringArray";

export type FieldConfig = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
};

export type ResourceConfig = {
  key: string; // matches backend MODELS key / API path segment
  label: string; // plural, human label
  singular: string;
  uploadFolder: string; // Cloudinary subfolder under Interior-design/
  titleField: string; // field shown as the row's primary label in the table
  subtitleField?: string;
  fields: FieldConfig[];
};

export const RESOURCES: ResourceConfig[] = [
  {
    key: "banners",
    label: "Banners",
    singular: "Banner",
    uploadFolder: "banners",
    titleField: "title",
    subtitleField: "subtitle",
    fields: [
      { key: "image", label: "Image", type: "image", required: true },
      { key: "badge", label: "Badge", type: "text", placeholder: "e.g. The Autumn Edit" },
      {
        key: "title",
        label: "Title",
        type: "text",
        required: true,
        help: "Wrap a word in *asterisks* for the italic accent, e.g. Room for better *living.*",
      },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "buttonText", label: "Button text", type: "text" },
      { key: "buttonLink", label: "Button link", type: "text", placeholder: "/collection" },
    ],
  },
  {
    key: "products",
    label: "Products",
    singular: "Product",
    uploadFolder: "products",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true, placeholder: "vera-lounge-chair" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "category", label: "Category slug", type: "text", placeholder: "seating" },
      { key: "price", label: "Price", type: "number", required: true },
      { key: "compareAtPrice", label: "Compare-at price", type: "number" },
      { key: "isNewArrival", label: "Mark as new arrival", type: "boolean" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "colours", label: "Finish colours (hex)", type: "stringArray", placeholder: "#e8e2d6" },
      { key: "materials", label: "Materials", type: "text" },
      { key: "dimensions", label: "Dimensions", type: "text", placeholder: "W 78 · D 82 · H 74 cm" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "projects",
    label: "Projects",
    singular: "Project",
    uploadFolder: "projects",
    titleField: "title",
    subtitleField: "location",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "category", label: "Category slug", type: "text", placeholder: "living-room" },
      { key: "area", label: "Area", type: "text", placeholder: "2100 ft²" },
      { key: "location", label: "Location", type: "text" },
      { key: "year", label: "Year", type: "text" },
      { key: "duration", label: "Duration", type: "text", placeholder: "9 weeks" },
      { key: "cover", label: "Cover image", type: "image", required: true },
      { key: "gallery", label: "Gallery images", type: "images" },
      { key: "overview", label: "Overview", type: "textarea" },
      { key: "scope", label: "Scope of work", type: "stringArray" },
    ],
  },
  {
    key: "services",
    label: "Services",
    singular: "Service",
    uploadFolder: "services",
    titleField: "name",
    subtitleField: "tagline",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "summary", label: "Summary (card text)", type: "textarea" },
      { key: "intro", label: "Intro (detail page)", type: "textarea" },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "includes", label: "What's included", type: "stringArray" },
      { key: "startingPrice", label: "Starting price", type: "text", placeholder: "Starting from ৳45,000" },
    ],
  },
  {
    key: "posts",
    label: "Journal Posts",
    singular: "Post",
    uploadFolder: "posts",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "category", label: "Category", type: "text", placeholder: "Design Notes" },
      { key: "date", label: "Date", type: "text", placeholder: "2026-08-14" },
      { key: "author", label: "Author", type: "text" },
      { key: "readingTime", label: "Reading time", type: "text", placeholder: "5 min read" },
      { key: "cover", label: "Cover image", type: "image", required: true },
      { key: "body", label: "Body paragraphs", type: "stringArray" },
    ],
  },
  {
    key: "pages",
    label: "Pages",
    singular: "Page",
    uploadFolder: "pages",
    titleField: "title",
    subtitleField: "slug",
    fields: [
      { key: "slug", label: "Slug", type: "text", required: true, placeholder: "privacy-policy" },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "intro", label: "Intro (shown under the title)", type: "textarea" },
      { key: "body", label: "Body paragraphs", type: "stringArray" },
    ],
  },
  {
    key: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    uploadFolder: "testimonials",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role / project", type: "text" },
      { key: "quote", label: "Quote", type: "textarea", required: true },
      { key: "avatar", label: "Avatar", type: "image" },
    ],
  },
  {
    key: "faqs",
    label: "FAQs",
    singular: "FAQ",
    uploadFolder: "misc",
    titleField: "q",
    fields: [
      { key: "q", label: "Question", type: "text", required: true },
      { key: "a", label: "Answer", type: "textarea", required: true },
    ],
  },
  {
    key: "rooms",
    label: "Shop-by-Room Tiles",
    singular: "Room",
    uploadFolder: "rooms",
    titleField: "name",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "href", label: "Link", type: "text", placeholder: "/collection?room=living" },
    ],
  },
  {
    key: "spaces",
    label: "Spaces (Lookbook)",
    singular: "Space",
    uploadFolder: "spaces",
    titleField: "title",
    subtitleField: "location",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "blurb", label: "Blurb", type: "textarea" },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "tall", label: "Tall tile (spans 2 rows)", type: "boolean" },
    ],
  },
];

export function getResource(key: string): ResourceConfig | undefined {
  return RESOURCES.find((r) => r.key === key);
}
