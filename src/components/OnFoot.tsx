import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const ritual = [
  {
    n: "01",
    title: "Choose your rice",
    body: "Plain white rice to let the curries speak, or biryani rice if you want the base to sing too.",
  },
  {
    n: "02",
    title: "Point at the counter",
    body: "A rich array of dishes waits at the counter: fried chicken, mutton, beef rendang, fish head curry, squid, fish roe and more.",
  },
  {
    n: "03",
    title: "Say how much kuah",
    body: "The curries are ladled over the plate: a little, or banjir (flooded), the way many in Penang like it.",
  },
];

/** Chapter II: how the family first sold its food, on foot, as the company profile tells it. */
export default function OnFoot() {
  return (
    <section id="on-foot" aria-labelledby="foot-title" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <figure className="deckled relative w-[94%] rotate-[-2deg] sm:w-[88%]">
            <Image
              src="/images/archive/nasi-kandar-1950s.webp"
              alt="Two Nasi Kandar sellers in the 1950s, bamboo poles across their shoulders, baskets and pots hanging from each end."
              width={480}
              height={374}
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="block h-auto w-full sepia-[0.5]"
            />
            <figcaption className="px-2 pb-1 pt-3 text-sm italic text-ink">
              Nasi Kandar sellers with their poles, 1950s. Not Hameediyah: shown for how the food was carried.
            </figcaption>
          </figure>
          <div className="signboard relative mx-auto -mt-6 w-64 rotate-[2deg] border-2 border-green p-4 shadow-xl sm:absolute sm:-top-14 sm:right-0 sm:mt-0 sm:w-60 sm:rotate-[4deg]">
            <p className="font-display text-3xl uppercase">Kandar</p>
            <p className="mt-1 text-sm leading-snug text-ink/85">
              The pole balanced across the shoulder, a basket of food at each end. The way of selling gave the dish its
              name.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              id="foot-title"
              kicker="Chapter II · On foot"
              title={
                <>
                  Sold through the streets, <em className="text-green-deep">carried on the shoulder</em>
                </>
              }
              intro="To share their recipes with as many people as possible, the family packed their dishes into two large baskets, balanced them on a kandar pole and walked the streets of Penang, door to door, stopping to serve the busy townsfolk. That way of selling gave the food its name: Nasi Kandar."
            />
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="font-sign mt-12 text-xs font-semibold uppercase tracking-[0.3em] text-ink">How to eat Nasi Kandar</h3>
            <ol className="mt-5 divide-y divide-green/40 border-y border-green/40">
              {ritual.map((r) => (
                <li key={r.n} className="grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                  <span className="font-display text-3xl text-green-deep">{r.n}</span>
                  <div>
                    <p className="font-display text-xl uppercase text-ink">{r.title}</p>
                    <p className="mt-1 text-ink/80">{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
