import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { owners, values } from "@/data/timeline";

/** The owners, the chef and the house values, from the client's company profile. */
export default function FamilyToday() {
  return (
    <section id="today" aria-labelledby="today-title" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            id="today-title"
            align="center"
            kicker="Chapter VII · The family today"
            title={
              <>
                Still in the <em className="text-green-deep">family&apos;s hands</em>
              </>
            }
            intro="Hameediyah is led today by the sons of Abdul Sukkoor, Seeni Pakir and Syed Ibrahim, with the next generation working alongside them."
          />
        </Reveal>

        <ul className="mt-16 grid gap-12 sm:grid-cols-3">
          {owners.map((o, i) => (
            <Reveal as="li" key={o.name} delay={i * 0.08} className="text-center">
              <div className="mx-auto size-44 overflow-hidden rounded-full border-4 border-green bg-yellow shadow-[0_20px_40px_-24px_rgba(20,19,15,0.7)] sm:size-48">
                <Image
                  src={`/images/family/${o.photo}.webp`}
                  alt={`Portrait of ${o.name}.`}
                  width={265}
                  height={265}
                  sizes="12rem"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-display mt-6 text-2xl uppercase leading-tight text-ink sm:text-3xl">{o.name}</h3>
              <p className="mt-1 font-sign text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">{o.role}</p>
              <p className="mx-auto mt-3 max-w-xs text-ink/80">{o.line}</p>
            </Reveal>
          ))}
        </ul>

        {/* The chef */}
        <Reveal className="mt-28">
          <div className="signboard dotted-frame relative grid items-center gap-8 overflow-hidden rounded-2xl border-4 border-green p-6 sm:p-10 md:grid-cols-[16rem_1fr] md:gap-12">
            <Image
              src="/images/family/chef-haji-ithrees.webp"
              alt="Chef A.S.S Haji Ithrees in a black chef's jacket and cap, giving a thumbs-up."
              width={558}
              height={752}
              sizes="16rem"
              className="mx-auto h-auto w-56 md:w-full"
            />
            <div>
              <p className="font-sign text-xs font-semibold uppercase tracking-[0.3em] text-green-deep">Chef Hameediyah</p>
              <h3 className="font-display sign-caps mt-3 text-5xl text-ink sm:text-6xl">A.S.S Haji Ithrees</h3>
              <p className="mt-4 max-w-xl text-lg text-ink/85">
                With Hameediyah for more than 25 years, Chef Haji Ithrees guards the recipes passed down through the
                family. He balances the spices behind dishes like the Mutton Mysore and Beef Rendang, and trains new
                chefs to the house&apos;s standards.
              </p>
              <blockquote className="mt-6 max-w-xl border-l-4 border-green pl-5 text-xl italic text-ink">
                &ldquo;We add in original spices to our food and we kept it as a secret recipe since our Forefather&apos;s
                Golden Era.&rdquo;
              </blockquote>
            </div>
          </div>
        </Reveal>

        {/* Values */}
        <Reveal className="mt-24">
          <p className="text-center font-sign text-xs font-semibold uppercase tracking-[0.3em] text-ink/80">
            What the family stands for
          </p>
          <dl className="mt-8 grid gap-x-10 gap-y-8 border-y border-dotted border-green/60 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.name} className="text-center">
                <dt className="font-display text-3xl uppercase text-green-deep">{v.name}</dt>
                <dd className="mt-2 text-ink/80">{v.line}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
