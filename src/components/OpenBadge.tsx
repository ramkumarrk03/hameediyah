"use client";

import { useEffect, useState } from "react";
import { penangStatus, type OpenStatus } from "@/lib/openNow";
import { cn } from "@/lib/utils";

/** Live "open now" pill, computed in Penang time. Renders nothing until mounted (no hydration mismatch). */
export default function OpenBadge({ className, dark = false }: { className?: string; dark?: boolean }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(penangStatus());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 60_000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);
  if (!status) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-sign text-xs uppercase tracking-[0.18em]",
        dark ? "bg-paper/10 text-paper" : "bg-cinnamon/8 text-cinnamon",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full",
          status.open ? "bg-[#4E8A3A] shadow-[0_0_0_3px_rgba(78,138,58,0.25)]" : "bg-saffron-deep",
        )}
      />
      {status.label}
    </span>
  );
}
