// lib/data.ts

export type BrandImage = { id: string; src: string; alt: string };
export type PackType = { id: string; name: string; images: BrandImage[] };
export type Brand = { id: string; name: string; logo: string; packs: PackType[] };

// If you add any foldered brand later, you can still use this helper:
// const imgs = (prefix: string): BrandImage[] => [
//   { id: `${prefix}-1`, src: `/images/${prefix}/01.jpg`, alt: `${prefix} 01` },
//   { id: `${prefix}-2`, src: `/images/${prefix}/02.jpg`, alt: `${prefix} 02` },
//   { id: `${prefix}-3`, src: `/images/${prefix}/03.jpg`, alt: `${prefix} 03` },
//   { id: `${prefix}-4`, src: `/images/${prefix}/04.jpg`, alt: `${prefix} 04` },
//   { id: `${prefix}-5`, src: `/images/${prefix}/05.jpg`, alt: `${prefix} 05` },
// ];

/* ---------- Havanove (flat files) ---------- */
const havanoveImgs: BrandImage[] = [
  { id: "havanove-1", src: "/images/havanove1.png", alt: "Havanove 01" },
  { id: "havanove-2", src: "/images/havanove2.png", alt: "Havanove 02" },
  { id: "havanove-3", src: "/images/havanove3.png", alt: "Havanove 03" },
  { id: "havanove-4", src: "/images/havanove4.png", alt: "Havanove 04" },
  { id: "havanove-5", src: "/images/havanove5.png", alt: "Havanove 05" },
  { id: "havanove-6", src: "/images/havanove6.png", alt: "Havanove 06" },
];

/* ---------- Milano (flat files) ---------- */
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

export const BRANDS: readonly Brand[] = [
  {
    id: "milano",
    name: "Milano",
    logo: "", // not used (you’re rendering initials)
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
    logo: "", // not used
    packs: [
      { id: "kings", name: "KINGS", images: havanoveImgs },
      { id: "kings-fsp", name: "KINGS FSP", images: havanoveImgs },
      { id: "queen", name: "QUEEN", images: havanoveImgs },
      { id: "nano", name: "NANO", images: havanoveImgs },
    ],
  },
];
