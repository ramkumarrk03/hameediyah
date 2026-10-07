import { cn } from "@/lib/utils";

const items = [
  "Murtabak Hameediyah",
  "Ayam Bawang",
  "Ayam Kapitan",
  "Kambing Mysore",
  "Daging Rendang",
  "Sotong Goreng Apollo",
  "Nasi Briyani Udang",
  "Kari Kepala Ikan",
  "Kari Itik",
  "Since 1907",
];

/** A slow ribbon of dish names on signboard yellow, like the banner over the counter at 164A. */
export default function Marquee({ dark = false }: { dark?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-3xl uppercase sm:text-4xl">{t}</span>
          <span aria-hidden className={cn("text-lg", dark ? "text-yellow" : "text-green")}>✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={cn(
        "marquee relative flex overflow-hidden border-y-4 border-double py-5",
        dark ? "border-yellow/60 bg-green-night text-yellow" : "signboard border-green",
      )}
    >
      <p className="sr-only">On the counter: {items.filter((t) => t !== "Since 1907").join(", ")}.</p>
      {row(true)}
      {row(true)}
    </div>
  );
}
