"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_STEAM } from "@/lib/motion";

const links = [
  { href: "/#voyage", label: "Our story" },
  { href: "/#signatures", label: "Signatures" },
  { href: "/#family", label: "Family" },
  { href: "/menu", label: "Menu" },
  { href: "/#visit", label: "Visit" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700",
        scrolled || open
          ? "bg-paper/90 shadow-[0_1px_0_rgba(11,148,68,0.45)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8">
        <Link href="/" className="flex min-h-11 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/images/brand/hameediyah-logo.svg"
            alt="Hameediyah, est. 1907. Home"
            width={1062}
            height={346}
            priority
            unoptimized
            className="h-10 w-auto drop-shadow-[0_2px_3px_rgba(20,19,15,0.18)] sm:h-12"
          />
        </Link>

        <ul className="hidden items-center gap-8 font-sign text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-ink md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative py-2 transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-green after:transition-transform after:duration-500 hover:text-ink hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/menu"
              className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-yellow transition-colors duration-500 hover:bg-green-deep hover:text-paper"
            >
              Build your plate
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: EASE_STEAM }}
            className="paper h-[calc(100svh-4rem)] border-t border-green/40 px-6 pt-8 md:hidden"
          >
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display block border-b border-dotted border-green/60 py-4 text-4xl uppercase text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="mt-8 flex min-h-12 items-center justify-center rounded-full bg-ink font-sign text-sm font-semibold uppercase tracking-[0.2em] text-yellow"
            >
              Build your plate
            </Link>
            <p className="mt-8 text-sm text-ink/70">164-A Lebuh Campbell, George Town · +604-261 1095</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
