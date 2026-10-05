export type Branch = {
  name: string;
  area: string;
  address?: string;
  original?: boolean;
};

export const original = {
  name: "Hameediyah Restaurant",
  address: ["164A Lebuh Campbell", "10100 George Town", "Pulau Pinang, Malaysia"],
  phone: "+604-261 1095",
  phoneHref: "tel:+6042611095",
  hours: "11 am – 10:30 pm",
  closed: "Closed on Fridays",
  hoursNote: "Hours from a 2010 listing. Please call or check before you visit.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hameediyah+Restaurant+164A+Lebuh+Campbell+George+Town+Penang",
  lat: 5.4171,
  lng: 100.3361,
};

export const branches: Branch[] = [
  { name: "Hameediyah Tandoori House", area: "Lebuh Campbell, George Town", address: "Two doors from the original shop" },
  { name: "Hameediyah", area: "Bukit Mertajam, Penang" },
  { name: "Hameediyah", area: "Kota Damansara, Selangor" },
  { name: "Hameediyah", area: "Kuala Lumpur" },
];
