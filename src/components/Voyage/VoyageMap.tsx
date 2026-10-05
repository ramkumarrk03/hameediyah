/**
 * Hand-drawn ink map: Coromandel coast → Bay of Bengal → Penang.
 * Coordinates are a stylised plate carrée (x = (lon − 77) × 40, y = (21 − lat) × 40),
 * so the route reads true but the coastlines stay simple and hand-drawn.
 *
 * Authored in its finished state (route drawn, boat at Penang) so the
 * reduced-motion and no-JS versions are complete. GSAP rewinds it to animate.
 */

const ROUTE = "M124,404 C260,430 470,452 640,452 C740,452 790,520 820,580 C840,612 878,618 904,616";

// Little wave marks scattered across open water.
const WAVES: Array<[number, number]> = [
  [260, 200], [420, 220], [330, 380], [520, 330], [230, 560], [420, 560],
  [560, 610], [700, 300], [520, 480], [300, 650], [760, 470], [480, 680],
];

const COASTS = {
  india:
    "M400,-20 L360,40 C340,64 330,74 318,86 L280,120 L252,132 C236,146 228,152 222,160 L200,180 L168,212 C156,220 150,222 146,226 L128,240 C129,262 130,270 130,280 L132,316 C126,330 124,336 120,344 L112,364 C111,380 110,388 110,396 L114,428 C104,430 98,430 96,430 L88,428 C89,440 90,444 90,448 L92,468 C80,472 76,475 70,478 L48,488 C38,496 34,500 28,505 L10,520 L-20,535 L-20,-20 Z",
  ceylon:
    "M128,448 C140,458 146,464 150,470 L176,500 C186,520 192,530 196,540 C195,552 194,560 192,568 C184,580 178,586 172,592 C160,598 152,600 144,602 C134,596 128,592 124,588 C120,578 118,570 116,564 C114,550 112,540 112,536 L112,512 C114,494 116,484 118,476 Z",
  mainland:
    "M590,-20 L600,0 C612,20 616,28 622,40 L640,80 C650,104 656,118 660,130 L680,170 C686,184 690,192 692,200 C700,208 704,211 708,212 L720,208 C732,200 738,194 742,190 L768,168 C780,170 790,171 796,172 L824,180 C832,206 835,218 838,230 L848,280 C852,300 854,310 856,320 L860,360 C863,380 865,392 866,400 L868,440 C864,460 862,470 860,480 L852,520 C862,530 868,535 874,540 L900,560 C910,570 916,576 920,582 C927,592 931,598 934,604 C939,612 942,618 944,624 L948,650 C950,664 951,672 952,680 L960,710 L972,740 L1020,740 L1020,-20 Z",
  sumatra:
    "M732,616 C746,617 754,618 760,620 L790,626 L820,632 C834,646 840,653 846,660 L868,688 L894,714 L920,740 L780,740 C770,728 765,722 760,716 C752,702 748,696 744,690 C738,676 735,670 732,664 C729,652 727,646 726,640 C728,628 730,620 732,616 Z",
  andaman:
    "M626,296 C632,320 632,350 630,380 C629,400 632,415 628,425 C624,410 622,380 623,350 C622,325 622,305 626,296 Z",
  nicobar1: "M660,512 C666,514 667,524 663,530 C658,528 656,518 660,512 Z",
  nicobar2: "M670,546 C676,548 677,558 672,563 C667,560 666,550 670,546 Z",
  penang:
    "M912,606 C920,602 928,608 928,616 C930,626 926,636 918,638 C910,636 906,626 908,616 C908,610 910,607 912,606 Z",
};

export function Boat({ className, x = 0, y = 0 }: { className?: string; x?: number; y?: number }) {
  // Drawn around (0,0), the waterline at y≈0, facing east.
  return (
    <g className={className} transform={`translate(${x} ${y})`}>
      <g className="v-boat-rock">
        <path d="M-14,-2 C-8,6 8,6 16,-3 Z" fill="#6B3A1E" stroke="#24140C" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M1,-3 L1,-32" stroke="#24140C" strokeWidth="1.4" />
        <path d="M2,-31 C14,-24 17,-14 15,-5 L2,-5 Z" fill="#D9641E" stroke="#24140C" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M0,-28 C-7,-20 -9,-12 -8,-5 L0,-5 Z" fill="#E0A526" stroke="#24140C" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M-18,3 q4,-2 8,0 M10,4 q4,-2 8,0" stroke="#24140C" strokeWidth="0.9" fill="none" opacity="0.6" />
      </g>
    </g>
  );
}

function Compass({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="v-label" stroke="#B08D57" fill="none">
      <circle r="34" strokeWidth="1" />
      <circle r="28" strokeWidth="0.6" strokeDasharray="2 3" />
      <path d="M0,-44 L6,0 L0,44 L-6,0 Z" fill="#B08D57" fillOpacity="0.35" strokeWidth="1" />
      <path d="M-44,0 L0,5 L44,0 L0,-5 Z" strokeWidth="1" />
      <text y="-50" textAnchor="middle" fill="#6B3A1E" stroke="none" className="font-sign" fontSize="13" letterSpacing="2">
        N
      </text>
    </g>
  );
}

