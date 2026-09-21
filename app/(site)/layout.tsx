import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioPromo from "@/components/PortfolioPromo";
import ScrollToTop from "@/components/ScrollToTop";
import { getNavData } from "@/lib/api";

// Storefront chrome (Navbar + Footer) for every public page. Scoped to the
// (site) route group so /interior-admin* routes never render it.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNavData();
  return (
    <>
      <Navbar projectCategories={nav.projectCategories} services={nav.services} />
      {children}
      <Footer />
      <PortfolioPromo />
      <ScrollToTop />
    </>
  );
}
