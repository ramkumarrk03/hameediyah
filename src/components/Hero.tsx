import Link from "next/link";
import type { CSSProperties } from "react";
import StreetScene from "./StreetScene";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const CLOUDS = [
  { top: "12%", w: 220, dur: 120, delay: -20, left: "48%" },
  { top: "22%", w: 160, dur: 160, delay: -90, left: "70%" },
  { top: "7%", w: 260, dur: 190, delay: -140, left: "86%" },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-sky relative h-svh min-h-[680px] overflow-hidden bg-[linear-gradient(180deg,#FFFBEC_0%,#FFF5C6_45%,#FFEB85_75%,#FFE24A_100%)]"
    >
      {/* ---- Background: the living street ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[10%] size-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,246,190,0.95)_0%,rgba(255,222,22,0.4)_38%,transparent_70%)]"
      />
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          aria-hidden
          className="st-cloud pointer-events-none absolute"
          style={{ top: c.top, left: c.left, width: c.w, "--dur": `${c.dur}s`, "--delay": `${c.delay}s` } as CSSProperties}
        >
          <svg viewBox="0 0 200 60" className="h-auto w-full" aria-hidden>
            <path d="M10,50 Q20,24 50,32 Q62,6 96,18 Q120,0 146,22 Q180,18 190,50 Z" fill="#FFF8E8" opacity="0.75" />
          </svg>
        </div>
      ))}
      <StreetScene className="absolute inset-x-0 bottom-0 h-[44%] md:h-[74%]" />

      {/* ---- Wash: solid paper behind the text, fading to clear over the street ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FFFBEC_0%,rgba(255,251,236,0.95)_64%,rgba(255,251,236,0)_80%)] md:bg-[linear-gradient(90deg,#FFFBEC_0%,rgba(255,251,236,0.96)_30%,rgba(255,251,236,0.7)_44%,rgba(255,251,236,0)_62%)]"
      />
      <div
        aria-hidden
        className="paper pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply [mask-image:linear-gradient(90deg,black_30%,transparent_60%)]"
      />

      {/* ---- Foreground: the headline ---- */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 pt-24 sm:px-8 md:justify-center md:pt-16">
        <div className="max-w-xl">
          <p style={d(0.1)} className="rise font-sign text-xs font-semibold uppercase tracking-[0.32em] text-green-deep sm:text-sm">
            Oldest Nasi Kandar in Malaysia · Lebuh Campbell
          </p>
          <h1
            style={d(0.2)}
            id="hero-title"
            className="rise font-display sign-caps letterpress mt-4 text-[3.1rem] text-ink sm:text-7xl lg:text-[6.4rem]"
          >
            Rice &amp; curry,
            <br />
            <em className="text-green-deep">carried since 1907.</em>
          </h1>
          <p style={d(0.35)} className="rise mt-4 text-[1.05rem] text-ink/85 sm:mt-5 sm:text-xl">
            Malaysia&apos;s oldest Nasi Kandar began with two baskets on a kandar pole, carried through the streets
            of Penang. Seven generations on, the same family serves it at 164-A Campbell Street.
          </p>
          <div style={d(0.5)} className="rise mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-7 font-sign text-sm font-semibold uppercase tracking-[0.2em] text-yellow shadow-[0_10px_30px_-12px_rgba(20,19,15,0.9)] transition-colors duration-500 hover:bg-green-deep hover:text-paper"
            >
              Build your plate
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/#visit"
              className="inline-flex min-h-12 items-center rounded-full border-2 border-green bg-paper/70 px-7 font-sign text-sm font-semibold uppercase tracking-[0.2em] text-green-deep backdrop-blur-sm transition-colors duration-500 hover:bg-yellow hover:text-ink"
            >
              Find us at 164-A
            </Link>
          </div>
          <p className="mt-10 hidden font-sign text-sm font-semibold uppercase tracking-[0.24em] text-ink md:block">
            Kandar <span className="font-body text-base normal-case tracking-normal italic text-ink/70">· the shoulder pole that gave Nasi Kandar its name</span>
          </p>
        </div>
      </div>
    </section>
  );
}
