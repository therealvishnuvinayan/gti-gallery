export type BrandImage = { id: string; src: string; alt: string };
export type PackType = { id: string; name: string; images: BrandImage[] };
export type Brand = { id: string; name: string; logo: string; packs: PackType[] };

export const HOMEPAGE_SLOGAN = "SLOGAN COMES HERE";

const milanoImgs: BrandImage[] = [
  { id: "milano-1", src: "/images/milano1.png", alt: "Milano 01" },
  { id: "milano-2", src: "/images/milano2.png", alt: "Milano 02" },
  { id: "milano-3", src: "/images/milano3.png", alt: "Milano 03" },
  { id: "milano-4", src: "/images/milano4.png", alt: "Milano 04" },
  { id: "milano-5", src: "/images/milano5.png", alt: "Milano 05" },
  { id: "milano-6", src: "/images/milano6.png", alt: "Milano 06" },
  { id: "milano-7", src: "/images/milano7.png", alt: "Milano 07" },
  { id: "milano-8", src: "/images/milano8.png", alt: "Milano 08" },
  { id: "milano-9", src: "/images/milano9.png", alt: "Milano 09" },
];

const havanoveImgs: BrandImage[] = [
  { id: "havanove-1", src: "/images/havanove1.png", alt: "Havanove 01" },
  { id: "havanove-2", src: "/images/havanove2.png", alt: "Havanove 02" },
  { id: "havanove-3", src: "/images/havanove3.png", alt: "Havanove 03" },
  { id: "havanove-4", src: "/images/havanove4.png", alt: "Havanove 04" },
  { id: "havanove-5", src: "/images/havanove5.png", alt: "Havanove 05" },
  { id: "havanove-6", src: "/images/havanove6.png", alt: "Havanove 06" },
];

const cavalloImgs: BrandImage[] = [
  { id: "cavallo-1", src: "/images/cavallo1.png", alt: "Cavallo 01" },
  { id: "cavallo-2", src: "/images/cavallo2.png", alt: "Cavallo 02" },
  { id: "cavallo-3", src: "/images/cavallo3.png", alt: "Cavallo 03" },
  { id: "cavallo-4", src: "/images/cavallo4.png", alt: "Cavallo 04" },
  { id: "cavallo-5", src: "/images/cavallo5.png", alt: "Cavallo 05" },
  { id: "cavallo-6", src: "/images/cavallo6.png", alt: "Cavallo 06" },
  { id: "cavallo-7", src: "/images/cavallo7.png", alt: "Cavallo 07" },
  { id: "cavallo-8", src: "/images/cavallo8.png", alt: "Cavallo 08" },
];

const mondImgs: BrandImage[] = [
  { id: "mond-1", src: "/images/mond1.png", alt: "Mond 01" },
  { id: "mond-2", src: "/images/mond2.png", alt: "Mond 02" },
  { id: "mond-3", src: "/images/mond3.png", alt: "Mond 03" },
  { id: "mond-4", src: "/images/mond4.png", alt: "Mond 04" },
  { id: "mond-5", src: "/images/mond5.png", alt: "Mond 05" },
  { id: "mond-6", src: "/images/mond6.png", alt: "Mond 06" },
];


export const BRANDS: readonly Brand[] = [
  {
    id: "milano",
    name: "Milano",
    logo: "",
    packs: [
      { id: "kings", name: "KINGS", images: milanoImgs },
      { id: "kings-fsp", name: "KINGS FSP", images: milanoImgs },
      { id: "queen", name: "QUEEN", images: milanoImgs },
      { id: "nano", name: "NANO", images: milanoImgs },
    ],
  },
  {
    id: "havanove",
    name: "Havanove",
    logo: "",
    packs: [
      { id: "kings", name: "KINGS", images: havanoveImgs },
      { id: "kings-fsp", name: "KINGS FSP", images: havanoveImgs },
      { id: "queen", name: "QUEEN", images: havanoveImgs },
      { id: "nano", name: "NANO", images: havanoveImgs },
    ],
  },
  {
    id: "cavallo",
    name: "Cavallo",
    logo: "",
    packs: [
      { id: "kings", name: "KINGS", images: cavalloImgs },
      { id: "kings-fsp", name: "KINGS FSP", images: cavalloImgs },
      { id: "queen", name: "QUEEN", images: cavalloImgs },
      { id: "nano", name: "NANO", images: cavalloImgs },
    ],
  },
  {
    id: "mond",
    name: "Mond",
    logo: "",
    packs: [
      { id: "kings", name: "KINGS", images: mondImgs },
      { id: "kings-fsp", name: "KINGS FSP", images: mondImgs },
      { id: "queen", name: "QUEEN", images: mondImgs },
      { id: "nano", name: "NANO", images: mondImgs },
    ],
  },
];
