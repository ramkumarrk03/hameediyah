import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Shophouse from "./art/Shophouse";
import { generations } from "@/data/timeline";

export default function Generations() {
  return (
    <section id="family" aria-labelledby="family-title" className="paper-dark relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(224,165,38,0.18),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              dark
              id="family-title"
              kicker="Chapter VI · The Family"
              title={
                <>
                  Seven generations, <em className="text-turmeric">one family</em>
                </>
              }
              intro="From the founder and his sons under the tree to the family behind the counter today, Hameediyah has stayed in one family's hands since 1907."
            />
          </Reveal>
          <Reveal delay={0.15} className="mt-12 hidden max-w-sm lg:block">
            <Shophouse night className="h-auto w-full opacity-90" />
            <p className="mt-3 text-sm italic text-paper/60">The shop at night, lamps lit over the five-foot way.</p>
          </Reveal>
        </div>

        <ol className="relative border-l border-brass/40 pl-8 sm:pl-12">
          {generations.map((g, i) => (
            <Reveal as="li" key={g.title} delay={i * 0.05} className="relative pb-14 last:pb-0">
              <span aria-hidden className="absolute -left-[2.45rem] top-2 size-3 rounded-full border border-turmeric bg-ink sm:-left-[3.45rem]" />
              <p className="font-sign text-sm uppercase tracking-[0.25em] text-turmeric">{g.year}</p>
              <h3 className="font-display mt-2 text-3xl text-paper sm:text-4xl">{g.title}</h3>
              <p className="mt-3 max-w-lg text-lg text-paper/80">{g.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
