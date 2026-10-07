/**
 * Contact details and outlets, from the client's company profile and brochure (2022).
 * Opening hours are not given in those documents, so none are shown.
 */
export type Branch = {
  name: string;
  area: string;
  address: string;
  note?: string;
  photo: string;
  photoAlt: string;
};

export const original = {
  name: "Hameediyah Restaurant",
  address: ["164-A Lebuh Campbell", "10100 George Town", "Pulau Pinang, Malaysia"],
  phone: "+604-261 1095",
  phoneHref: "tel:+6042611095",
  email: "hameediyah1907@gmail.com",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hameediyah+Restaurant+164A+Lebuh+Campbell+George+Town+Penang",
  lat: 5.4171,
  lng: 100.3361,
};

export const branches: Branch[] = [
  {
    name: "Main Branch",
    area: "George Town, Penang",
    address: "164-A, Lebuh Campbell, 10100 George Town, Penang",
    note: "The original outlet, where Hameediyah began.",
    photo: "main-campbell-street",
    photoAlt: "The yellow and green shophouse front of Hameediyah Restaurant on Campbell Street, with a queue at the door.",
  },
  {
    name: "Prai",
    area: "Seberang Perai, Penang",
    address: "2730, Jln Baru, Taman Pauh Jaya, 13600 Perai, Pulau Pinang",
    photo: "prai",
    photoAlt: "The Restoran Hameediyah front in Prai, with tables under a green-and-yellow sign.",
  },
  {
    name: "Sungai Ara",
    area: "Bayan Lepas, Penang",
    address: "300-X, 1, Jalan Dato Ismail Hashim, Desa Ria, 11900 Bayan Lepas, Pulau Pinang",
    photo: "sungai-ara",
    photoAlt: "The Hameediyah signboard over the entrance of the Sungai Ara outlet.",
  },
  {
    name: "Ampang",
    area: "Ampang, Selangor",
    address: "Lot 36904, PT 27423, Jalan Kolam Ayer Lama, Taman Dato Ahmad Razali, 68000 Ampang Jaya, Selangor",
    photo: "ampang",
    photoAlt: "The Ampang outlet with its yellow Hameediyah signboard and diners at the tables in front.",
  },
  {
    name: "Bukit Bintang (HQ)",
    area: "Kuala Lumpur",
    address: "138, Jln Bukit Bintang, Bukit Bintang, 55100 Kuala Lumpur",
    note: "Home to a traditional Nasi Kandar outlet and a Nasi Kandar fine dining outlet.",
    photo: "bukit-bintang",
    photoAlt: "The Bukit Bintang outlet, a green awning over outdoor tables and the Hameediyah sign.",
  },
  {
    name: "Masjid India",
    area: "Kuala Lumpur",
    address: "GF-01, Semua House, City Centre, 50100 Kuala Lumpur",
    photo: "masjid-india",
    photoAlt: "The Hameediyah sign on a corner shopfront in the Masjid India area.",
  },
];
