/**
 * Story beats for The Voyage and Generations.
 * Founder name per the challenge brief; other sources differ (see CLAUDE.md §3).
 */
export type VoyageStop = {
  id: string;
  place: string;
  label: string;
  line: string;
};

export const voyage: VoyageStop[] = [
  {
    id: "coromandel",
    place: "Tamil Nadu",
    label: "The Coromandel coast",
    line: "A Tamil Muslim spice merchant sets out east, carrying a mastery of roasted whole spices.",
  },
  {
    id: "bay",
    place: "Bay of Bengal",
    label: "The crossing",
    line: "Across the Bay of Bengal, the old sea road between South India and the Straits.",
  },
  {
    id: "weld-quay",
    place: "Weld Quay, Penang",
    label: "Landfall",
    line: "He lands at the Weld Quay docks, among dockers and merchants who need a hot meal.",
  },
  {
    id: "campbell",
    place: "Lebuh Campbell",
    label: "1907",
    line: "Rice and curry carried on a bamboo kandar, sold under a tree on Campbell Street.",
  },
];

export type Chapter = { year: string; title: string; body: string };

export const generations: Chapter[] = [
  {
    year: "1907",
    title: "Under the tree",
    body: "The founder, M. Mohamed Thamby Rawther, and his sons sell rice and curry from a shoulder pole on Lebuh Campbell.",
  },
  {
    year: "Then",
    title: "The shophouse at 164A",
    body: "The stall becomes a restaurant in the shophouse at 164A Lebuh Campbell.",
  },
  {
    year: "1914 – 1945",
    title: "Two world wars",
    body: "The shop survives both world wars. In the Second, the original shophouse comes through the bombing of George Town.",
  },
  {
    year: "2008",
    title: "A heritage street",
    body: "George Town is inscribed as a UNESCO World Heritage Site, with Campbell Street inside it. The original shop is restored under Penang's heritage building rules.",
  },
  {
    year: "Today",
    title: "Still the family's",
    body: "Hameediyah Tandoori House opens two doors away, and branches open beyond Penang. The counter on Campbell Street is still run by the same family.",
  },
];
