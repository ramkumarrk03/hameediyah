import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  kicker,
  tamil,
  title,
  intro,
  align = "left",
  dark = false,
  id,
}: {
  kicker: string;
  tamil?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  id?: string;
}) {
  return (
    <header className={cn(align === "center" && "mx-auto text-center", "max-w-2xl")}>
      <p className={cn("font-sign text-xs uppercase tracking-[0.3em]", dark ? "text-turmeric" : "text-saffron-deep")}>
        {kicker}
        {tamil && (
          <>
            {" · "}
            <span lang="ta" className="font-tamil normal-case tracking-normal">
              {tamil}
            </span>
          </>
        )}
      </p>
      <h2
        id={id}
        className={cn(
          "font-display mt-3 text-4xl leading-[1.04] text-balance sm:text-5xl lg:text-6xl",
          dark ? "text-paper" : "text-cinnamon",
        )}
      >
        {title}
      </h2>
      {intro && <p className={cn("mt-5 text-pretty text-lg", dark ? "text-paper/80" : "text-ink/80")}>{intro}</p>}
    </header>
  );
}
