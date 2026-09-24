import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioPromo from "@/components/PortfolioPromo";
import ScrollToTop from "@/components/ScrollToTop";
import { getNavData, getSettings } from "@/lib/api";

// Storefront chrome (Navbar + Footer) for every public page. Scoped to the
// (site) route group so /interior-admin* routes never render it.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [nav, settings] = await Promise.all([getNavData(), getSettings()]);
  return (
    <>
      <Navbar
        projectCategories={nav.projectCategories}
        services={nav.services}
        siteName={settings.siteInfo.name}
        logoUrl={settings.branding.logo?.url}
      />
      {children}
      <Footer footer={settings.footer} contact={settings.company.contact} />
      <PortfolioPromo />
      <ScrollToTop />
    </>
  );
}
