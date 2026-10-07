import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TableDialog from "./TableDialog";
import { branches, original } from "@/data/branches";

const label = "font-sign text-xs uppercase tracking-[0.28em] text-ink/80";
const big = "font-display mt-3 text-2xl leading-snug text-ink sm:text-3xl";
const link =
  "mt-5 inline-flex min-h-11 items-center gap-2 font-sign text-xs uppercase tracking-[0.22em] text-green-deep underline decoration-green underline-offset-[6px] transition-colors duration-500 hover:text-ink";

export default function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="visit-title"
            align="center"
            kicker="Chapter IX · Come and eat"
            title={
              <>
                Find the counter <em className="text-green-deep">on Campbell Street</em>
              </>
            }
            intro="Walk in, point at what you want, and say how much kuah. For events and private dining, call ahead."
          />
        </Reveal>

        <Reveal className="mt-14">
          <figure className="relative overflow-hidden border border-green/60 bg-paper-deep p-1.5">
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
              Lunchtime on Campbell Street.
            </figcaption>
          </figure>
        </Reveal>

        {/* Where, call, write: from the family's own contact page */}
        <Reveal className="mt-16">
          <dl className="signboard dotted-frame grid divide-y divide-dotted divide-green/60 rounded-2xl border-4 border-green text-center shadow-[0_24px_50px_-30px_rgba(20,19,15,0.6)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-6 py-10">
              <dt className={label}>Where</dt>
              <dd className={big}>
                164-A Lebuh Campbell
                <span className="block text-lg text-ink/70 sm:text-xl">George Town, Penang</span>
              </dd>
              <dd>
                <a href={original.mapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  Get directions <span aria-hidden>↗</span>
                </a>
              </dd>
            </div>
            <div className="px-6 py-10">
              <dt className={label}>Call</dt>
              <dd className={big}>
                <a href={original.phoneHref} className="inline-block whitespace-nowrap py-1.5 hover:text-green-deep">
                  {original.phone}
                </a>
              </dd>
              <dd className="mt-2 text-sm text-ink/70">Please call for today&apos;s opening hours.</dd>
              <dd>
                <a href={original.phoneHref} className={link}>
                  Tap to call <span aria-hidden>→</span>
                </a>
              </dd>
            </div>
            <div className="px-6 py-10">
              <dt className={label}>Write</dt>
              <dd className={`${big} break-all sm:text-2xl`}>
                <a href={`mailto:${original.email}`} className="hover:text-green-deep">
                  {original.email}
                </a>
              </dd>
              <dd>
                <a href={`mailto:${original.email}`} className={link}>
                  Send an email <span aria-hidden>→</span>
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-ink/75">Coming with a group?</p>
          <TableDialog />
        </Reveal>

        {/* All six outlets */}
        <div className="mt-24">
          <Reveal className="text-center">
            <p className={label}>Our outlets</p>
            <h3 className="font-display sign-caps mt-3 text-4xl text-ink sm:text-6xl">Six counters, one family</h3>
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((b, i) => (
              <Reveal as="li" key={b.name} delay={(i % 3) * 0.06}>
                <div className="relative aspect-[3/2] overflow-hidden border-4 border-green bg-paper-deep">
                  <Image
                    src={`/images/branches/${b.photo}.webp`}
                    alt={b.photoAlt}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <h4 className="font-display mt-4 text-3xl uppercase leading-none text-ink">{b.name}</h4>
                <p className="mt-1 font-sign text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">{b.area}</p>
                <p className="mt-2 text-sm text-ink/80">{b.address}</p>
                {b.note && <p className="mt-1 text-sm italic text-ink/70">{b.note}</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
