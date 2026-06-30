import anchovy from "@/assets/anchovy.png";
import wahoo from "../assets/wahoo.png";
import emperor from "../assets/emperor.png";
import trevally from "@/assets/trevally.png";
import goatFish from "@/assets/goat fish.png";

import seaTigerShrimp from "@/assets/black tiger.png";
//import redRingShrimp from "@/assets/red-ring-shrimp.png";
import bambooFlowerShrimp from "@/assets/bamboo shrimp.png";
import seaWhiteShrimp from "@/assets/sea white.png";
import flowerShrimp from "@/assets/flower.png";

//import kavikadiShrimp from "@/assets/kavikadi-shrimp.png";
import naranShrimp from "@/assets/narran.png";
//import khoodanShrimp from "@/assets/khoodan-shrimp.png";
import poovalanShrimp from "@/assets/poovalan.png";
import barracuda from "@/assets/Barracuda.png";
import cuttlefish from "@/assets/cuttlefish.png";


import grouper from "@/assets/grouper.png";
import leatherJacket from "@/assets/leather jacket.png";
import mackerel from "@/assets/mackerel.png";
import marlin from "@/assets/marlin.png";
import mullet from "@/assets/mullet.png";
import octopus from "@/assets/octopus.png";
import pearlSpot from "@/assets/pearl spot.png";
import pomfret from "@/assets/promfret.png";

import redSnapper from "@/assets/red snapper.png";
import reefCod from "@/assets/reef cod.png";
import ribbon from "@/assets/ribbon.png";
import sardine from "@/assets/sardine.png";
import scad from "@/assets/scad.png";
import seaBream from "@/assets/sea bream.png";


import seer from "@/assets/seer fish.png";

import squid from "@/assets/squid.png";
import swordfish from "@/assets/swordfish.png";
import shrimp from "@/assets/thelly.png";
import tuna from "@/assets/tuna.png";

// TODO: replace these placeholder images with real product photos.
// No existing asset was available for these 4 new products, so the
// closest visually-similar item is reused as a temporary stand-in.
import mahiMahi from "@/assets/wahoo.png"; // placeholder — both are firm-fleshed pelagic fish
import blackTigerShrimp from "@/assets/black tiger.png"; // placeholder — same species (Penaeus monodon)
//import vannameiShrimp from "@/assets/sea-white-shrimp.png"; // placeholder — closest white-shrimp visual match
import blackPomfret from "@/assets/black pomfret.png"; // placeholder — same family, darker variant

export type ProductCategory = "fish" | "shrimp" | "cephalopod";

