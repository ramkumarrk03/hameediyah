import { cn } from "@/lib/utils";

const items = [
  "Murtabak",
  "Ayam Bawang",
  "Ayam Kapitan",
  "Kambing Mysore",
  "Daging Rendang",
  "Nasi Biryani",
  "Kari Kepala Ikan",
  "Roti Canai",
  "Kuah campur",
  "Since 1907",
];

/** A slow ribbon of dish names, like a hand-painted banner over the counter. */
export default function Marquee({ dark = false }: { dark?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-3xl italic sm:text-4xl">{t}</span>
          <span aria-hidden className="text-lg text-saffron">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={cn(
        "marquee relative flex overflow-hidden border-y py-5",
        dark ? "border-brass/30 bg-cinnamon text-paper" : "border-brass/50 bg-paper-deep/60 text-cinnamon",
      )}
    >
      <p className="sr-only">On the counter: {items.join(", ")}.</p>
      {row(true)}
      {row(true)}
    </div>
  );
}
