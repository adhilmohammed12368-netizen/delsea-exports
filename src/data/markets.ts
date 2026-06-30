export interface Market {
  region: string;
  countries: string[];
  // approximate centroid in % of viewbox (0..100)
  x: number;
  y: number;
  stat: string;
  description: string;
}

// Kochi origin point
export const ORIGIN = { x: 67.5, y: 56 };

export const markets: Market[] = [
  {
    region: "Europe",
    countries: ["United Kingdom", "Netherlands", "Spain", "Italy", "France"],
    x: 47,
    y: 32,
    stat: "EU-grade",
    description: "BRCGS-certified shipments serving fine retailers and HoReCa across the European Union.",
  },
  {
    region: "Middle East",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait"],
    x: 58,
    y: 48,
    stat: "Weekly reefer dispatches",
    description: "Trusted by leading hypermarkets and hospitality groups across the GCC.",
  },
  {
    region: "Asia",
    countries: ["Japan", "South Korea", "Singapore", "Vietnam", "China"],
    x: 82,
    y: 50,
    stat: "Sashimi-grade exports",
    description: "Premium tuna, squid and cuttlefish for the most demanding Asian markets.",
  },
  {
    region: "North America",
    countries: ["United States", "Canada"],
    x: 18,
    y: 40,
    stat: "USFDA compliant",
    description: "USFDA-registered facility supplying distributors and chains across North America.",
  },
];
