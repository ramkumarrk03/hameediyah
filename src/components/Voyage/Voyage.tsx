"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MLMap, Marker, GeoJSONSource, StyleSpecification } from "maplibre-gl";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { voyage } from "@/data/timeline";
import { EASE_STEAM, usePrefersReducedMotion } from "@/lib/motion";
import {
  HAMEEDIYAH,
  KEYFRAMES,
  ROUTE_WINDOW,
  SEA_ROUTE,
  STOP_PROGRESS,
  WALK,
  WALK_WINDOW,
  WELD_QUAY,
  alongLine,
  stopAt,
  type Camera,
  type LngLat,
} from "./voyageGeo";

const NUMERALS = ["I", "II", "III", "IV"];
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function cameraAt(p: number, boat: LngLat, mobile: boolean): Camera {
  let i = 1;
  while (i < KEYFRAMES.length - 1 && KEYFRAMES[i].p < p) i++;
  const a = KEYFRAMES[i - 1];
  const b = KEYFRAMES[i];
  const t = ease(clamp01((p - a.p) / (b.p - a.p || 1)));
  let center: LngLat = [lerp(a.center[0], b.center[0], t), lerp(a.center[1], b.center[1], t)];
  // While sailing, the camera rides with the boat.
  if (p >= ROUTE_WINDOW.start && p <= ROUTE_WINDOW.end) center = boat;
  const zoom = lerp(a.zoom, b.zoom, t) - (mobile ? 0.9 : 0);
  return { center, zoom, pitch: lerp(a.pitch, b.pitch, t), bearing: lerp(a.bearing, b.bearing, t) };
}

/** Re-ink the OpenStreetMap "Positron" style in the house palette. */
function heritageStyle(style: StyleSpecification): StyleSpecification {
  for (const l of style.layers) {
    const id = l.id;
    const paint = (l.paint ?? {}) as Record<string, unknown>;
    if (l.type === "background") paint["background-color"] = "#F1E4C8";
    else if (id === "water") paint["fill-color"] = "#C6D2C8";
    else if (id === "waterway") paint["line-color"] = "#B5C4B9";
    else if (id === "building") {
      paint["fill-color"] = "#E3CDA6";
      paint["fill-outline-color"] = "#C4A574";
    } else if (l.type === "fill") paint["fill-color"] = "#EADCBC";
    else if (l.type === "line" && id.startsWith("boundary")) {
      paint["line-color"] = "#B08D57";
      paint["line-opacity"] = 0.6;
    } else if (l.type === "line" && /rail|aeroway/.test(id)) l.layout = { ...(l.layout ?? {}), visibility: "none" };
    else if (l.type === "line" && id.includes("casing")) paint["line-color"] = "#D2B98C";
    else if (l.type === "line") paint["line-color"] = "#FBF3E2";
    else if (l.type === "symbol") {
      if (/shield|airport|^water_name|label_country_3|label_state/.test(id)) l.layout = { ...(l.layout ?? {}), visibility: "none" };
      else if (l.layout && "text-field" in l.layout)
        l.layout = {
          ...l.layout,
          "text-field": ["coalesce", ["get", "name:en"], ["get", "name_en"], ["get", "name:latin"], ["get", "name"]],
        } as never;
      paint["text-color"] = id.startsWith("water") ? "#4F6B5E" : "#6B3A1E";
      paint["text-halo-color"] = "#F5ECD9";
      paint["text-halo-width"] = 1.4;
    }
    l.paint = paint as never;
  }
  return style;
}

function boatEl() {
  const el = document.createElement("div");
  el.className = "voyage-mk voyage-boat";
  el.innerHTML = `<svg viewBox="-22 -38 44 46" width="46" height="48" aria-hidden="true">
    <ellipse cx="0" cy="4" rx="20" ry="4" fill="#24140C" opacity=".18"/>
    <path d="M-14,-2 C-8,6 8,6 16,-3 Z" fill="#6B3A1E" stroke="#24140C" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M1,-3 L1,-32" stroke="#24140C" stroke-width="1.4"/>
    <path d="M2,-31 C14,-24 17,-14 15,-5 L2,-5 Z" fill="#D9641E" stroke="#24140C" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M0,-28 C-7,-20 -9,-12 -8,-5 L0,-5 Z" fill="#E0A526" stroke="#24140C" stroke-width="1.1" stroke-linejoin="round"/>
  </svg>`;
  return el;
}

function labelEl(text: string, kind: "sea" | "land" | "place") {
  const el = document.createElement("div");
  el.className = `voyage-mk voyage-label voyage-label--${kind}`;
  const span = document.createElement("span");
  span.textContent = text;
  el.appendChild(span);
  return el;
}

