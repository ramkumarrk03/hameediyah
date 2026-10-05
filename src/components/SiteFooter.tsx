import Link from "next/link";
import { original } from "@/data/branches";

export default function SiteFooter() {
  return (
    <footer className="paper-dark px-4 pb-10 pt-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-turmeric">Hameediyah</p>
          <p className="mt-2 font-sign text-xs uppercase tracking-[0.25em] text-brass">
            Nasi kandar · since 1907
          </p>
        </div>
        <address className="not-italic text-paper/85">
          {original.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <a href={original.phoneHref} className="mt-2 inline-block underline decoration-brass underline-offset-4">
            {original.phone}
          </a>
        </address>
        <ul className="space-y-1 text-paper/85">
          <li><Link href="/#voyage" className="hover:text-turmeric">The story</Link></li>
          <li><Link href="/menu" className="hover:text-turmeric">Build your plate</Link></li>
          <li><Link href="/#visit" className="hover:text-turmeric">Visit Lebuh Campbell</Link></li>
        </ul>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-brass/30 pt-6 text-sm text-paper/60">
        Hameediyah Restaurant · Lebuh Campbell, George Town, Penang · one family since 1907.
      </p>
    </footer>
  );
}
