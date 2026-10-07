/**
 * Dish data for Build Your Plate and the heritage menu card.
 * Source of truth: the client's company profile and brochure ("Signature Menu", "Must Try Our Menu",
 * "About Us"). Dish names and descriptions follow those documents. No prices, no invented recipes.
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
    note: "Plain steamed rice, the classic base for a Nasi Kandar plate.",
    tone: "#FBF6EA",
  },
  {
    id: "biryani",
    name: "Biryani rice",
    local: "Nasi biryani",
    note: "Fragrant biryani rice, also on the Hameediyah menu.",
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
    what: "Perfectly spiced fried chicken, served Nasi Kandar style with a rich array of curries.",
    why: "Nasi Kandar Ayam Bawang is on the house's must-try signature menu.",
    signature: true,
  },
  {
    id: "ayam-kapitan",
    name: "Ayam Kapitan",
    english: "Kapitan chicken",
    tone: "#C7631F",
    edge: "#7A3414",
    shape: "chicken",
    what: "A traditional Peranakan dish: chicken in a creamy, spicy gravy.",
    why: "Marked as a signature in Hameediyah's own company profile.",
    signature: true,
  },
  {
    id: "ayam-goreng",
    name: "Ayam Goreng",
    english: "Fried chicken",
    tone: "#A9581C",
    edge: "#5E2E10",
    shape: "chicken",
    what: "Fried chicken marinated with a special blend of spices and herbs, crispy outside and juicy inside.",
    why: "It is one of the dishes on the house's must-try menu.",
  },
  {
    id: "kari-itik",
    name: "Kari Itik",
    english: "Duck curry",
    tone: "#8E3E14",
    edge: "#4E1E08",
    shape: "chicken",
    what: "Duck cooked in curry.",
    why: "It is one of the dishes on the house's must-try signature menu.",
  },
  {
    id: "kambing-mysore",
    name: "Kambing Mysore",
    english: "Mutton Mysore",
    tone: "#5E2E16",
    edge: "#2E160A",
    shape: "mutton",
    what: "Tender mutton cooked in a fragrant blend of spices.",
    why: "It is one of Hameediyah's most popular dishes, and a signature.",
    signature: true,
  },
  {
    id: "kambing-kurma",
    name: "Kambing Kurma",
    english: "Mutton kurma",
    tone: "#D9A55A",
    edge: "#8C5E26",
    shape: "mutton",
    what: "Tender meat cooked in a flavourful curry with a rich blend of spices and coconut milk.",
    why: "It is one of the dishes on the house's must-try signature menu.",
  },
  {
    id: "daging-rendang",
    name: "Daging Rendang",
    english: "Beef rendang",
    tone: "#6E3B1C",
    edge: "#3A1C0B",
    shape: "beef",
    what: "Beef slow-cooked in coconut milk and spices until perfectly tender.",
    why: "In the 1960s and ’70s, Hameediyah helped supply 5,000 tinned portions of beef rendang to American GIs in the Vietnam War. Today it also comes in a take-home pouch.",
    signature: true,
  },
  {
    id: "kari-kepala-ikan",
    name: "Kari Kepala Ikan",
    english: "Fish head curry",
    tone: "#D2741E",
    edge: "#86400E",
    shape: "fish",
    what: "Fresh fish head in a tangy, spicy gravy.",
    why: "It is one of the dishes on the house's must-try menu.",
  },
  {
    id: "sotong-goreng-apollo",
    name: "Sotong Goreng Apollo",
    english: "Fried squid",
    tone: "#C9461C",
    edge: "#6A1F0C",
    shape: "squid",
    what: "Crispy fried squid served with a tangy, flavourful sauce.",
    why: "It is one of the dishes on the house's must-try signature menu.",
  },
  {
    id: "sotong-kari",
    name: "Sotong Kari",
    english: "Squid curry",
    tone: "#B3511C",
    edge: "#6A270C",
    shape: "squid",
    what: "Squid cooked in curry.",
    why: "It is one of the dishes on the house's must-try menu.",
  },
];

export type Gravy = { level: number; name: string; note: string };

/** Kuah campur levels, from a light drizzle to banjir ("flooded"). */
export const gravyLevels: Gravy[] = [
  { level: 0, name: "Kering", note: "Dry: no gravy, just the dishes." },
  { level: 1, name: "Sikit", note: "A light drizzle across the rice." },
  { level: 2, name: "Biasa", note: "The usual: enough to bind every grain." },
  { level: 3, name: "Lebih", note: "A generous pour. The rice starts to swim." },
  { level: 4, name: "Banjir", note: "Flooded: the Penang way, with the curries running into each other." },
];

/** The heritage menu card. Every dish is named in the client's documents. Notes stay close to their wording. */
export const menuCard = [
  {
    title: "Ayam & Itik",
    intro: "Chicken and duck, for the Nasi Kandar plate.",
    items: [
      { name: "Nasi Kandar Ayam Bawang", note: "spiced fried chicken with a rich array of curries" },
      { name: "Ayam Kapitan", note: "chicken in a creamy, spicy gravy" },
      { name: "Ayam Goreng", note: "spiced fried chicken, crispy outside" },
      { name: "Ayam Kari", note: "chicken curry" },
      { name: "Kari Itik", note: "duck curry" },
    ],
  },
  {
    title: "Kambing & Daging",
    intro: "Mutton, lamb and beef.",
    items: [
      { name: "Kambing Mysore", note: "tender mutton in a fragrant spice blend" },
      { name: "Kambing Kurma", note: "mutton in spices and coconut milk" },
      { name: "Kambing Kari", note: "mutton curry" },
      { name: "Lamb Shank", note: "from the signature menu" },
      { name: "Daging Rendang", note: "beef slow-cooked in coconut milk and spices" },
      { name: "Curried Beef Spleen", note: "beef spleen in curry" },
    ],
  },
  {
    title: "Ikan & Sotong",
    intro: "From the sea.",
    items: [
      { name: "Kari Kepala Ikan", note: "fish head in a tangy, spicy gravy" },
      { name: "Telur Ikan", note: "fish roe in a rich, aromatic gravy" },
      { name: "Sotong Goreng Apollo", note: "crispy fried squid, tangy sauce" },
      { name: "Sotong Kari", note: "squid curry" },
    ],
  },
  {
    title: "Murtabak, Briyani & Mee",
    intro: "From the griddle and the rice pot.",
    items: [
      { name: "Murtabak Hameediyah", note: "stuffed flatbread with meat, egg and spices, grilled" },
      { name: "Nasi Briyani", note: "biryani rice" },
      { name: "Nasi Briyani Udang", note: "biryani rice cooked with shrimp" },
      { name: "Mee Goreng", note: "fried noodles" },
      { name: "Dalcha", note: "lentil curry" },
    ],
  },
  {
    title: "To take home",
    intro: "Hameediyah's rendang, packed to travel.",
    items: [{ name: "Hameediyah Daging Rendang Pouch", note: "the famous beef rendang, in a pouch" }],
  },
] as const;
