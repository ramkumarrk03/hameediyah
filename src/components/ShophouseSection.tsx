import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ThenNow from "./ThenNow";
import Image from "next/image";

const facts = [
  { k: "164-A", v: "Hameediyah still operates from this Campbell Street shophouse, opened by the family in the 1950s." },
  { k: "Restored", v: "The restaurant was renovated in line with Penang's Heritage Rules for heritage buildings." },
  { k: "Record", v: "Listed in the Malaysia Book of Records (2020) as the oldest Nasi Kandar restaurant." },
];

export default function ShophouseSection() {
  return (
    <section id="shophouse" aria-labelledby="shop-title" className="relative bg-paper-deep/50 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <Reveal>
          <ThenNow
            label="Drag to compare the Hameediyah shop front in the 1970s with the shop at 164-A today"
            aspect="aspect-[4/3]"
            thenLabel="Then · 1970s"
            nowLabel="Now · 164-A"
            then={
              <Image
                src="/images/archive/shopfront-1970s.webp"
                alt="Hameediyah in the 1970s: a man in a patterned shirt smiles in the shop doorway under a sign reading “Murthabah $1.50”, with “Hameediyah” painted down the pillar beside him."
                fill
                draggable={false}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_50%] sepia-[0.25]"
              />
            }
            now={
              <Image
                src="/images/shop/hameediyah-1.webp"
                alt="The yellow and green shophouse front of Hameediyah Restaurant at 164-A Campbell Street, with a queue at the door."
                fill
                draggable={false}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_45%]"
              />
            }
          />
          <p className="mt-4 text-sm italic text-ink">
            Drag, or use the arrow keys. Left: the shop in the 1970s, from the family archive. Right: 164-A Lebuh Campbell today.
          </p>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              id="shop-title"
              kicker="Chapter V · The Shophouse"
              title={
                <>
                  The same door, <em className="text-green-deep">since the 1950s</em>
                </>
              }
              intro="After the Second World War, the British permitted food to be sold in shophouses, and in the 1950s, the family opened its first at 164-A Campbell Street. Diners still come for the murtabak sizzling on the grill, the rich array of curries, and the old dumbwaiter that hoists food to the dining room upstairs."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <dl className="mt-10 divide-y divide-green/40 border-y border-green/40">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[8.5rem_1fr] items-baseline gap-4 py-5">
                  <dt className="font-display text-2xl text-green-deep sm:text-3xl">{f.k}</dt>
                  <dd className="text-ink/85">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