export interface Product {
  slug: string;
  name: string;
  scientific: string;
  category: ProductCategory;
  forms: string[];
  description: string;
  image: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "grouper",
    name: "Grouper",
    scientific: "Epinephelus malabaricus",
    category: "fish",
    forms: ["Whole", "Fillet", "Portions"],
    description: "Robust reef fish with firm, flaky texture — a centerpiece for premium plated service.",
    image: grouper,
  },
  {
    slug: "wahoo",
    name: "Wahoo",
    scientific: "Acanthocybium solandri",
    category: "fish",
    forms: ["Whole Round", "H&G", "Fillet", "Steak"],
    description: "Fast-swimming pelagic prized for lean, mild flesh that holds up beautifully on the grill.",
    image: wahoo,
  },
  {
    slug: "goat-fish",
    name: "Goat Fish",
    scientific: "Mulloidichthys flavolineatus",
    category: "fish",
    forms: ["Whole Round", "H&G", "Fillet"],
    description: "Delicate reef fish with sweet, tender flesh — a favorite in South Asian and Gulf kitchens.",
    image: goatFish,
  },
  {
    slug: "emperor",
    name: "Emperor",
    scientific: "Lethrinus nebulosus",
    category: "fish",
    forms: ["Whole Round", "H&G", "Fillet"],
    description: "Firm, white-fleshed reef fish with a clean flavor — equally suited to steaming or grilling.",
    image: emperor,
  },
  {
    slug: "trevally",
    name: "Trevally",
    scientific: "Carangoides malabaricus",
    category: "fish",
    forms: ["Whole Round", "H&G", "Fillet", "Steak"],
    description: "Muscular, fast-growing jack with dense flesh — a dependable export staple across Asia.",
    image: trevally,
  },
  {
    slug: "mahi-mahi",
    name: "Mahi Mahi",
    scientific: "Coryphaena hippurus",
    category: "fish",
    forms: ["Whole Round", "H&G", "Fillet", "Steak"],
    description: "Vibrant open-ocean fish with firm, slightly sweet flesh — a global favorite for grilling.",
    image: mahiMahi,
  },
  /*{
    slug: "sea-tiger-shrimp",
    name: "Sea Tiger Shrimp",
    scientific: "Penaeus monodon",
    category: "shrimp",
    forms: ["Whole", "HOSO", "HLSO", "PDTO", "PUD"],
    description: "Large, striped shrimp with firm texture and rich flavor — a top-tier export favorite.",
    image: seaTigerShrimp,
  },*/
  {
    slug: "black-tiger-shrimp",
    name: "Black Tiger Shrimp",
    scientific: "Penaeus monodon",
    category: "shrimp",
    forms: ["Whole", "HOSO", "HLSO", "PDTO", "PUD"],
    description: "The classic black-banded tiger shrimp, valued worldwide for size, color, and bite.",
    image: blackTigerShrimp,
  },
