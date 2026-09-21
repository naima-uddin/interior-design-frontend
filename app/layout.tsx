import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNavData } from "@/lib/api";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nav = await getNavData();
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Navbar projectCategories={nav.projectCategories} services={nav.services} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
