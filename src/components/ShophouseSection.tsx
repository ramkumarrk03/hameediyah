import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ThenNow from "./ThenNow";
import Image from "next/image";

const facts = [
  { k: "2", v: "world wars survived. The original shophouse came through the bombing of the Second." },
  { k: "164A", v: "Lebuh Campbell, restored under Penang's heritage building rules." },
  { k: "UNESCO", v: "Campbell Street lies inside George Town's World Heritage area." },
];

export default function ShophouseSection() {
  return (
    <section id="shophouse" aria-labelledby="shop-title" className="relative bg-paper-deep/50 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <Reveal>
          <ThenNow
            label="Drag to compare nasi kandar sellers with their shoulder poles in the 1950s and the shop at 164A today"
            aspect="aspect-[1/1]"
            thenLabel="Then · the kandar"
            nowLabel="Now · 164A"
            then={
              <Image
                src="/images/archive/nasi-kandar-1950s.webp"
                alt="Two nasi kandar sellers in the 1950s, each with a bamboo pole across the shoulder carrying baskets and pots."
                fill
                draggable={false}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover sepia-[0.6]"
              />
            }
            now={
              <Image
                src="/images/shop/hameediyah-1.webp"
                alt="The yellow and green shophouse front of Hameediyah Restaurant at 164A Campbell Street, with a queue at the door."
                fill
                draggable={false}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_45%]"
              />
            }
          />
          <p className="mt-4 text-sm italic text-cinnamon">
            Drag, or use the arrow keys. Left: nasi kandar sellers with their poles, 1950s (not Hameediyah). Right: 164A Lebuh Campbell, 2021.
          </p>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              id="shop-title"
              kicker="Chapter V · The Shophouse"
              title={
                <>
                  The same door, <em className="text-saffron-deep">a century on</em>
                </>
              }
              intro="The stall became a restaurant in the shophouse at 164A Lebuh Campbell. It came through two world wars, and its front was restored in line with Penang's heritage rules. Hameediyah Tandoori House opened two doors away."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <dl className="mt-10 divide-y divide-brass/40 border-y border-brass/40">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[8.5rem_1fr] items-baseline gap-4 py-5">
                  <dt className="font-display text-2xl text-saffron-deep sm:text-3xl">{f.k}</dt>
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
