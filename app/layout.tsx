import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { getSettings } from "@/lib/api";
import "./globals.css";

// High-contrast display serif for headings (upright + italic accents)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Clean geometric sans for body, labels and navigation
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// Browsers only render a handful of favicon formats — notably NOT avif/webp,
// which is what Cloudinary often stores an upload as. For Cloudinary delivery
// URLs we inject an `f_png` transformation so the tab icon is always served as
// a PNG regardless of the uploaded format.
function faviconDeliveryUrl(url: string): string {
  const marker = "/upload/";
  if (!url.includes("res.cloudinary.com") || !url.includes(marker)) return url;
  return url.replace(marker, `${marker}f_png/`);
}

// Title/description come from Info Control's site identity; the browser tab
// icon uses the uploaded favicon when set, otherwise the bundled favicon.ico.
export async function generateMetadata(): Promise<Metadata> {
  const { siteInfo, branding } = await getSettings();
  const faviconUrl = branding.favicon?.url;
  return {
    title: siteInfo.name
      ? `${siteInfo.name} — ${siteInfo.tagline}`
      : "Velor — A more human home",
    description: siteInfo.description,
    ...(faviconUrl
      ? { icons: { icon: { url: faviconDeliveryUrl(faviconUrl), type: "image/png" } } }
      : {}),
  };
}

// Root layout only sets up html/body/fonts. The storefront chrome (Navbar +
// Footer) lives in app/(site)/layout.tsx so admin routes — which need none of
// it — aren't forced to fetch nav data or render the public header/footer.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
