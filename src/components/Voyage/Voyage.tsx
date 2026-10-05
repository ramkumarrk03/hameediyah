"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import VoyageMap from "./VoyageMap";
import GeorgeTownPlan from "./GeorgeTownPlan";
import { voyage } from "@/data/timeline";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, useGSAP);

const NUMERALS = ["I", "II", "III", "IV"];

function Intro() {
  return (
    <header>
      <p className="font-sign text-xs uppercase tracking-[0.3em] text-saffron-deep">
        Chapter I · <span lang="ta" className="font-tamil normal-case tracking-normal">பயணம்</span> · The Voyage
      </p>
      <h2 className="font-display mt-3 text-4xl leading-[1.05] text-cinnamon sm:text-5xl lg:text-6xl">
        A spice merchant sails east
      </h2>
      <p className="mt-4 max-w-md text-ink/85">
        Before the shophouse, before the tree, there was a crossing: from the Coromandel coast of Tamil Nadu, over the
        Bay of Bengal, to the docks of Penang.
      </p>
    </header>
  );
}

function Stop({ i, compact = false }: { i: number; compact?: boolean }) {
  const s = voyage[i];
  return (
    <>
      <span className="v-dot mt-1.5 grid size-7 shrink-0 place-items-center rounded-full border border-cinnamon bg-paper font-sign text-[0.7rem] text-cinnamon">
        {NUMERALS[i]}
      </span>
      <div>
        <p className="font-sign text-xs uppercase tracking-[0.22em] text-saffron-deep">
          {s.label} · {s.place}
        </p>
        <p className={compact ? "mt-1 text-[0.98rem] leading-snug" : "font-display mt-1 text-base leading-snug lg:text-xl"}>
          {s.line}
        </p>
      </div>
    </>
  );
}

