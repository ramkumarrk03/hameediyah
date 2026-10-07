/**
 * Real-world geometry for The Voyage (lng, lat).
 * The family came from Kerala (client company profile). The documents do not record the route,
 * so the sea path is illustrative: down the Kerala coast, round Cape Comorin and the south of
 * Sri Lanka, across the Bay of Bengal below the Nicobars, past the tip of Sumatra and into Penang.
 */
export type LngLat = [number, number];

export const HAMEEDIYAH: LngLat = [100.33265, 5.41855]; // 164A Lebuh Campbell (OpenStreetMap)
export const GEORGE_TOWN_SHORE: LngLat = [100.3428, 5.4158]; // the George Town waterfront

const SEA_WAYPOINTS: LngLat[] = [
  [76.12, 9.95],
  [75.95, 9.0],
  [76.75, 7.95],
  [77.9, 7.5],
  [79.6, 6.3],
  [80.9, 5.55],
  [83.8, 5.6],
  [87.6, 5.95],
  [91.2, 6.2],
  [93.7, 6.25],
  [95.6, 6.35],
  [97.4, 6.2],
  [99.0, 5.95],
  [99.9, 5.7],
  [100.2, 5.62],
  [100.37, 5.5],
  [100.355, 5.44],
  [100.3468, 5.4162],
];

/** Catmull-Rom densify, so the line and the boat curve naturally. */
function densify(points: LngLat[], perSegment = 36): LngLat[] {
  const out: LngLat[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    for (let s = 0; s < perSegment; s++) {
      const t = s / perSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

export const SEA_ROUTE = densify(SEA_WAYPOINTS);

/** On foot through George Town's streets to 164-A Campbell Street (illustrative). */
export const WALK: LngLat[] = [
  GEORGE_TOWN_SHORE,
  [100.3418, 5.4161],
  [100.3386, 5.4166],
  [100.33584, 5.41697],
  [100.33364, 5.41801],
  HAMEEDIYAH,
];

/** Cumulative distances so `alongLine(line, t)` moves at an even pace. */
function cumulative(line: LngLat[]) {
  const d = [0];
  for (let i = 1; i < line.length; i++) {
    const dx = line[i][0] - line[i - 1][0];
    const dy = line[i][1] - line[i - 1][1];
    d.push(d[i - 1] + Math.hypot(dx, dy));
  }
  return d;
}

const cache = new WeakMap<LngLat[], number[]>();

/** Point at fraction t (0–1) along the line, plus the line up to that point. */
export function alongLine(line: LngLat[], t: number): { point: LngLat; done: LngLat[] } {
  let d = cache.get(line);
  if (!d) {
    d = cumulative(line);
    cache.set(line, d);
  }
  const total = d[d.length - 1];
  const target = Math.min(1, Math.max(0, t)) * total;
  let i = 1;
  while (i < d.length - 1 && d[i] < target) i++;
  const seg = d[i] - d[i - 1] || 1;
  const k = Math.min(1, Math.max(0, (target - d[i - 1]) / seg));
  const point: LngLat = [
    line[i - 1][0] + (line[i][0] - line[i - 1][0]) * k,
    line[i - 1][1] + (line[i][1] - line[i - 1][1]) * k,
  ];
  return { point, done: [...line.slice(0, i), point] };
}

export type Camera = { center: LngLat; zoom: number; pitch: number; bearing: number };

/** Camera keyframes over scroll progress. Between 0.1 and 0.55 the camera follows the boat. */
export const KEYFRAMES: Array<{ p: number } & Camera> = [
  { p: 0, center: [86.5, 9.0], zoom: 3.9, pitch: 0, bearing: 0 },
  { p: 0.1, center: [76.4, 9.6], zoom: 5.3, pitch: 0, bearing: 0 },
  { p: 0.55, center: [100.2, 5.6], zoom: 5.3, pitch: 0, bearing: 0 },
  { p: 0.66, center: [100.33, 5.43], zoom: 10.6, pitch: 10, bearing: 0 },
  { p: 0.76, center: [100.3425, 5.4166], zoom: 14.6, pitch: 38, bearing: -12 },
  { p: 0.9, center: [100.3336, 5.4181], zoom: 16.9, pitch: 52, bearing: -24 },
  { p: 1, center: HAMEEDIYAH, zoom: 17.4, pitch: 55, bearing: -28 },
];

export const ROUTE_WINDOW = { start: 0.1, end: 0.55 };
export const WALK_WINDOW = { start: 0.76, end: 0.9 };

/** Story stop shown for a given progress. */
export function stopAt(p: number) {
  if (p < 0.24) return 0;
  if (p < 0.52) return 1;
  if (p < 0.76) return 2;
  return 3;
}

/** Where to fly when a stop is chosen directly (keyboard / rail). */
export const STOP_PROGRESS = [0.12, 0.36, 0.64, 0.98];
