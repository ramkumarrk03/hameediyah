import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileActionBar from "@/components/MobileActionBar";
import PlateBuilder from "@/components/PlateBuilder/PlateBuilder";
import MenuCard from "@/components/MenuCard";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Build your plate & menu",
  description:
    "Build a nasi kandar plate the 1907 way: choose your rice, pick your lauk from the counter, and say how much kuah. Then read the full Hameediyah menu.",
};

export default function MenuPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section aria-labelledby="builder-title" className="px-4 pb-24 pt-28 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-7xl">
            <header className="max-w-3xl">
              <p className="font-sign text-xs uppercase tracking-[0.3em] text-saffron-deep">
                The counter at 164A ·{" "}
                <span lang="ta" className="font-tamil normal-case tracking-normal">
                  கந்தர்
                </span>
              </p>
              <h1 id="builder-title" className="font-display mt-3 text-5xl leading-[1] text-cinnamon sm:text-7xl">
                Build your plate
              </h1>
              <p className="mt-5 max-w-xl text-lg text-ink/80">
                Nasi kandar is ordered at the counter, never from a list. Choose your rice, point at the lauk, and say
                how much kuah. Here is how it goes.{" "}
                <Link href="#menu-card" className="text-saffron-deep underline decoration-brass underline-offset-4">
                  Or skip to the full menu.
                </Link>
              </p>
            </header>
            <div className="mt-14">
              <PlateBuilder />
            </div>
          </div>
        </section>
        <Marquee dark />
        <MenuCard />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
