import Banner from "@/components/Banner";
import ConsideredBand from "@/components/ConsideredBand";
import ServicesPreview from "@/components/ServicesPreview";
import FeaturedPieces from "@/components/FeaturedPieces";
import ShopByRoom from "@/components/ShopByRoom";
import FeatureHotspots from "@/components/FeatureHotspots";
import LatestProjects from "@/components/LatestProjects";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import MadeToBelong from "@/components/MadeToBelong";
import BeforeAfterTransform from "@/components/BeforeAfterTransform";
import { getHomepage } from "@/lib/api";

export default async function Home() {
  const data = await getHomepage();

  return (
    <main>
      <Banner slides={data.banners} />
      <ConsideredBand />
      <ServicesPreview services={data.services} />
      <FeaturedPieces products={data.featured} />
      <ShopByRoom rooms={data.rooms} />
      <FeatureHotspots scene={data.hotspot} />
      <LatestProjects projects={data.projects} />
      <BeforeAfterTransform />
      <WhyChooseUs items={data.whyChoose} company={data.company} />
      <ProcessSteps steps={data.process} />
      <Testimonials items={data.testimonials} />
      <MadeToBelong image={data.spacesImage} />
    </main>
  );
}
