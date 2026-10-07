"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import Plate, { MAX_LAUK } from "./Plate";
import Dish from "../art/Dish";
import { gravyLevels, lauk, rices, type Lauk, type Rice } from "@/data/dishes";
import { EASE_STEAM } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STEPS = ["Rice", "Lauk", "Kuah", "Your plate"] as const;

const btnPrimary =
  "inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-7 font-sign text-sm font-semibold uppercase tracking-[0.2em] text-yellow transition-colors duration-500 hover:bg-green-deep hover:text-paper disabled:cursor-not-allowed disabled:opacity-40";
const btnGhost =
  "inline-flex min-h-12 items-center rounded-full border border-ink/40 px-6 font-sign text-sm uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:border-ink";

export default function PlateBuilder() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [rice, setRice] = useState<Rice | null>(null);
  const [picked, setPicked] = useState<Lauk[]>([]);
  const [gravy, setGravy] = useState(0);
  const [story, setStory] = useState<Lauk | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const go = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => panel.current?.focus({ preventScroll: true }));
  };

  const toggle = (l: Lauk) =>
    setPicked((p) => (p.some((x) => x.id === l.id) ? p.filter((x) => x.id !== l.id) : p.length >= MAX_LAUK ? p : [...p, l]));

  const openStory = (l: Lauk) => {
    setStory(l);
    dialog.current?.showModal();
  };

  const reset = () => {
    setRice(null);
    setPicked([]);
    setGravy(0);
    go(0);
  };

  const canNext = step === 0 ? !!rice : step === 1 ? picked.length > 0 : true;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      {/* The plate stays in view while you build */}
      <div className="paper sticky top-16 z-20 -mx-4 border-b border-green/40 px-4 py-3 sm:top-20 lg:static lg:top-28 lg:mx-0 lg:border-0 lg:bg-none lg:p-0 lg:[background:none] lg:sticky">
        <div className="mx-auto max-w-[13rem] sm:max-w-[18rem] lg:max-w-none">
          <Plate rice={rice} picked={picked} gravy={gravy} />
        </div>
        <p aria-live="polite" className="mt-2 text-center font-sign text-xs uppercase tracking-[0.22em] text-ink/80 lg:mt-4 lg:text-xs">
          {rice ? rice.local : "No rice yet"} · {picked.length} lauk · {gravyLevels[gravy].name}
        </p>
      </div>

      <div>
        {/* Stepper */}
        <ol className="flex flex-wrap gap-x-2 gap-y-3" aria-label="Steps">
          {STEPS.map((s, i) => {
            const reachable = i === 0 || (i === 1 && rice) || (i >= 2 && rice && picked.length);
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => reachable && go(i)}
                  disabled={!reachable}
                  aria-current={step === i ? "step" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-full border px-4 font-sign text-xs uppercase tracking-[0.18em] transition-colors duration-500",
                    step === i
                      ? "border-2 border-green bg-yellow font-semibold text-ink"
                      : "border-ink/30 text-ink enabled:hover:border-ink disabled:opacity-40",
                  )}
                >
                  <span className="font-display text-base normal-case tracking-normal">{i + 1}</span>
                  {s}
                </button>
              </li>
            );
          })}
        </ol>

        <div ref={panel} tabIndex={-1} className="mt-10 outline-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE_STEAM }}
            >
              {step === 0 && (
                <fieldset>
                  <legend className="font-display sign-caps text-4xl text-ink sm:text-5xl">First, the rice</legend>
                  <p className="mt-3 max-w-md text-ink/75">Every Nasi Kandar plate starts the same way. Which will it be?</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {rices.map((r) => (
                      <label
                        key={r.id}
                        className={cn(
                          "group relative cursor-pointer border bg-mount p-5 transition-[border-color,box-shadow] duration-500 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green",
                          rice?.id === r.id ? "border-2 border-green bg-yellow-soft shadow-[0_18px_40px_-24px_rgba(20,19,15,0.8)]" : "border-green/50 hover:border-ink/60",
                        )}
                      >
                        <input
                          type="radio"
                          name="rice"
                          value={r.id}
                          checked={rice?.id === r.id}
                          onChange={() => setRice(r)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className="block size-14 rounded-full border border-ink/20"
                          style={{
                            background:
                              r.id === "biryani"
                                ? "radial-gradient(circle at 40% 35%, #F3CD78, #D79A3A)"
                                : "radial-gradient(circle at 40% 35%, #fff, #EDE5D3)",
                          }}
                        />
                        <span className="font-display mt-4 block text-2xl text-ink">{r.name}</span>
                        <span className="font-sign block text-xs uppercase tracking-[0.2em] text-green-deep">{r.local}</span>
                        <span className="mt-3 block text-sm text-ink/75">{r.note}</span>
                        {rice?.id === r.id && (
                          <span className="absolute right-4 top-4 font-sign text-xs uppercase tracking-[0.2em] text-ink">
                            Chosen ✓
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-display sign-caps text-4xl text-ink sm:text-5xl">Now, the counter</h2>
                  <p className="mt-3 max-w-md text-ink/75">
                    Tap a tray to add it to your plate, up to {MAX_LAUK}. Tap the story mark to learn what it is.
                  </p>
                  {/* A wooden counter of steel trays */}
                  <div className="mt-8 rounded-sm bg-[linear-gradient(#0E8A42,#07672F)] p-3 shadow-[inset_0_2px_0_rgba(255,255,255,0.15),0_20px_40px_-25px_rgba(20,19,15,0.9)] sm:p-4">
                    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {lauk.map((l) => {
                        const on = picked.some((x) => x.id === l.id);
                        const full = !on && picked.length >= MAX_LAUK;
                        return (
                          <li key={l.id} className="relative">
                            <button
                              type="button"
                              aria-pressed={on}
                              disabled={full}
                              onClick={() => toggle(l)}
                              className={cn(
                                "flex w-full flex-col items-center rounded-sm bg-[#E9E2D4] p-2 pb-3 text-center transition-[transform,box-shadow,opacity] duration-500 disabled:opacity-40",
                                on ? "-translate-y-1 shadow-[0_0_0_3px_#0B9444,0_0_0_6px_#FFDE16]" : "hover:-translate-y-0.5",
                              )}
                            >
                              <Dish lauk={l} vessel="tray" className="h-auto w-full" />
                              <span className="font-display mt-2 text-[0.98rem] leading-tight text-ink">{l.name}</span>
                              <span className="text-xs text-ink/65">{l.english}</span>
                              <span className="sr-only">{on ? ", on your plate" : ""}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => openStory(l)}
                              aria-label={`The story of ${l.name}`}
                              className="absolute right-1 top-1 grid size-10 place-items-center rounded-full bg-paper/90 font-body text-sm italic text-ink shadow"
                            >
                              i
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-display sign-caps text-4xl text-ink sm:text-5xl">How much kuah?</h2>
                  <p className="mt-3 max-w-md text-ink/75">
                    The server ladles <em>kuah campur</em>, mixed curries from the counter, over everything. Locals have
                    a word for the most generous pour: <em>banjir</em> (flooded).
                  </p>
                  <div className="mt-10">
                    <label htmlFor="gravy" className="sr-only">
                      Amount of gravy
                    </label>
                    <input
                      id="gravy"
                      type="range"
                      min={0}
                      max={4}
                      step={1}
                      value={gravy}
                      onChange={(e) => setGravy(Number(e.target.value))}
                      aria-valuetext={`${gravyLevels[gravy].name}: ${gravyLevels[gravy].note}`}
                      className="kuah-range w-full"
                    />
                    <ul className="mt-3 grid grid-cols-5 text-center" aria-hidden>
                      {gravyLevels.map((g) => (
                        <li key={g.level}>
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setGravy(g.level)}
                            className={cn(
                              "font-sign text-xs uppercase tracking-[0.15em] transition-colors duration-500 sm:text-xs",
                              gravy === g.level ? "text-green-deep" : "text-ink/60",
                            )}
                          >
                            {g.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <p className="font-display sign-caps mt-8 text-3xl text-ink">{gravyLevels[gravy].name}</p>
                    <p className="mt-1 text-lg text-ink/80">{gravyLevels[gravy].note}</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="font-sign text-xs uppercase tracking-[0.3em] text-green-deep">Ready to eat</p>
                  <h2 className="font-display sign-caps mt-2 text-4xl text-ink sm:text-6xl">Your plate, the 1907 way</h2>
                  <dl className="mt-8 divide-y divide-green/40 border-y border-green/40">
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                      <dt className="font-sign text-xs uppercase tracking-[0.2em] text-ink/80">Rice</dt>
                      <dd className="font-display text-xl">{rice?.name}</dd>
                    </div>
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                      <dt className="font-sign text-xs uppercase tracking-[0.2em] text-ink/80">Lauk</dt>
                      <dd className="font-display text-xl">{picked.map((p) => p.name).join(", ")}</dd>
                    </div>
                    <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                      <dt className="font-sign text-xs uppercase tracking-[0.2em] text-ink/80">Kuah</dt>
                      <dd className="font-display text-xl">
                        {gravyLevels[gravy].name} <span className="text-base italic text-ink/70">· {gravyLevels[gravy].note}</span>
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-6 max-w-md text-ink/80">
                    Take this order to the counter at 164-A Campbell Street, point at the trays and say how much kuah.
                    Ask what is cooking today.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/#visit" className={btnPrimary}>
                      Visit us <span aria-hidden>→</span>
                    </Link>
                    <button type="button" onClick={reset} className={btnGhost}>
                      Build another
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step < 3 && (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {step > 0 && (
                <button type="button" onClick={() => go(step - 1)} className={btnGhost}>
                  Back
                </button>
              )}
              <button type="button" onClick={() => go(step + 1)} disabled={!canNext} className={btnPrimary}>
                {step === 2 ? "Finish my plate" : "Next"} <span aria-hidden>→</span>
              </button>
              {!canNext && (
                <span className="text-sm text-ink/60">{step === 0 ? "Choose a rice to continue." : "Pick at least one lauk."}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dish story card */}
      <dialog
        ref={dialog}
        onClose={() => setStory(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-labelledby="story-title"
        className="m-auto w-[min(34rem,calc(100vw-2rem))] border border-green bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        {story && (
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <Dish lauk={story} className="size-28 shrink-0 sm:size-32" />
              <div>
                <p className="font-sign text-xs uppercase tracking-[0.25em] text-green-deep">{story.english}</p>
                <h3 id="story-title" className="font-display sign-caps mt-1 text-3xl text-ink">
                  {story.name}
                </h3>
              </div>
            </div>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="font-sign text-xs uppercase tracking-[0.25em] text-ink/80">What it is</dt>
                <dd className="mt-1 text-lg">{story.what}</dd>
              </div>
              <div>
                <dt className="font-sign text-xs uppercase tracking-[0.25em] text-ink/80">Why it matters</dt>
                <dd className="mt-1 text-lg">{story.why}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className={btnPrimary}
                onClick={() => {
                  toggle(story);
                  dialog.current?.close();
                }}
                disabled={!picked.some((p) => p.id === story.id) && picked.length >= MAX_LAUK}
              >
                {picked.some((p) => p.id === story.id) ? "Take it off my plate" : "Add to my plate"}
              </button>
              <button type="button" className={btnGhost} onClick={() => dialog.current?.close()}>
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
