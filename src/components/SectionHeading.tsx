import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  dark = false,
  id,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  id?: string;
}) {
  return (
    <header className={cn(align === "center" && "mx-auto text-center", "max-w-2xl")}>
      <p className={cn("font-sign text-xs font-semibold uppercase tracking-[0.3em]", dark ? "text-yellow" : "text-green-deep")}>
        {kicker}
      </p>
      <h2
        id={id}
        className={cn(
          "font-display sign-caps mt-3 text-[2.75rem] text-balance sm:text-6xl lg:text-7xl",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && <p className={cn("mt-5 text-pretty text-lg", dark ? "text-paper/80" : "text-ink/80")}>{intro}</p>}
    </header>
  );
}
