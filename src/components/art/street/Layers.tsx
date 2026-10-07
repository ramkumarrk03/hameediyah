/**
 * Seamless, horizontally tiling layers for the hero street. Each tile starts and
 * ends at the same height, so two copies side by side loop without a seam.
 */
const INK = "#14130F";

/** Far: a pale skyline of roofs, a mosque dome, palms and harbour masts. */
export function FarSkyline({ style }: { style?: React.CSSProperties }) {
  let d = "M0,300 L0,190";
  let x = 0;
  const heights = [190, 168, 204, 176, 150, 196, 182, 160, 210, 172, 188, 164, 200, 178, 190];
  heights.forEach((h, i) => {
    const w = 120;
    d += ` L${x},${h} L${x + w / 2},${h - 26} L${x + w},${h}`;
    x += w;
    if (i < heights.length - 1) d += ` L${x},${heights[i + 1]}`;
  });
  d += ` L1800,190 L1800,300 Z`;
  return (
    <svg viewBox="0 0 1800 300" preserveAspectRatio="xMinYMax meet" style={style} aria-hidden="true">
      <path d={d} fill="#E2BE84" opacity="0.55" />
      {/* Dome and minaret */}
      <g fill="#D9AE6E" opacity="0.6">
        <rect x="560" y="150" width="130" height="150" />
        <path d="M570,152 Q625,60 680,152 Z" />
        <rect x="621" y="62" width="8" height="22" />
        <rect x="720" y="70" width="18" height="230" />
        <path d="M714,74 Q729,40 744,74 Z" />
      </g>
      {/* Palms */}
      {[320, 1180, 1470].map((px) => (
        <g key={px} stroke="#C9A066" fill="none" opacity="0.7" strokeLinecap="round">
          <path d={`M${px},300 Q${px - 10},200 ${px + 6},120`} strokeWidth="7" />
          {[-60, -25, 15, 50, 85].map((a) => (
            <path key={a} d={`M${px + 6},120 q${Math.cos((a * Math.PI) / 180) * 40},${-20 + Math.abs(a) / 3} ${Math.cos((a * Math.PI) / 180) * 70},${10 + Math.abs(a) / 2}`} strokeWidth="5" />
          ))}
        </g>
      ))}
      {/* Harbour masts */}
      <g stroke="#C9A066" strokeWidth="4" opacity="0.6">
        <path d="M1640,300 V90 M1612,130 H1668 M1620,170 H1660 M1720,300 V110 M1696,150 H1744" />
      </g>
    </svg>
  );
}

type Facade = { wall: string; shutter: string; sign: string; signText: string; ink?: string };

const FACADES: Facade[] = [
  { wall: "#F1E3C6", shutter: "#5F7F6A", sign: "#6B3A1E", signText: "KEDAI KOPI" },
  { wall: "#9DB59A", shutter: "#F1E3C6", sign: "#14130F", signText: "TAILOR" },
  { wall: "#E7B8A2", shutter: "#6B3A1E", sign: "#3F5A2C", signText: "SPICES" },
  { wall: "#FFDE16", shutter: "#0B9444", sign: "#0B9444", signText: "HAMEEDIYAH · 164-A", ink: "#FFDE16" },
  { wall: "#C9D6D0", shutter: "#8A5A32", sign: "#B3311C", signText: "TEXTILES" },
  { wall: "#F3D9A4", shutter: "#5F7F6A", sign: "#14130F", signText: "SUNDRIES" },
  { wall: "#E8D9BE", shutter: "#6B3A1E", sign: "#3F5A2C", signText: "PRINTER" },
  { wall: "#F1E3C6", shutter: "#B3311C", sign: "#6B3A1E", signText: "JEWELLER" },
  { wall: "#B9C9A8", shutter: "#F1E3C6", sign: "#14130F", signText: "BOOKS" },
  { wall: "#EBC9B0", shutter: "#3E7D4F", sign: "#8A5A32", signText: "HARDWARE" },
];

