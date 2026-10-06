import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex min-h-svh flex-col items-center justify-center px-4 py-32 text-center">
        <p className="font-sign text-xs uppercase tracking-[0.3em] text-saffron-deep">404 · Lost on Lebuh Campbell</p>
        <h1 className="font-display mt-4 max-w-2xl text-5xl leading-tight text-cinnamon sm:text-6xl">
          This page wandered off <em className="text-saffron-deep">with the kandar</em>
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink/75">The pots are still warm at 164A. Let&apos;s get you back to the counter.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-full bg-cinnamon px-7 font-sign text-sm uppercase tracking-[0.2em] text-paper transition-colors duration-500 hover:bg-saffron-deep"
          >
            Back to the story
          </Link>
          <Link
            href="/menu"
            className="inline-flex min-h-12 items-center rounded-full border border-cinnamon/40 px-7 font-sign text-sm uppercase tracking-[0.2em] text-cinnamon transition-colors duration-500 hover:border-cinnamon"
          >
            See the menu
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
