/**
 * Whole spices typical of nasi kandar cooking.
 * These are NOT Hameediyah's recipe. Copy must say "typical of nasi kandar cooking".
 */
export type Spice = {
  id: string;
  name: string;
  malay: string;
  tamil: string;
  role: string;
};

export const spices: Spice[] = [
  { id: "cumin", name: "Cumin", malay: "Jintan putih", tamil: "சீரகம்", role: "Warm and earthy. Roasted first, it anchors a curry's base." },
  { id: "fennel", name: "Fennel", malay: "Jintan manis", tamil: "சோம்பு", role: "Sweet and anise-bright. It lifts the heavier spices." },
  { id: "cinnamon", name: "Cinnamon", malay: "Kayu manis", tamil: "பட்டை", role: "Woody sweetness that perfumes the oil before anything else goes in." },
  { id: "star-anise", name: "Star anise", malay: "Bunga lawang", tamil: "அன்னாசிப்பூ", role: "Deep, liquorice warmth, common in meat curries." },
  { id: "cardamom", name: "Cardamom", malay: "Buah pelaga", tamil: "ஏலக்காய்", role: "Floral and cooling. Often found in biryani rice." },
  { id: "cloves", name: "Cloves", malay: "Bunga cengkih", tamil: "கிராம்பு", role: "Sharp and numbing. A few go a long way." },
  { id: "fenugreek", name: "Fenugreek", malay: "Halba", tamil: "வெந்தயம்", role: "Bitter-sweet. It gives fish curries their tang and body." },
  { id: "chilli", name: "Dried chillies", malay: "Cili kering", tamil: "மிளகாய் வற்றல்", role: "Colour and heat, ground into the paste that reddens the gravy." },
];
