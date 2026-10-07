import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileActionBar from "@/components/MobileActionBar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Voyage from "@/components/Voyage/Voyage";
import OnFoot from "@/components/OnFoot";
import SpiceRitual from "@/components/SpiceRitual";
import Signatures from "@/components/Signatures";
import ShophouseSection from "@/components/ShophouseSection";
import Generations from "@/components/Generations";
import FamilyToday from "@/components/FamilyToday";
import Recognition from "@/components/Recognition";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <Voyage />
        <OnFoot />
        <SpiceRitual />
        <Signatures />
        <ShophouseSection />
        <Generations />
        <FamilyToday />
        <Recognition />
        <Visit />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
