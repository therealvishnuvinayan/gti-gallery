export type BrandImage = { id: string; src: string; alt: string };
export type PackType = { id: string; name: string; images: BrandImage[] };
export type Brand = { id: string; name: string; logo: string; packs: PackType[] };

export const HOMEPAGE_SLOGAN = "WELCOME TO GTI PORTFOLIO";

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
  { id: "havanove", name: "Havanove", logo: "", packs: [] },
  { id: "cavallo", name: "Cavallo", logo: "", packs: [] },
  { id: "mond", name: "Mond", logo: "", packs: [] },
];
