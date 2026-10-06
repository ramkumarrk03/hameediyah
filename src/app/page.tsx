import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileActionBar from "@/components/MobileActionBar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Voyage from "@/components/Voyage/Voyage";
import TheTree from "@/components/TheTree";
import SpiceRitual from "@/components/SpiceRitual";
import Signatures from "@/components/Signatures";
import ShophouseSection from "@/components/ShophouseSection";
import Generations from "@/components/Generations";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Marquee />
        <Voyage />
        <TheTree />
        <SpiceRitual />
        <Signatures />
        <ShophouseSection />
        <Generations />
        <Visit />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
