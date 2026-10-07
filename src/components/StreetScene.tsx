"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { FarSkyline, Lamps, Shophouses } from "./art/street/Layers";
import { KandarSeller, Person, type PersonKind } from "./art/street/People";

/**
 * A living street for the hero: the kandar seller walks right to left on the spot while
 * George Town slides past to the right in parallax, and passers-by stroll the other way.
 * Pure CSS animation (transforms only); paused when the hero is off-screen,
 * and frozen into a still under prefers-reduced-motion.
 */

// Passers-by walking towards the right edge. `rest` is where each one stands in the still frame.
// Far walkers stand higher on the road and smaller; near ones lower and larger.
const WALKERS: Array<{ kind: PersonKind; dur: number; delay: number; step: number; h: string; bottom: string; z: number; rest: string }> = [
  { kind: "docker", dur: 24, delay: -3, step: 0.95, h: "40%", bottom: "13%", z: 1, rest: "52vw" },
  { kind: "woman", dur: 30, delay: -15, step: 1.05, h: "42%", bottom: "12%", z: 1, rest: "78vw" },
  { kind: "merchant", dur: 20, delay: -9, step: 1.0, h: "62%", bottom: "2%", z: 3, rest: "88vw" },
  { kind: "child", dur: 14, delay: -1, step: 0.6, h: "54%", bottom: "3%", z: 3, rest: "58vw" },
  { kind: "docker", dur: 26, delay: -18, step: 0.9, h: "38%", bottom: "14%", z: 1, rest: "64vw" },
];

function Strip({ children, dur, className = "" }: { children: React.ReactNode; dur: number; className?: string }) {
  return (
    <div className={`st-strip ${className}`} style={{ "--dur": `${dur}s` } as CSSProperties}>
      {children}
      {children}
    </div>
  );
}

export default function StreetScene({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  // Pause every loop while the hero is scrolled out of view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      el.dataset.paused = String(r.bottom < 0 || r.top > window.innerHeight);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div ref={root} className={`street pointer-events-none isolate select-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0">
      {/* Far skyline */}
      <div className="absolute inset-x-0 bottom-[22%] h-[78%] overflow-hidden">
        <Strip dur={140} className="h-full">
          <FarSkyline style={{ height: "100%", width: "auto", aspectRatio: "1800 / 300" }} />
        </Strip>
      </div>

      {/* Shophouse row */}
      <div className="absolute inset-x-0 bottom-[21%] h-[66%] overflow-hidden">
        <Strip dur={70} className="h-full">
          <Shophouses style={{ height: "100%", width: "auto", aspectRatio: "2400 / 420" }} />
        </Strip>
      </div>

      {/* The street */}
      <div className="st-road absolute inset-x-0 bottom-0 h-[22%]" />

      {/* Passers-by, walking the other way */}
      {WALKERS.map((w, i) => (
        <div
          key={i}
          className="st-walker absolute left-0"
          style={
            {
              "--dur": `${w.dur}s`,
              "--delay": `${w.delay}s`,
              "--rest": w.rest,
              height: w.h,
              bottom: w.bottom,
              zIndex: w.z,
            } as CSSProperties
          }
        >
          <Person
            kind={w.kind}
            className="h-full w-auto"
            style={{ "--step": `${w.step}s` } as CSSProperties}
          />
        </div>
      ))}

      {/* The kandar seller, walking through it all */}
      {/* Faces left: he walks right to left while the street slides the other way */}
      <div className="absolute bottom-[5%] left-1/2 z-[2] h-[62%] -translate-x-1/2 md:left-[70%] md:h-[66%]">
        <KandarSeller
          className="h-full w-auto -scale-x-100 drop-shadow-[0_12px_14px_rgba(20,19,15,0.25)]"
          style={{ "--step": "1.05s" } as CSSProperties}
        />
      </div>

      {/* Gas lamps sweep past in front */}
      <div className="absolute inset-x-0 bottom-0 z-[4] h-[96%] overflow-hidden opacity-90">
        <Strip dur={26} className="h-full">
          <Lamps style={{ height: "100%", width: "auto", aspectRatio: "1600 / 640" }} />
        </Strip>
      </div>
      </div>
    </div>
  );
}
