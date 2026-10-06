"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { EASE_STEAM } from "@/lib/motion";
import { original } from "@/data/branches";

type Errors = Partial<Record<"name" | "phone" | "date" | "guests", string>>;

const field =
  "mt-1.5 block w-full min-h-12 rounded-none border-0 border-b border-cinnamon/40 bg-transparent px-0 text-lg text-ink placeholder:text-ink/40 focus:border-saffron focus:outline-none focus:ring-0";

export default function BookingForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<null | { name: string; date: string; time: string; guests: string }>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd) as Record<string, string>;
    const next: Errors = {};
    if (!v.name?.trim()) next.name = "Please tell us your name.";
    if (!/^[+\d][\d\s-]{6,}$/.test(v.phone ?? "")) next.phone = "A phone number we can call, please.";
    if (!v.date) next.date = "Choose a day.";
    else if (new Date(v.date).getDay() === 5) next.date = "The original shop is closed on Fridays.";
    if (!v.guests) next.guests = "How many of you?";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setDone({ name: v.name.trim(), date: v.date, time: v.time, guests: v.guests });
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_STEAM }}
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <svg viewBox="0 0 120 80" className="w-36" aria-hidden>
              <path d="M10,30 Q60,18 110,30" stroke="#B08D57" strokeWidth="4" fill="none" />
              <path d="M24,30 C20,62 48,64 46,40 Z M74,30 C70,62 98,64 96,40 Z" fill="#C99A45" stroke="#24140C" strokeWidth="1.5" />
              <path d="M34,22 c-4,-8 4,-12 0,-20 M86,22 c-4,-8 4,-12 0,-20" stroke="#D9641E" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <p className="font-display mt-6 text-4xl text-cinnamon">Terima kasih, {done.name}.</p>
            <p className="mt-4 max-w-sm text-lg text-ink/80">
              A table for {done.guests} on{" "}
              {new Date(done.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              {done.time ? ` at ${done.time}` : ""}. The pots will be warm.
            </p>
            <p className="mt-4 max-w-sm text-sm text-ink/65">
              To confirm, please call the shop on{" "}
              <a className="underline decoration-brass underline-offset-4" href={original.phoneHref}>
                {original.phone}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setDone(null)}
              className="mt-8 min-h-11 font-sign text-xs uppercase tracking-[0.25em] text-saffron-deep underline underline-offset-4"
            >
              Make another request
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid gap-6 sm:grid-cols-2">
            <h2 id="booking-title" className="font-display text-3xl text-cinnamon sm:col-span-2">Hold a table</h2>
            {(
              [
                ["name", "Your name", "text", "name"],
                ["phone", "Phone", "tel", "tel"],
              ] as const
            ).map(([n, l, t, ac]) => (
              <label key={n} className="block">
                <span className="font-sign text-[0.72rem] uppercase tracking-[0.22em] text-cinnamon">{l}</span>
                <input
                  name={n}
                  type={t}
                  autoComplete={ac}
                  aria-invalid={!!errors[n]}
                  aria-describedby={errors[n] ? `${n}-err` : undefined}
                  className={field}
                />
                {errors[n] && (
                  <span id={`${n}-err`} className="mt-1 block text-sm text-saffron-deep">
                    {errors[n]}
                  </span>
                )}
              </label>
            ))}
            <label className="block">
              <span className="font-sign text-[0.72rem] uppercase tracking-[0.22em] text-cinnamon">Day</span>
              <input
                name="date"
                type="date"
                min={today}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "date-err" : "date-help"}
                className={field}
              />
              {errors.date ? (
                <span id="date-err" className="mt-1 block text-sm text-saffron-deep">{errors.date}</span>
              ) : (
                <span id="date-help" className="mt-1 block text-sm text-ink/60">Closed on Fridays.</span>
              )}
            </label>
            <label className="block">
              <span className="font-sign text-[0.72rem] uppercase tracking-[0.22em] text-cinnamon">Time</span>
              <select name="time" defaultValue="13:00" className={field}>
                {["11:30", "12:00", "12:30", "13:00", "13:30", "18:30", "19:00", "19:30", "20:00", "20:30"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <fieldset className="sm:col-span-2" aria-describedby={errors.guests ? "guests-err" : undefined}>
              <legend className="font-sign text-[0.72rem] uppercase tracking-[0.22em] text-cinnamon">Guests</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {["1", "2", "3", "4", "5", "6", "8+"].map((g) => (
                  <label key={g} className="cursor-pointer">
                    <input type="radio" name="guests" value={g} className="peer sr-only" />
                    <span className="grid size-12 place-items-center rounded-full border border-cinnamon/40 font-display text-lg text-cinnamon transition-colors duration-300 peer-checked:border-cinnamon peer-checked:bg-cinnamon peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-saffron">
                      {g}
                    </span>
                  </label>
                ))}
              </div>
              {errors.guests && (
                <span id="guests-err" className="mt-2 block text-sm text-saffron-deep">{errors.guests}</span>
              )}
            </fieldset>
            <button
              type="submit"
              className="min-h-12 rounded-full bg-cinnamon px-8 font-sign text-sm uppercase tracking-[0.2em] text-paper transition-colors duration-500 hover:bg-saffron-deep sm:col-span-2 sm:justify-self-start"
            >
              Request a table
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