function FacadeBlock({ f, x }: { f: Facade; x: number }) {
  const w = 240;
  return (
    <g transform={`translate(${x} 0)`}>
      {/* Roof */}
      <path d={`M-4,58 L${w / 2},18 L${w + 4},58 Z`} fill="#B5643A" stroke={INK} strokeWidth="1.5" />
      <path d={`M10,48 H${w - 10} M30,38 H${w - 30}`} stroke="#8A3E1E" strokeWidth="1.2" />
      {/* Upper storey */}
      <rect x="0" y="58" width={w} height="176" fill={f.wall} stroke={INK} strokeWidth="1.5" />
      {[30, 95, 160].map((wx) => (
        <g key={wx}>
          <path d={`M${wx},210 V104 Q${wx + 25},82 ${wx + 50},104 V210 Z`} fill={f.shutter} stroke={INK} strokeWidth="1.3" />
          <path d={`M${wx + 25},94 V210`} stroke={INK} strokeWidth="1" />
          {[122, 140, 158, 176, 194].map((ly) => (
            <path key={ly} d={`M${wx + 5},${ly} H${wx + 21} M${wx + 29},${ly} H${wx + 45}`} stroke={INK} strokeWidth="0.7" opacity="0.5" />
          ))}
          <path d={`M${wx - 6},212 H${wx + 56}`} stroke={INK} strokeWidth="2" />
        </g>
      ))}
      {/* Signboard */}
      <rect x="16" y="238" width={w - 32} height="34" fill={f.sign} stroke={INK} strokeWidth="1.3" />
      <text
        x={w / 2}
        y="261"
        textAnchor="middle"
        fontFamily="var(--font-condensed), sans-serif"
        fontSize={f.signText.length > 12 ? 15 : 17}
        letterSpacing="3"
        fill={f.ink ?? "#FFFBEC"}
      >
        {f.signText}
      </text>
      {/* Five-foot way */}
      <rect x="0" y="276" width={w} height="144" fill={f.wall} stroke={INK} strokeWidth="1.5" />
      {[14, 128].map((ax) => (
        <path key={ax} d={`M${ax},420 V330 Q${ax + 49},282 ${ax + 98},330 V420 Z`} fill="#4A2C18" stroke={INK} strokeWidth="1.3" />
      ))}
      {[14, 128].map((ax) => (
        <ellipse key={`g${ax}`} cx={ax + 49} cy="392" rx="40" ry="26" fill="#E0A526" opacity="0.28" />
      ))}
      <circle cx="63" cy="318" r="7" fill="#D9641E" stroke={INK} strokeWidth="1" />
      <circle cx="177" cy="318" r="7" fill="#D9641E" stroke={INK} strokeWidth="1" />
      <rect x="-5" y="276" width="10" height="144" fill={f.wall} stroke={INK} strokeWidth="1.2" />
    </g>
  );
}

/** Middle: a row of Straits shophouses, one of them Hameediyah's yellow-and-green front. */
export function Shophouses({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 2400 420" preserveAspectRatio="xMinYMax meet" style={style} aria-hidden="true">
      {FACADES.map((f, i) => (
        <FacadeBlock key={i} f={f} x={i * 240} />
      ))}
    </svg>
  );
}

/** Foreground: old gas lamps that sweep past quickest. */
export function Lamps({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 1600 640" preserveAspectRatio="xMinYMax meet" style={style} aria-hidden="true">
      {[380, 1180].map((x) => (
        <g key={x}>
          <path d={`M${x - 10},640 L${x - 6},150 L${x + 6},150 L${x + 10},640 Z`} fill="#2E2620" />
          <path d={`M${x - 18},640 h36 v-22 h-36 Z`} fill="#2E2620" />
          <path d={`M${x - 26},150 h52 l-8,-58 h-36 Z`} fill="#F6DA8E" stroke="#2E2620" strokeWidth="5" />
          <circle cx={x} cy="120" r="34" fill="#F6DA8E" opacity="0.35" />
          <path d={`M${x - 34},92 h68 l-34,-26 Z`} fill="#2E2620" />
        </g>
      ))}
    </svg>
  );
}
