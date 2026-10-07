import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Certificates, as printed on the documents in the client's brochure. */
const certificates = [
  {
    src: "/images/moments/cert-malaysia-book-of-records.webp",
    alt: "National Record certificate from The Malaysia Book of Records for Hameediyah Restaurant as the oldest Nasi Kandar restaurant, dated 7 July 2020.",
    title: "The Malaysia Book of Records",
    body: "Hameediyah Restaurant is listed as the oldest Nasi Kandar restaurant, certified on 7 July 2020 at the restaurant in George Town, Penang.",
    w: 771,
    h: 1099,
  },
  {
    src: "/images/moments/cert-gtwhi-platinum.webp",
    alt: "GTWHI Heritage Recognition and Awards 2020 certificate presented to Hameediyah Restaurant: Cultural Continuity Recognition, Platinum Status.",
    title: "Cultural Continuity Recognition",
    body: "Hameediyah Restaurant was awarded Platinum Status at the GTWHI Heritage Recognition & Awards 2020, presented by George Town World Heritage Incorporated.",
    w: 749,
    h: 1102,
  },
];

/** Captions as written in the client's brochure. */
const moments = [
  {
    src: "/images/moments/agong.webp",
    alt: "Guests seated at a long table set with curries, served by Hameediyah staff.",
    caption: "Agong lunch at Hameediyah",
    w: 836,
    h: 522,
  },
  {
    src: "/images/moments/pm.webp",
    alt: "A guest eats from a spread of fried chicken and curries while a Hameediyah server in a yellow shirt looks on.",
    caption: "Hameediyah serves hi-tea for YAB Perdana Menteri Ismail Sabri Yaakob",
    w: 835,
    h: 521,
  },
  {
    src: "/images/moments/grab.webp",
    alt: "A group in masks gives a thumbs-up outside the Hameediyah Restaurant shop front on Campbell Street.",
    caption: "Grab CEO Anthony Tan visits Hameediyah HQ",
    w: 454,
    h: 684,
  },
  {
    src: "/images/moments/platinum.webp",
    alt: "The Hameediyah team holds up certificates and framed pictures outside the yellow-and-green shop front.",
    caption: "Platinum Award ceremony",
    w: 487,
    h: 680,
  },
  {
    src: "/images/moments/pns.webp",
    alt: "Hameediyah staff in black uniforms stand around two seated guests.",
    caption: "PNS presentation in Bangsar",
    w: 836,
    h: 340,
  },
  {
    src: "/images/moments/staff2.webp",
    alt: "The Hameediyah team in yellow shirts gathered under the shop sign at 164-A Campbell Street.",
    caption: "Our directors and staff",
    w: 502,
    h: 499,
  },
];

const events = [
  "Business meetings",
  "Team celebrations",
  "Networking events",
  "Product launches & press conferences",
  "Weddings",
  "Birthday parties",
  "Anniversaries & reunions",
  "Private dining",
];

const eventPhotos = [
  { src: "/images/moments/event-1.webp", w: 366, h: 275 },
  { src: "/images/moments/event-2.webp", w: 366, h: 275 },
  { src: "/images/moments/event-3.webp", w: 378, h: 284 },
  { src: "/images/moments/event-4.webp", w: 307, h: 307 },
];

const clients = ["Petronas", "Petronas Dagangan", "Media Prima", "Maybank QRPay", "Alam Flora", "Common Ground", "MitraLand"];

export default function Recognition() {
  return (
    <section id="recognition" aria-labelledby="rec-title" className="relative bg-paper-deep/50 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            id="rec-title"
            align="center"
            kicker="Chapter VIII · Recognition & guests"
            title={
              <>
                On the record, <em className="text-green-deep">and at the table</em>
              </>
            }
            intro="In 2020 the restaurant received two certificates. Here they are, with some of the guests and gatherings the family has hosted."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {certificates.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1} className="grid grid-cols-[8rem_1fr] items-center gap-6 sm:grid-cols-[11rem_1fr]">
              <Image
                src={c.src}
                alt={c.alt}
                width={c.w}
                height={c.h}
                sizes="11rem"
                className="h-auto w-full rotate-[-2deg] border-4 border-mount shadow-[0_20px_40px_-20px_rgba(20,19,15,0.6)]"
              />
              <div>
                <h3 className="font-display text-3xl uppercase leading-tight text-ink">{c.title}</h3>
                <p className="mt-2 text-ink/80">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mt-24 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {moments.map((m, i) => (
            <Reveal as="li" key={m.src} delay={(i % 3) * 0.06} className="mb-6 break-inside-avoid">
              <figure className="border-4 border-green bg-mount p-2 shadow-[0_20px_40px_-28px_rgba(20,19,15,0.7)]">
                <Image src={m.src} alt={m.alt} width={m.w} height={m.h} sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw" className="block h-auto w-full" />
                <figcaption className="px-1 pb-1 pt-3 font-sign text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                  {m.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        {/* Events */}
        <Reveal className="mt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="font-sign text-xs font-semibold uppercase tracking-[0.3em] text-green-deep">Corporate & personal events</p>
              <h3 className="font-display sign-caps mt-3 text-5xl text-ink sm:text-6xl">Host it at Hameediyah</h3>
              <p className="mt-5 max-w-lg text-lg text-ink/85">
                From a business lunch to a wedding reception, the family caters for gatherings large and small, with
                private dining rooms for a quieter meal.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-ink">
                {events.map((e, i) => (
                  <li key={e} className="font-display text-xl uppercase">
                    {e}
                    {i < events.length - 1 && (
                      <span aria-hidden className="ml-3 text-green">
                        ✦
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-sign text-xs font-semibold uppercase tracking-[0.25em] text-ink/80">Corporate clients include</p>
              <p className="mt-2 text-ink/85">{clients.join(" · ")}</p>
            </div>
            <ul className="grid grid-cols-2 gap-4">
              {eventPhotos.map((p, i) => (
                <li key={p.src} className={i % 2 ? "translate-y-6" : ""}>
                  <Image
                    src={p.src}
                    alt="Guests sharing a meal at a Hameediyah gathering."
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 1024px) 18rem, 45vw"
                    className="aspect-[4/3] h-auto w-full rounded-sm border-4 border-mount object-cover shadow-[0_16px_30px_-20px_rgba(20,19,15,0.7)]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
