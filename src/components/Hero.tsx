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
      className="hero-sky relative h-svh min-h-[680px] overflow-hidden bg-[linear-gradient(180deg,#F7ECD6_0%,#F6E2B8_45%,#F1CF8C_75%,#E9BC74_100%)]"
    >
      {/* ---- Background: the living street ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[10%] size-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,236,170,0.95)_0%,rgba(242,194,48,0.35)_38%,transparent_70%)]"
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
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F6EAD2_0%,rgba(246,234,210,0.95)_64%,rgba(246,234,210,0)_80%)] md:bg-[linear-gradient(90deg,#F6EAD2_0%,rgba(246,234,210,0.96)_30%,rgba(246,234,210,0.7)_44%,rgba(246,234,210,0)_62%)]"
      />
      <div
        aria-hidden
        className="paper pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply [mask-image:linear-gradient(90deg,black_30%,transparent_60%)]"
      />

      {/* ---- Foreground: the headline ---- */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 pt-24 sm:px-8 md:justify-center md:pt-16">
        <div className="max-w-xl">
          <p style={d(0.1)} className="rise font-sign text-xs uppercase tracking-[0.32em] text-saffron-deep sm:text-sm">
            Nasi kandar · Lebuh Campbell, George Town
          </p>
          <h1
            style={d(0.2)}
            id="hero-title"
            className="rise font-display letterpress mt-4 text-[2.9rem] leading-[0.98] text-cinnamon sm:text-6xl lg:text-[4.9rem]"
          >
            Rice &amp; curry,
            <br />
            <em className="font-normal text-saffron-deep">carried since 1907.</em>
          </h1>
          <p style={d(0.35)} className="rise mt-5 text-lg text-ink/85 sm:text-xl">
            Malaysia&apos;s oldest nasi kandar began with a bamboo pole and two pots on Campbell Street. The same
            family still pours the curries at 164A.
          </p>
          <div style={d(0.5)} className="rise mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/menu"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-cinnamon px-7 font-sign text-sm uppercase tracking-[0.2em] text-paper shadow-[0_10px_30px_-12px_rgba(107,58,30,0.9)] transition-colors duration-500 hover:bg-saffron-deep"
            >
              Build your plate
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/#visit"
              className="inline-flex min-h-12 items-center rounded-full border border-cinnamon/40 bg-paper/60 px-7 font-sign text-sm uppercase tracking-[0.2em] text-cinnamon backdrop-blur-sm transition-colors duration-500 hover:border-cinnamon hover:bg-paper/80"
            >
              Find us at 164A
            </Link>
          </div>
          <p lang="ta" className="font-tamil mt-10 hidden text-lg text-cinnamon md:block">
            கந்தர் <span lang="en" className="font-display text-base italic text-ink/70">· kandar, the shoulder pole</span>
          </p>
        </div>
      </div>
    </section>
  );
}
