/**
 * Illustrated street plan: from Weld Quay up to the tree on Lebuh Campbell.
 * Not to scale. The end frame of The Voyage. Authored in its finished state.
 */

const LOT = 34;
const BLOCKS: Array<[number, number]> = [
  [40, 200],
  [240, 500],
  [540, 800],
];
const ROWS: Array<[number, number]> = [
  [250, 330],
  [390, 470],
];

function lotsPath(x0: number, x1: number, y0: number, y1: number) {
  let d = `M${x0},${y0} H${x1} V${y1} H${x0} Z`;
  for (let x = x0 + LOT; x < x1 - 6; x += LOT) d += ` M${x},${y0} V${y1}`;
  return d;
}

function canopy(cx: number, cy: number, r: number, bumps = 11) {
  // Scalloped canopy, like a pen-drawn tree.
  let d = "";
  for (let i = 0; i <= bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.86;
    if (i === 0) d += `M${x.toFixed(1)},${y.toFixed(1)}`;
    else {
      const am = ((i - 0.5) / bumps) * Math.PI * 2;
      const qx = cx + Math.cos(am) * r * 1.22;
      const qy = cy + Math.sin(am) * r * 1.05;
      d += ` Q${qx.toFixed(1)},${qy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
    }
  }
  return d + " Z";
}

const HIGHLIGHT_X = 540 + LOT * 2;
const TREE = { x: HIGHLIGHT_X + LOT / 2 + 4, y: 352 };
const WALK = `M820,560 V360 H${TREE.x + 40}`;

export default function GeorgeTownPlan({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 720"
      className={className}
      role="img"
      aria-labelledby={`${id}-title`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${id}-title`}>
        Illustrated street plan of George Town: from the docks at Weld Quay, a dotted path leads to a tree on Lebuh
        Campbell, in front of the shophouse at 164A.
      </title>
      <defs>
        <pattern id={`${id}-water`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#6B3A1E" strokeWidth="0.7" opacity="0.25" />
        </pattern>
      </defs>

      {/* Water and quay */}
      <path className="gt-fade" d="M862,-10 L858,200 L864,420 L858,730 L1010,730 L1010,-10 Z" fill={`url(#${id}-water)`} />
      <path className="gt-draw" d="M862,-10 L858,200 L864,420 L858,730" fill="none" stroke="#24140C" strokeWidth="2" />
      <g className="gt-fade" stroke="#6B3A1E" fill="none" strokeWidth="1.1" opacity="0.5" strokeLinecap="round">
        {[
          [900, 90],
          [930, 260],
          [895, 430],
          [935, 590],
        ].map(([x, y]) => (
          <path key={`${x}${y}`} d={`M${x},${y} q6,-4 12,0 t12,0`} />
        ))}
      </g>

      {/* Streets */}
      <g className="gt-streets" fill="none" stroke="#24140C" strokeWidth="1.6" strokeLinecap="round">
        {[110, 150, 330, 390, 590, 630].map((y) => (
          <path key={`h${y}`} className="gt-draw" d={`M40,${y} H800`} />
        ))}
        {[200, 240, 500, 540, 800, 840].map((x) => (
          <path key={`v${x}`} className="gt-draw" d={`M${x},-10 V730`} />
        ))}
      </g>

      {/* Shophouse lots */}
      <g fill="none" stroke="#6B3A1E" strokeWidth="0.9">
        {BLOCKS.flatMap(([x0, x1]) =>
          ROWS.map(([y0, y1]) => <path key={`${x0}-${y0}`} className="gt-draw" d={lotsPath(x0, x1, y0, y1)} />),
        )}
      </g>

      {/* 164A */}
      <rect
        className="gt-fade"
        x={HIGHLIGHT_X}
        y={250}
        width={LOT}
        height={80}
        fill="#E0A526"
        fillOpacity="0.6"
        stroke="#24140C"
        strokeWidth="1.6"
      />
      <text
        className="gt-fade font-sign"
        x={HIGHLIGHT_X + LOT / 2}
        y={240}
        textAnchor="middle"
        fontSize="17"
        letterSpacing="1.5"
        fill="#A8460F"
      >
        164A
      </text>

      {/* The kandar path, from the docks to the tree */}
      <mask id={`${id}-path-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="720">
        <path className="gt-draw" d={WALK} fill="none" stroke="#fff" strokeWidth="8" />
      </mask>
      <path
        d={WALK}
        mask={`url(#${id}-path-mask)`}
        fill="none"
        stroke="#D9641E"
        strokeWidth="3"
        strokeDasharray="2 9"
        strokeLinecap="round"
      />
      <circle className="gt-fade" cx="820" cy="560" r="6" fill="#F5ECD9" stroke="#24140C" strokeWidth="1.5" />

      {/* The tree */}
      <g className="gt-tree">
        <path className="gt-draw" d={`M${TREE.x},${TREE.y + 6} V${TREE.y + 30}`} stroke="#6B3A1E" strokeWidth="3" />
        <path
          className="gt-draw"
          d={canopy(TREE.x, TREE.y - 14, 46, 13)}
          fill="#3F5A2C"
          fillOpacity="0.32"
          stroke="#3F5A2C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          className="gt-draw"
          d={canopy(TREE.x - 6, TREE.y - 18, 26, 9)}
          fill="none"
          stroke="#3F5A2C"
          strokeWidth="1"
          opacity="0.7"
        />
      </g>

      {/* Labels */}
      <g className="gt-fade">
        <text x="262" y="367" className="font-sign" fontSize="20" letterSpacing="5" fill="#24140C">
          LEBUH CAMPBELL
        </text>
        <text x="0" y="0" className="font-sign" fontSize="15" letterSpacing="5" fill="#24140C" transform="translate(814 120) rotate(90)">
          WELD QUAY
        </text>
        <text x="880" y="160" className="font-display" fontStyle="italic" fontSize="17" fill="#6B3A1E" transform="rotate(90 880 160)">
          to the docks & the sea
        </text>
        <text x={TREE.x + 56} y={TREE.y - 50} className="font-display" fontStyle="italic" fontSize="20" fill="#3F5A2C">
          the tree
        </text>
        <text x="790" y="586" className="font-display" fontStyle="italic" fontSize="15" fill="#6B3A1E" textAnchor="end">
          the kandar&apos;s walk
        </text>
      </g>

      {/* Cartouche */}
      <g className="gt-fade">
        <rect x="56" y="22" width="300" height="72" fill="#F5ECD9" stroke="#B08D57" strokeWidth="1.2" />
        <rect x="61" y="27" width="290" height="62" fill="none" stroke="#B08D57" strokeWidth="0.6" />
        <text x="76" y="58" className="font-display" fontSize="26" fontStyle="italic" fill="#24140C">
          George Town, Penang
        </text>
        <text x="76" y="78" className="font-sign" fontSize="11" letterSpacing="2.5" fill="#6B3A1E">
          AN ILLUSTRATED PLAN · NOT TO SCALE
        </text>
      </g>
    </svg>
  );
}
