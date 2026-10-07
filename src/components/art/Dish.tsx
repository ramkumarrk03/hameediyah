import type { Lauk } from "@/data/dishes";

/**
 * Top-down illustration of one lauk in its steel counter tray or a clay bowl.
 * Original vector art. Everything is drawn around (0,0) in a 200×200 box.
 */

function Pieces({ lauk }: { lauk: Lauk }) {
  const { tone, edge, shape, id } = lauk;
  const ink = "#14130F";
  switch (shape) {
    case "chicken":
      return (
        <g stroke={ink} strokeWidth="1.6" strokeLinejoin="round">
          {[
            [-30, -18, 20],
            [22, -26, -15],
            [-6, 22, 40],
            [32, 18, 70],
          ].map(([x, y, r]) => (
            <path
              key={`${x}${y}`}
              transform={`translate(${x} ${y}) rotate(${r})`}
              d="M-22,-6 C-20,-18 4,-20 18,-12 C28,-6 26,10 14,14 C2,18 -18,14 -22,-6 Z"
              fill={edge}
            />
          ))}
          {id === "ayam-bawang" &&
            Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              const r = 14 + (i % 4) * 9;
              return (
                <path
                  key={i}
                  d={`M${Math.cos(a) * r},${Math.sin(a) * r} q6,-6 12,0`}
                  stroke="#E9B85A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  transform={`rotate(${i * 37} ${Math.cos(a) * r} ${Math.sin(a) * r})`}
                />
              );
            })}
        </g>
      );
    case "mutton":
    case "beef":
      return (
        <g stroke={ink} strokeWidth="1.4" strokeLinejoin="round">
          {[
            [-34, -14],
            [-4, -34],
            [28, -10],
            [-22, 20],
            [12, 26],
            [38, 22],
            [0, -2],
          ].map(([x, y], i) => (
            <path
              key={i}
              transform={`translate(${x} ${y}) rotate(${i * 29})`}
              d="M-13,-10 Q-2,-15 12,-9 Q15,2 10,11 Q-2,15 -12,10 Q-16,0 -13,-10 Z"
              fill={i % 2 ? edge : tone}
            />
          ))}
          {/* Curry leaves */}
          {[
            [-40, 32, 30],
            [44, -30, -40],
          ].map(([x, y, r]) => (
            <path key={`${x}`} transform={`translate(${x} ${y}) rotate(${r})`} d="M-10,0 Q0,-7 10,0 Q0,7 -10,0 Z" fill="#3F5A2C" />
          ))}
        </g>
      );
    case "fish":
      return (
        <g stroke={ink} strokeWidth="1.6">
          <path d="M-52,6 C-40,-40 30,-44 46,-4 C40,30 -20,42 -52,6 Z" fill={edge} />
          <path d="M-52,6 C-34,-6 -34,18 -52,6" fill="none" />
          <circle cx="20" cy="-10" r="7" fill="#FFFBEC" />
          <circle cx="21" cy="-10" r="3" fill={ink} />
          <path d="M34,8 q6,4 10,0" fill="none" />
          {[-30, 0, 30].map((x) => (
            <circle key={x} cx={x} cy={46} r="7" fill="#F0D27A" />
          ))}
        </g>
      );
    case "crab":
      return (
        <g stroke={ink} strokeWidth="1.6" strokeLinejoin="round">
          {[-1, 1].map((s) => (
            <g key={s}>
              {[-18, -6, 6].map((y) => (
                <path key={y} d={`M${s * 30},${y} q${s * 22},-4 ${s * 34},${10}`} stroke={edge} strokeWidth="5" strokeLinecap="round" fill="none" />
              ))}
              <path d={`M${s * 20},-26 q${s * 16},-26 ${s * 30},-30 q${s * 8},10 ${s * -4},20 Z`} fill={edge} />
            </g>
          ))}
          <ellipse cx="0" cy="0" rx="36" ry="26" fill={edge} />
          <path d="M-20,-4 q20,-14 40,0" stroke="#F0B080" strokeWidth="2" fill="none" />
        </g>
      );
    case "egg":
      return (
        <g stroke={ink} strokeWidth="1.5">
          {[
            [-24, -10, -20],
            [26, 4, 25],
            [-2, 32, 0],
          ].map(([x, y, r]) => (
            <g key={`${x}`} transform={`translate(${x} ${y}) rotate(${r})`}>
              <ellipse rx="22" ry="17" fill="#FBF6EA" />
              <circle r="9" fill="#E0A526" />
            </g>
          ))}
        </g>
      );
    case "okra":
      return (
        <g stroke={ink} strokeWidth="1.3">
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 26 - 70}) translate(${(i % 3) * 8 - 8} 0)`}>
              <path d="M-40,0 C-30,-8 26,-7 42,0 C26,7 -30,8 -40,0 Z" fill={i % 2 ? tone : edge} />
              {[-20, 0, 20].map((x) => (
                <circle key={x} cx={x} cy="0" r="2.4" fill="#C9D9A0" stroke="none" />
              ))}
            </g>
          ))}
        </g>
      );
    case "squid":
      return (
        <g stroke={ink} strokeWidth="1.4">
          {[
            [-30, -16],
            [6, -32],
            [32, -4],
            [-14, 22],
            [20, 28],
            [-40, 18],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="13" fill={edge} />
              <circle r="6" fill={tone} />
            </g>
          ))}
        </g>
      );
  }
}

export default function Dish({
  lauk,
  className,
  vessel = "bowl",
}: {
  lauk: Lauk;
  className?: string;
  vessel?: "bowl" | "tray" | "none";
}) {
  const gid = `g-${lauk.id}-${vessel}`;
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor={lauk.tone} />
          <stop offset="1" stopColor={lauk.edge} />
        </radialGradient>
      </defs>
      {vessel === "bowl" && (
        <>
          <circle r="94" fill="#C9B79A" stroke="#14130F" strokeWidth="2" />
          <circle r="86" fill="#E9E4DA" stroke="#14130F" strokeWidth="1" opacity="0.9" />
        </>
      )}
      {vessel === "tray" && (
        <rect x="-96" y="-80" width="192" height="160" rx="18" fill="#BFC3C4" stroke="#14130F" strokeWidth="2" />
      )}
      {vessel === "tray" ? (
        <rect x="-86" y="-70" width="172" height="140" rx="12" fill={`url(#${gid})`} stroke="#14130F" strokeWidth="1" />
      ) : (
        <circle r={vessel === "none" ? 90 : 76} fill={`url(#${gid})`} />
      )}
      {/* Oil sheen */}
      <ellipse cx="-30" cy="-36" rx="22" ry="8" fill="#FFE9A8" opacity="0.28" />
      <Pieces lauk={lauk} />
    </svg>
  );
}
