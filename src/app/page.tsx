import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Voyage from "@/components/Voyage/Voyage";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
          <p className="font-sign text-sm uppercase tracking-[0.3em] text-saffron-deep">164A Lebuh Campbell</p>
          <h1 className="font-display letterpress mt-4 text-6xl text-cinnamon sm:text-8xl">Since 1907</h1>
          <p lang="ta" className="mt-4 font-tamil text-2xl text-brass">கந்தர்</p>
        </section>
        <Voyage />
        <section className="h-svh" />
      </main>
      <SiteFooter />
    </>
  );
}
