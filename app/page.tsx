import Banner from "@/components/Banner";
import ConsideredBand from "@/components/ConsideredBand";
import FeaturedPieces from "@/components/FeaturedPieces";
import ShopByRoom from "@/components/ShopByRoom";
import FeatureHotspots from "@/components/FeatureHotspots";
import LatestProjects from "@/components/LatestProjects";
import MadeToBelong from "@/components/MadeToBelong";

export default function Home() {
  return (
    <main>
      <Banner />
      <ConsideredBand />
      <FeaturedPieces />
      <ShopByRoom />
      <FeatureHotspots />
      <LatestProjects />
      <MadeToBelong />
    </main>
  );
}
