import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { ancestors, generations } from "@/data/timeline";

/** A family-album page: real photos from the client's brochure, mounted and taped. */
const collage = [
  {
    src: "/images/archive/signboard.webp",
    alt: "The lit yellow signboard reading “Hameediyah Restaurant, No 164A Campbell Street, Penang”, with the vertical Hameediyah sign beside it.",
    caption: "The signboard over 164-A Campbell Street",
    w: 1280,
    h: 720,
    place: "left-0 top-0 w-[90%] rotate-[-3deg] z-10",
    tape: "left-1/2 -translate-x-1/2 rotate-[-4deg]",
  },
  {
    src: "/images/archive/counter-1970s.webp",
    alt: "A man ladles curry from a large pot at the counter while customers watch, trays of dishes on the shelves behind him.",
    caption: "The curry counter, 1970s",
    w: 531,
    h: 345,
    place: "right-0 top-[39%] w-[66%] rotate-[3.5deg] z-20",
    tape: "right-6 rotate-[8deg]",
  },
  {
    src: "/images/archive/griddle-1970s.webp",
    alt: "Two men at the round griddle where murtabak are frying, a bowl of eggs on the counter beside them.",
    caption: "Murtabak on the griddle, 1970s",
    w: 531,
    h: 357,
    place: "left-[2%] top-[71%] w-[62%] rotate-[-2deg] z-30",
    tape: "left-6 rotate-[-10deg]",
  },
];


export default function Generations() {
  return (
    <section id="family" aria-labelledby="family-title" className="paper-dark relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,222,22,0.14),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div>
          <Reveal>
            <SectionHeading
              dark
              id="family-title"
              kicker="Chapter VI · The Family"
              title={
                <>
                  Seven generations, <em className="text-yellow">one family</em>
                </>
              }
              intro="From the family that came from Kerala to the owners behind the counter today, Hameediyah has been passed down through seven generations of the Rawther family."
            />
          </Reveal>
          <Reveal delay={0.15} className="mt-12">
            <div className="relative mx-auto aspect-[5/7.6] w-full max-w-md lg:mx-0 lg:max-w-none">
              {collage.map((c) => (
                <figure
                  key={c.src}
                  className={`deckled group absolute shadow-[0_24px_40px_-18px_rgba(0,0,0,0.75)] transition-transform duration-700 ease-[var(--ease-steam)] hover:z-40 hover:rotate-0 hover:scale-[1.04] ${c.place}`}
                >
                  <span aria-hidden className={`photo-tape absolute -top-3 z-10 h-6 w-20 ${c.tape}`} />
                  <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="(min-width: 1024px) 24rem, 80vw" className="block h-auto w-full" />
                  <figcaption className="px-1 pt-2 text-xs italic leading-tight text-ink sm:text-sm">{c.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>

        <ol className="relative border-l-2 border-dotted border-yellow/50 pl-8 sm:pl-12">
          {generations.map((g, i) => (
            <Reveal as="li" key={g.title} delay={i * 0.05} className="relative pb-14 last:pb-0">
              <span aria-hidden className="absolute -left-[2.45rem] top-2 size-3 rounded-full border-2 border-yellow bg-green sm:-left-[3.45rem]" />
              <p className="font-sign text-sm uppercase tracking-[0.25em] text-yellow">{g.year}</p>
              <h3 className="font-display sign-caps mt-2 text-4xl text-paper sm:text-5xl">{g.title}</h3>
              <p className="mt-3 max-w-lg text-lg text-paper/85">{g.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Our Ancestors, as named and dated by the family */}
      <div className="relative mx-auto mt-28 max-w-7xl">
        <Reveal>
          <p className="font-sign text-xs font-semibold uppercase tracking-[0.3em] text-yellow">The Rawther family</p>
          <h3 className="font-display sign-caps mt-3 text-4xl text-paper sm:text-6xl">Our ancestors</h3>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {ancestors.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i * 0.05}>
              <figure>
                <div className="overflow-hidden rounded-t-full border-4 border-yellow bg-paper shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)]">
                  <Image
                    src={`/images/family/${a.photo}.webp`}
                    alt={`Portrait of ${a.name}.`}
                    width={296}
                    height={444}
                    sizes="(min-width: 1024px) 13rem, (min-width: 640px) 30vw, 45vw"
                    className="block h-auto w-full grayscale"
                  />
                </div>
                <figcaption className="mt-3 text-center">
                  <span className="block font-sign text-xs uppercase tracking-[0.2em] text-yellow">{a.initials}</span>
                  <span className="mt-1 block font-display text-xl uppercase leading-tight text-paper">{a.name}</span>
                  <span className="mt-1 block text-sm text-paper/75">{a.years}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
