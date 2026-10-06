"use client";

/**
 * Then & Now wipe. Adapted from the 21st.dev "Image Comparison Slider"
 * (wensity/before-after-card): motion-value clip-path, pointer capture and
 * full keyboard control, restyled in brass and paper and taking any layers.
 */
import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function ThenNow({
  then,
  now,
  thenLabel,
  nowLabel,
  label = "Compare then and now",
  aspect = "aspect-[4/3]",
}: {
  aspect?: string;
  then: ReactNode;
  now: ReactNode;
  thenLabel: string;
  nowLabel: string;
  label?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const wipe = useMotionValue(0.5);
  const [value, setValue] = useState(50);
  const [grabbing, setGrabbing] = useState(false);

  useMotionValueEvent(wipe, "change", (v) => setValue(Math.round(v * 100)));
  const clipPath = useTransform(wipe, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const left = useTransform(wipe, (v) => `${v * 100}%`);

  const fromPointer = (x: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (r && r.width) wipe.set(clamp01((x - r.left) / r.width));
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    // Stop the browser's native image-drag / text-selection from stealing the pointer.
    e.preventDefault();
    dragging.current = true;
    setGrabbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => dragging.current && fromPointer(e.clientX);
  const up = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    setGrabbing(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    const v = wipe.get();
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? v - 0.04
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? v + 0.04
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 1
              : null;
    if (next === null) return;
    e.preventDefault();
    wipe.set(clamp01(next));
  };

  return (
    <div
      ref={frame}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`${value}% ${thenLabel}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onKeyDown={key}
      onDragStart={(e) => e.preventDefault()}
      className={`relative isolate ${aspect} w-full ${grabbing ? "cursor-grabbing" : "cursor-ew-resize"} touch-none select-none [&_img]:pointer-events-none [&_img]:select-none [-webkit-user-drag:none] overflow-hidden border-[10px] border-[#FBF5E8] shadow-[0_30px_60px_-30px_rgba(36,20,12,0.6)] outline-none ring-1 ring-brass/60 focus-visible:ring-2 focus-visible:ring-saffron`}
    >
      <div className="pointer-events-none absolute inset-0">{now}</div>
      <motion.div className="pointer-events-none absolute inset-0" style={{ clipPath }}>
        {then}
      </motion.div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 bg-ink/75 px-2.5 py-1 font-sign text-xs uppercase tracking-[0.2em] text-paper">
        {thenLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 bg-ink/75 px-2.5 py-1 font-sign text-xs uppercase tracking-[0.2em] text-paper">
        {nowLabel}
      </span>

      <motion.div aria-hidden className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-[#FBF5E8]" style={{ left }} />
      <motion.div aria-hidden className="pointer-events-none absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" style={{ left }}>
        <div
          className={`grid size-12 place-items-center rounded-full border-2 border-brass bg-paper text-cinnamon shadow-lg transition-transform duration-300 ${
            grabbing ? "scale-90" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M9 6l-6 6 6 6zM15 6l6 6-6 6z" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
