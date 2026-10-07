"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Dish from "../art/Dish";
import type { Lauk, Rice } from "@/data/dishes";
import { EASE_POUR, EASE_STEAM } from "@/lib/motion";

/** Smooth closed blob through `n` noisy points (Catmull-Rom → cubic Bézier). */
function blob(r: number, seed: number, n = 11, wobble = 0.16) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const noise = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
    const k = 1 + ((noise - Math.floor(noise)) - 0.5) * 2 * wobble;
    return [Math.cos(a) * r * k, Math.sin(a) * r * k];
  });
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + " Z";
}

const RICE = blob(96, 3, 13, 0.1);
const GRAINS = Array.from({ length: 70 }, (_, i) => {
  const a = i * 2.399;
  const r = Math.sqrt(i / 70) * 84;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r, rot: (i * 47) % 180 };
});

// Gravy pools by level: [radius, offsetX, offsetY]
const POOLS: Array<Array<[number, number, number]>> = [
  [],
  [[46, -10, -6]],
  [
    [78, -6, 0],
    [40, 54, 40],
  ],
  [
    [116, 0, 4],
    [60, 70, 70],
    [52, -76, 60],
  ],
  [
    [150, 0, 0],
    [84, 62, 62],
    [74, -62, -52],
  ],
];

const SLOTS: Array<[number, number]> = [
  [-118, -70],
  [118, -70],
  [0, 128],
  [-118, 70],
  [118, 70],
  [0, -132],
];

export const MAX_LAUK = SLOTS.length;

export default function Plate({ rice, picked, gravy }: { rice: Rice | null; picked: Lauk[]; gravy: number }) {
  const reduce = useReducedMotion();
  const prev = useRef(gravy);
  const [pouring, setPouring] = useState(false);

  useEffect(() => {
    if (gravy > prev.current && !reduce) {
      setPouring(true);
      const t = setTimeout(() => setPouring(false), 1300);
      prev.current = gravy;
      return () => clearTimeout(t);
    }
    prev.current = gravy;
  }, [gravy, reduce]);

  const names = picked.map((p) => p.name);
  const dishes = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
  const pour = ["", "light", "usual", "generous", "flooding"][gravy];
  const summary =
    (rice ? rice.name.toLowerCase() : "an empty plate") +
    (dishes ? ` with ${dishes}` : "") +
    (gravy ? `${dishes ? "," : ""} and a ${pour} pour of kuah` : "");

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]" role="img" aria-label={`Your plate: ${summary}.`}>
      {/* Plate */}
      <svg viewBox="-200 -200 400 400" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id="enamel" cx="0.42" cy="0.36" r="0.7">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#EDE7DA" />
          </radialGradient>
          <radialGradient id="kuah" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0" stopColor="#E08A2C" />
            <stop offset="0.6" stopColor="#C2581A" />
            <stop offset="1" stopColor="#8E3A10" />
          </radialGradient>
          <radialGradient id="biryani" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0" stopColor="#F3CD78" />
            <stop offset="1" stopColor="#D79A3A" />
          </radialGradient>
        </defs>
        <ellipse cx="6" cy="16" rx="196" ry="192" fill="#14130F" opacity="0.18" style={{ filter: "blur(10px)" }} />
        <circle r="192" fill="url(#enamel)" stroke="#14130F" strokeWidth="2" />
        <circle r="192" fill="none" stroke="#0B9444" strokeWidth="9" />
        <circle r="160" fill="none" stroke="#14130F" strokeWidth="0.7" opacity="0.18" />
        {/* Enamel chips, an old well-used plate */}
        <path d="M150,-118 q6,2 4,8 q-6,-1 -4,-8 Z M-170,60 q5,4 1,8 q-5,-3 -1,-8 Z" fill="#14130F" opacity="0.5" />

        {/* Kuah campur: pools that spread, never snap */}
        <clipPath id="plate-well">
          <circle r="182" />
        </clipPath>
        <g clipPath="url(#plate-well)" opacity="0.9">
          {POOLS[4].map((_, i) => {
            const pool = POOLS[gravy][i];
            const [r, x, y] = pool ?? POOLS[4][i];
            return (
              <motion.path
                key={i}
                d={blob(r, i + 7, 9, 0.12)}
                fill="url(#kuah)"
                initial={false}
                animate={{ x, y, scale: pool ? 1 : 0, opacity: pool ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 1.5, ease: EASE_POUR, delay: reduce ? 0 : 0.35 + i * 0.12 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            );
          })}
        </g>
        <AnimatePresence>
          {rice && (
            <motion.g
              key={rice.id}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.9, ease: EASE_STEAM }}
            >
              <path d={RICE} transform="translate(5 9)" fill="#14130F" opacity="0.14" style={{ filter: "blur(6px)" }} />
              <path d={RICE} fill={rice.id === "biryani" ? "url(#biryani)" : "#FFFDF7"} stroke="#B3A68C" strokeWidth="2.5" />
              {GRAINS.map((g, i) => (
                <ellipse
                  key={i}
                  cx={g.x}
                  cy={g.y}
                  rx="4.6"
                  ry="1.7"
                  transform={`rotate(${g.rot} ${g.x} ${g.y})`}
                  fill={rice.id === "biryani" ? (i % 5 ? "#FBE3A8" : "#D9641E") : "#FFFFFF"}
                  stroke="#CFC6B4"
                  strokeWidth="0.5"
                />
              ))}
              <motion.path
                d={RICE}
                fill="url(#kuah)"
                initial={false}
                animate={{ opacity: gravy * 0.14 }}
                transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.6 }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* The pour */}
        <AnimatePresence>
          {pouring && (
            <motion.g key="pour" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <motion.path
                d="M-12,-260 C-8,-180 -14,-90 -6,0"
                stroke="#C2581A"
                strokeWidth="11"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: EASE_POUR }}
              />
              <motion.g initial={{ rotate: -10, y: -6 }} animate={{ rotate: 18, y: 0 }} transition={{ duration: 0.8, ease: EASE_POUR }}>
                <path d="M-70,-276 Q-20,-250 18,-270 L10,-290 Q-20,-276 -62,-296 Z" fill="#B08D57" stroke="#14130F" strokeWidth="2" />
                <path d="M-62,-290 L-150,-330" stroke="#6B3A1E" strokeWidth="7" strokeLinecap="round" />
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Lauk */}
      <AnimatePresence>
        {picked.map((l, i) => {
          const [x, y] = SLOTS[i];
          return (
            <motion.div
              key={l.id}
              className="absolute w-[30%]"
              style={{ left: `${50 + (x / 400) * 100 - 15}%`, top: `${50 + (y / 400) * 100 - 15}%` }}
              initial={reduce ? false : { opacity: 0, y: -50, scale: 1.15 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.8, ease: EASE_STEAM }}
            >
              <div className="aspect-square [mask-image:radial-gradient(circle,black_52%,transparent_68%)]">
                <Dish lauk={l} vessel="none" className="h-full w-full" />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {!rice && (
        <p className="pointer-events-none absolute inset-0 grid place-items-center px-16 text-center font-body text-xl italic text-ink/60">
          An empty plate, waiting for rice
        </p>
      )}
    </div>
  );
}
