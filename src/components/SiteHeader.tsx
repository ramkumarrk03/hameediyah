import Link from "next/link";

const links = [
  { href: "/#voyage", label: "Story" },
  { href: "/menu", label: "Menu" },
  { href: "/#visit", label: "Visit" },
];

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8"
      >
        <Link href="/" className="group flex items-baseline gap-2 text-cinnamon">
          <span className="font-display text-2xl font-semibold tracking-tight">Hameediyah</span>
          <span className="font-sign text-xs uppercase tracking-[0.2em] text-saffron-deep">Est. 1907</span>
        </Link>
        <ul className="flex gap-5 font-sign text-sm uppercase tracking-[0.18em] text-ink sm:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="border-b border-transparent pb-0.5 transition-colors duration-500 hover:border-brass hover:text-cinnamon"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
