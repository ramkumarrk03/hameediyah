/**
 * Ink sketch: the kandar stall under the tree on Campbell Street.
 * An illustration, not a photograph. Captioned as such where it is used.
 */
export default function StallScene({ className }: { className?: string }) {
  const ink = "#3A2414";
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="Ink sketch of a man setting down a bamboo kandar with two curry pots in the shade of a large tree, shophouses behind.">
      <rect width="400" height="300" fill="#EADBBE" />
      {/* Shophouses behind */}
      <g stroke={ink} strokeWidth="1" fill="none" opacity="0.45">
        <path d="M0,150 H400 M0,110 H400" />
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={i}>
            <path d={`M${i * 46 + 6},150 V118 Q${i * 46 + 22},104 ${i * 46 + 38},118 V150`} />
            <path d={`M${i * 46},110 V200`} />
          </g>
        ))}
        <path d="M0,104 L200,86 L400,104" />
      </g>
      {/* Ground */}
      <path d="M0,240 Q200,228 400,242" stroke={ink} strokeWidth="1.2" fill="none" opacity="0.6" />
      {Array.from({ length: 22 }).map((_, i) => (
        <path key={i} d={`M${i * 19 + 4},${252 + (i % 3) * 8} h8`} stroke={ink} strokeWidth="0.8" opacity="0.35" />
      ))}
      {/* Tree */}
      <path d="M258,242 C254,200 262,170 250,130 M262,242 C270,200 266,170 280,128 M256,170 C236,150 226,140 214,134" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path
        d="M150,96 C140,60 180,30 220,40 C240,10 300,14 312,44 C350,40 380,70 364,100 C384,124 352,150 322,140 C306,160 262,160 250,140 C226,158 186,150 184,128 C156,132 138,114 150,96 Z"
        fill="#4E5E33"
        fillOpacity="0.35"
        stroke={ink}
        strokeWidth="1.6"
      />
      {Array.from({ length: 30 }).map((_, i) => (
        <path
          key={i}
          d={`M${160 + ((i * 53) % 200)},${50 + ((i * 37) % 90)} q4,-3 8,0`}
          stroke={ink}
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
      ))}
      {/* Shade */}
      <ellipse cx="250" cy="246" rx="130" ry="12" fill={ink} opacity="0.12" />
      {/* The man and the kandar, in silhouette */}
      <g fill={ink}>
        <circle cx="150" cy="140" r="9" />
        <path d="M141,134 Q150,124 160,134 Q150,130 141,134 Z" fill="#F5ECD9" opacity="0.9" />
        <path d="M138,152 Q150,146 162,152 L166,196 Q150,200 134,196 Z" />
        <path d="M134,196 Q150,202 166,196 L170,240 Q150,244 130,240 Z" fill="#6B3A1E" />
        <path d="M140,240 h8 v6 h-10 Z M154,240 h8 l2,6 h-10 Z" />
        <path d="M140,156 L120,166 L122,170 L144,164 Z M160,156 L178,160 L178,164 L158,164 Z" />
      </g>
      <g stroke={ink} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M84,160 Q150,150 216,160" strokeWidth="4" stroke="#8A6A3A" />
        <path d="M94,160 L82,204 M94,160 L106,204 M206,160 L194,204 M206,160 L218,204" strokeWidth="1.2" />
        <path d="M78,204 C76,234 112,234 110,204 Z" fill="#B08D57" strokeWidth="1.6" />
        <path d="M188,204 C186,234 222,234 220,204 Z" fill="#B08D57" strokeWidth="1.6" />
        <path d="M76,204 Q94,196 112,204 M186,204 Q204,196 222,204" strokeWidth="1.6" />
      </g>
      {/* Steam */}
      <g stroke="#FBF6EA" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M96,200 c-6,-10 6,-16 0,-26" />
        <path d="M206,200 c-6,-10 6,-16 0,-26" />
      </g>
      {/* Seated customers */}
      <g fill={ink}>
        <circle cx="300" cy="192" r="7" />
        <path d="M292,202 Q300,198 308,202 L310,224 L322,226 L322,232 L292,232 Z" />
        <circle cx="342" cy="194" r="7" />
        <path d="M334,204 Q342,200 350,204 L352,232 L322,232 L322,226 L334,224 Z" fill="#6B3A1E" />
        <ellipse cx="322" cy="222" rx="9" ry="3" fill="#B08D57" />
      </g>
    </svg>
  );
}
