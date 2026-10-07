/**
 * The printed heritage menu card. Layout adapted from the 21st.dev
 * "Restaurant Menu Block" (dotted leaders, two columns), with the prices
 * replaced by plain-English notes. Dishes are those named in the client's own documents. No prices.
 */
import { menuCard } from "@/data/dishes";
import Reveal from "./Reveal";

export default function MenuCard() {
  return (
    <section id="menu-card" aria-labelledby="card-title" className="px-4 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative bg-mount p-3 shadow-[0_40px_80px_-40px_rgba(20,19,15,0.6)] sm:p-4">
          <div className="border-[3px] border-double border-green px-5 py-12 sm:px-14 sm:py-16">
            <header className="text-center">
              <p className="font-sign text-xs uppercase tracking-[0.4em] text-green-deep">Est. 1907 · 164-A Lebuh Campbell</p>
              <h2 id="card-title" className="font-display sign-caps bevel mt-4 text-6xl text-ink sm:text-8xl">
                The Menu
              </h2>
              <p className="ornament-rule mx-auto mt-6 max-w-xs" aria-hidden>
                <span>✦</span>
              </p>
              <p className="mx-auto mt-6 max-w-lg text-ink/75">
                The dishes Hameediyah is known for, as named in the family&apos;s own menu. Ask at the counter for
                what is cooking today.
              </p>
            </header>

            <div className="mt-14 grid gap-x-14 gap-y-14 md:grid-cols-2">
              {menuCard.map((c) => (
                <section key={c.title} aria-labelledby={`mc-${c.title}`}>
                  <h3 id={`mc-${c.title}`} className="font-sign text-sm uppercase tracking-[0.3em] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm italic text-ink/65">{c.intro}</p>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {c.items.map((d) => (
                      <li key={d.name} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="font-display text-lg leading-snug text-ink sm:shrink-0">{d.name}</span>
                        <span aria-hidden className="hidden min-w-6 flex-1 translate-y-[-0.25rem] border-b border-dotted border-green sm:block" />
                        <span className="text-sm italic leading-snug text-ink/90 sm:max-w-[55%] sm:text-right">{d.note}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="mt-16 text-center text-sm text-ink/60">
              Please ask at the counter for today&apos;s dishes and prices.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
