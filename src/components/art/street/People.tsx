/**
 * Walking figures for the hero street. Original vector art, drawn facing right with
 * feet on y = 0, using curved silhouettes: tapered limbs with round joints, draped cloth.
 * Limbs carry .st-* classes, animated in globals.css (walk cycle).
 */
import type { CSSProperties } from "react";

const INK = "#14130F";
const SKIN = "#7A4A2A";
const SKIN_SHADE = "#5E361D";

/** A leg as one tapered, slightly bent stroke with a rounded foot. Swings from the hip. */
function Leg({ cls, color, top = -120, len = 120 }: { cls: string; color: string; top?: number; len?: number }) {
  const knee = top + len * 0.52;
  const ankle = top + len - 7;
  return (
    <g className={`st-leg ${cls}`}>
      <path
        d={`M0,${top} C-4,${knee - 18} 4,${knee} 2,${knee} S0,${ankle - 20} 1,${ankle}`}
        stroke={color}
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <path d={`M-5,${ankle - 2} C-4,${ankle + 7} 18,${ankle + 8} 17,${ankle + 3} C16,${ankle - 1} 6,${ankle - 4} -5,${ankle - 2} Z`} fill={SKIN_SHADE} />
    </g>
  );
}

/** An arm as a curved stroke with a hand. Swings from the shoulder. */
function Arm({ cls, color, sleeve, from = [-16, -182], to = [-20, -124] }: { cls?: string; color: string; sleeve?: string; from?: number[]; to?: number[] }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2 - 4;
  const my = (y1 + y2) / 2;
  return (
    <g className={cls ? `st-arm ${cls}` : undefined}>
      <path d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} stroke={color} strokeWidth="10" strokeLinecap="round" fill="none" />
      {sleeve && <path d={`M${x1},${y1} Q${x1 - 2},${y1 + 14} ${x1 - 2},${y1 + 22}`} stroke={sleeve} strokeWidth="14" strokeLinecap="round" fill="none" />}
      <circle cx={x2} cy={y2 + 2} r="6" fill={color} />
    </g>
  );
}

