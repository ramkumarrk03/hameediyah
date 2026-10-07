"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { spices, type Spice } from "@/data/spices";
import SectionHeading from "./SectionHeading";
import { EASE_STEAM } from "@/lib/motion";
import { cn } from "@/lib/utils";

function SpiceArt({ id, roasted }: { id: string; roasted: boolean }) {
  const f = (raw: string, done: string) => (roasted ? done : raw);
  const ink = "#1A0E08";
  switch (id) {
    case "cumin":
    case "fennel":
      return (
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <ellipse
              key={i}
              cx={(i % 3) * 12 - 12 + (i % 2) * 3}
              cy={Math.floor(i / 3) * 10 - 10}
              rx="7"
              ry="2.6"
              transform={`rotate(${i * 41} ${(i % 3) * 12 - 12} ${Math.floor(i / 3) * 10 - 10})`}
              fill={id === "cumin" ? f("#9C7A4C", "#5A3A1C") : f("#93A06A", "#5C5A2E")}
              stroke={ink}
              strokeWidth="0.6"
            />
          ))}
        </g>
      );
    case "cinnamon":
      return (
        <g transform="rotate(-25)">
          <rect x="-26" y="-7" width="52" height="14" rx="6" fill={f("#A45A2A", "#5E2E12")} stroke={ink} strokeWidth="1" />
          <path d="M-22,-2 H22 M-22,3 H22" stroke={ink} strokeWidth="0.6" opacity="0.6" />
          <ellipse cx="26" cy="0" rx="3" ry="7" fill={f("#C27A44", "#7A3E18")} stroke={ink} strokeWidth="0.8" />
        </g>
      );
    case "star-anise":
      return (
        <g>
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              transform={`rotate(${i * 45})`}
              d="M0,0 C4,-6 6,-16 0,-22 C-6,-16 -4,-6 0,0 Z"
              fill={f("#8A4A26", "#4A2410")}
              stroke={ink}
              strokeWidth="0.8"
            />
          ))}
          <circle r="3.5" fill={f("#C8925A", "#7A4A22")} />
        </g>
      );
    case "cardamom":
      return (
        <g>
          {[-12, 4, 16].map((x, i) => (
            <path
              key={x}
              transform={`translate(${x} ${i * 6 - 6}) rotate(${i * 30 - 20})`}
              d="M-10,0 C-8,-8 8,-8 12,0 C8,8 -8,8 -10,0 Z"
              fill={f("#A7B576", "#6E6A36")}
              stroke={ink}
              strokeWidth="0.8"
            />
          ))}
        </g>
      );
    case "cloves":
      return (
        <g>
          {[-14, 0, 14].map((x, i) => (
            <g key={x} transform={`translate(${x} 0) rotate(${i * 25 - 25})`}>
              <path d="M0,-4 V18" stroke={f("#6E3A1E", "#3A1A0A")} strokeWidth="3" strokeLinecap="round" />
              <circle cy="-8" r="5" fill={f("#7E4424", "#40200C")} stroke={ink} strokeWidth="0.7" />
            </g>
          ))}
        </g>
      );
    case "fenugreek":
      return (
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <rect
              key={i}
              x={(i % 5) * 7 - 16}
              y={Math.floor(i / 5) * 7 - 10}
              width="5"
              height="4"
              rx="1"
              fill={f("#D9B44A", "#9A6A20")}
              stroke={ink}
              strokeWidth="0.4"
              transform={`rotate(${i * 23} ${(i % 5) * 7 - 14} ${Math.floor(i / 5) * 7 - 8})`}
            />
          ))}
        </g>
      );
    default:
      return (
        <g>
          {[-8, 8].map((y, i) => (
            <g key={y} transform={`translate(0 ${y}) rotate(${i ? 12 : -8})`}>
              <path d="M-26,0 C-20,-7 18,-6 24,0 C18,6 -20,7 -26,0 Z" fill={f("#B32A18", "#6A1408")} stroke={ink} strokeWidth="0.8" />
              <path d="M24,0 l6,-3" stroke="#3F5A2C" strokeWidth="2.4" strokeLinecap="round" />
            </g>
          ))}
        </g>
      );
  }
}

// Positions around the pan, in percent.
const POS: Array<[number, number]> = [
  [50, 18],
  [77, 29],
  [83, 56],
  [67, 79],
  [38, 81],
  [19, 60],
  [22, 32],
  [50, 50],
];

