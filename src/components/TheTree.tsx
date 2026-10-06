import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import StallScene from "./art/StallScene";

const ritual = [
  {
    n: "01",
    title: "Choose your rice",
    body: "Plain white rice to let the curries speak, or golden biryani rice if you want the base to sing too.",
  },
  {
    n: "02",
    title: "Point at the counter",
    body: "Twenty to thirty dishes wait in the trays: fried chicken, mutton, fish head, squid, egg, okra. Pick as many as you like.",
  },
  {
    n: "03",
    title: "Say how much kuah",
    body: "The server ladles mixed curries, kuah campur, over everything. A little, or banjir: flooded, the Penang way.",
  },
];

export default function TheTree() {
  return (
    <section id="tree" aria-labelledby="tree-title" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <figure className="deckled relative z-10 ml-auto w-[62%] rotate-[3deg] sm:absolute sm:-top-16 sm:right-[-2%] sm:w-[44%]">
            <Image
              src="/images/archive/nasi-kandar-1950s.webp"
              alt="Two nasi kandar sellers in the 1950s, bamboo poles across their shoulders, baskets and pots hanging from each end."
              width={480}
              height={374}
              sizes="(min-width: 640px) 300px, 60vw"
              className="block h-auto w-full sepia-[0.5]"
            />
            <figcaption className="px-1 pt-2 text-xs italic text-cinnamon">Kandar sellers, 1950s.</figcaption>
          </figure>
          <figure className="deckled -mt-10 w-[92%] rotate-[-2deg] sm:mt-16 sm:w-[86%]">
            <StallScene className="block h-auto w-full sepia-[0.35]" />
            <figcaption className="px-2 pb-1 pt-3 text-sm italic text-cinnamon">
              Under the tree on Lebuh Campbell. An ink sketch of how it began.
            </figcaption>
          </figure>
          <div className="relative mx-auto mt-6 w-64 rotate-[2deg] border border-brass/60 bg-paper p-4 shadow-xl sm:absolute sm:-bottom-28 sm:right-4 sm:mt-0 sm:w-52 sm:rotate-[4deg]">
            <p lang="ta" className="font-tamil text-2xl text-cinnamon">கந்தர்</p>
            <p className="mt-1 text-sm leading-snug text-ink/80">
              <em>Kandar</em>: the bamboo pole carried across the shoulder, a pot of rice at one end and curry at the
              other. It gave the dish its name.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              id="tree-title"
              kicker="Chapter II · The Tree"
              title={
                <>
                  A stall with no walls, <em className="text-saffron-deep">only shade</em>
                </>
              }
              intro="In 1907 the founder and his sons cooked rice and curries and carried them on bamboo poles to Campbell Street. Under a tree they set the pots down and fed the dockers and merchants of George Town. The stall grew into the shophouse at 164A, and the way of eating never changed."
            />
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="font-sign mt-12 text-xs uppercase tracking-[0.3em] text-cinnamon">How to eat nasi kandar</h3>
            <ol className="mt-5 divide-y divide-brass/40 border-y border-brass/40">
              {ritual.map((r) => (
                <li key={r.n} className="grid grid-cols-[3.5rem_1fr] gap-4 py-5">
                  <span className="font-display text-3xl text-saffron-deep">{r.n}</span>
                  <div>
                    <p className="font-display text-xl text-cinnamon">{r.title}</p>
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
