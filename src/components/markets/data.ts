// src/components/markets/data.ts

export interface ExportCountry {
  /** ISO 3166-1 alpha-2 code, used for flag rendering and keys */
  code: string;
  name: string;
  /** Real-world latitude / longitude, used to project onto the world map */
  lat: number;
  lng: number;
  /** Optional short note shown in the country list (port, volume, specialty) */
  note?: string;
}

export interface Continent {
  id: string;
  /** Display name shown on the card */
  name: string;
  /** Short descriptor under the name */
  tagline: string;
  /** Map projection viewBox focus — used to gently pan/zoom the map per slide */
  focus: {
    /** center of the projected viewBox to pan toward, in map units (0-1000 x, 0-500 y) */
    cx: number;
    cy: number;
    /** zoom scale applied at this focus, 1 = full world */
    scale: number;
  };
  countries: ExportCountry[];
  /** Headline stat for the card, e.g. "11 Countries" is derived, this is a secondary stat */
  stat: {
    label: string;
    value: string;
  };
}

export const ORIGIN = {
  name: "Kochi, Kerala",
  subtitle: "Delsea Exports — Port of Origin",
  lat: 9.9312,
  lng: 76.2673,
};

/**
 * Equirectangular projection helper.
 * Maps real lat/lng onto a 1000 x 500 viewBox (matches WorldMap.tsx viewBox).
 * lng: -180..180 -> x: 0..1000
 * lat: 90..-90 -> y: 0..500
 */
export function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
}

export const continents: Continent[] = [
  {
    id: "asia",
    name: "Asia",
    tagline: "Our largest and longest-standing export region",
    focus: { cx: 700, cy: 220, scale: 1.8 },
    stat: { label: "Countries", value: "12" },
    countries: [
      { code: "CN", name: "China", lat: 35.8617, lng: 104.1954, note: "Shanghai Port" },
      { code: "IR", name: "Iran", lat: 32.4279, lng: 53.6880, note: "Bandar Abbas" },
      { code: "IL", name: "Israel", lat: 31.0461, lng: 34.8516, note: "Haifa Port" },
      { code: "MY", name: "Malaysia", lat: 4.2105, lng: 101.9758, note: "Port Klang" },
      { code: "PH", name: "Philippines", lat: 12.8797, lng: 121.7740, note: "Port of Manila" },
      { code: "SA", name: "Saudi Arabia", lat: 23.8859, lng: 45.0792, note: "Jeddah Port" },
      { code: "KR", name: "South Korea", lat: 35.9078, lng: 127.7669, note: "Busan Port" },
      { code: "TW", name: "Taiwan", lat: 23.6978, lng: 120.9605, note: "Kaohsiung Port" },
      { code: "TH", name: "Thailand", lat: 15.8700, lng: 100.9925, note: "Laem Chabang" },
      { code: "TR", name: "Turkey", lat: 38.9637, lng: 35.2433, note: "Mersin Port" },
      { code: "AE", name: "United Arab Emirates", lat: 23.4241, lng: 53.8478, note: "Jebel Ali Port" },
      { code: "VN", name: "Vietnam", lat: 14.0583, lng: 108.2772, note: "Ho Chi Minh Port" },
    ],
  },

  {
    id: "europe",
    name: "Europe",
    tagline: "Premium retail and food-service channels",
    focus: { cx: 510, cy: 145, scale: 2.3 },
    stat: { label: "Countries", value: "8" },
    countries: [
      { code: "FR", name: "France", lat: 46.2276, lng: 2.2137, note: "Le Havre" },
      { code: "DE", name: "Germany", lat: 51.1657, lng: 10.4515, note: "Hamburg" },
      { code: "GR", name: "Greece", lat: 39.0742, lng: 21.8243, note: "Piraeus" },
      { code: "IT", name: "Italy", lat: 41.8719, lng: 12.5674, note: "Genoa" },
      { code: "LT", name: "Lithuania", lat: 55.1694, lng: 23.8813, note: "Klaipeda" },
      { code: "NL", name: "Netherlands", lat: 52.1326, lng: 5.2913, note: "Rotterdam" },
      { code: "PT", name: "Portugal", lat: 39.3999, lng: -8.2245, note: "Lisbon" },
      { code: "ES", name: "Spain", lat: 40.4637, lng: -3.7492, note: "Valencia" },
    ],
  },

  {
    id: "africa",
    name: "Africa",
    tagline: "Growing seafood export destinations",
    focus: { cx: 535, cy: 270, scale: 2.2 },
    stat: { label: "Countries", value: "5" },
    countries: [
      { code: "DZ", name: "Algeria", lat: 28.0339, lng: 1.6596, note: "Algiers Port" },
      { code: "CM", name: "Cameroon", lat: 7.3697, lng: 12.3547, note: "Douala Port" },
      { code: "MU", name: "Mauritius", lat: -20.3484, lng: 57.5522, note: "Port Louis" },
      { code: "RE", name: "Réunion Island", lat: -21.1151, lng: 55.5364, note: "Le Port" },
      { code: "TN", name: "Tunisia", lat: 33.8869, lng: 9.5375, note: "Rades Port" },
    ],
  },

  {
    id: "americas",
    name: "North America & Caribbean",
    tagline: "Specialty seafood markets",
    focus: { cx: 250, cy: 190, scale: 2.0 },
    stat: { label: "Countries", value: "3" },
    countries: [
      { code: "DO", name: "Dominican Republic", lat: 18.7357, lng: -70.1627, note: "Caucedo Port" },
      { code: "GP", name: "Guadeloupe", lat: 16.2650, lng: -61.5510, note: "Pointe-à-Pitre" },
      { code: "MQ", name: "Martinique", lat: 14.6415, lng: -61.0242, note: "Fort-de-France" },
    ],
  },

  {
    id: "oceania",
    name: "Oceania",
    tagline: "Premium Pacific destination",
    focus: { cx: 870, cy: 360, scale: 2.5 },
    stat: { label: "Countries", value: "1" },
    countries: [
      { code: "AU", name: "Australia", lat: -25.2744, lng: 133.7751, note: "Melbourne Port" },
    ],
  },
];
export const totalCountries = continents.reduce(
  (sum, c) => sum + c.countries.length,
  0
);

export const totalContinents = continents.length;