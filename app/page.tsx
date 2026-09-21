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

export default function Home() {
  return (
    <main>
      <Banner />
      <ConsideredBand />
      <ServicesPreview />
      <FeaturedPieces />
      <ShopByRoom />
      <FeatureHotspots />
      <LatestProjects />
      <WhyChooseUs />
      <ProcessSteps />
      <Testimonials />
      <MadeToBelong />
    </main>
  );
}
