import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

type Photo = { src: string; alt: string; w: number; h: number; credit: string; pos?: string };

const ZOY = "Photo: Zoy To The World";
const KEN = "Photo: Ken Hunts Food";

const spreads: Array<{
  id: string;
  name: string;
  local: string;
  body: string;
  detail: string[];
  detailLabel: string;
  photo: Photo;
  inset?: Photo & { caption: string };
}> = [
  {
    id: "murtabak",
    name: "Murtabak",
    local: "Roti, folded & pan-fried",
    body: "Thin dough is stretched across the griddle, filled, folded into a parcel and fried until crisp at the edges. It is cut into squares and served with curry for dipping. It is the house's most famous dish.",
    detail: ["Ayam · chicken", "Daging · beef", "Kambing · mutton", "Udang · prawn", "Sayur · vegetable"],
    detailLabel: "Fillings",
    photo: {
      src: "/images/food/murtabak-plate-ken.webp",
      alt: "A golden murtabak on a banana leaf, a fork lifting one crisp square to show the filling inside.",
      w: 1200,
      h: 800,
      credit: KEN,
      pos: "50% 55%",
    },
    inset: {
      src: "/images/food/murtabak-griddle.webp",
      alt: "Rows of murtabak frying on the big round griddle at the shop front.",
      w: 800,
      h: 600,
      credit: ZOY,
      caption: "On the griddle at the shop front",
    },
  },
  {
    id: "ayam-bawang",
    name: "Ayam Bawang",
    local: "Onion chicken",
    body: "Fried chicken buried under onions cooked two ways: caramelised soft and fried crisp. Sweet, savoury and crunchy at once. One of the house signatures.",
    detail: ["Over white rice", "With a pour of kuah campur"],
    detailLabel: "Try it",
    photo: {
      src: "/images/food/ayam-bawang.webp",
      alt: "Ayam Bawang: fried chicken heaped with glossy red caramelised onions over rice, with other curries around it.",
      w: 800,
      h: 600,
      credit: ZOY,
      pos: "48% 50%",
    },
  },
  {
    id: "kari-kepala-ikan",
    name: "Kari Kepala Ikan",
    local: "Fish head curry",
    body: "A whole fish head simmered in a sharp, tangy curry with okra and curry leaves. A nasi kandar classic, and a fitting one for a shop that began by feeding the dockers of Weld Quay.",
    detail: ["Share it", "Spoon the gravy over rice"],
    detailLabel: "How to have it",
    photo: {
      src: "/images/food/kari-kepala-ikan.webp",
      alt: "A fish head in a deep orange curry with okra and curry leaves, in a white bowl.",
      w: 1200,
      h: 800,
      credit: KEN,
      pos: "52% 50%",
    },
  },
  {
    id: "daging-rendang",
    name: "Daging Rendang Hameediyah",
    local: "House beef rendang",
    body: "The rendang that carries the shop's own name: beef cooked slowly in spices and coconut until the gravy darkens and clings to the meat.",
    detail: ["Beef", "Slow-cooked", "Rich"],
    detailLabel: "In short",
    photo: {
      src: "/images/food/daging-rendang.webp",
      alt: "Dark, glossy beef rendang in a white bowl, the gravy pooling around the meat.",
      w: 1200,
      h: 800,
      credit: KEN,
      pos: "50% 50%",
    },
  },
];

const alsoOn = ["Kambing Mysore", "Ayam Kapitan", "Nasi Biryani", "Mutton Kurma", "Crab Curry", "Roti Canai"];

export default function Signatures() {
  return (
    <section id="signatures" aria-labelledby="sig-title" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            id="sig-title"
            align="center"
            kicker="Chapter IV · From the counter"
            title={
              <>
                What to order <em className="text-saffron-deep">first</em>
              </>
            }
            intro="Four dishes the house is known for. Start with one of these, then let the counter tempt you."
          />
        </Reveal>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {spreads.map((s, i) => (
            <article
              key={s.id}
              aria-labelledby={`sig-${s.id}`}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
            >
              <Reveal className={cn("relative mx-auto w-full max-w-md", i % 2 === 1 && "md:order-2")}>
                <figure className="relative">
                  {/* Arched frame, like the five-foot way */}
                  <div className="group relative aspect-[4/5] overflow-hidden rounded-t-full border-[6px] border-[#FBF5E8] bg-paper-deep shadow-[0_30px_60px_-30px_rgba(36,20,12,0.7)] ring-1 ring-brass/60">
                    <Image
                      src={s.photo.src}
                      alt={s.photo.alt}
                      fill
                      sizes="(min-width: 768px) 28rem, 90vw"
                      className="object-cover transition-transform duration-[2400ms] ease-out group-hover:scale-105"
                      style={{ objectPosition: s.photo.pos }}
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_-60px_60px_-40px_rgba(36,20,12,0.45)]" />
                  </div>
                  <figcaption className="mt-2 text-right text-xs text-ink/55">{s.photo.credit}</figcaption>
                  {s.inset && (
                    <figure className="deckled absolute -bottom-8 right-0 w-[46%] rotate-[4deg] sm:-right-10">
                      <Image
                        src={s.inset.src}
                        alt={s.inset.alt}
                        width={s.inset.w}
                        height={s.inset.h}
                        sizes="14rem"
                        className="block h-auto w-full"
                      />
                      <figcaption className="px-1 pt-1.5 text-xs italic leading-tight text-cinnamon">
                        {s.inset.caption}
                      </figcaption>
                    </figure>
                  )}
                </figure>
                <span className="font-display absolute -left-3 -top-6 text-7xl text-brass/80 drop-shadow-sm sm:-left-8 sm:text-8xl" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="font-sign text-xs uppercase tracking-[0.3em] text-saffron-deep">{s.local}</p>
                <h3 id={`sig-${s.id}`} className="font-display mt-2 text-5xl leading-none text-cinnamon sm:text-7xl">
                  {s.name}
                </h3>
                <p className="mt-6 max-w-lg text-lg text-ink/85">{s.body}</p>
                <div className="mt-7 border-t border-brass/50 pt-5">
                  <p className="font-sign text-xs uppercase tracking-[0.25em] text-cinnamon/80">{s.detailLabel}</p>
                  <p className="font-display mt-2 text-lg italic text-ink">{s.detail.join("  ·  ")}</p>
                </div>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal className="mt-28 text-center">
          <div className="mx-auto mb-8 size-36 overflow-hidden rounded-full border-[5px] border-[#FBF5E8] shadow-lg ring-1 ring-brass/60 sm:size-44">
            <Image
              src="/images/food/nasi-biryani.webp"
              alt="Golden nasi biryani topped with fried shallots and two red chillies."
              width={1200}
              height={800}
              sizes="11rem"
              className="h-full w-full object-cover object-[62%_55%]"
            />
          </div>
          <p className="font-sign text-xs uppercase tracking-[0.3em] text-cinnamon/80">Also on the counter</p>
          <p className="font-display mx-auto mt-4 max-w-4xl text-2xl leading-relaxed text-cinnamon sm:text-3xl">
            {alsoOn.map((d, i) => (
              <span key={d}>
                {d}
                {i < alsoOn.length - 1 && <span className="mx-3 text-saffron" aria-hidden>✦</span>}
              </span>
            ))}
          </p>
          <Link
            href="/menu"
            className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-cinnamon px-8 font-sign text-sm uppercase tracking-[0.2em] text-paper transition-colors duration-500 hover:bg-saffron-deep"
          >
            Build your plate <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
