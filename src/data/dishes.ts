/**
 * Dish data for Build Your Plate and the heritage menu card.
 * Facts come from CLAUDE.md §3 only. No prices, no invented recipes.
 */

export type Rice = {
  id: "white" | "biryani";
  name: string;
  local: string;
  note: string;
  /** Fill colour of the rice mound on the plate. */
  tone: string;
};

export const rices: Rice[] = [
  {
    id: "white",
    name: "White rice",
    local: "Nasi putih",
    note: "Plain steamed rice. It takes the kuah best, so every curry on the plate can be tasted.",
    tone: "#FBF6EA",
  },
  {
    id: "biryani",
    name: "Biryani rice",
    local: "Nasi biryani",
    note: "Spiced, fragrant, tinted gold. A richer base for those who want the rice to speak too.",
    tone: "#E9B85A",
  },
];

export type Lauk = {
  id: string;
  name: string;
  english: string;
  /** Dish colour for the counter tray and plate. */
  tone: string;
  /** Darker edge colour. */
  edge: string;
  /** Kind of shape drawn on the plate. */
  shape: "chicken" | "mutton" | "beef" | "fish" | "crab" | "egg" | "okra" | "squid";
  what: string;
  why: string;
  signature?: boolean;
};

export const lauk: Lauk[] = [
  {
    id: "ayam-bawang",
    name: "Ayam Bawang",
    english: "Onion chicken",
    tone: "#B5651D",
    edge: "#6B3A1E",
    shape: "chicken",
    what: "Fried chicken smothered in caramelised and crispy onions.",
    why: "One of the house signatures, and among the dishes the shop is best known for.",
    signature: true,
  },
  {
    id: "ayam-kapitan",
    name: "Ayam Kapitan",
    english: "Kapitan chicken curry",
    tone: "#C7631F",
    edge: "#7A3414",
    shape: "chicken",
    what: "The house chicken curry, rich and deep red-gold.",
    why: "A Penang classic and a Hameediyah signature, also served over biryani.",
    signature: true,
  },
  {
    id: "kambing-mysore",
    name: "Kambing Mysore",
    english: "Mysore mutton",
    tone: "#5E2E16",
    edge: "#2E160A",
    shape: "mutton",
    what: "Rich mutton cooked down until the spices cling dry to the meat.",
    why: "A dish for people who want depth: dark, roasted and slow.",
    signature: true,
  },
  {
    id: "daging-rendang",
    name: "Daging Rendang Hameediyah",
    english: "House beef rendang",
    tone: "#6E3B1C",
    edge: "#3A1C0B",
    shape: "beef",
    what: "The house beef rendang.",
    why: "The rendang that carries the shop's own name.",
    signature: true,
  },
  {
    id: "mutton-kurma",
    name: "Mutton Kurma",
    english: "Mutton in kurma gravy",
    tone: "#D9A55A",
    edge: "#8C5E26",
    shape: "mutton",
    what: "Mutton in a mild, creamy kurma gravy.",
    why: "The gentler side of the counter, for warmth without fire.",
  },
  {
    id: "kari-kepala-ikan",
    name: "Kari Kepala Ikan",
    english: "Fish head curry",
    tone: "#D2741E",
    edge: "#86400E",
    shape: "fish",
    what: "Fish head in a sharp, tangy curry.",
    why: "A nasi kandar classic, fitting for a shop that began by feeding the dockers of Weld Quay.",
  },
  {
    id: "crab-curry",
    name: "Crab Curry",
    english: "Ketam masak kari",
    tone: "#D2541E",
    edge: "#83300C",
    shape: "crab",
    what: "Crab cooked in a thick curry, best eaten with your hands.",
    why: "An island dish for an island city. Messy, generous and worth it.",
  },
  {
    id: "sambal-sotong",
    name: "Sambal Sotong",
    english: "Squid in chilli sambal",
    tone: "#B3311C",
    edge: "#6A170C",
    shape: "squid",
    what: "Squid cooked in a red chilli sambal.",
    why: "The fire on the counter, for those who want their plate to bite back.",
  },
  {
    id: "bendi",
    name: "Bendi",
    english: "Okra",
    tone: "#5E7A35",
    edge: "#33471B",
    shape: "okra",
    what: "Okra, simply cooked.",
    why: "A green note against all that gold and red.",
  },
  {
    id: "telur-rebus",
    name: "Telur Rebus",
    english: "Boiled egg in curry",
    tone: "#F0D27A",
    edge: "#B08D57",
    shape: "egg",
    what: "Boiled egg, halved and dressed in curry.",
    why: "The small, cheap pleasure that has finished many a plate.",
  },
];

export type Gravy = { level: number; name: string; note: string };

/** Kuah campur levels, from a light drizzle to banjir ("flooded"). */
export const gravyLevels: Gravy[] = [
  { level: 0, name: "Kering", note: "Dry. No gravy, just the dishes." },
  { level: 1, name: "Sikit", note: "A light drizzle across the rice." },
  { level: 2, name: "Biasa", note: "The usual: enough to bind every grain." },
  { level: 3, name: "Lebih", note: "A generous pour. The rice starts to swim." },
  { level: 4, name: "Banjir", note: "Flooded. The Penang way, curries running into each other." },
];

/** The heritage menu card. Names only. Descriptions are kept general on purpose. */
export const menuCard = [
  {
    title: "Nasi Kandar",
    tamil: "கந்தர்",
    intro: "Rice, your choice of lauk from the counter, and mixed curries poured over the top.",
    items: [
      { name: "Ayam Bawang", note: "fried chicken, caramelised & crispy onions" },
      { name: "Ayam Kapitan", note: "the house chicken curry" },
      { name: "Kambing Mysore", note: "rich, dry-spiced mutton" },
      { name: "Daging Rendang Hameediyah", note: "house beef rendang" },
      { name: "Mutton Kurma", note: "mutton in a mild kurma gravy" },
      { name: "Kari Kepala Ikan", note: "fish head curry" },
      { name: "Crab Curry", note: "crab in a thick curry" },
      { name: "Sambal Sotong", note: "squid in chilli sambal" },
    ],
  },
  {
    title: "Murtabak",
    intro: "Pan-fried roti, folded around a filling. The house's most famous dish.",
    items: [
      { name: "Murtabak Ayam", note: "chicken" },
      { name: "Murtabak Daging", note: "beef" },
      { name: "Murtabak Kambing", note: "mutton" },
      { name: "Murtabak Udang", note: "prawn" },
      { name: "Murtabak Sayur", note: "vegetable" },
    ],
  },
  {
    title: "Nasi Biryani",
    intro: "Spiced rice, served with a choice of chicken.",
    items: [
      { name: "Biryani Ayam", note: "chicken" },
      { name: "Biryani Ayam Kampung", note: "village chicken" },
      { name: "Biryani Ayam Madu", note: "honey chicken" },
      { name: "Biryani Ayam Kapitan", note: "with Kapitan curry" },
    ],
  },
  {
    title: "Roti & Breads",
    intro: "For mopping up whatever the rice left behind.",
    items: [
      { name: "Roti Canai", note: "flaky griddle bread" },
      { name: "Naan", note: "from the tandoor" },
    ],
  },
  {
    title: "Sides",
    intro: "Small things that complete a plate.",
    items: [
      { name: "Dalcha", note: "lentil & vegetable curry" },
      { name: "Papadam", note: "crisp lentil wafer" },
      { name: "Bendi", note: "okra" },
      { name: "Telur Rebus", note: "boiled egg in curry" },
    ],
  },
] as const;
