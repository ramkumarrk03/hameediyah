/**
 * The printed heritage menu card. Layout adapted from the 21st.dev
 * "Restaurant Menu Block" (dotted leaders, two columns), with the prices
 * replaced by plain-English notes. Prices vary by branch, so none are shown.
 */
import { menuCard } from "@/data/dishes";
import Reveal from "./Reveal";

export default function MenuCard() {
  return (
    <section id="menu-card" aria-labelledby="card-title" className="px-4 py-24 sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative bg-[#FBF5E8] p-3 shadow-[0_40px_80px_-40px_rgba(36,20,12,0.6)] sm:p-4">
          <div className="border-[3px] border-double border-brass px-5 py-12 sm:px-14 sm:py-16">
            <header className="text-center">
              <p className="font-sign text-xs uppercase tracking-[0.4em] text-saffron-deep">Est. 1907 · 164A Lebuh Campbell</p>
              <h2 id="card-title" className="font-display mt-4 text-5xl text-cinnamon sm:text-7xl">
                The Menu
              </h2>
              <p className="brass-rule mx-auto mt-6 max-w-xs" aria-hidden>
                <span>✦</span>
              </p>
              <p className="mx-auto mt-6 max-w-lg text-ink/75">
                What the counter usually holds. Dishes change through the day, and the server will tell you what is
                fresh from the kitchen.
              </p>
            </header>

            <div className="mt-14 grid gap-x-14 gap-y-14 md:grid-cols-2">
              {menuCard.map((c) => (
                <section key={c.title} aria-labelledby={`mc-${c.title}`}>
                  <h3 id={`mc-${c.title}`} className="font-sign text-sm uppercase tracking-[0.3em] text-cinnamon">
                    {c.title}
                    {"tamil" in c && (
                      <span lang="ta" className="font-tamil ml-3 normal-case tracking-normal text-brass">
                        {c.tamil}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm italic text-ink/65">{c.intro}</p>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {c.items.map((d) => (
                      <li key={d.name} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                        <span className="font-display text-lg leading-snug text-ink sm:shrink-0">{d.name}</span>
                        <span aria-hidden className="hidden min-w-6 flex-1 translate-y-[-0.25rem] border-b border-dotted border-brass sm:block" />
                        <span className="text-sm italic leading-snug text-cinnamon/90 sm:max-w-[55%] sm:text-right">{d.note}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <p className="mt-16 text-center text-sm text-ink/60">
              Prices vary by branch and are shown at the counter. Please ask about anything you&apos;d like to know.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