export default function SpiceRitual() {
  const reduce = useReducedMotion();
  const [roasted, setRoasted] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<Spice>(spices[0]);
  const warmth = roasted.size / spices.length;

  const roast = (s: Spice) => {
    setActive(s);
    setRoasted((prev) => new Set(prev).add(s.id));
  };

  return (
    <section
      id="spices"
      aria-labelledby="spices-title"
      className="paper-dark is-ink relative overflow-hidden px-4 py-24 transition-colors sm:px-8 sm:py-32"
    >
      {/* The room warms as the pan works. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-[1600ms]"
        style={{
          opacity: 0.25 + warmth * 0.75,
          background: "radial-gradient(ellipse at 30% 55%, rgba(217,100,30,0.42), rgba(20,19,15,0.35) 45%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
            {/* The iron pan */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,#3B302A,#16100C_70%)] shadow-[inset_0_0_0_10px_#2A211B,inset_0_0_0_12px_#4A3B30,0_40px_80px_-20px_rgba(0,0,0,0.8)]"
            />
            <div aria-hidden className="absolute -left-[16%] top-1/2 hidden h-6 w-[24%] sm:block -translate-y-1/2 rounded-full bg-[#1E1612] shadow-[inset_0_2px_0_#4A3B30]" />
            <ul className="absolute inset-0">
              {spices.map((s, i) => {
                const done = roasted.has(s.id);
                const [x, y] = POS[i];
                return (
                  <li key={s.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                    <button
                      type="button"
                      onClick={() => roast(s)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && roast(s)}
                      onFocus={() => setActive(s)}
                      aria-pressed={done}
                      aria-label={`${s.name}${done ? ", roasted" : ""}`}
                      className={cn(
                        "relative grid size-20 place-items-center rounded-full transition-transform duration-700 hover:scale-110 sm:size-24",
                        active.id === s.id && "ring-1 ring-yellow/70",
                      )}
                    >
                      <svg viewBox="-27 -27 54 54" className="size-full overflow-visible">
                        <motion.g
                          animate={done && !reduce ? { y: [0, -1.5, 0] } : { y: 0 }}
                          transition={{ duration: 0.5, repeat: done && !reduce ? 2 : 0 }}
                        >
                          <SpiceArt id={s.id} roasted={done} />
                        </motion.g>
                        {done && (
                          <circle r="30" fill="none" stroke="#E0A526" strokeOpacity="0.25" strokeWidth="6" style={{ filter: "blur(4px)" }} />
                        )}
                      </svg>
                      <AnimatePresence>
                        {done && !reduce && (
                          <motion.span aria-hidden className="pointer-events-none absolute inset-0" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {[0, 1, 2].map((k) => (
                              <motion.span
                                key={k}
                                className="absolute left-1/2 top-1/3 h-8 w-2 rounded-full bg-paper/50 blur-[3px]"
                                initial={{ opacity: 0, y: 0, x: (k - 1) * 10 }}
                                animate={{ opacity: [0, 0.6, 0], y: -60, x: (k - 1) * 18 }}
                                transition={{ duration: 2.4, delay: k * 0.35, ease: "easeOut" }}
                              />
                            ))}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Phones: the spice card sits right under the pan, where the thumb is */}
          <div aria-hidden className="mx-auto mt-6 max-w-sm border-l-2 border-yellow/70 pl-4 lg:hidden">
            <p className="font-display text-2xl text-paper">
              {active.name}{" "}
              <span className="font-sign text-xs uppercase tracking-[0.2em] text-yellow">{active.malay}</span>
            </p>
            <p className="mt-1 text-paper/85">{active.role}</p>
          </div>
          <p className="mt-6 text-center font-sign text-xs uppercase tracking-[0.25em] text-paper/70">
            {roasted.size === spices.length
              ? "The pan is ready. Now the curry can begin."
              : `Hover or tap to roast · ${roasted.size} of ${spices.length}`}
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            dark
            id="spices-title"
            kicker="Chapter III · The Spice Ritual"
            title={
              <>
                Before the curry, <em className="text-yellow">the pan</em>
              </>
            }
            intro="In Nasi Kandar cooking, whole spices are dry-roasted until they darken and smoke, then ground into the pastes behind every gravy. Roast the ones on the pan to meet them."
          />
          <div aria-live="polite" className="mt-10 border-l-2 border-yellow/70 pl-6 max-lg:sr-only lg:min-h-48">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.6, ease: EASE_STEAM }}
              >
                <p className="font-display text-4xl text-paper">{active.name}</p>
                <p className="mt-1 font-sign text-sm uppercase tracking-[0.2em] text-yellow">{active.malay}</p>
                <p className="mt-4 max-w-md text-lg text-paper/85">{active.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-8 max-w-md text-sm italic text-paper/65">
            The spices on the pan are typical of Nasi Kandar cooking in general. The house blend is the family&apos;s
            secret.
          </p>
        </div>
      </div>
    </section>
  );
}