/*{
    slug: "red-ring-shrimp",
    name: "Red Ring Shrimp",
    scientific: "Aristeus alcocki",
    category: "shrimp",
    forms: ["Whole", "HOSO"],
    description: "Deep-water shrimp with a distinctive red hue and sweet, delicate flavor.",
    image: redRingShrimp,
  },*/
  {
    slug: "bamboo-flower-shrimp",
    name: "Bamboo Flower Shrimp",
    scientific: "Atypopenaeus moluccensis",
    category: "shrimp",
    forms: ["Whole"],
    description: "Slender, finely patterned shrimp from coastal waters, prized for its delicate sweetness.",
    image: bambooFlowerShrimp,
  },
  {
    slug: "sea-white-shrimp",
    name: "Sea White Shrimp",
    scientific: "Litopenaeus setiferus",
    category: "shrimp",
    forms: ["Whole", "HOSO"],
    description: "Pale, tender shrimp with a mild, sweet taste — versatile across global cuisines.",
    image: seaWhiteShrimp,
  },
 /* {
    slug: "vannamei-shrimp",
    name: "Vannamei Shrimp",
    scientific: "Litopenaeus vannamei",
    category: "shrimp",
    forms: ["Whole", "HOSO", "HLSO", "PDTO", "PUD", "IQF"],
    description: "The world's most widely farmed shrimp — consistent size, sweet flavor, and reliable supply.",
    image: vannameiShrimp,
  },*/
  {
    slug: "flower-shrimp",
    name: "Flower Shrimp",
    scientific: "Penaeus semisulcatus",
    category: "shrimp",
    forms: ["Whole", "HOSO", "HLSO"],
    description: "Banded, full-flavored shrimp with firm flesh — a sought-after delicacy in export markets.",
    image: flowerShrimp,
  },
  /*{
    slug: "kavikadi-shrimp",
    name: "Karrikadi Shrimp",
    scientific: "Parapenaeopsis stylifera",
    category: "shrimp",
    forms: ["Whole"],
    description: "Small, sweet-flavored shrimp from Kerala's coastal waters, popular in regional cuisine.",
    image: kavikadiShrimp,
  },*/
  {
    slug: "naran-shrimp",
    name: "Indian White Shrimp (Naran)",
    scientific: "Fenneropenaeus indicus",
    category: "shrimp",
    forms: ["Whole", "HOSO", "HLSO"],
    description: "Classic Indian white shrimp with tender texture and balanced sweetness.",
    image: naranShrimp,
  },
  /*{
    slug: "khoodan-shrimp",
    name: "Uhodan Shrimp",
    scientific: "Metapenaeus monoceros",
    category: "shrimp",
    forms: ["Whole"],
    description: "Coastal shrimp variety with firm bite, well suited to traditional and export preparations.",
    image: khoodanShrimp,
  },*/
  {
    slug: "poovalan-shrimp",
    name: "Poovalan Shrimp",
    scientific: "Metapenaeus dobsoni",
    category: "shrimp",
    forms: ["Whole"],
    description: "Small, flavorful shrimp from Kerala's backwaters, prized for its natural sweetness.",
    image: poovalanShrimp,
  },
  {
    slug: "reef-cod",
    name: "Reef Cod",
    scientific: "Epinephelus diacanthus",
    category: "fish",
    forms: ["Whole", "Fillet"],
    description: "Mild, lean white flesh — a versatile workhorse for chefs across continents.",
    image: reefCod,
  },
  {
    slug: "sea-bream",
    name: "Sea Bream",
    scientific: "Sparus aurata",
    category: "fish",
    forms: ["Whole", "WGGS"],
    description: "Pink-tinged Mediterranean classic, raised by Arabian Sea currents to remarkable quality.",
    image: seaBream,
  },
  {
    slug: "pearl-spot",
    name: "Pearl Spot",
    scientific: "Etroplus suratensis",
    category: "fish",
    forms: ["Whole", "Cleaned"],
    description: "Kerala's beloved Karimeen — a delicate brackish-water specialty with a cult following.",
    image: pearlSpot,
  },
  {
    slug: "mullet",
    name: "Mullet",
    scientific: "Mugil cephalus",
    category: "fish",
    forms: ["Whole", "WGGS"],
    description: "Estuarine classic with distinctive flavor, harvested with care for global gourmet markets.",
    image: mullet,
  },
  {
    slug: "sardine",
    name: "Sardine",
    scientific: "Sardinella longiceps",
    category: "fish",
    forms: ["Whole", "WGGS", "IQF"],
    description: "Silver shoals of the Malabar coast — exceptional oily-fish nutrition at industrial scale.",
    image: sardine,
    featured: true,
  },
  {
    slug: "anchovy",
    name: "Anchovy",
    scientific: "Stolephorus indicus",
    category: "fish",
    forms: ["Whole", "Dried", "IQF"],
    description: "Tiny, intense and pure — the umami foundation of countless world cuisines.",
    image: anchovy,
  },
  {
    slug: "barracuda",
    name: "Barracuda",
    scientific: "Sphyraena barracuda",
    category: "fish",
    forms: ["Whole", "Steaks", "Fillet"],
    description: "Lean apex predator with firm, characterful flesh — striking on the plate.",
    image: barracuda,
  },
  {
    slug: "leather-jacket",
    name: "Leather Jacket",
    scientific: "Aluterus monoceros",
    category: "fish",
    forms: ["Whole", "Skinless"],
    description: "Quietly excellent — fine, sweet white flesh increasingly prized by adventurous kitchens.",
    image: leatherJacket,
  },
  {
    slug: "scad",
    name: "Scad",
    scientific: "Decapterus russelli",
    category: "fish",
    forms: ["Whole", "IQF"],
    description: "Bright, full-flavored pelagic fish — a versatile staple across South and East Asia.",
    image: scad,
  },
  {
    slug: "marlin",
    name: "Marlin",
    scientific: "Istiompax indica",
    category: "fish",
    forms: ["Loin", "Steaks", "Cubes"],
    description: "Trophy billfish with dense, beef-like texture — an exclusive offering for fine dining.",
    image: marlin,
  },
  {
    slug: "swordfish",
    name: "Sword Fish",
    scientific: "Xiphias gladius",
    category: "fish",
    forms: ["Loin", "Steaks", "Portions"],
    description: "The classic grilling fish — meaty, mild and consistently in demand worldwide.",
    image: swordfish,
  },
  {
    slug: "cuttlefish",
    name: "Cuttlefish",
    scientific: "Sepia pharaonis",
    category: "cephalopod",
    forms: ["Whole", "Cleaned", "Fillet", "Cubes"],
    description: "Plump, snow-white flesh with a refined bite — the chef's choice for risottos and grills.",
    image: cuttlefish,
    featured: true,
  },
  {
    slug: "octopus",
    name: "Octopus",
    scientific: "Amphioctopus membranaceus",
    category: "cephalopod",
    forms: ["Whole", "Cleaned", "Tentacles"],
    description: "Hand-graded for size and quality — destined for Mediterranean and Japanese kitchens.",
    image: octopus,
    featured: true,
  },
  {
    slug: "tuna",
    name: "Tuna",
    scientific: "Thunnus albacares",
    category: "fish",
    forms: ["Whole", "WGGS", "Loin", "Steaks", "Cubes"],
    description: "Premium yellowfin tuna sourced from the Arabian Sea.",
    image: tuna,
  },
  {
    slug: "seer-fish",
    name: "Seer Fish",
    scientific: "Scomberomorus commerson",
    category: "fish",
    forms: ["Whole", "Steaks", "Fillet"],
    description: "Premium king mackerel with rich, meaty flesh.",
    image: seer,
  },
  {
    slug: "red-snapper",
    name: "Red Snapper",
    scientific: "Lutjanus malabaricus",
    category: "fish",
    forms: ["Whole", "WGGS", "Fillet"],
    description: "Sweet, delicate white flesh favored worldwide.",
    image: redSnapper,
  },
  {
    slug: "pomfret",
    name: "Silver Pomfret",
    scientific: "Pampus argenteus",
    category: "fish",
    forms: ["Whole", "Cleaned", "Fillet"],
    description: "Silver-bodied delicacy popular across international markets.",
    image: pomfret,
  },
  {
    slug: "black-pomfret",
    name: "Black Pomfret",
    scientific: "Parastromateus niger",
    category: "fish",
    forms: ["Whole", "Cleaned", "Fillet"],
    description: "Rich, flavorful relative of the silver pomfret, valued for its denser, darker flesh.",
    image: blackPomfret,
  },
  {
    slug: "mackerel",
    name: "Mackerel",
    scientific: "Rastrelliger kanagurta",
    category: "fish",
    forms: ["Whole", "WGGS", "IQF"],
    description: "Omega-rich fish harvested from Kerala waters.",
    image: mackerel,
  },
  {
    slug: "ribbon-fish",
    name: "Ribbon Fish",
    scientific: "Lepturacanthus savala",
    category: "fish",
    forms: ["Whole", "Cut"],
    description: "Long silver-bodied fish popular in export markets.",
    image: ribbon,
    featured: true,
  },
  {
    slug: "shrimp",
    name: "Thelly Shrimp",
    scientific: "Metapenaeus dobsoni",
    category: "shrimp",
    forms: ["HOSO", "HLSO", "PUD", "PD", "IQF", "Block"],
    description: "Kerala's signature shrimp, valued for its sweet flavor and excellent export quality.",
    image: shrimp,
    featured: true,
  },
  {
    slug: "squid",
    name: "Squid",
    scientific: "Loligo duvauceli",
    category: "cephalopod",
    forms: ["Whole", "Tubes", "Rings", "T&T"],
    description: "Premium squid processed and packed for international seafood markets.",
    image: squid,
    featured: true,
  },
];

export const productCategories = [
  { id: "featured", label: "Featured" },
  { id: "fish", label: "Fish" },
  { id: "shrimp", label: "Shrimp" },
  { id: "cephalopod", label: "Cephalopods" },
];