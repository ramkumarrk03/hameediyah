/**
 * Story beats for The Voyage and the family timeline.
 * Source of truth: the client's own documents in /hameediyah_resource
 * ("COMPANY PROFILE.pdf" and the brochure "hameediyah 2 copy.pdf"). Nothing here goes beyond them.
 */
export type VoyageStop = {
  id: string;
  place: string;
  label: string;
  line: string;
};

export const voyage: VoyageStop[] = [
  {
    id: "kerala",
    place: "Kerala, India",
    label: "Early 1900s",
    line: "A family from Kerala sets out for Penang, carrying their culinary skills and a rich tradition of Indian Muslim cuisine.",
  },
  {
    id: "crossing",
    place: "Bay of Bengal",
    label: "The crossing",
    line: "They come with a vision: to share their own flavourful, distinctive dishes with the people of Penang.",
  },
  {
    id: "penang",
    place: "Penang",
    label: "1907",
    line: "M. Mohamed Thamby Rawther arrives in Penang with his three sons: Seeni Pakir, Packeer Mohamed and Abdul Ghaney.",
  },
  {
    id: "campbell",
    place: "The streets of Penang",
    label: "On foot",
    line: "They sell their curries through the streets, two baskets balanced on a kandar pole. That way of selling gave the food its name: Nasi Kandar.",
  },
];

export type Chapter = { year: string; title: string; body: string };

export const generations: Chapter[] = [
  {
    year: "Early 1900s",
    title: "From Kerala",
    body: "A humble family from Kerala, India, makes its way to Penang, bringing its culinary skills and a rich tradition of Indian Muslim cuisine.",
  },
  {
    year: "1907",
    title: "The kandar",
    body: "M. Mohamed Thamby Rawther and his three sons, Seeni Pakir, Packeer Mohamed and Abdul Ghaney, sell their curries on foot around Penang. The food rides in two large baskets on a kandar pole across the shoulder.",
  },
  {
    year: "1940s",
    title: "Beef curry in wartime",
    body: "Demand never slows, even in war. During the Japanese occupation, soldiers and generals often order Hameediyah's beef curry.",
  },
  {
    year: "1950s",
    title: "The shophouse at 164-A",
    body: "After the Second World War, the British permit food to be sold in shophouses. In the 1950s, the family opens its first shophouse at 164-A Campbell Street, where Hameediyah remains today.",
  },
  {
    year: "1960s–70s",
    title: "Rendang for the troops",
    body: "Hameediyah helps supply 5,000 portions of beef rendang, packed in tins, to American GIs fighting in the Vietnam War.",
  },
  {
    year: "2020",
    title: "On the record",
    body: "The Malaysia Book of Records lists Hameediyah as the oldest Nasi Kandar restaurant. George Town World Heritage Incorporated gives it Cultural Continuity Recognition (Platinum Status).",
  },
  {
    year: "Today",
    title: "Seven generations",
    body: "The original restaurant has been renovated in line with Penang's Heritage Rules. Under Abdul Sukkoor's sons, Seeni Pakir and Syed Ibrahim, the family runs six outlets across Penang, Selangor and Kuala Lumpur.",
  },
];

/** "Our Ancestors", as named and dated in the client's brochure. */
export type Ancestor = { initials: string; name: string; years: string; photo: string };

export const ancestors: Ancestor[] = [
  { initials: "K.M.P", name: "Mohamed Sheriff Rawther", years: "1886–1963", photo: "ancestor-mohamed-sheriff" },
  { initials: "N.M.S", name: "Aboo Backer Rawther", years: "1907–1957", photo: "ancestor-aboo-backer" },
  { initials: "N.M.P", name: "Abdul Hameed Rawther", years: "1912–1966", photo: "ancestor-abdul-hameed" },
  { initials: "N.M.P", name: "Abdul Aziz Rawther", years: "1914–1989", photo: "ancestor-abdul-aziz" },
  { initials: "N.M.A", name: "Mohamed Mohideen Rawther", years: "1921–1950", photo: "ancestor-mohamed-mohideen" },
  { initials: "N.M.A", name: "Abdul Sukkoor Rawther", years: "1923–1992", photo: "ancestor-abdul-sukkoor" },
];

/** Shareholders, owners and directors (company profile). Only names, roles and public-facing lines. */
export type Owner = { name: string; role: string; line: string; photo: string };

export const owners: Owner[] = [
  {
    name: "Ahamed Seeni Pakir",
    role: "Shareholder · Owner · Director",
    line: "The eldest son of Abdul Sukkoor, he has spent many years making sure Hameediyah's quality and tradition are upheld.",
    photo: "owner-ahamed-seeni-pakir",
  },
  {
    name: "Kader Mydin bin S. Abdul Gani",
    role: "Shareholder · Owner · Director",
    line: "He is deeply involved in the day-to-day running of Hameediyah, overseeing the restaurant's management and direction.",
    photo: "owner-kader-mydin",
  },
  {
    name: "Muhamad Riyaaz bin Syed Ibrahim",
    role: "Shareholder · Owner · Director",
    line: "He is the youngest member of the family running Hameediyah, and works alongside his family to keep the restaurant thriving.",
    photo: "owner-muhamad-riyaaz",
  },
];

/** Core values, from the company profile. */
export const values = [
  { name: "Authenticity", line: "Serving the same authentic dishes that made Hameediyah famous." },
  { name: "Quality", line: "Only the finest ingredients in every dish." },
  { name: "Family", line: "Knowledge passed down from generation to generation." },
  { name: "Customer focus", line: "A warm, welcoming dining experience." },
];