export default function VoyageMap({
  id,
  className,
  title = "Hand-drawn map of the route from the Coromandel coast of Tamil Nadu, across the Bay of Bengal and past the Andaman and Nicobar islands, down the Strait of Malacca to Penang.",
}: {
  id: string;
  className?: string;
  title?: string;
}) {
  const filterId = `${id}-ink`;
  return (
    <svg
      viewBox="0 0 1000 720"
      className={className}
      role="img"
      aria-labelledby={`${id}-title`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="3.2" />
        </filter>
        <pattern id={`${id}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#6B3A1E" strokeWidth="0.7" opacity="0.28" />
        </pattern>
      </defs>

      <g className="v-world">
        {/* Latitude lines */}
        <g className="v-label" stroke="#B08D57" strokeWidth="0.7" strokeDasharray="1 6" opacity="0.8">
          <line x1="0" y1="240" x2="1000" y2="240" />
          <line x1="0" y1="440" x2="1000" y2="440" />
          <line x1="0" y1="640" x2="1000" y2="640" />
        </g>
        <g className="v-label font-sign" fill="#8A6A3A" fontSize="11" letterSpacing="1.5">
          <text x="548" y="234">15° N</text>
          <text x="548" y="434">10° N</text>
          <text x="548" y="634">5° N</text>
        </g>

        {/* Water marks */}
        <g className="v-label" stroke="#6B3A1E" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round">
          {WAVES.map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x},${y} q6,-4 12,0 t12,0 M${x + 8},${y + 7} q6,-4 12,0`} />
          ))}
        </g>

        {/* Land */}
        <g filter={`url(#${filterId})`} strokeLinejoin="round" strokeLinecap="round">
          {Object.entries(COASTS).map(([key, d]) => (
            <g key={key}>
              <path d={d} fill={`url(#${id}-hatch)`} className="v-land" />
              <path
                d={d}
                fill="none"
                stroke="#24140C"
                strokeWidth={key === "penang" ? 1.6 : 1.8}
                className="v-coast"
              />
            </g>
          ))}
        </g>

        {/* Place names */}
        <g className="font-display" fill="#24140C">
          <text className="v-label" x="282" y="300" fontSize="30" fontStyle="italic" letterSpacing="6" opacity="0.85">
            Bay of Bengal
          </text>
          <text className="v-label" x="700" y="394" fontSize="20" fontStyle="italic" letterSpacing="3" opacity="0.8">
            Andaman Sea
          </text>
          <text
            className="v-label"
            x="0"
            y="0"
            fontSize="15"
            fontStyle="italic"
            letterSpacing="2"
            transform="translate(168 360) rotate(-82)"
            fill="#6B3A1E"
          >
            Coromandel Coast
          </text>
        </g>
        <g className="font-sign" fill="#24140C" letterSpacing="2.5">
          <text className="v-label" x="4" y="372" fontSize="14">TAMIL NADU</text>
          <text className="v-label font-tamil" x="4" y="394" fontSize="13" letterSpacing="0" fill="#6B3A1E">
            தமிழ்நாடு
          </text>
          <text className="v-label" x="126" y="540" fontSize="11">CEYLON</text>
          <text className="v-label" x="590" y="282" fontSize="10">ANDAMAN IS.</text>
          <text className="v-label" x="684" y="540" fontSize="10">NICOBAR IS.</text>
          <text className="v-label" x="0" y="0" fontSize="15" transform="translate(905 340) rotate(80)">
            MALAYA
          </text>
          <text className="v-label" x="770" y="700" fontSize="13">SUMATRA</text>
        </g>

        <Compass x={470} y={130} />

        {/* The route */}
        <mask id={`${id}-route-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="720">
          <path d={ROUTE} className="v-route" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        </mask>
        <path
          d={ROUTE}
          mask={`url(#${id}-route-mask)`}
          fill="none"
          stroke="#D9641E"
          strokeWidth="3"
          strokeDasharray="10 8"
          strokeLinecap="round"
        />
        <path id={`${id}-route`} d={ROUTE} className="v-route-guide" fill="none" stroke="none" />

        {/* Stops */}
        <g className="v-pins">
          {[
            [124, 404],
            [400, 440],
            [904, 616],
          ].map(([x, y], i) => (
            <g key={i} className="v-pin" transform={`translate(${x} ${y})`}>
              <circle r="7" fill="#F5ECD9" stroke="#24140C" strokeWidth="1.5" />
              <circle r="3" fill="#D9641E" />
            </g>
          ))}
        </g>
        <text
          className="v-label font-sign"
          x="917"
          y="660"
          fontSize="13"
          letterSpacing="2"
          textAnchor="middle"
          fill="#A8460F"
        >
          PENANG
        </text>

        <Boat className="v-boat" x={892} y={614} />
      </g>
    </svg>
  );
}

export { ROUTE };