function shopEl() {
  const el = document.createElement("div");
  el.className = "voyage-mk voyage-shop";
  el.innerHTML = `<span class="voyage-shop__inner"><span class="voyage-shop__pulse"></span><span class="voyage-shop__pin"></span>
    <span class="voyage-shop__card"><b>Hameediyah</b><em>164A Lebuh Campbell · since 1907</em></span></span>`;
  return el;
}

const line = (coords: LngLat[]) => ({
  type: "Feature" as const,
  properties: {},
  geometry: { type: "LineString" as const, coordinates: coords },
});

export default function Voyage() {
  const reduce = usePrefersReducedMotion();
  const section = useRef<HTMLElement>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const markers = useRef<{ boat?: Marker; shop?: Marker; labels: Marker[] }>({ labels: [] });
  const target = useRef(0);
  const current = useRef(0);
  // Furthest point reached. The voyage only moves forward: scrolling back up never
  // replays it in reverse, and it resets only when the page is reloaded.
  const reached = useRef(0);
  const kick = useRef<() => void>(() => {});
  const railJumpUntil = useRef(0);
  // Once the voyage has played to the end, the tall scroll track collapses to one screen,
  // so scrolling back up passes the map like any other section.
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);
  const bottomBeforeCollapse = useRef(0);
  const autoplay = useRef(false);
  const [stop, setStop] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [atStart, setAtStart] = useState(true);

  // Load the map (library + tiles, several MB on a phone) only once the reader has actually
  // scrolled toward it, never during the first page load, so the hero paints and responds fast.
  // A scroll check rather than IntersectionObserver, which is throttled in background tabs.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const check = () => {
      if (window.scrollY < 40) return; // still on the hero: not yet
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.5 && r.bottom > -window.innerHeight) {
        setStatus((s) => (s === "idle" ? "loading" : s));
        window.removeEventListener("scroll", check);
      }
    };
    // A reload part-way down the page (restored scroll position) loads straight away.
    const first = requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", check);
    };
  }, []);

  useEffect(() => {
    if (status !== "loading" || !mapBox.current) return;
    let cancelled = false;
    (async () => {
      try {
        const maplibregl = await import("maplibre-gl");
        // Bundlers can't resolve MapLibre's worker, so it is served from /public (see the postinstall script).
        maplibregl.setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs");
        const style = heritageStyle(await (await fetch(STYLE_URL)).json());
        if (cancelled || !mapBox.current) return;
        const mobile = window.innerWidth < 768;
        const cam = cameraAt(0, SEA_ROUTE[0], mobile);
        const m = new maplibregl.Map({
          container: mapBox.current,
          style,
          center: cam.center,
          zoom: cam.zoom,
          interactive: false,
          attributionControl: { compact: true },
          fadeDuration: 0,
        });
        map.current = m;
        // Start the attribution collapsed to its (i) button, so it never covers the story card.
        m.once("load", () => mapBox.current?.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show"));
        // Style is enough to draw on; don't wait for every tile ("load").
        m.once("style.load", () => {
          m.addSource("route-all", { type: "geojson", data: line(SEA_ROUTE) });
          m.addSource("route-done", { type: "geojson", data: line(SEA_ROUTE.slice(0, 2)) });
          m.addSource("walk", { type: "geojson", data: line(WALK.slice(0, 2)) });
          m.addLayer({
            id: "route-all",
            type: "line",
            source: "route-all",
            paint: { "line-color": "#6B3A1E", "line-opacity": 0.35, "line-width": 1.4, "line-dasharray": [1, 3] },
            layout: { "line-cap": "round" },
          });
          m.addLayer({
            id: "route-done",
            type: "line",
            source: "route-done",
            paint: { "line-color": "#D9641E", "line-width": 3.4, "line-dasharray": [2.2, 1.6] },
            layout: { "line-cap": "round" },
          });
          m.addLayer({
            id: "walk",
            type: "line",
            source: "walk",
            paint: { "line-color": "#D9641E", "line-width": 5, "line-dasharray": [0.2, 1.8] },
            layout: { "line-cap": "round", "line-join": "round" },
          });

          markers.current.boat = new maplibregl.Marker({ element: boatEl(), anchor: "bottom" })
            .setLngLat(SEA_ROUTE[0])
            .addTo(m);
          markers.current.shop = new maplibregl.Marker({ element: shopEl(), anchor: "bottom" }).setLngLat(HAMEEDIYAH).addTo(m);
          const labels: Array<[string, LngLat, "sea" | "land" | "place"]> = [
            ["Coromandel Coast", [78.7, 12.4], "land"],
            ["Bay of Bengal", [86.5, 13.6], "sea"],
            ["Andaman Sea", [96.0, 10.6], "sea"],
            ["Strait of Malacca", [99.4, 4.7], "sea"],
            ["Penang", [100.25, 5.55], "place"],
            ["Weld Quay", WELD_QUAY, "place"],
          ];
          markers.current.labels = labels.map(([t, ll, k]) =>
            new maplibregl.Marker({ element: labelEl(t, k), anchor: "center" }).setLngLat(ll).addTo(m),
          );
          if (!cancelled) setStatus("ready");
        });
        m.on("error", (e) => console.warn("Voyage map:", e.error?.message));
      } catch {
        if (!cancelled) setStatus("failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status]);

  // Clean up on unmount.
  useEffect(() => () => map.current?.remove(), []);

  // Scroll → progress → camera, route, boat, walk, markers.
  useEffect(() => {
    if (status !== "ready") return;
    const m = map.current!;
    const el = section.current!;
    let raf = 0;
    let lastStop = -1;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = reduce ? 1 : clamp01(span > 0 ? -r.top / span : 1);
      // While a rail jump is scrolling the page, ignore the positions it passes through.
      if (p > reached.current && performance.now() > railJumpUntil.current) reached.current = p;
      if (reached.current >= 0.999 && !doneRef.current) {
        doneRef.current = true;
        bottomBeforeCollapse.current = el.getBoundingClientRect().bottom;
        setDone(true);
      }
      target.current = reached.current;
    };

    const render = (p: number) => {
      const mobile = window.innerWidth < 768;
      const r = clamp01((p - ROUTE_WINDOW.start) / (ROUTE_WINDOW.end - ROUTE_WINDOW.start));
      const sea = alongLine(SEA_ROUTE, r);
      const w = clamp01((p - WALK_WINDOW.start) / (WALK_WINDOW.end - WALK_WINDOW.start));
      const walk = alongLine(WALK, w);

      m.jumpTo(cameraAt(p, sea.point, mobile));
      (m.getSource("route-done") as GeoJSONSource).setData(line(sea.done.length > 1 ? sea.done : SEA_ROUTE.slice(0, 2)));
      (m.getSource("walk") as GeoJSONSource).setData(line(walk.done.length > 1 ? walk.done : [WALK[0], WALK[0]]));
      m.setPaintProperty("walk", "line-opacity", w > 0 ? 1 : 0);
      m.setPaintProperty("route-all", "line-opacity", p > 0.7 ? 0 : 0.35);
      m.setPaintProperty("route-done", "line-opacity", p > 0.78 ? 0 : 1);

      const boat = markers.current.boat!;
      boat.setLngLat(sea.point);
      boat.getElement().classList.toggle("is-on", p < 0.7);
      markers.current.shop!.getElement().classList.toggle("is-on", p > 0.84);
      // Ocean labels while at sea; "Penang" on approach; "Weld Quay" at landfall.
      const show = [p < 0.6, p < 0.6, p < 0.6, p < 0.6, p > 0.5 && p < 0.7, p > 0.68 && p < 0.86];
      markers.current.labels.forEach((mk, i) => mk.getElement().classList.toggle("is-on", show[i]));

      const s = stopAt(p);
      if (s !== lastStop) {
        lastStop = s;
        setStop(s);
      }
      setAtStart(p < 0.02);
    };

    const tick = () => {
      const diff = target.current - current.current;
      if (autoplay.current) {
        // Replaying from a rail stop after the track has collapsed: sail on at an even pace.
        current.current = Math.min(target.current, current.current + 0.0028);
        if (current.current >= target.current) autoplay.current = false;
      } else {
        current.current = Math.abs(diff) < 0.0004 ? target.current : current.current + diff * 0.12;
      }
      render(current.current);
      raf = Math.abs(target.current - current.current) > 0 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    // Reloaded part-way through the section: sail from the start up to where the reader is.
    // Reloaded elsewhere: settle straight into place, unseen.
    const r0 = el.getBoundingClientRect();
    const inView = r0.top < window.innerHeight && r0.bottom > 0;
    current.current = inView && !reduce ? 0 : target.current;
    render(current.current);
    kick.current = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    kick.current();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [status, reduce]);

  // Collapse the track without a visible jump. Browsers with scroll anchoring may already have
  // compensated, so correct only by how far the content after the map actually moved.
  useLayoutEffect(() => {
    if (!done || !section.current) return;
    const shift = section.current.getBoundingClientRect().bottom - bottomBeforeCollapse.current;
    if (Math.abs(shift) > 1) window.scrollTo({ top: window.scrollY + shift, behavior: "instant" });
  }, [done]);

  // The I–IV rail is an explicit choice, so it may revisit an earlier stop.
  const jumpTo = (i: number, at: number) => {
    const el = section.current;
    if (!el) return;
    if (doneRef.current) {
      // No scroll track any more: replay from the chosen stop to Lebuh Campbell in place.
      current.current = STOP_PROGRESS[i];
      target.current = 1;
      autoplay.current = true;
      kick.current();
      return;
    }
    reached.current = STOP_PROGRESS[i];
    target.current = STOP_PROGRESS[i];
    railJumpUntil.current = at + (reduce ? 0 : 1600); // event.timeStamp shares performance.now()'s clock
    kick.current();
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + span * STOP_PROGRESS[i], behavior: reduce ? "auto" : "smooth" });
  };

  const s = voyage[stop];

  return (
    <section
      id="voyage"
      ref={section}
      aria-labelledby="voyage-title"
      className={`relative ${done ? "h-svh" : "h-[560vh]"} motion-reduce:h-auto`}
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative motion-reduce:h-[88svh]">
        {/* The real map */}
        {/* Not aria-hidden: the map's attribution links inside must stay reachable. */}
        <div className="absolute inset-0 bg-[#F1E4C8]">
          <div
            ref={mapBox}
            className="h-full w-full"
            role="img"
            aria-label="Map of the voyage from the Coromandel coast of Tamil Nadu across the Bay of Bengal to Penang, ending on Lebuh Campbell at Hameediyah, 164A."
          />
        </div>

        {/* Paper grain and a soft vignette keep the map feeling printed, not digital */}
        <div aria-hidden className="paper pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(241,228,200,0.95)]"
        />

        {status !== "ready" && (
          <p className="absolute inset-0 grid place-items-center font-display text-2xl italic text-cinnamon/70">
            {status === "failed" ? "The chart could not be unrolled. The story continues below." : "Unrolling the chart…"}
          </p>
        )}

        {/* Chapter heading */}
        <header className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-paper via-paper/80 to-transparent px-4 pb-24 pt-20 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-7xl">
            <p className="font-sign text-xs uppercase tracking-[0.3em] text-saffron-deep">
              Chapter I · <span lang="ta" className="font-tamil normal-case tracking-normal">பயணம்</span> · The Voyage
            </p>
            <h2 id="voyage-title" className="font-display mt-2 max-w-xl text-4xl leading-[1.02] text-cinnamon sm:text-6xl">
              A spice merchant sails east
            </h2>
          </div>
        </header>

        {/* Story card */}
        <div className="absolute inset-x-4 bottom-14 sm:inset-x-8 sm:bottom-10">
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
            <div
              className="w-full max-w-md border border-brass/70 bg-paper/95 p-5 shadow-[0_24px_50px_-24px_rgba(36,20,12,0.7)] backdrop-blur-sm sm:p-6"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stop}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.55, ease: EASE_STEAM }}
                >
                  <p className="font-sign text-xs uppercase tracking-[0.22em] text-saffron-deep">
                    {NUMERALS[stop]} · {s.label} · {s.place}
                  </p>
                  <p className="font-display mt-2 text-xl leading-snug text-ink sm:text-2xl">{s.line}</p>
                  {stop === 3 && (
                    <Link
                      href="/#visit"
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-sign text-xs uppercase tracking-[0.22em] text-cinnamon underline decoration-brass underline-offset-4 hover:text-saffron-deep"
                    >
                      The same address today <span aria-hidden>→</span>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Route rail: also lets keyboard users jump between stops */}
              <ol className="mt-5 flex items-center gap-2" aria-label="Stops on the voyage">
                {voyage.map((v, i) => (
                  <li key={v.id} className="flex flex-1 items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => jumpTo(i, e.timeStamp)}
                      aria-current={stop === i ? "step" : undefined}
                      aria-label={`Stop ${NUMERALS[i]}: ${v.place}`}
                      className={`grid size-10 shrink-0 place-items-center rounded-full border font-sign text-xs transition-colors duration-500 ${
                        i <= stop ? "border-saffron bg-saffron text-paper" : "border-cinnamon/40 bg-paper text-cinnamon"
                      }`}
                    >
                      {NUMERALS[i]}
                    </button>
                    {i < voyage.length - 1 && (
                      <span aria-hidden className={`h-px flex-1 ${i < stop ? "bg-saffron" : "bg-cinnamon/25"}`} />
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <p
              aria-hidden
              className={`hidden items-center gap-2 font-sign text-xs uppercase tracking-[0.25em] text-cinnamon transition-opacity duration-700 motion-reduce:hidden sm:flex ${
                atStart ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="inline-block animate-bounce">↓</span> Scroll to set sail
            </p>
          </div>
        </div>
      </div>

      {/* Reduced motion: the whole story as text under the finished map */}
      <ol className="mx-auto hidden max-w-3xl space-y-6 px-4 py-16 motion-reduce:block">
        {voyage.map((v, i) => (
          <li key={v.id}>
            <p className="font-sign text-xs uppercase tracking-[0.22em] text-saffron-deep">
              {NUMERALS[i]} · {v.label} · {v.place}
            </p>
            <p className="font-display mt-1 text-xl">{v.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
