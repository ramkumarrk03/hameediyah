/**
 * Whole spices typical of Nasi Kandar cooking in general.
 * These are NOT Hameediyah's recipe, which the family keeps secret (company profile).
 * Copy must say "typical of Nasi Kandar cooking".
 */
export type Spice = {
  id: string;
  name: string;
  malay: string;
  role: string;
};

export const spices: Spice[] = [
  { id: "cumin", name: "Cumin", malay: "Jintan putih", role: "Warm and earthy. Roasted first, it anchors a curry's base." },
  { id: "fennel", name: "Fennel", malay: "Jintan manis", role: "Sweet and anise-bright. It lifts the heavier spices." },
  { id: "cinnamon", name: "Cinnamon", malay: "Kayu manis", role: "Woody sweetness that perfumes the oil before anything else goes in." },
  { id: "star-anise", name: "Star anise", malay: "Bunga lawang", role: "Deep liquorice warmth, common in meat curries." },
  { id: "cardamom", name: "Cardamom", malay: "Buah pelaga", role: "Floral and cooling. Often found in biryani rice." },
  { id: "cloves", name: "Cloves", malay: "Bunga cengkih", role: "Sharp and numbing. A few go a long way." },
  { id: "fenugreek", name: "Fenugreek", malay: "Halba", role: "Bitter-sweet. It gives fish curries their tang and body." },
  { id: "chilli", name: "Dried chillies", malay: "Cili kering", role: "Colour and heat, ground into the paste that reddens the gravy." },
];