export default function Voyage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop / tablet: pinned frame, scrubbed voyage, zoom into Campbell Street.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const frame = root.current!.querySelector<HTMLElement>("[data-voyage=desktop]")!;
        const q = gsap.utils.selector(frame);
        const route = frame.querySelector<SVGPathElement>(".v-route-guide")!;
        const stops = q(".v-stop");

        gsap.set(q(".v-boat-rock"), { transformOrigin: "50% 100%" });
        gsap.to(q(".v-boat-rock"), { rotation: 4, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: frame,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
          },
        });

        tl.from(q(".v-coast"), { drawSVG: 0, duration: 1.4, stagger: 0.08 }, 0)
          .from(q(".v-land"), { opacity: 0, duration: 1 }, 0.6)
          .from(q(".v-label"), { opacity: 0, duration: 0.6, stagger: 0.03 }, 0.8)
          .from(q(".v-pin"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%", duration: 0.3, stagger: 1.6 }, 1.6)
          .from(q(".v-route"), { drawSVG: 0, duration: 6, ease: "power1.inOut" }, 1.6)
          .fromTo(
            q(".v-boat"),
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            1.6,
          )
          .to(
            q(".v-boat"),
            {
              motionPath: { path: route, align: route, alignOrigin: [0.5, 0.9] },
              duration: 6,
              ease: "power1.inOut",
              immediateRender: true,
            },
            1.6,
          )
          .to(q(".v-hint"), { opacity: 0, duration: 0.5 }, 1.2);

        // Captions follow the boat.
        gsap.set(stops, { opacity: 0.28 });
        const at = [1.6, 3.4, 7.2, 9];
        stops.forEach((el, i) => {
          tl.to(el, { opacity: 1, duration: 0.4 }, at[i]);
          tl.to(el.querySelector(".v-dot"), { backgroundColor: "#D9641E", color: "#F5ECD9", borderColor: "#D9641E", duration: 0.4 }, at[i]);
          if (i > 0) tl.to(stops[i - 1], { opacity: 0.45, duration: 0.4 }, at[i]);
        });

        // Zoom into Penang, then hand over to the street plan.
        tl.to(q(".v-boat"), { opacity: 0, duration: 0.5 }, 7.8)
          .to(q(".v-world"), { scale: 4.5, svgOrigin: "912 616", duration: 1.8, ease: "power2.in" }, 7.8)
          .to(q(".v-mapwrap"), { opacity: 0, duration: 0.7 }, 8.9)
          .fromTo(
            q(".v-plan"),
            { opacity: 0, scale: 0.82, transformOrigin: "63% 48%" },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
            8.9,
          )
          .from(q(".gt-draw"), { drawSVG: 0, duration: 1.6, stagger: 0.03 }, 9.1)
          .from(q(".gt-fade"), { opacity: 0, duration: 0.6, stagger: 0.06 }, 9.8)
          .to({}, { duration: 1 });
      });

      // Mobile: a vertical journey down the page.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const el = root.current!.querySelector<HTMLElement>("[data-voyage=mobile]")!;
        const q = gsap.utils.selector(el);
        const mapEl = q(".m-map")[0];
        const journey = q(".m-journey")[0];
        const planEl = q(".m-plan")[0];

        gsap
          .timeline({ scrollTrigger: { trigger: mapEl, start: "top 80%", end: "bottom 35%", scrub: 0.8 } })
          .from(q(".m-map .v-coast"), { drawSVG: 0, stagger: 0.05, duration: 1 }, 0)
          .from(q(".m-map .v-label, .m-map .v-land"), { opacity: 0, duration: 0.6 }, 0.4)
          .from(q(".m-map .v-route"), { drawSVG: 0, duration: 1.6 }, 0.6)
          .from(q(".m-map .v-boat"), { opacity: 0, duration: 0.3 }, 2);

        gsap.from(q(".m-rope"), {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: { trigger: journey, start: "top 60%", end: "bottom 60%", scrub: 0.6 },
        });
        gsap.fromTo(
          q(".m-boat"),
          { y: 0 },
          {
            y: () => (journey as HTMLElement).offsetHeight - 36,
            ease: "none",
            scrollTrigger: { trigger: journey, start: "top 60%", end: "bottom 60%", scrub: 0.6, invalidateOnRefresh: true },
          },
        );
        q(".v-stop").forEach((stop) => {
          gsap.from(stop, {
            opacity: 0.25,
            y: 14,
            ease: "none",
            scrollTrigger: { trigger: stop, start: "top 80%", end: "top 55%", scrub: 0.6 },
          });
        });
        gsap
          .timeline({ scrollTrigger: { trigger: planEl, start: "top 85%", end: "bottom 60%", scrub: 0.8 } })
          .from(q(".m-plan .gt-draw"), { drawSVG: 0, stagger: 0.03, duration: 1.4 }, 0)
          .from(q(".m-plan .gt-fade"), { opacity: 0, stagger: 0.05, duration: 0.5 }, 0.8);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="voyage" ref={root} aria-label="The Voyage: from Tamil Nadu to Penang" className="relative">

      {/* ≥768px: a tall track with a sticky frame. Reduced motion: a single static frame. */}
      <div data-voyage="desktop" className="relative hidden h-[520vh] md:block motion-reduce:h-auto">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-[minmax(250px,1fr)_2.1fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-12 lg:gap-y-8 lg:px-10">
            <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
              <Intro />
            </div>
            <ol
              className="grid grid-cols-2 gap-x-8 gap-y-4 lg:col-start-1 lg:row-start-2 lg:grid-cols-1 lg:gap-y-5 lg:self-start"
              aria-label="The route"
            >
              {voyage.map((s, i) => (
                <li key={s.id} className="v-stop flex gap-4">
                  <Stop i={i} />
                </li>
              ))}
            </ol>
            <figure className="relative row-start-2 mx-auto w-full max-w-[36rem] lg:col-start-2 lg:max-w-none lg:row-span-2 lg:row-start-1">
              <div className="relative border border-brass/70 bg-paper p-2 shadow-[0_20px_50px_-25px_rgba(36,20,12,0.5)]">
                <div className="relative overflow-hidden border border-brass/40">
                  <div className="v-mapwrap">
                    <VoyageMap id="vmap-d" className="block h-auto w-full" />
                  </div>
                  <div className="v-plan absolute inset-0 opacity-0 motion-reduce:hidden">
                    <GeorgeTownPlan id="gt-d" className="block h-full w-full bg-paper" />
                  </div>
                </div>
              </div>
              <figcaption className="v-hint mt-3 flex items-center gap-2 font-sign text-xs uppercase tracking-[0.25em] text-cinnamon/80 motion-reduce:hidden">
                <span aria-hidden className="inline-block animate-bounce">↓</span> Scroll to set sail
              </figcaption>
              {/* Reduced motion: show the street plan as a second plate under the map. */}
              <div className="mt-6 hidden border border-brass/70 bg-paper p-2 motion-reduce:block">
                <GeorgeTownPlan id="gt-d-static" className="block h-auto w-full" />
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* <768px: the voyage as a vertical journey. */}
      <div data-voyage="mobile" className="px-4 py-20 md:hidden">
        <Intro />
        <div className="m-map mt-8 border border-brass/70 bg-paper p-1.5">
          <VoyageMap id="vmap-m" className="block h-auto w-full" />
        </div>

        <div className="m-journey relative mt-12 pl-14">
          <div aria-hidden className="m-rope absolute bottom-0 left-[1.15rem] top-0 border-l-2 border-dashed border-saffron" />
          <div aria-hidden className="m-boat absolute left-0 top-0 grid size-10 place-items-center">
            <svg viewBox="-20 -36 40 44" className="size-10">
              <path d="M-14,-2 C-8,6 8,6 16,-3 Z" fill="#6B3A1E" stroke="#24140C" strokeWidth="1.4" />
              <path d="M1,-3 L1,-32" stroke="#24140C" strokeWidth="1.4" />
              <path d="M2,-31 C14,-24 17,-14 15,-5 L2,-5 Z" fill="#D9641E" stroke="#24140C" strokeWidth="1.2" />
              <path d="M0,-28 C-7,-20 -9,-12 -8,-5 L0,-5 Z" fill="#E0A526" stroke="#24140C" strokeWidth="1.1" />
            </svg>
          </div>
          <ol className="space-y-16 pb-4" aria-label="The route">
            {voyage.map((s, i) => (
              <li key={s.id} className="v-stop flex gap-3">
                <Stop i={i} compact />
              </li>
            ))}
          </ol>
        </div>

        <figure className="m-plan mt-12">
          <div className="border border-brass/70 bg-paper p-1.5">
            <GeorgeTownPlan id="gt-m" className="block h-auto w-full" />
          </div>
          <figcaption className="mt-3 text-sm italic text-cinnamon">
            From the docks at Weld Quay to the tree on Lebuh Campbell, in front of 164A. An illustrated plan, not to scale.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
