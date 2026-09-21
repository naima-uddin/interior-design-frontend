import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Velor — A more human home",
  description:
    "Furniture and interiors for a calmer tomorrow. Timeless, natural and considered pieces made to belong in your home.",
};

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
