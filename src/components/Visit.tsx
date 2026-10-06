import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TableDialog from "./TableDialog";
import OpenBadge from "./OpenBadge";
import { branches, original } from "@/data/branches";

const label = "font-sign text-xs uppercase tracking-[0.28em] text-cinnamon/80";
const big = "font-display mt-3 text-2xl leading-snug text-ink sm:text-3xl";
const link =
  "mt-5 inline-flex min-h-11 items-center gap-2 font-sign text-xs uppercase tracking-[0.22em] text-saffron-deep underline decoration-brass underline-offset-[6px] transition-colors duration-500 hover:text-cinnamon";

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="visit-title"
            align="center"
            kicker="Chapter VII · Come and eat"
            title={
              <>
                Find the counter <em className="text-saffron-deep">on Lebuh Campbell</em>
              </>
            }
            intro="No booking needed. Walk in, point at what you want, and say how much kuah."
          />
        </Reveal>

        <Reveal className="mt-14">
          <figure className="relative overflow-hidden border border-brass/60 bg-paper-deep p-1.5">
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              <Image
                src="/images/shop/hameediyah-3.webp"
                alt="A long queue of people along the five-foot way of Campbell Street, waiting outside Hameediyah."
                fill
                sizes="(min-width: 1280px) 1140px, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
            <figcaption className="absolute bottom-4 left-4 bg-ink/80 px-3 py-1.5 text-sm italic text-paper sm:bottom-6 sm:left-6">
              Lunchtime on Lebuh Campbell. Come early.
            </figcaption>
          </figure>
        </Reveal>

        {/* The three things a visitor needs: where, when, how to reach us */}
        <Reveal className="mt-16">
          <dl className="grid divide-y divide-brass/40 border-y border-brass/40 text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-6 py-10">
              <dt className={label}>Where</dt>
              <dd className={big}>
                164A Lebuh Campbell
                <span className="block text-lg text-ink/70 sm:text-xl">George Town, Penang</span>
              </dd>
              <dd>
                <a href={original.mapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  Get directions <span aria-hidden>↗</span>
                </a>
              </dd>
            </div>
            <div className="px-6 py-10">
              <dt className={label}>When</dt>
              <dd className={big}>
                {original.hours}
                <span className="block text-lg italic text-saffron-deep sm:text-xl">{original.closed}</span>
              </dd>
              <dd className="mt-4">
                <OpenBadge />
              </dd>
              <dd className="mt-2 text-sm text-ink/60">Hours may change. Please call ahead.</dd>
            </div>
            <div className="px-6 py-10">
              <dt className={label}>Call</dt>
              <dd className={big}>
                <a href={original.phoneHref} className="inline-block whitespace-nowrap py-1.5 hover:text-saffron-deep">
                  {original.phone}
                </a>
              </dd>
              <dd>
                <a href={original.phoneHref} className={link}>
                  Tap to call <span aria-hidden>→</span>
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-ink/75">Coming with a group?</p>
          <TableDialog />
        </Reveal>

        <Reveal className="mt-16 text-center">
          <p className={label}>Also find us</p>
          <p className="mx-auto mt-3 max-w-3xl text-ink/75">
            {branches.map((b, i) => (
              <span key={b.area}>
                {b.name === "Hameediyah" ? b.area : `${b.name}, ${b.area}`}
                {i < branches.length - 1 && <span aria-hidden className="mx-2 text-brass">·</span>}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
