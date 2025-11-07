export type BrandImage = { id: string; src: string; alt: string };
export type PackType = { id: string; name: string; images: BrandImage[] };
export type Brand = { id: string; name: string; logo: string; packs: PackType[] };

export const HOMEPAGE_SLOGAN = "SLOGAN COMES HERE";

const milanoQueensImgs: BrandImage[] = [
  { id: "milano-queens-1", src: "/images/milano-queens-1.png", alt: "Milano Queens 01" },
  { id: "milano-queens-2", src: "/images/milano-queens-2.png", alt: "Milano Queens 02" },
  { id: "milano-queens-3", src: "/images/milano-queens-3.png", alt: "Milano Queens 03" },
  { id: "milano-queens-4", src: "/images/milano-queens-4.png", alt: "Milano Queens 04" },
  { id: "milano-queens-5", src: "/images/milano-queens-5.png", alt: "Milano Queens 05" },
  { id: "milano-queens-6", src: "/images/milano-queens-6.png", alt: "Milano Queens 06" },
  { id: "milano-queens-7", src: "/images/milano-queens-7.png", alt: "Milano Queens 07" },
];


const milanoSuperslimImgs: BrandImage[] = [
  { id: "milano-superslim-1", src: "/images/milano-superslim-1.png", alt: "Milano Superslim 01" },
  { id: "milano-superslim-2", src: "/images/milano-superslim-2.png", alt: "Milano Superslim 02" },
  { id: "milano-superslim-3", src: "/images/milano-superslim-3.png", alt: "Milano Superslim 03" },
  { id: "milano-superslim-4", src: "/images/milano-superslim-4.png", alt: "Milano Superslim 04" },
  { id: "milano-superslim-5", src: "/images/milano-superslim-5.png", alt: "Milano Superslim 05" },
  { id: "milano-superslim-6", src: "/images/milano-superslim-6.png", alt: "Milano Superslim 06" },
  { id: "milano-superslim-7", src: "/images/milano-superslim-7.png", alt: "Milano Superslim 07" },
  { id: "milano-superslim-8", src: "/images/milano-superslim-8.png", alt: "Milano Superslim 08" },
  { id: "milano-superslim-9", src: "/images/milano-superslim-9.png", alt: "Milano Superslim 09" },
  { id: "milano-superslim-10", src: "/images/milano-superslim-10.png", alt: "Milano Superslim 10" },
  { id: "milano-superslim-11", src: "/images/milano-superslim-11.png", alt: "Milano Superslim 11" },
  { id: "milano-superslim-12", src: "/images/milano-superslim-12.png", alt: "Milano Superslim 12" },
  { id: "milano-superslim-13", src: "/images/milano-superslim-13.png", alt: "Milano Superslim 13" },
  { id: "milano-superslim-14", src: "/images/milano-superslim-14.png", alt: "Milano Superslim 14" },
  { id: "milano-superslim-15", src: "/images/milano-superslim-15.png", alt: "Milano Superslim 15" },
];

// const havanoveImgs: BrandImage[] = [
//   { id: "havanove-1", src: "/images/havanove1.png", alt: "Havanove 01" },
//   { id: "havanove-2", src: "/images/havanove2.png", alt: "Havanove 02" },
//   { id: "havanove-3", src: "/images/havanove3.png", alt: "Havanove 03" },
//   { id: "havanove-4", src: "/images/havanove4.png", alt: "Havanove 04" },
//   { id: "havanove-5", src: "/images/havanove5.png", alt: "Havanove 05" },
//   { id: "havanove-6", src: "/images/havanove6.png", alt: "Havanove 06" },
// ];

// const cavalloImgs: BrandImage[] = [
//   { id: "cavallo-1", src: "/images/cavallo1.png", alt: "Cavallo 01" },
//   { id: "cavallo-2", src: "/images/cavallo2.png", alt: "Cavallo 02" },
//   { id: "cavallo-3", src: "/images/cavallo3.png", alt: "Cavallo 03" },
//   { id: "cavallo-4", src: "/images/cavallo4.png", alt: "Cavallo 04" },
//   { id: "cavallo-5", src: "/images/cavallo5.png", alt: "Cavallo 05" },
//   { id: "cavallo-6", src: "/images/cavallo6.png", alt: "Cavallo 06" },
//   { id: "cavallo-7", src: "/images/cavallo7.png", alt: "Cavallo 07" },
//   { id: "cavallo-8", src: "/images/cavallo8.png", alt: "Cavallo 08" },
// ];

// const mondImgs: BrandImage[] = [
//   { id: "mond-1", src: "/images/mond1.png", alt: "Mond 01" },
//   { id: "mond-2", src: "/images/mond2.png", alt: "Mond 02" },
//   { id: "mond-3", src: "/images/mond3.png", alt: "Mond 03" },
//   { id: "mond-4", src: "/images/mond4.png", alt: "Mond 04" },
//   { id: "mond-5", src: "/images/mond5.png", alt: "Mond 05" },
//   { id: "mond-6", src: "/images/mond6.png", alt: "Mond 06" },
// ];


export const BRANDS: readonly Brand[] = [
  {
    id: "milano",
    name: "Milano",
    logo: "",
    packs: [
      { id: "queens", name: "QUEENS", images: milanoQueensImgs },
      { id: "super-slim", name: "SUPER SLIM", images: milanoSuperslimImgs }
    ],
  },
  {
    id: "havanove",
    name: "Havanove",
    logo: "",
    packs: [
      // { id: "kings", name: "KINGS", images: havanoveImgs },
      // { id: "kings-fsp", name: "KINGS FSP", images: havanoveImgs },
      // { id: "queen", name: "QUEEN", images: havanoveImgs },
      // { id: "nano", name: "NANO", images: havanoveImgs },
    ],
  },
  {
    id: "cavallo",
    name: "Cavallo",
    logo: "",
    packs: [
      // { id: "kings", name: "KINGS", images: cavalloImgs },
      // { id: "kings-fsp", name: "KINGS FSP", images: cavalloImgs },
      // { id: "queen", name: "QUEEN", images: cavalloImgs },
      // { id: "nano", name: "NANO", images: cavalloImgs },
    ],
  },
  {
    id: "mond",
    name: "Mond",
    logo: "",
    packs: [
      // { id: "kings", name: "KINGS", images: mondImgs },
      // { id: "kings-fsp", name: "KINGS FSP", images: mondImgs },
      // { id: "queen", name: "QUEEN", images: mondImgs },
      // { id: "nano", name: "NANO", images: mondImgs },
    ],
  },
];