function Head({ cap, hair = INK, cloth }: { cap?: boolean; hair?: string; cloth?: string }) {
  return (
    <g>
      <path d="M-5,-200 C-5,-192 6,-192 6,-200 L5,-188 L-4,-188 Z" fill={SKIN_SHADE} />
      <path d="M-13,-214 C-13,-232 17,-234 17,-213 C17,-200 9,-196 2,-196 C-7,-196 -13,-203 -13,-214 Z" fill={SKIN} />
      <path d="M-12,-214 C-14,-205 -9,-209 -10,-212" stroke={SKIN_SHADE} strokeWidth="2" fill="none" />
      <path d="M8,-205 q4,1.5 7,-1" stroke={INK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="10" cy="-215" r="1.4" fill={INK} />
      {cap ? (
        <path d="M-14,-224 C-14,-236 -12,-241 2,-242 C16,-241 18,-236 18,-224 C10,-228 -6,-228 -14,-224 Z" fill={INK} />
      ) : cloth ? (
        <path d="M-15,-219 C-16,-238 18,-242 19,-221 C14,-228 -8,-230 -15,-219 Z M-15,-221 C-22,-214 -22,-206 -16,-202" fill={cloth} stroke={INK} strokeWidth="0.8" />
      ) : (
        <path d="M-14,-216 C-16,-236 16,-240 18,-220 C12,-228 -4,-230 -14,-216 Z" fill={hair} />
      )}
    </g>
  );
}

/** The kandar seller: pole across the shoulder, a brass pot of rice at one end, curry at the other. */
export function KandarSeller({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-215 -300 430 306" overflow="visible" className={className} style={style} aria-hidden="true">
      <defs>
        <pattern id="pelikat" width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill="#3F5A2C" />
          <path d="M0 4.5H9M4.5 0V9" stroke="#C9A55C" strokeWidth="1.3" opacity="0.75" />
        </pattern>
        <radialGradient id="pot-brass" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#F6DA8E" />
          <stop offset="0.55" stopColor="#C99A45" />
          <stop offset="1" stopColor="#7A5420" />
        </radialGradient>
        <linearGradient id="shirt-shade" x1="0" x2="1">
          <stop offset="0" stopColor="#E9DFCB" />
          <stop offset="0.5" stopColor="#FBF6EA" />
          <stop offset="1" stopColor="#E9DFCB" />
        </linearGradient>
      </defs>
      <ellipse cx="0" cy="3" rx="72" ry="6" fill={INK} opacity="0.16" />
      <g className="st-bob">
        {/* Both legs sit behind the sarong, so they step out from under the hem */}
        <Leg cls="st-leg-b" color={SKIN_SHADE} />
        <Leg cls="st-leg-a" color={SKIN} />
        <Arm cls="st-arm-b" color={SKIN_SHADE} sleeve="#E9DFCB" />
        {/* Kain pelikat, draped and folded at the waist */}
        <path
          d="M-26,-128 Q0,-133 26,-128 C31,-106 34,-82 31,-58 Q0,-49 -31,-58 C-34,-82 -31,-106 -26,-128 Z"
          fill="url(#pelikat)"
          stroke={INK}
          strokeWidth="1.3"
        />
        <path d="M-6,-126 C-2,-108 -8,-80 -4,-56" stroke={INK} strokeWidth="1" opacity="0.35" fill="none" />
        <path d="M-27,-124 Q0,-118 27,-124" stroke="#2F4421" strokeWidth="5" fill="none" />
        {/* Shirt */}
        <path
          d="M-26,-122 C-31,-150 -29,-176 -20,-188 Q0,-198 20,-188 C29,-176 31,-150 26,-122 Q0,-115 -26,-122 Z"
          fill="url(#shirt-shade)"
          stroke={INK}
          strokeWidth="1.3"
        />
        <path d="M-7,-192 L0,-178 L7,-192" stroke={INK} strokeWidth="1" fill="none" />
        <path d="M0,-178 C1,-160 -1,-140 0,-122" stroke={INK} strokeWidth="0.8" opacity="0.3" fill="none" />
        <Head cap />
        {/* Arm raised to steady the pole */}
        <path d="M16,-184 Q34,-190 40,-210" stroke={SKIN} strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M16,-184 q8,-2 12,-6" stroke="#E9DFCB" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="41" cy="-212" r="6" fill={SKIN} />

        {/* The kandar: bamboo pole and two swinging brass pots */}
        <path d="M-164,-198 Q0,-216 164,-198" stroke="#8A6A3A" strokeWidth="11" strokeLinecap="round" fill="none" />
        <path d="M-164,-199 Q0,-217 164,-199" stroke="#E2C27A" strokeWidth="6" strokeLinecap="round" fill="none" />
        {[-112, -56, 56, 112].map((x) => (
          <path key={x} d={`M${x},${-206 - (x * x) / 6500} v7`} stroke="#8A6A3A" strokeWidth="2" strokeLinecap="round" />
        ))}
        {[
          { x: -150, d: "0s" },
          { x: 150, d: "-0.35s" },
        ].map(({ x, d }) => (
          <g key={x} className="st-pot" style={{ animationDelay: d }}>
            <path
              d={`M${x},-198 Q${x - 18},-160 ${x - 27},-122 M${x},-198 Q${x + 18},-160 ${x + 27},-122 M${x},-198 L${x},-124`}
              stroke="#6B3A1E"
              strokeWidth="1.6"
              fill="none"
            />
            <path
              d={`M${x - 33},-121 C${x - 46},-90 ${x - 34},-52 ${x},-50 C${x + 34},-52 ${x + 46},-90 ${x + 33},-121 Q${x},-114 ${x - 33},-121 Z`}
              fill="url(#pot-brass)"
              stroke={INK}
              strokeWidth="1.5"
            />
            <path d={`M${x - 36},-98 Q${x},-86 ${x + 36},-98`} stroke={INK} strokeWidth="0.9" fill="none" opacity="0.4" />
            <ellipse cx={x - 14} cy="-96" rx="5" ry="12" fill="#FFF1C4" opacity="0.45" />
            <path d={`M${x - 32},-121 C${x - 24},-142 ${x + 24},-142 ${x + 32},-121 Q${x},-115 ${x - 32},-121 Z`} fill="#B08D57" stroke={INK} strokeWidth="1.4" />
            <circle cx={x} cy="-137" r="4" fill="#6B3A1E" />
            {[-14, 12].map((dx, i) => (
              <path
                key={dx}
                className="st-steam"
                style={{ animationDelay: `${i * 1.4 + (x > 0 ? 0.7 : 0)}s` }}
                d={`M${x + dx},-142 c-7,-8 7,-14 0,-22 c-7,-8 7,-14 0,-22`}
                stroke="#FFFDF6"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}

export type PersonKind = "docker" | "woman" | "merchant" | "child";

/** A passer-by on Campbell Street. */
export function Person({ kind, className, style }: { kind: PersonKind; className?: string; style?: CSSProperties }) {
  const scale = kind === "child" ? 0.68 : 1;
  return (
    <svg viewBox="-70 -320 180 326" overflow="visible" className={className} style={style} aria-hidden="true">
      <ellipse cx="0" cy="3" rx={32 * scale} ry="5" fill={INK} opacity="0.14" />
      <g transform={`scale(${scale})`}>
        <g className="st-bob">
          {kind === "woman" && (
            <>
              <Leg cls="st-leg-b" color={SKIN_SHADE} top={-44} len={44} />
              <Leg cls="st-leg-a" color={SKIN} top={-44} len={44} />
              {/* Saree: a flowing skirt with a gold border */}
              <path
                d="M-22,-128 Q0,-134 22,-128 C30,-90 40,-40 36,-8 Q0,0 -36,-8 C-40,-40 -30,-90 -22,-128 Z"
                fill="#D9641E"
                stroke={INK}
                strokeWidth="1.2"
              />
              <path d="M-36,-14 Q0,-6 36,-14" stroke="#E0A526" strokeWidth="6" fill="none" />
              <path d="M-8,-124 C-6,-90 -14,-50 -10,-10 M10,-124 C14,-80 12,-40 16,-10" stroke="#A8460F" strokeWidth="1" opacity="0.5" fill="none" />
              {/* Blouse and pallu over the shoulder */}
              <path d="M-21,-126 C-27,-150 -24,-176 -16,-186 Q0,-194 16,-186 C24,-176 27,-150 21,-126 Z" fill="#B3311C" stroke={INK} strokeWidth="1.2" />
              <path d="M-16,-186 C6,-170 22,-120 34,-60 C26,-62 20,-100 2,-140 C-8,-160 -14,-176 -16,-186 Z" fill="#E0A526" opacity="0.92" />
              <Arm cls="st-arm-b" color={SKIN_SHADE} from={[-15, -180]} to={[-19, -124]} />
              <path d="M14,-180 Q26,-206 20,-236" stroke={SKIN} strokeWidth="9" strokeLinecap="round" fill="none" />
              <Head hair={INK} />
              <circle cx="-12" cy="-210" r="7" fill={INK} />
              {/* Basket on the head */}
              <path d="M-30,-236 C-26,-256 30,-256 34,-236 Q2,-230 -30,-236 Z" fill="#C9A55C" stroke={INK} strokeWidth="1.2" />
              <path d="M-26,-242 Q2,-238 30,-242 M-22,-249 Q2,-245 26,-249" stroke="#8A6A3A" strokeWidth="1.1" fill="none" />
              <circle cx="-6" cy="-256" r="8" fill="#3F5A2C" />
              <circle cx="10" cy="-257" r="7" fill="#E0A526" />
            </>
          )}

          {kind !== "woman" && (
            <>
              {/* Legs first, so the sarong / jacket hangs over them */}
              <Leg cls="st-leg-b" color={kind === "merchant" ? "#2E2620" : SKIN_SHADE} />
              <Leg cls="st-leg-a" color={kind === "merchant" ? "#3A3028" : SKIN} />
              <Arm
                cls="st-arm-b"
                color={SKIN_SHADE}
                sleeve={kind === "merchant" ? "#EFE7D6" : kind === "child" ? "#C98E1A" : undefined}
              />
              {kind === "merchant" ? (
                <path d="M-23,-126 Q0,-130 23,-126 L20,-100 Q0,-96 -20,-100 Z" fill="#2E2620" />
              ) : (
                <path
                  d="M-24,-128 Q0,-132 24,-128 C28,-108 30,-88 28,-70 Q0,-62 -28,-70 C-30,-88 -28,-108 -24,-128 Z"
                  fill={kind === "child" ? "#6B3A1E" : "#8A5A32"}
                  stroke={INK}
                  strokeWidth="1.2"
                />
              )}
              {kind === "merchant" ? (
                <path
                  d="M-24,-98 C-30,-130 -30,-170 -20,-188 Q0,-198 20,-188 C30,-170 30,-130 24,-98 Q0,-92 -24,-98 Z"
                  fill="#FBF6EA"
                  stroke={INK}
                  strokeWidth="1.2"
                />
              ) : (
                <path
                  d="M-24,-124 C-29,-150 -27,-176 -19,-187 Q0,-196 19,-187 C27,-176 29,-150 24,-124 Q0,-118 -24,-124 Z"
                  fill={kind === "child" ? "#E0A526" : "#EDE3CF"}
                  stroke={INK}
                  strokeWidth="1.2"
                />
              )}
              {kind === "merchant" && <path d="M0,-190 C1,-160 -1,-130 0,-100" stroke={INK} strokeWidth="0.8" opacity="0.35" fill="none" />}
              <Head cap={kind === "merchant"} cloth={kind === "docker" ? "#F7F0E2" : undefined} />
              {kind === "docker" && (
                <>
                  {/* A rice sack over the shoulder */}
                  <path d="M-36,-192 C-46,-246 30,-258 28,-200 C24,-178 -28,-172 -36,-192 Z" fill="#C9B07A" stroke={INK} strokeWidth="1.3" />
                  <path d="M-22,-216 q14,7 32,0 M-26,-200 q16,6 36,-2" stroke="#8A6A3A" strokeWidth="1.1" fill="none" />
                  <path d="M16,-184 Q30,-194 26,-212" stroke={SKIN} strokeWidth="10" strokeLinecap="round" fill="none" />
                </>
              )}
              {kind === "merchant" && (
                <>
                  {/* A black umbrella against the sun */}
                  <path d="M17,-184 Q30,-210 28,-250" stroke={SKIN} strokeWidth="9" strokeLinecap="round" fill="none" />
                  <path d="M28,-250 V-292" stroke={INK} strokeWidth="2.2" />
                  <path
                    d="M-36,-266 C-30,-312 86,-312 92,-266 C80,-276 68,-274 60,-266 C50,-276 38,-276 28,-266 C18,-276 6,-276 -4,-266 C-14,-276 -26,-274 -36,-266 Z"
                    fill="#2B2420"
                    stroke={INK}
                    strokeWidth="1.2"
                  />
                  <path d="M28,-296 V-304" stroke={INK} strokeWidth="3" strokeLinecap="round" />
                </>
              )}
              {kind === "child" && <Arm cls="st-arm-a" color={SKIN} sleeve="#C98E1A" from={[15, -182]} to={[20, -126]} />}
            </>
          )}
        </g>
      </g>
    </svg>
  );
}
