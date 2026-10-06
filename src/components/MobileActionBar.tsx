"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { original } from "@/data/branches";
import { penangStatus } from "@/lib/openNow";
import { cn } from "@/lib/utils";

/**
 * Phones only: Call · Directions · Menu, pinned to the bottom once the hero is passed.
 * The three things a hungry visitor on Campbell Street actually needs.
 */
export default function MobileActionBar() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    const first = requestAnimationFrame(() => {
      onScroll();
      setOpen(penangStatus().open);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 font-sign text-xs uppercase tracking-[0.16em]";

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 flex overflow-hidden rounded-2xl border border-brass/50 bg-paper/95 shadow-[0_18px_40px_-14px_rgba(36,20,12,0.55)] backdrop-blur-md transition-[transform,opacity] duration-500 md:hidden",
        "pb-[env(safe-area-inset-bottom)]",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0",
      )}
    >
      <a href={original.phoneHref} className={cn(item, "text-cinnamon")}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" strokeLinejoin="round" />
        </svg>
        Call
      </a>
      <a href={original.mapsUrl} target="_blank" rel="noopener noreferrer" className={cn(item, "border-x border-brass/40 text-cinnamon")}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" strokeLinejoin="round" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <span className="flex items-center gap-1.5">
          {open !== null && (
            <span aria-hidden className={cn("size-1.5 rounded-full", open ? "bg-[#4E8A3A]" : "bg-saffron-deep")} />
          )}
          Directions
        </span>
      </a>
      <Link href="/menu" className={cn(item, "bg-cinnamon text-paper")}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <ellipse cx="12" cy="14" rx="9" ry="5" />
          <path d="M7 13c1-2 3-3 5-3s4 1 5 3" />
        </svg>
        Menu
      </Link>
    </nav>
  );
}
