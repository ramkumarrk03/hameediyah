/**
 * Line-drawn elevation of a two-storey Straits shophouse, after the
 * Lebuh Campbell street front: tiled roof, shuttered upper windows,
 * the five-foot way arches below, and a painted signboard.
 */
export default function Shophouse({ className, night = false }: { className?: string; night?: boolean }) {
  const ink = night ? "#F5ECD9" : "#24140C";
  const wall = night ? "#3A2214" : "#EFE2C6";
  const shade = night ? "#2A180E" : "#E3D0AC";
  return (
    <svg viewBox="0 0 520 600" className={className} aria-hidden="true">
      <defs>
        <pattern id={`tiles-${night ? "n" : "d"}`} width="12" height="8" patternUnits="userSpaceOnUse">
          <path d="M0,8 Q6,2 12,8" fill="none" stroke={ink} strokeWidth="0.8" opacity="0.5" />
        </pattern>
        <linearGradient id={`glow-${night ? "n" : "d"}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0A526" stopOpacity={night ? 0.9 : 0.35} />
          <stop offset="1" stopColor="#D9641E" stopOpacity={night ? 0.7 : 0.2} />
        </linearGradient>
      </defs>

      {/* Roof */}
      <path d="M10,92 L260,40 L510,92 Z" fill={`url(#tiles-${night ? "n" : "d"})`} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      <path d="M4,94 H516" stroke={ink} strokeWidth="3" />

      {/* Upper floor */}
      <rect x="24" y="96" width="472" height="200" fill={wall} stroke={ink} strokeWidth="2" />
      <path d="M24,118 H496" stroke={ink} strokeWidth="0.8" opacity="0.6" />
      {[70, 210, 350].map((x) => (
        <g key={x}>
          <path d={`M${x},270 V160 Q${x + 50},118 ${x + 100},160 V270 Z`} fill={shade} stroke={ink} strokeWidth="1.8" />
          <path d={`M${x + 50},140 V270`} stroke={ink} strokeWidth="1.2" />
          {[180, 205, 230, 255].map((y) => (
            <path key={y} d={`M${x + 6},${y} H${x + 44} M${x + 56},${y} H${x + 94}`} stroke={ink} strokeWidth="0.8" opacity="0.7" />
          ))}
          <path d={`M${x - 8},272 H${x + 108}`} stroke={ink} strokeWidth="2.2" />
        </g>
      ))}

      {/* Signboard */}
      <rect x="96" y="304" width="328" height="54" fill="#6B3A1E" stroke={ink} strokeWidth="2" />
      <rect x="102" y="310" width="316" height="42" fill="none" stroke="#E0A526" strokeWidth="1" />
      <text x="260" y="340" textAnchor="middle" className="font-sign" fontSize="24" letterSpacing="6" fill="#E0A526">
        HAMEEDIYAH
      </text>
      <text x="74" y="337" textAnchor="middle" className="font-sign" fontSize="14" letterSpacing="1" fill={ink}>
        164A
      </text>
      <text x="446" y="337" textAnchor="middle" className="font-sign" fontSize="14" letterSpacing="1" fill={ink}>
        1907
      </text>

      {/* Ground floor: five-foot way */}
      <rect x="24" y="366" width="472" height="220" fill={wall} stroke={ink} strokeWidth="2" />
      {[24, 181, 338].map((x) => (
        <g key={x}>
          <path
            d={`M${x + 14},586 V430 Q${x + 78},370 ${x + 143},430 V586`}
            fill={`url(#glow-${night ? "n" : "d"})`}
            stroke={ink}
            strokeWidth="2"
          />
        </g>
      ))}
      {/* Pillars */}
      {[24, 181, 338, 496].map((x) => (
        <path key={x} d={`M${x - 6},372 H${x + 6} V586 H${x - 6} Z`} fill={wall} stroke={ink} strokeWidth="1.4" />
      ))}
      {/* Counter glimpsed through the middle arch */}
      <path d="M210,540 H322 V586 H210 Z" fill="#B08D57" stroke={ink} strokeWidth="1.4" />
      {[226, 254, 282, 306].map((x) => (
        <ellipse key={x} cx={x} cy="536" rx="11" ry="5" fill="#D9641E" stroke={ink} strokeWidth="1" />
      ))}
      <path d="M0,588 H520" stroke={ink} strokeWidth="3" />
    </svg>
  );
}
